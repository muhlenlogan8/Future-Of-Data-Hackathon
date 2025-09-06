import { useState } from "react";

const ProjectCard = ({ opportunity }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleCard = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
			<div className="p-6">
				<div className="flex flex-col lg:flex-row gap-6">
					<img
						src={opportunity.image}
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
									<span>{opportunity.branch}</span>
								</div>
							</div>
							<div className="flex space-x-2">
								<span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
									{opportunity.category}
								</span>
								<span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
									{opportunity.commitment}
								</span>
							</div>
						</div>

						<p className="text-gray-600 mb-4 line-clamp-3">
							{opportunity.description.split("\n")[0].substring(0, 200)}
							...
						</p>

						<div className="flex justify-between items-center">
							<div className="flex flex-wrap gap-2">
								{opportunity.howYouCanHelp.map((help) => (
									<span
										key={help}
										className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium"
									>
										{help}
									</span>
								))}
							</div>
							<button
								onClick={toggleCard}
								className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
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
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold text-gray-900 mb-2">
									Full Description
								</h4>
								<p className="text-gray-600 whitespace-pre-line mb-4">
									{opportunity.description}
								</p>
							</div>
							<div className="space-y-4">
								{opportunity.howToRegister && (
									<div>
										<h4 className="font-semibold text-gray-900 mb-2">
											How to Register
										</h4>
										<p className="text-gray-600">{opportunity.howToRegister}</p>
									</div>
								)}
								{opportunity.prerequisites &&
									opportunity.prerequisites.length > 0 && (
										<div>
											<h4 className="font-semibold text-gray-900 mb-2">
												Prerequisites
											</h4>
											<ul className="list-disc list-inside text-gray-600">
												{opportunity.prerequisites.map((req) => (
													<li key={req}>{req}</li>
												))}
											</ul>
										</div>
									)}
							</div>
						</div>
						<div className="mt-6 flex justify-center">
							<button className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
								Volunteer for this Opportunity
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectCard;
