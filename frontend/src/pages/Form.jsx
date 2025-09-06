import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const YMCA_LOCATIONS = [
	"Blue Ash YMCA (Blue Ash, OH)",
	"Campbell County YMCA (Fort Thomas, KY)",
	"Central Parkway YMCA (Downtown Cincinnati, OH)",
	"Clermont Family YMCA (Batavia, OH)",
	"Clippard Family YMCA (Colerain Township, OH)",
	"Colerain Senior Center (Colerain Township, OH)",
	"Gamble-Nippert YMCA (Westwood, OH)",
	"Highland County YMCA (Hillsboro, OH)",
	"Kentucky Senior Center (Burlington, KY)",
	"M.E. Lyons YMCA (Anderson Township, OH)",
	"Music Resource Center (Walnut Hills, OH)",
	"Powel Crosley, Jr. YMCA (Springfield Township, OH)",
	"R.C. Durr YMCA (Burlington, KY)",
	"YMCA Camp Earnst (Burlington, KY)",
];

const INTEREST_AREAS = [
	"Adult Education & Enrichment (Small Group Leaders, Bible Studies, Games, Bingo, Cards, Chess, Arts and Crafts)",
	"Aquatics (Assistant for Swim Lessons, Water Aerobics, etc.)",
	"Branch Support (Welcome Center, Kids' Club, Facility Cleanliness)",
	"Competitive Swim (Swim Teams, Synchrogators)",
	"Fitness (Group-Exercise Champions, SilverSneakers Champions, Adult Leagues)",
	"Fundraising (Annual Support)",
	"Outreach (Services for those in need in our community; Ex: Y Marketplace, Warm Blankets, School Supply Drive)",
	"Special Events/One-Day (Clean Up Days, Pool Parties, Healthy Kids Day, etc.)",
	"Youth Development (Preschool Assistants, Camp Helpers, Before & Afterschool Support, Teen Mentors, Music Resource Center volunteers)",
	"Youth Sports (Coaches for Soccer, Basketball, Baseball, etc.)",
];

const OPPORTUNITY_TYPES = [
	{
		label: "One-day volunteering opportunities",
		value: "one-day",
	},
	{
		label: "Regular ongoing opportunities",
		value: "ongoing",
	},
	{
		label: "Both options interest!",
		value: "both",
	},
	{
		label: "I'm not sure yet",
		value: "not-sure",
	},
];

const MultiSelectItem = ({
	item,
	isSelected,
	onToggle,
	icon,
	boldBeforeParen,
}) => (
	<div
		onClick={() => onToggle(item)}
		className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
			isSelected
				? "border-red-500 bg-red-50 shadow-md"
				: "border-gray-200 bg-white hover:border-red-300 hover:shadow-sm"
		}`}
	>
		<div className="flex items-center space-x-3">
			{icon && <div className="text-red-600">{icon}</div>}
			<div className="flex-1">
				<div className="font-medium text-gray-900">
					{boldBeforeParen ? (
						<>
							<span className="font-bold">{item.split(" (")[0]}</span>
							{item.includes(" (") && <span>{" (" + item.split(" (")[1]}</span>}
						</>
					) : (
						item
					)}
				</div>
			</div>
			<div
				className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
					isSelected ? "border-red-500 bg-red-500" : "border-gray-300"
				}`}
			>
				{isSelected && (
					<svg
						className="w-3 h-3 text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</div>
		</div>
	</div>
);

const Form = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [form, setForm] = useState({
		locations: [],
		areas: [],
		opportunityType: "",
		name: "",
		email: "",
		phone: "",
	});
	const navigate = useNavigate();

	const steps = [
		{ id: 1, title: "Locations" },
		{ id: 2, title: "Interests" },
		{ id: 3, title: "Commitment" },
		{ id: 4, title: "Contact" },
	];

	const toggleLocation = (location) => {
		setForm((prev) => ({
			...prev,
			locations: prev.locations.includes(location)
				? prev.locations.filter((l) => l !== location)
				: [...prev.locations, location],
		}));
	};

	const toggleArea = (area) => {
		setForm((prev) => ({
			...prev,
			areas: prev.areas.includes(area)
				? prev.areas.filter((a) => a !== area)
				: [...prev.areas, area],
		}));
	};

	const handleOpportunitySelect = (value) => {
		setForm((prev) => ({ ...prev, opportunityType: value }));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const nextStep = () => {
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const canProceed = () => {
		switch (currentStep) {
			case 1:
				return form.locations.length > 0;
			case 2:
				return form.areas.length > 0;
			case 3:
				return form.opportunityType !== "";
			case 4:
				return form.name && form.email && form.phone;
			default:
				return false;
		}
	};

	const handleSubmit = () => {
		localStorage.setItem("ymcaUserProfile", JSON.stringify(form));
		navigate("/profile");
	};

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-6 px-4">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-6">
						<div className="inline-flex items-center space-x-3">
							<h1 className="text-2xl font-bold text-gray-800">
								Help us find the best volunteer opportunities for you!
							</h1>
						</div>
					</div>

					{/* Progress Steps */}
					<div className="mb-6 mx-30">
						<div className="flex justify-between items-center">
							{steps.map((step, index) => (
								<div key={step.id} className="flex items-center">
									<div className="flex flex-col items-center">
										<div
											className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
												step.id <= currentStep
													? "bg-red-600 text-white"
													: "bg-gray-200 text-gray-500"
											}`}
										>
											{step.id < currentStep ? (
												<svg
													className="w-6 h-6"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											) : (
												step.id
											)}
										</div>
										<div className="text-center mt-2">
											<div
												className={`text-sm font-medium ${
													step.id <= currentStep
														? "text-gray-900"
														: "text-gray-500"
												}`}
											>
												{step.title}
											</div>
											<div className="text-xs text-gray-500 hidden sm:block">
												{step.description}
											</div>
										</div>
									</div>
									{index < steps.length - 1 && (
										<div
											className={`flex-1 h-1 mx-4 rounded ${
												step.id < currentStep ? "bg-red-600" : "bg-gray-200"
											}`}
										/>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Form Content */}
					<div className="bg-white rounded-xl shadow-xl p-6">
						{/* Step 1: Locations */}
						{currentStep === 1 && (
							<div className="space-y-6">
								<div className="text-center mb-4">
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										YMCA Locations
									</h2>
									<p className="text-gray-600">
										Select all YMCA locations that interest you
									</p>
								</div>
								<div className="grid gap-4 md:grid-cols-2">
									{YMCA_LOCATIONS.map((location) => (
										<MultiSelectItem
											key={location}
											item={location}
											isSelected={form.locations.includes(location)}
											onToggle={toggleLocation}
											icon={
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
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											}
											boldBeforeParen={true}
										/>
									))}
								</div>
							</div>
						)}

						{/* Step 2: Interest Areas */}
						{currentStep === 2 && (
							<div className="space-y-6">
								<div className="text-center mb-2">
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										Volunteering Areas
									</h2>
									<p className="text-gray-600">
										Choose the volunteer areas you're passionate about
									</p>
								</div>
								<div className="grid gap-4 md:grid-cols-2">
									{INTEREST_AREAS.map((area) => (
										<MultiSelectItem
											key={area}
											item={area}
											isSelected={form.areas.includes(area)}
											onToggle={toggleArea}
											icon={
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
														d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
													/>
												</svg>
											}
											boldBeforeParen={true}
										/>
									))}
								</div>
							</div>
						)}

						{/* Step 3: Opportunity Type */}
						{currentStep === 3 && (
							<div className="space-y-6">
								<div className="text-center mb-8">
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										Volunteering Commitment
									</h2>
									<p className="text-gray-600">
										Choose the commitment level that works best for you
									</p>
								</div>
								<div className="space-y-4">
									{OPPORTUNITY_TYPES.map((option) => (
										<div
											key={option.value}
											onClick={() => handleOpportunitySelect(option.value)}
											className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
												form.opportunityType === option.value
													? "border-red-500 bg-red-50 shadow-md"
													: "border-gray-200 bg-white hover:border-red-300 hover:shadow-sm"
											}`}
										>
											<div className="flex items-center space-x-4">
												<div
													className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
														form.opportunityType === option.value
															? "border-red-500 bg-red-500"
															: "border-gray-300"
													}`}
												>
													{form.opportunityType === option.value && (
														<div className="w-3 h-3 bg-white rounded-full"></div>
													)}
												</div>
												<div className="flex-1">
													<div className="font-semibold text-gray-900">
														{option.label}
													</div>
													<div className="text-sm text-gray-600">
														{option.description}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Step 4: Contact Information */}
						{currentStep === 4 && (
							<div className="space-y-6">
								<div className="text-center mb-8">
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										Personal Information
									</h2>
									<p className="text-gray-600">
										Final step! Please provide your contact details
									</p>
								</div>
								<div className="grid gap-6 md:grid-cols-2">
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Full Name *
										</label>
										<input
											type="text"
											name="name"
											value={form.name}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
											placeholder="Enter your full name"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Email Address *
										</label>
										<input
											type="email"
											name="email"
											value={form.email}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
											placeholder="your.email@example.com"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Phone Number *
										</label>
										<input
											type="tel"
											name="phone"
											value={form.phone}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
											placeholder="(555) 123-4567"
											required
										/>
									</div>
								</div>
							</div>
						)}

						{/* Navigation Buttons */}
						<div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
							<button
								onClick={prevStep}
								disabled={currentStep === 1}
								className={`px-6 py-3 rounded-lg font-medium ${
									currentStep === 1
										? "text-gray-400 cursor-not-allowed"
										: "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
								}`}
							>
								← Back
							</button>

							<div className="text-sm text-gray-500">
								Step {currentStep} of {steps.length}
							</div>

							{currentStep === steps.length ? (
								<button
									onClick={handleSubmit}
									disabled={!canProceed()}
									className={`px-8 py-3 rounded-lg font-semibold ${
										canProceed()
											? "bg-gradient-to-r from-red-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200"
											: "bg-gray-300 text-gray-500 cursor-not-allowed"
									}`}
								>
									Complete Registration
								</button>
							) : (
								<button
									onClick={nextStep}
									disabled={!canProceed()}
									className={`px-6 py-3 rounded-lg font-medium ${
										canProceed()
											? "bg-red-600 text-white hover:bg-red-700"
											: "bg-gray-300 text-gray-500 cursor-not-allowed"
									}`}
								>
									Next →
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Form;
