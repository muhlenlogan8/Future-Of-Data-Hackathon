import React, { useState } from 'react';

const YMCAVolunteerBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const opportunities = [
    {
      id: 1,
      title: 'Youth Swim Instructor',
      category: 'aquatics',
      location: 'Downtown YMCA',
      timeCommitment: '6 hours/week',
      description: 'Teach swimming lessons to children ages 6-12. Must be comfortable in water and have patience with young learners.',
      requirements: ['Strong swimming skills', 'CPR certified (or willing to get certified)', 'Experience with children preferred'],
      posted: '2 days ago',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Senior Fitness Program Assistant',
      category: 'fitness',
      location: 'North Branch YMCA',
      timeCommitment: '4 hours/week',
      description: 'Support fitness programs designed for seniors aged 55+. Help with equipment setup, participant check-in, and program coordination.',
      requirements: ['Friendly and patient demeanor', 'Basic fitness knowledge helpful', 'Available weekday mornings'],
      posted: '5 days ago',
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'After-School Program Mentor',
      category: 'youth',
      location: 'East Side YMCA',
      timeCommitment: '8 hours/week',
      description: 'Mentor elementary school children in after-school programs. Help with homework, lead activities, and provide positive role modeling.',
      requirements: ['Background check required', 'Experience with children', 'Reliable transportation'],
      posted: '1 week ago',
      urgency: 'high'
    },
    {
      id: 4,
      title: 'Community Garden Coordinator',
      category: 'community',
      location: 'Westside YMCA',
      timeCommitment: '5 hours/week',
      description: 'Coordinate community garden activities including planting, maintenance, and harvest events. Perfect for those with green thumbs!',
      requirements: ['Gardening experience preferred', 'Outdoor work comfortable', 'Weekend availability'],
      posted: '3 days ago',
      urgency: 'low'
    },
    {
      id: 5,
      title: 'Teen Leadership Program Facilitator',
      category: 'youth',
      location: 'Central YMCA',
      timeCommitment: '6 hours/week',
      description: 'Facilitate leadership development programs for teenagers. Guide discussions, organize community service projects, and support youth development.',
      requirements: ['Leadership experience', 'Strong communication skills', 'Evening availability'],
      posted: '4 days ago',
      urgency: 'medium'
    },
    {
      id: 6,
      title: 'Aqua Aerobics Assistant',
      category: 'aquatics',
      location: 'South Branch YMCA',
      timeCommitment: '3 hours/week',
      description: 'Assist with aqua aerobics classes for all ages. Help participants get comfortable in water and provide encouragement during exercises.',
      requirements: ['Water safety knowledge', 'Encouraging personality', 'Morning availability preferred'],
      posted: '6 days ago',
      urgency: 'low'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Opportunities', count: opportunities.length },
    { value: 'aquatics', label: 'Aquatics', count: opportunities.filter(o => o.category === 'aquatics').length },
    { value: 'fitness', label: 'Fitness', count: opportunities.filter(o => o.category === 'fitness').length },
    { value: 'youth', label: 'Youth Programs', count: opportunities.filter(o => o.category === 'youth').length },
    { value: 'community', label: 'Community', count: opportunities.filter(o => o.category === 'community').length }
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory;
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getUrgencyBadgeColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">YMCA Volunteer Opportunities</h1>
                <p className="text-gray-600">Make a difference in your community</p>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Post Opportunity
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Opportunities</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.label}</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredOpportunities.length} Volunteer Opportunities
              </h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>Sort by: Most Recent</option>
                <option>Sort by: Urgency</option>
                <option>Sort by: Time Commitment</option>
              </select>
            </div>

            {/* Opportunity Cards */}
            <div className="space-y-6">
              {filteredOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyBadgeColor(opportunity.urgency)}`}>
                            {opportunity.urgency} priority
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {opportunity.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {opportunity.timeCommitment}
                          </span>
                          <span className="text-gray-500">{opportunity.posted}</span>
                        </div>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0">
                        Apply Now
                      </button>
                    </div>

                    <p className="text-gray-700 mb-4">{opportunity.description}</p>

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {opportunity.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredOpportunities.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No opportunities found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YMCAVolunteerBoard;