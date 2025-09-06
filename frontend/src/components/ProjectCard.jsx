import { useState } from "react";

const branchMap = {
	4803: "Association Office",
	4805: "Blue Ash YMCA",
	2346: "Camp Ernst",
	2345: "Campbell County YMCA",
	4807: "Central Parkway YMCA",
	5307: "Clermont YMCA",
	4813: "Clippard  YMCA",
	"4803-0003": "Colerain Senior Center",
	4815: "Gamble-Nippert YMCA",
	5021: "Highland County YMCA",
	4817: "M.E. Lyons YMCA",
	"4803-0001": "Music Resource Center",
	4827: "Powel Crosley YMCA",
	"4803-0002": "R.C. Durr - Senior Centers",
	2353: "R.C. Durr YMCA",
	4839: "Youth Development & Education",
};

// Hardcoded mapping of tags to available images
const tagImages = {
	"Youth Sports": [
		"/Images/Youth Sports/1.png",
		"/Images/Youth Sports/2.png",
		"/Images/Youth Sports/3.png",
	],
	"Youth Development": [
		"/Images/Youth Development/1.png",
		"/Images/Youth Development/2.png",
		"/Images/Youth Development/3.png",
	],
	"Special Events": [
		"/Images/Special Events/1.png",
		"/Images/Special Events/2.png",
		"/Images/Special Events/3.png",
	],
	Outreach: ["/Images/Outreach/1.png", "/Images/Outreach/2.png", "/Images/Outreach/3.png"],
	Fundraising: ["/Images/Fundraising/1.png", "/Images/Fundraising/2.png", "/Images/Fundraising/3.png"],
	Fitness: ["/Images/Fitness/1.png", "/Images/Fitness/2.png", "/Images/Fitness/3.png"],
	"Competitive Swimming": [
		"/Images/Competitive Swimming/1.png",
		"/Images/Competitive Swimming/2.png",
		"/Images/Competitive Swimming/3.png",
	],
	"Branch Support": [
		"/Images/Branch Support/1.png",
		"/Images/Branch Support/2.png",
		"/Images/Branch Support/3.png",
	],
	Aquatics: ["/Images/Aquatics/1.png", "/Images/Aquatics/2.png", "/Images/Aquatics/3.png"],
	"Adult EDU & Enrichment": [
		"/Images/Adult EDU & Enrichment/1.png",
		"/Images/Adult EDU & Enrichment/2.png",
		"/Images/Adult EDU & Enrichment/3.png",
	],
};

const ProjectCard = ({ opportunity }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleCard = () => {
		setIsExpanded(!isExpanded);
	};

	// Format dates for display
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const d = new Date(dateStr);
		return d.toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};
	const startDate = formatDate(opportunity.dateStart);
	const endDate = formatDate(opportunity.dateEnd);
	const showSingleDate = startDate === endDate || !endDate;

	// Map branchCode to branch name
	const branchName =
		branchMap[opportunity.branchCode] ||
		opportunity.branch ||
		opportunity.branchCode;

	// Select a random image based on the first tag
	let imageSrc = "test.png"; // fallback
	if (opportunity.tags && opportunity.tags.length > 0) {
		const tag = opportunity.tags[0];
		const images = tagImages[tag];
		if (images && images.length > 0) {
			const randomIdx = Math.floor(Math.random() * images.length);
			imageSrc = images[randomIdx];
		}
	}

	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
			<div className="p-6">
				<div className="flex flex-col lg:flex-row gap-6">
					<img
						src={imageSrc}
						alt={opportunity.title}
						className="max-w-xs w-full lg:w-64 h-48 object-cover rounded-lg mx-auto"
					/>
					<div className="flex-1">
						<div className="flex justify-between items-start mb-3">
							<div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{opportunity.title}
								</h3>
								<div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<span>{branchName}</span>
								</div>
							</div>
							{/* Date range display, centered vertically with title */}
							<div className="flex items-center text-md text-gray-700 font-medium h-8 self-top">
								{showSingleDate ? (
									<span>{startDate && startDate}</span>
								) : (
									<span>
										{startDate} - {endDate}
									</span>
								)}
							</div>
						</div>

						<p className="text-gray-600 mb-4 line-clamp-3">
							{opportunity.description.split("\n")[0].substring(0, 200)}
							...
						</p>

						<div className="flex justify-between items-center">
							<div className="flex flex-wrap gap-2">
								{opportunity.tags &&
									opportunity.tags.map((tag) => (
										<span
											key={tag}
											className="bg-green-100 text-green-800 text-md px-2 py-2 rounded font-medium"
										>
											{tag}
										</span>
									))}
							</div>
							<button
								onClick={toggleCard}
								className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
							>
								<span>{isExpanded ? "Show Less" : "Learn More"}</span>
								<svg
									className={`w-4 h-4 transition-transform ${
										isExpanded ? "rotate-180" : ""
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Expanded Content */}
				{isExpanded && (
					<div className="mt-6 pt-6 border-t border-gray-200">
						<div className="mx-auto">
							<div className="bg-gray-50 p-4 rounded-lg">
								<h4 className="font-semibold text-gray-900 mb-2 text-center text-xl">
									Full Description
								</h4>
								<div className="text-gray-600 whitespace-pre-line leading-relaxed text-center mb-2">
									{opportunity.description}
								</div>

								{/* Contact Details */}
								{opportunity["Contact Details"] && (
									<div className="border-t border-gray-200 pt-2">
										<h4 className="font-semibold text-gray-900 mb-3 text-center text-lg">
											Contact Details
										</h4>
										<div className="text-gray-600 whitespace-pre-line text-center leading-relaxed">
											{opportunity["Contact Details"]}
										</div>
									</div>
								)}

								{/* Prerequisites */}
								{opportunity.prerequisites &&
									opportunity.prerequisites.length > 0 && (
										<div className="border-t border-gray-200 pt-2">
											<h4 className="font-semibold text-gray-900 mb-3 text-center text-lg">
												Prerequisites
											</h4>
											<div className="flex justify-center">
												<ul className="list-disc list-inside text-gray-600 text-left">
													{opportunity.prerequisites.map((req) => (
														<li key={req} className="mb-1">
															{req}
														</li>
													))}
												</ul>
											</div>
										</div>
									)}
							</div>
							<div className="mt-4 text-center">
								<button
									style={{
										background:
											"linear-gradient(90deg, #6d2992 0%, #b32e87 100%)",
									}}
									className="text-white px-10 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 text-lg"
								>
									Volunteer for this Opportunity
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectCard;
