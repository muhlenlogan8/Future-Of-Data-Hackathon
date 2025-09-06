import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">YMCA</div>
            <div className="text-lg">Volunteer Portal</div>
          </div>

          {user && (
            <nav className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/dashboard"
                    ? "bg-red-700"
                    : "hover:bg-red-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/opportunities"
                className={`px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/opportunities"
                    ? "bg-red-700"
                    : "hover:bg-red-700"
                }`}
              >
                Opportunities
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/profile"
                    ? "bg-red-700"
                    : "hover:bg-red-700"
                }`}
              >
                Profile
              </Link>
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-red-500">
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-red-700 hover:bg-red-800 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;