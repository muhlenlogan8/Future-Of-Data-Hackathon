import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Filters from "../components/Filters";

const Projects = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [keyword, setKeyword] = useState("");
    const [branch, setBranch] = useState("");
    const [category, setCategory] = useState("");
    const [after, setAfter] = useState("");
    const [before, setBefore] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Fetch data from Flask API
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/api/projects")
            .then((res) => res.json())
            .then((data) => {
                // Map API data to ProjectCard format
                const mapped = data.map((item) => ({
                    id: item["Project ID"],
                    title: item["Project Name"],
                    image: "/default.jpg", // Use a default image or map if you have one
                    branch: item["Branch Name"],
                    description: item["Description"] || "",
                    howToRegister: item["Contact Details"] || "",
                    prerequisites: [], // If you have prerequisites, map them here
                    commitment: item["Goals"] || "",
                    category: item["Tags"] || "",
                    howYouCanHelp: item["Tags"] ? item["Tags"].split(",").map(t => t.trim()) : [],
                    date: item["Publish Start Date"] || "",
                }));
                setOpportunities(mapped);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load opportunities");
                setLoading(false);
            });
    }, []);

    const clearFilters = () => {
        setKeyword("");
        setBranch("");
        setCategory("");
        setAfter("");
        setBefore("");
    };

    const filtered = opportunities.filter((opp) => {
        const matchesKeyword =
            !keyword ||
            opp.title?.toLowerCase().includes(keyword.toLowerCase()) ||
            opp.description?.toLowerCase().includes(keyword.toLowerCase());
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

    const BRANCHES = Array.from(new Set(opportunities.map((opp) => opp.branch).filter(Boolean)));
    const CATEGORIES = Array.from(new Set(opportunities.map((opp) => opp.category).filter(Boolean)));

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
                <div className="px-4 pt-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Available Opportunities
                                </h2>
                                <p className="text-gray-600">
                                    {loading
                                        ? "Loading..."
                                        : error
                                        ? error
                                        : `${filtered.length} opportunities found`}
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

                        {loading ? (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <p>Loading...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <p>{error}</p>
                            </div>
                        ) : filtered.length === 0 ? (
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