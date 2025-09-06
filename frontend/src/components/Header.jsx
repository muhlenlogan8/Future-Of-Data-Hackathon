import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	const profile =
		JSON.parse(localStorage.getItem("ymcaUserProfile") || "null") || {};
	const name = profile.name || "YMCA Volunteer";
	const email = profile.email || "";
	const profilePic = profile.avatar_url || "";

	// Close dropdown on outside click
	useEffect(() => {
		const handleClick = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false);
			}
		};
		if (dropdownOpen) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [dropdownOpen]);

	const handleSignOut = () => {
		localStorage.removeItem("ymcaUserProfile");
		navigate("/");
	};

	const isProjectsPage = location.pathname === "/projects";
	const isProfilePage = location.pathname === "/profile";
	const isFormPage = location.pathname === "/form";

	return (
		<header className="w-full top-0 left-0 z-30">
			<div
				className={`flex items-center px-8 py-4 ${
					isFormPage ? "justify-center" : "justify-between"
				}`}
				style={{
					background: "linear-gradient(90deg, #6d2992 0%, #b32e87 100%)",
				}}
			>
				{/* Logo */}
				<button
					onClick={() => navigate("/")}
					className={`flex items-center space-x-4 hover:scale-105 transition-all duration-200 ${
						isFormPage ? "mx-auto" : ""
					}`}
				>
					<img src="/ymca.svg" alt="YMCA Logo" className="h-10 w-auto" />
					<span
						className="text-white font-extrabold text-xl tracking-wide uppercase text-left"
						style={{ letterSpacing: "0.03em", display: "block" }}
					>
						Ymca of <br /> Greater Cincinnati
					</span>
				</button>

				{/* User Profile (right side) */}
				{!isFormPage && (
					<div className="flex items-center gap-3 sm:gap-4">
						<div className="relative" ref={dropdownRef}>
							<div className="relative">
								<img
									src="/default-avatar.png"
									alt="Profile"
									className="h-9 w-9 sm:h-11 sm:w-11 rounded-full cursor-pointer border-2 border-white/50 hover:border-white transition-all shadow-md"
									onClick={() => setDropdownOpen(!dropdownOpen)}
								/>
							</div>
							{dropdownOpen && (
								<div className="absolute right-0 mt-3 w-50 sm:w-64 bg-white rounded-xl shadow-xl border border-purple-100 z-50 overflow-hidden animate-fadeIn">
									<div className="p-3 border-b border-gray-100">
										<p className="text-sm font-medium text-gray-900 truncate">
											{name}
										</p>
										<p className="text-xs text-gray-500 truncate mt-1">
											{email}
										</p>
									</div>
									{isProjectsPage && (
										<button
											className="w-full px-4 py-3 text-left text-purple-600 hover:bg-purple-50 font-medium flex items-center gap-2 transition-colors border-b border-gray-100"
											onClick={() => {
												setDropdownOpen(false);
												navigate("/profile");
											}}
										>
											<svg
												className="h-5 w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
											Profile
										</button>
									)}
									{isProfilePage && (
										<button
											className="w-full px-4 py-3 text-left text-purple-600 hover:bg-purple-50 font-medium flex items-center gap-2 transition-colors border-b border-gray-100"
											onClick={() => {
												setDropdownOpen(false);
												navigate("/projects");
											}}
										>
											<svg
												className="h-5 w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
												/>
											</svg>
											Projects
										</button>
									)}
									<button
										className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 font-medium flex items-center gap-2 transition-colors"
										onClick={handleSignOut}
									>
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Sign Out
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
