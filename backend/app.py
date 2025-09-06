import os
import requests
import pandas as pd
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth


# Load environment variables
load_dotenv()
API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
CUSTOMER_CODE = os.getenv("CUSTOMER_CODE")

BASE_URL = "https://api.volunteermatters.io/api/v2"
HEADERS = {"X-VM-Customer-Code": CUSTOMER_CODE}

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

# Example usage
df_unique_tags = get_unique_project_tags()
print(df_unique_tags)

def get_current_projects_df(limit=None, branch_code=None):
    """
    Fetch current projects (started but not ended) from VolunteerMatters,
    include detailed info, and return as a DataFrame.

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

            # Filter by start/end dates
            if publish_start <= now and (publish_end is pd.NaT or publish_end >= now):
                # Filter by branch code if provided
                if branch_code and p.get("branch", {}).get("code") != branch_code:
                    continue

                # Fetch detailed info
                detail_resp = requests.get(
                    f"{BASE_URL}/projects/{p.get('id')}",
                    auth=HTTPBasicAuth(API_KEY, API_SECRET),
                    headers=HEADERS
                )
                if detail_resp.status_code == 200:
                    current_projects.append(detail_resp.json())

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
            "Branch ID": proj.get("branch", {}).get("id"),
            "Branch Code": proj.get("branch", {}).get("code"),
            "Branch Name": proj.get("branch", {}).get("name"),
            "Branch Active": proj.get("branch", {}).get("active"),
            "Address": proj.get("address", {}).get("address"),
            "City": proj.get("address", {}).get("city"),
            "State": proj.get("address", {}).get("state"),
            "Postal Code": proj.get("address", {}).get("postalCode"),
            "Country": proj.get("address", {}).get("country"),
            "Safety Info": proj.get("information", {}).get("safety"),
            "Description": proj.get("information", {}).get("description"),
            "Community Partners": proj.get("information", {}).get("communityPartners"),
            "Contact Details": proj.get("information", {}).get("contactDetails"),
            "Cancellation Policy": proj.get("information", {}).get("cancellationPolicy"),
            "Goals": proj.get("information", {}).get("goals"),
            "Tags": ", ".join([t.get("name") for t in proj.get("tags", [])]),
            "Publish Mode": proj.get("publishMode"),
            "Publish Start Date": proj.get("publishStartDate"),
            "Publish End Date": proj.get("publishEndDate"),
            "Created": proj.get("created"),
            "Recurring": proj.get("isRecurring")
        })

    return pd.DataFrame(flattened_projects)


# Example usage (limit to 5 projects)
df_current_projects = get_current_projects_df(limit=50)
print(df_current_projects)
df_current_projects.to_excel("current_projects.xlsx", index=False)
