import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(location.search);
	const role = params.get("role") || "volunteer";

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/projects");
	};

	return (
		<>
			<div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white overflow-hidden">
				<div className="flex flex-1 items-center justify-center">
					<div className="max-w-md w-full p-8 border border-gray-200 rounded-lg shadow bg-white flex flex-col items-center">
						<img
							src="/ymca.svg"
							alt="FamilyTree Logo"
							className="w-24 h-24 mx-auto mb-2 rounded"
						/>
						<form className="w-full" onSubmit={handleSubmit}>
							<p className="text-center text-2xl text-gray-800 mb-4">
								{" "}
								{role.charAt(0).toUpperCase() + role.slice(1)} Sign in
							</p>
							<hr className="my-4 border-t border-gray-200" />
							<div className="mb-4">
								<label
									htmlFor="username"
									className="block mb-1 font-medium text-gray-700"
								>
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-6">
								<label
									htmlFor="password"
									className="block mb-1 font-medium text-gray-700"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<button
								type="submit"
								className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
							>
								Sign In
							</button>
						</form>
					</div>
				</div>
				<div className="text-center mb-4">
					<button
						onClick={() => (window.location.href = "/")}
						className="text-indigo-600 underline text-md hover:text-indigo-800 transition-colors opacity-80"
					>
						&#8592; Back to Home
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;
