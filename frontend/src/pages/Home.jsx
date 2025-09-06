import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const handleReturningUser = () => {
		navigate("/signin?role=volunteer");
	};

	const handleNewUser = () => {
		navigate("/form");
	};

	const handleAdmin = () => {
		navigate("/signin?role=admin");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
			<div className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
				<div className="text-center mb-10">
					<img src="/ymca.svg" alt="YMCA Logo" className="h-20 mx-auto mb-6" />
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
						Welcome to YMCA Volunteering!
					</h1>
					<p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
						Your journey starts here!
					</p>
				</div>
				<div className="bg-white/90 rounded-xl shadow-lg px-8 py-8 max-w-md w-full flex flex-col items-center">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Are you a returning Volunteer?
					</h2>
					<button
						onClick={handleReturningUser}
						className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors w-full mb-2"
					>
						Returning Volunteer
					</button>
					<div className="flex items-center w-full mb-2">
						<div className="flex-grow border-t border-gray-200"></div>
						<span className="mx-3 text-gray-400 font-medium">or</span>
						<div className="flex-grow border-t border-gray-200"></div>
					</div>
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Are you a new Volunteer?
					</h2>
					<button
						onClick={handleNewUser}
						className="bg-white border border-blue-600 text-blue-600 py-2 px-6 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors w-full"
					>
						New Volunteer
					</button>
				</div>
				<div className="text-center mt-2">
					<button
						onClick={handleAdmin}
						className="text-indigo-600 underline text-md hover:text-indigo-800 transition-colors opacity-80"
					>
						Admin Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
