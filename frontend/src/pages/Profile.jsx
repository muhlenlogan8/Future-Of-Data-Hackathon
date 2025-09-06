import { useEffect, useState } from "react";
import Header from "../components/Header";

const Profile = () => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const data = localStorage.getItem("ymcaUserProfile");
		if (data) {
			setProfile(JSON.parse(data));
		}
	}, []);

	if (!profile) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center pt-20">
					<div className="bg-white p-8 rounded-lg shadow-lg text-center">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<img
								src="/default-profile.png"
								alt="Default profile"
								className="w-12 h-12 rounded-full object-cover"
							/>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No Profile Found
						</h3>
						<p className="text-gray-600">
							Please complete your volunteer registration to view your profile.
						</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-4 px-4">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center space-x-3 mb-4">
							<div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
								<span className="text-white font-bold text-lg">Y</span>
							</div>
							<h1 className="text-3xl font-bold text-gray-900">
								YMCA Volunteer Profile
							</h1>
						</div>
						<p className="text-gray-600">
							Thank you for your commitment to strengthening our community
						</p>
					</div>

					{/* Profile Card */}
					<div className="bg-white rounded-xl shadow-xl overflow-hidden">
						{/* Profile Header */}
						<div className="bg-gradient-to-r from-red-600 to-blue-600 px-8 py-6">
							<div className="flex items-center space-x-4">
								<div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
									<img
										src="/default-avatar.png"
										alt="Profile"
										className="w-14 h-14 rounded-full object-cover"
									/>
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">
										{profile.name}
									</h2>
									<p className="text-red-100">YMCA Volunteer</p>
								</div>
							</div>
						</div>

						{/* Profile Content */}
						<div className="p-8">
							<div className="grid md:grid-cols-2 gap-8">
								{/* Contact Information */}
								<div className="space-y-6">
									<h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
										Contact Information
									</h3>
									<div className="space-y-4">
										<div className="flex items-center space-x-3">
											<div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
												<svg
													className="w-5 h-5 text-red-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
													/>
												</svg>
											</div>
											<div>
												<p className="text-sm text-gray-600">Email</p>
												<p className="font-medium text-gray-900">
													{profile.email}
												</p>
											</div>
										</div>
										<div className="flex items-center space-x-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<svg
													className="w-5 h-5 text-blue-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
													/>
												</svg>
											</div>
											<div>
												<p className="text-sm text-gray-600">Phone</p>
												<p className="font-medium text-gray-900">
													{profile.phone}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Volunteer Preferences */}
								<div className="space-y-6">
									<h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
										Volunteer Preferences
									</h3>
									<div>
										<p className="text-sm text-gray-600 mb-2">
											Opportunity Type
										</p>
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
											{profile.opportunityType}
										</span>
									</div>
								</div>
							</div>

							{/* Locations & Areas */}
							<div className="mt-8 grid md:grid-cols-2 gap-8">
								{/* YMCA Locations */}
								<div>
									<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
										<svg
											className="w-5 h-5 text-red-600 mr-2"
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
										Preferred YMCA Locations
									</h3>
									<div className="space-y-2">
										{profile.locations.map((loc) => (
											<div
												key={loc}
												className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg"
											>
												<div className="w-2 h-2 bg-red-600 rounded-full"></div>
												<span className="text-gray-900">{loc}</span>
											</div>
										))}
									</div>
								</div>

								{/* Areas of Interest */}
								<div>
									<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
										<svg
											className="w-5 h-5 text-blue-600 mr-2"
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
										Areas of Interest
									</h3>
									<div className="space-y-2">
										{profile.areas.map((area) => (
											<div
												key={area}
												className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
											>
												<div className="w-2 h-2 bg-blue-600 rounded-full"></div>
												<span className="text-gray-900">{area}</span>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Footer */}
							<div className="mt-8 pt-6 border-t border-gray-200 text-center">
								<p className="text-gray-600 mb-2">
									Ready to make a difference in your community?
								</p>
								<button className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
									Find Volunteer Opportunities
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
