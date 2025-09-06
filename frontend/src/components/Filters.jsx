import React from "react";

const Filters = ({
	keyword,
	setKeyword,
	branch,
	setBranch,
	category,
	setCategory,
	after,
	setAfter,
	before,
	setBefore,
	clearFilters,
	hasActiveFilters,
	branches,
	categories,
}) => {
	return (
		<div className="bg-white rounded-xl shadow p-6 mb-4">
			<div className="flex flex-wrap gap-5">
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Search Keywords
					</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						placeholder="Search opportunities..."
					/>
				</div>
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Branch
					</label>
					<select
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={branch}
						onChange={(e) => setBranch(e.target.value)}
					>
						<option value="">All Branches</option>
						{branches.map((b) => (
							<option key={b} value={b}>
								{b}
							</option>
						))}
					</select>
				</div>
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Category
					</label>
					<select
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="">All Categories</option>
						{categories.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Available From
					</label>
					<input
						type="date"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={after}
						onChange={(e) => setAfter(e.target.value)}
					/>
				</div>
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Available Until
					</label>
					<input
						type="date"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={before}
						onChange={(e) => setBefore(e.target.value)}
					/>
				</div>
			</div>
			{hasActiveFilters && (
				<div className="mt-4 flex justify-end">
					<button
						onClick={clearFilters}
						className="text-red-600 hover:text-red-700 text-sm font-medium"
					>
						Clear All
					</button>
				</div>
			)}
		</div>
	);
};

export default Filters;