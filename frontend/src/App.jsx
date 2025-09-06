import React from "react";

const App = () => {
	return (
		<div className="min-h-screen bg-white">
			<header className="bg-ymca-blue-500 text-white shadow-lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div className="flex items-center">
							<h1 className="text-3xl font-bold">YMCA</h1>
							<span className="ml-3 text-xl">Volunteer Portal</span>
						</div>
						<nav className="hidden md:flex space-x-8">
							<a href="#opportunities" className="hover:text-ymca-blue-200 transition-colors">Opportunities</a>
							<a href="#about" className="hover:text-ymca-blue-200 transition-colors">About</a>
							<a href="#contact" className="hover:text-ymca-blue-200 transition-colors">Contact</a>
						</nav>
					</div>
				</div>
			</header>

			<main>
				<section className="bg-gradient-to-r from-ymca-blue-500 to-ymca-teal-500 text-white py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-5xl font-bold mb-6">Make a Difference Today</h2>
						<p className="text-xl mb-8 max-w-3xl mx-auto">
							Join thousands of volunteers who are strengthening communities and changing lives through the YMCA. 
							Find meaningful volunteer opportunities that match your passion and schedule.
						</p>
						<div className="space-x-4">
							<button className="bg-white text-ymca-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-ymca-gray-100 transition-colors">
								Find Opportunities
							</button>
							<button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-ymca-blue-600 transition-colors">
								Learn More
							</button>
						</div>
					</div>
				</section>

				<section id="opportunities" className="py-16 bg-ymca-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h3 className="text-4xl font-bold text-ymca-gray-900 mb-4">Volunteer Opportunities</h3>
							<p className="text-lg text-ymca-gray-600 max-w-2xl mx-auto">
								Discover ways to get involved and make an impact in your community
							</p>
						</div>
						
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
								<div className="w-16 h-16 bg-ymca-purple-500 rounded-full flex items-center justify-center mb-6">
									<span className="text-white text-2xl font-bold">🏊</span>
								</div>
								<h4 className="text-2xl font-bold text-ymca-gray-900 mb-4">Aquatics Program</h4>
								<p className="text-ymca-gray-600 mb-6">
									Help with swim lessons, water safety programs, and pool supervision. Make a splash in young lives!
								</p>
								<button className="text-ymca-blue-600 font-semibold hover:text-ymca-blue-800 transition-colors">
									Learn More →
								</button>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
								<div className="w-16 h-16 bg-ymca-teal-500 rounded-full flex items-center justify-center mb-6">
									<span className="text-white text-2xl font-bold">👨‍👩‍👧‍👦</span>
								</div>
								<h4 className="text-2xl font-bold text-ymca-gray-900 mb-4">Youth Programs</h4>
								<p className="text-ymca-gray-600 mb-6">
									Mentor kids and teens through after-school programs, camps, and leadership development activities.
								</p>
								<button className="text-ymca-blue-600 font-semibold hover:text-ymca-blue-800 transition-colors">
									Learn More →
								</button>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
								<div className="w-16 h-16 bg-ymca-orange-500 rounded-full flex items-center justify-center mb-6">
									<span className="text-white text-2xl font-bold">🏃</span>
								</div>
								<h4 className="text-2xl font-bold text-ymca-gray-900 mb-4">Fitness & Wellness</h4>
								<p className="text-ymca-gray-600 mb-6">
									Support fitness classes, wellness programs, and help community members achieve their health goals.
								</p>
								<button className="text-ymca-blue-600 font-semibold hover:text-ymca-blue-800 transition-colors">
									Learn More →
								</button>
							</div>
						</div>
					</div>
				</section>

				<section className="py-16 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div>
								<h3 className="text-4xl font-bold text-ymca-gray-900 mb-6">Why Volunteer with the YMCA?</h3>
								<div className="space-y-4">
									<div className="flex items-start">
										<div className="w-6 h-6 bg-ymca-blue-500 rounded-full flex items-center justify-center mt-1 mr-4">
											<span className="text-white text-sm font-bold">✓</span>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-ymca-gray-900 mb-1">Make Real Impact</h4>
											<p className="text-ymca-gray-600">Directly contribute to strengthening your community and changing lives</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-6 h-6 bg-ymca-blue-500 rounded-full flex items-center justify-center mt-1 mr-4">
											<span className="text-white text-sm font-bold">✓</span>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-ymca-gray-900 mb-1">Flexible Scheduling</h4>
											<p className="text-ymca-gray-600">Choose opportunities that fit your availability and lifestyle</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-6 h-6 bg-ymca-blue-500 rounded-full flex items-center justify-center mt-1 mr-4">
											<span className="text-white text-sm font-bold">✓</span>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-ymca-gray-900 mb-1">Build Community</h4>
											<p className="text-ymca-gray-600">Connect with like-minded people and build lasting friendships</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-ymca-gray-50 p-8 rounded-xl">
								<div className="text-center">
									<div className="text-4xl font-bold text-ymca-blue-600 mb-2">2,500+</div>
									<p className="text-ymca-gray-600 mb-6">Active volunteers making a difference</p>
									<div className="text-4xl font-bold text-ymca-teal-600 mb-2">50,000+</div>
									<p className="text-ymca-gray-600 mb-6">Hours volunteered last year</p>
									<div className="text-4xl font-bold text-ymca-purple-600 mb-2">15+</div>
									<p className="text-ymca-gray-600">Different program areas</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="about" className="py-16 bg-ymca-blue-600 text-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Take the first step towards making a meaningful impact in your community. 
							Browse available opportunities and find the perfect volunteer role for you.
						</p>
						<button className="bg-white text-ymca-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-ymca-gray-100 transition-colors">
							Browse Opportunities
						</button>
					</div>
				</section>
			</main>

			<footer id="contact" className="bg-ymca-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-3 gap-8">
						<div>
							<h4 className="text-2xl font-bold mb-4">YMCA Volunteer Portal</h4>
							<p className="text-ymca-gray-300 mb-4">
								Strengthening communities through volunteer service and youth development.
							</p>
						</div>
						<div>
							<h5 className="text-lg font-semibold mb-4">Quick Links</h5>
							<ul className="space-y-2">
								<li><a href="#opportunities" className="text-ymca-gray-300 hover:text-white transition-colors">Volunteer Opportunities</a></li>
								<li><a href="#" className="text-ymca-gray-300 hover:text-white transition-colors">Training Resources</a></li>
								<li><a href="#" className="text-ymca-gray-300 hover:text-white transition-colors">Volunteer Handbook</a></li>
							</ul>
						</div>
						<div>
							<h5 className="text-lg font-semibold mb-4">Contact Us</h5>
							<p className="text-ymca-gray-300 mb-2">📧 volunteer@ymca.org</p>
							<p className="text-ymca-gray-300 mb-2">📞 (555) 123-YMCA</p>
							<p className="text-ymca-gray-300">📍 123 Community Way, Your City</p>
						</div>
					</div>
					<div className="border-t border-ymca-gray-700 mt-8 pt-8 text-center">
						<p className="text-ymca-gray-400">© 2024 YMCA. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default App;
