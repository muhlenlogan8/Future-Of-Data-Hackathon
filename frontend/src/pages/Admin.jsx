import React, { useState } from "react";
import Header from "../components/Header";

const Admin = () => {
	const initialData = [
		{
			category: "Adult Ed & Enrichment",
			projects: 40,
			volunteers: 115,
			hours: 6063,
		},
		{ category: "Aquatics", projects: 17, volunteers: 110, hours: 1124 },
		{ category: "Branch Support", projects: 50, volunteers: 244, hours: 13155 },
		{
			category: "Camps & School Age Classes at Branches",
			projects: 3,
			volunteers: 7,
			hours: 37,
		},
		{
			category: "Competitive Swim",
			projects: 6,
			volunteers: 680,
			hours: 11995,
		},
		{ category: "Fitness", projects: 32, volunteers: 132, hours: 6245 },
		{ category: "Fundraising", projects: 13, volunteers: 124, hours: 865 },
		{
			category: "Outreach/Social Responsibility Events",
			projects: 16,
			volunteers: 130,
			hours: 4154,
		},
		{
			category: "Special Events/One-Day",
			projects: 135,
			volunteers: 1320,
			hours: 5376,
		},
		{
			category: "Teen Engagement at Branch",
			projects: 3,
			volunteers: 12,
			hours: 280,
		},
		{
			category: "Youth Development",
			projects: 20,
			volunteers: 448,
			hours: 16438,
		},
		{ category: "Youth Sports", projects: 28, volunteers: 446, hours: 11060 },
	];

	const [data, setData] = useState(initialData);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

	const handleSort = (key, type = "string") => {
		let direction = "asc";

		if (sortConfig.key === key && sortConfig.direction === "asc")
			direction = "desc";
		else if (sortConfig.key === key && sortConfig.direction === "desc")
			direction = null;

		setSortConfig({ key, direction });

		if (!direction) {
			setData(initialData);
			return;
		}

		const sorted = [...data].sort((a, b) => {
			if (type === "number")
				return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
			else
				return direction === "asc"
					? a[key].localeCompare(b[key])
					: b[key].localeCompare(a[key]);
		});

		setData(sorted);
	};

	const getSortIndicator = (key) => {
		if (sortConfig.key === key) {
			if (sortConfig.direction === "asc") return " ▲";
			if (sortConfig.direction === "desc") return " ▼";
		}
		return "";
	};

	const cumulativeTotals = data.reduce(
		(acc, row) => {
			acc.projects += row.projects;
			acc.volunteers += row.volunteers;
			acc.hours += row.hours;
			return acc;
		},
		{ projects: 0, volunteers: 0, hours: 0 }
	);

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 p-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-6">
					Admin Dashboard
				</h1>

				<div className="mb-4">
					<h2 className="text-2xl font-semibold text-gray-800 mb-1">
						Volunteer Activity Summary - Monthly
					</h2>
					<p className="text-gray-600 text-sm">
						Click a column to sort ascending, descending, or reset.
					</p>
				</div>

				<div className="overflow-x-auto bg-white rounded-xl shadow p-4">
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-blue-100 text-left">
								<th
									className="px-6 py-3 text-gray-700 cursor-pointer"
									onClick={() => handleSort("category", "string")}
								>
									Category{getSortIndicator("category")}
								</th>
								<th
									className="px-6 py-3 text-gray-700 cursor-pointer"
									onClick={() => handleSort("projects", "number")}
								>
									Projects{getSortIndicator("projects")}
								</th>
								<th
									className="px-6 py-3 text-gray-700 cursor-pointer"
									onClick={() => handleSort("volunteers", "number")}
								>
									Volunteers{getSortIndicator("volunteers")}
								</th>
								<th
									className="px-6 py-3 text-gray-700 cursor-pointer"
									onClick={() => handleSort("hours", "number")}
								>
									Hours{getSortIndicator("hours")}
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((row, idx) => (
								<tr
									key={idx}
									className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}
								>
									<td className="px-6 py-4 font-medium">{row.category}</td>
									<td className="px-6 py-4">{row.projects}</td>
									<td className="px-6 py-4">{row.volunteers}</td>
									<td className="px-6 py-4">{row.hours.toLocaleString()}</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="bg-blue-200 font-bold">
								<td className="px-6 py-4">Total</td>
								<td className="px-6 py-4">{cumulativeTotals.projects}</td>
								<td className="px-6 py-4">{cumulativeTotals.volunteers}</td>
								<td className="px-6 py-4">
									{cumulativeTotals.hours.toLocaleString()}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</>
	);
};

export default Admin;
