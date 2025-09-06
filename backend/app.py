import os
import requests
import pandas as pd
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth
from flask import Flask, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()
API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
CUSTOMER_CODE = os.getenv("CUSTOMER_CODE")

BASE_URL = "https://api.volunteermatters.io/api/v2"
HEADERS = {"X-VM-Customer-Code": CUSTOMER_CODE}

app = Flask(__name__)
CORS(app)

def get_unique_project_tags(page_size=1000, show_inactive=False):
    """
    Fetch all project tags from VolunteerMatters and return a unique list,
    excluding tags in the 'Removed Branches' group.

    Args:
        page_size (int): Number of tags per page for pagination. Default 1000.
        show_inactive (bool): Include inactive tags. Default False.

    Returns:
        pd.DataFrame: Unique project tags with code, name, and description.
    """
    page_index = 0
    all_tags = []

    while True:
        response = requests.get(
            f"{BASE_URL}/projects/tags",
            auth=HTTPBasicAuth(API_KEY, API_SECRET),
            headers=HEADERS,
            params={
                "pageIndex": page_index,
                "pageSize": page_size,
                "showInactive": show_inactive
            }
        )

        if response.status_code != 200:
            raise Exception(f"Error {response.status_code}: {response.text}")

        data = response.json()
        tags = data.get("items", data)

        if not tags:
            break

        all_tags.extend(tags)
        page_index += 1
        if len(tags) < page_size:
            break

    # Filter out tags where groupName is "Removed Branches"
    filtered_tags = [t for t in all_tags if t.get("groupName") != "Removed Branches"]

    # Convert to DataFrame
    df = pd.DataFrame([
        {
            "Tag Code": t.get("code"),
            "Tag Name": t.get("name"),
            "Description": t.get("description"),
            "Group Name": t.get("groupName")
        }
        for t in filtered_tags
    ])

    # Drop duplicates by Tag Code
    df_unique = df.drop_duplicates(subset=["Tag Code"]).reset_index(drop=True)
    return df_unique

def get_current_projects_df(limit=1000, branch_code=None):
    """
    Fetch current projects (started but not ended) from VolunteerMatters,
    and return as a flattened DataFrame without additional project ID calls.

    Args:
        limit (int, optional): Maximum number of projects to return. Default None (return all).
        branch_code (str, optional): Filter projects by a specific branch code. Default None.

    Returns:
        pd.DataFrame: Current projects with detailed information flattened.
    """
    page_index = 0
    current_projects = []

    while True:
        response = requests.get(
            f"{BASE_URL}/projects",
            auth=HTTPBasicAuth(API_KEY, API_SECRET),
            headers=HEADERS,
            params={"pageIndex": page_index, "pageSize": 1000}  # fetch many per page
        )

        if response.status_code != 200:
            raise Exception(f"Error {response.status_code}: {response.text}")

        data = response.json()
        projects = data.get("items", data)

        if not projects:
            break

        now = pd.Timestamp.now()
        for p in projects:
            publish_start = pd.to_datetime(p.get("publishStartDate"), errors="coerce")
            publish_end = pd.to_datetime(p.get("publishEndDate"), errors="coerce")

            # Filter for current projects
            if publish_start <= now and (publish_end is pd.NaT or publish_end >= now):
                # Filter by branch code if provided
                if branch_code and p.get("branch", {}).get("code") != branch_code:
                    continue

                current_projects.append(p)

                # Stop if we reached the limit
                if limit and len(current_projects) >= limit:
                    break

        page_index += 1
        if len(projects) < 1000 or (limit and len(current_projects) >= limit):
            break  # no more pages or reached limit

    # Flatten project info into DataFrame
    flattened_projects = []
    for proj in current_projects:
        flattened_projects.append({
            "Project ID": proj.get("id"),
            "Project Name": proj.get("name"),
            "Branch Code": proj.get("branch", {}).get("code"),
            "Safety Info": proj.get("information", {}).get("safety"),
            "Description": proj.get("information", {}).get("description"),
            #"Community Partners": proj.get("information", {}).get("communityPartners"),
            "Contact Details": proj.get("information", {}).get("contactDetails"),
            "Cancellation Policy": proj.get("information", {}).get("cancellationPolicy"),
            "Goals": proj.get("information", {}).get("goals"),
            "Tags": ", ".join([t.get("name") for t in proj.get("tags", [])]),
            "Publish Mode": proj.get("publishMode"),
            "Publish Start Date": proj.get("publishStartDate"),
            "Publish End Date": proj.get("publishEndDate"),
            "Created": proj.get("created"),
        })

    return pd.DataFrame(flattened_projects)

def get_branch_code_name_dict(show_inactive=False):
    """
    Fetch unique branches from VolunteerMatters and return a dictionary
    mapping branch code to branch name.

    Args:
        show_inactive (bool): Include inactive branches. Default False.

    Returns:
        dict: Branch Code -> Branch Name
    """
    page_index = 0
    all_branches = []

    while True:
        response = requests.get(
            f"{BASE_URL}/branches",
            auth=HTTPBasicAuth(API_KEY, API_SECRET),
            headers=HEADERS,
            params={
                "pageIndex": page_index,
                "pageSize": 1000,
                "showInactive": show_inactive
            }
        )

        if response.status_code != 200:
            raise Exception(f"Error {response.status_code}: {response.text}")

        data = response.json()
        branches = data.get("items", data)

        if not branches:
            break

        all_branches.extend(branches)
        page_index += 1

        if len(branches) < 1000:
            break

    # Build dictionary: code -> name
    branch_dict = {}
    for b in all_branches:
        code = b.get("code")
        name = b.get("name")
        if code and name:
            branch_dict[code] = name

    return branch_dict

@app.route("/api/projects", methods=["GET"])
def getProjects():
    try:
        projects_df = get_current_projects_df(limit=20)
        projects = projects_df.to_dict(orient="records")  # Convert DataFrame to list of dicts
        return jsonify(projects)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.run(debug=True)