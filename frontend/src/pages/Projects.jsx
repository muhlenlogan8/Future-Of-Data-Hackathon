import React, { useState } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Filters from "../components/Filters";

// Mock data for opportunities
const OPPORTUNITIES = [
	{
		id: 1,
		title: "Association - Fundraising Volunteer",
		image: "/test.png",
		branch: "Association Office",
		description: `Throughout the year—and especially during our Annual Campaign—we count on volunteers to serve as ambassadors and champions of our mission. Volunteers help share powerful stories, communicate our impact, and connect people to our cause by encouraging them to give back through volunteering and donating.

There are many ways to get involved! You can be a virtual fundraiser, make phone calls, or simply help spread the word about the YMCA’s impact in our community. Your support ensures the Y can continue to transform lives through the power of philanthropy.`,
		howToRegister: `Scroll to the bottom of the page and click the blue VOLUNTEER button next to Fundraising Volunteer. A Y staff member will follow up with details about tasks, scheduling, and answer any questions.`,
		prerequisites: ["Volunteer Relationship Agreement", "Liability Waiver"],
		commitment: "Ongoing – flexible",
		category: "Fundraising",
		howYouCanHelp: ["Hold a Position"],
		date: "2026-09-01",
	},
	{
		id: 1,
		title: "Association - Fundraising Volunteer",
		image: "/test2.jpg",
		branch: "Association Office",
		description: `Throughout the year—and especially during our Annual Campaign—we count on volunteers to serve as ambassadors and champions of our mission. Volunteers help share powerful stories, communicate our impact, and connect people to our cause by encouraging them to give back through volunteering and donating.

There are many ways to get involved! You can be a virtual fundraiser, make phone calls, or simply help spread the word about the YMCA’s impact in our community. Your support ensures the Y can continue to transform lives through the power of philanthropy.`,
		howToRegister: `Scroll to the bottom of the page and click the blue VOLUNTEER button next to Fundraising Volunteer. A Y staff member will follow up with details about tasks, scheduling, and answer any questions.`,
		prerequisites: ["Volunteer Relationship Agreement", "Liability Waiver"],
		commitment: "Ongoing – flexible",
		category: "test",
		howYouCanHelp: ["Hold a Position"],
		date: "2026-09-01",
	},
];

const BRANCHES = Array.from(new Set(OPPORTUNITIES.map((opp) => opp.branch)));
const CATEGORIES = Array.from(
	new Set(OPPORTUNITIES.map((opp) => opp.category))
);

const Projects = () => {
	const [keyword, setKeyword] = useState("");
	const [branch, setBranch] = useState("");
	const [category, setCategory] = useState("");
	const [after, setAfter] = useState("");
	const [before, setBefore] = useState("");
	const [filtersOpen, setFiltersOpen] = useState(false);

	const clearFilters = () => {
		setKeyword("");
		setBranch("");
		setCategory("");
		setAfter("");
		setBefore("");
	};

	const filtered = OPPORTUNITIES.filter((opp) => {
		const matchesKeyword =
			!keyword ||
			opp.title.toLowerCase().includes(keyword.toLowerCase()) ||
			opp.description.toLowerCase().includes(keyword.toLowerCase());
		const matchesBranch = !branch || opp.branch === branch;
		const matchesCategory = !category || opp.category === category;
		const matchesAfter = !after || opp.date >= after;
		const matchesBefore = !before || opp.date <= before;
		return (
			matchesKeyword &&
			matchesBranch &&
			matchesCategory &&
			matchesAfter &&
			matchesBefore
		);
	});

	const hasActiveFilters = keyword || branch || category || after || before;

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
				{/* Results Section */}
				<div className="px-4 pt-6 pb-12">
					<div className="max-w-7xl mx-auto">
						<div className="flex justify-between items-center mb-6">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									Available Opportunities
								</h2>
								<p className="text-gray-600">
									{filtered.length} opportunities found
								</p>
							</div>
							<button
								onClick={() => setFiltersOpen((v) => !v)}
								className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
									/>
								</svg>
								<span>Filters</span>
								{hasActiveFilters && (
									<span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
										Active
									</span>
								)}
							</button>
						</div>

						{/* Inline Filters */}
						{filtersOpen && (
							<div
								className="mb-8 transition-all duration-500 ease-out transform animate-fade-slide-down"
								style={{
									animation: "fadeSlideDown 0.5s cubic-bezier(0.4,0,0.2,1)",
								}}
							>
								<Filters
									isOpen={true}
									onClose={() => setFiltersOpen(false)}
									keyword={keyword}
									setKeyword={setKeyword}
									branch={branch}
									setBranch={setBranch}
									category={category}
									setCategory={setCategory}
									after={after}
									setAfter={setAfter}
									before={before}
									setBefore={setBefore}
									clearFilters={clearFilters}
									hasActiveFilters={hasActiveFilters}
									branches={BRANCHES}
									categories={CATEGORIES}
								/>
							</div>
						)}

						{filtered.length === 0 ? (
							<div className="bg-white rounded-xl shadow-lg p-12 text-center">
								<svg
									className="w-16 h-16 text-gray-400 mx-auto mb-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									No opportunities found
								</h3>
								<p className="text-gray-600">
									Try adjusting your filters or search terms
								</p>
							</div>
						) : (
							<div className="grid gap-6">
								{filtered.map((opportunity, idx) => (
									<div
										key={opportunity.id + "-" + idx}
										className="transition-all duration-500 ease-out transform animate-fade-slide-up"
										style={{
											animation: `fadeSlideUp 0.5s cubic-bezier(0.4,0,0.2,1) both`,
											animationDelay: `${idx * 80}ms`,
										}}
									>
										<ProjectCard opportunity={opportunity} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Projects;
