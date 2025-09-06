import React, { useState } from "react";

const Opportunities = ({ user }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const opportunities = [
    {
      id: 1,
      title: "Youth Basketball Coach Assistant",
      category: "Youth Development",
      description: "Help coach youth basketball teams, focusing on skill development and teamwork. Perfect for those passionate about sports and youth mentorship.",
      requirements: "Basic basketball knowledge, patience with children",
      timeCommitment: "3 hours/week",
      schedule: "Tuesdays & Thursdays 4-5:30 PM",
      location: "YMCA Main Gymnasium",
      impact: "Directly mentors 15-20 youth aged 8-12",
      skills: ["Sports", "Youth Mentorship", "Team Building"],
      urgency: "high",
      matchScore: calculateMatchScore("Youth Development", ["Sports", "Youth Mentorship"]),
    },
    {
      id: 2,
      title: "Senior Fitness Program Support",
      category: "Healthy Living",
      description: "Assist seniors with exercise equipment, provide encouragement, and help create a welcoming environment for healthy aging.",
      requirements: "Friendly personality, basic understanding of senior fitness needs",
      timeCommitment: "2 hours/week",
      schedule: "Monday & Wednesday 10 AM - 12 PM",
      location: "YMCA Fitness Center",
      impact: "Supports 25-30 seniors in maintaining health and social connections",
      skills: ["Fitness", "Senior Care", "Encouragement"],
      urgency: "medium",
      matchScore: calculateMatchScore("Healthy Living", ["Fitness", "Senior Care"]),
    },
    {
      id: 3,
      title: "Community Food Drive Coordinator",
      category: "Social Responsibility",
      description: "Organize and coordinate monthly food drives, manage donations, and connect with local food banks to serve families in need.",
      requirements: "Organizational skills, reliable transportation",
      timeCommitment: "4 hours/month",
      schedule: "Flexible, mostly weekends",
      location: "Various community locations",
      impact: "Helps feed 50+ families each month",
      skills: ["Organization", "Community Outreach", "Logistics"],
      urgency: "high",
      matchScore: calculateMatchScore("Social Responsibility", ["Organization", "Community Outreach"]),
    },
    {
      id: 4,
      title: "After-School Homework Helper",
      category: "Education Support",
      description: "Support elementary school children with homework and reading activities in a safe, encouraging environment.",
      requirements: "High school diploma or equivalent, patience with children",
      timeCommitment: "2-3 hours/week",
      schedule: "Monday-Friday 3-6 PM (flexible)",
      location: "YMCA Learning Center",
      impact: "Improves academic outcomes for 20+ children",
      skills: ["Education", "Tutoring", "Child Care"],
      urgency: "medium",
      matchScore: calculateMatchScore("Education Support", ["Education", "Tutoring"]),
    },
    {
      id: 5,
      title: "Healthy Cooking Workshop Leader",
      category: "Healthy Living",
      description: "Teach families how to prepare nutritious, budget-friendly meals while building community connections around food and wellness.",
      requirements: "Cooking experience, nutrition knowledge helpful but not required",
      timeCommitment: "3 hours/month",
      schedule: "Second Saturday of each month 2-5 PM",
      location: "YMCA Community Kitchen",
      impact: "Educates 15-20 families on healthy eating habits",
      skills: ["Cooking", "Teaching", "Nutrition"],
      urgency: "low",
      matchScore: calculateMatchScore("Healthy Living", ["Cooking", "Teaching"]),
    },
    {
      id: 6,
      title: "Teen Leadership Program Mentor",
      category: "Youth Development",
      description: "Guide teenagers in developing leadership skills, community awareness, and personal growth through structured activities and discussions.",
      requirements: "Experience working with teens, strong communication skills",
      timeCommitment: "2 hours/week",
      schedule: "Saturdays 10 AM - 12 PM",
      location: "YMCA Teen Center",
      impact: "Mentors 12-15 teens in developing life skills",
      skills: ["Youth Mentorship", "Leadership", "Communication"],
      urgency: "medium",
      matchScore: calculateMatchScore("Youth Development", ["Youth Mentorship", "Leadership"]),
    }
  ];

  function calculateMatchScore(category, skillsRequired) {
    let score = 0;
    
    if (user.interests.includes(category)) score += 40;
    
    const userSkillsLower = user.skills.toLowerCase();
    skillsRequired.forEach(skill => {
      if (userSkillsLower.includes(skill.toLowerCase())) score += 20;
    });
    
    if (user.experience.toLowerCase().includes(category.toLowerCase())) score += 20;
    
    return Math.min(score, 100);
  }

  const filteredOpportunities = opportunities
    .filter(opp => {
      if (filter === "all") return true;
      if (filter === "matched") return opp.matchScore >= 60;
      if (filter === "urgent") return opp.urgency === "high";
      return opp.category === filter;
    })
    .filter(opp => 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.matchScore - a.matchScore);

  const categories = [...new Set(opportunities.map(opp => opp.category))];

  const handleApply = () => {
    alert("Application submitted! You'll receive confirmation and next steps via email.");
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMatchColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Volunteer Opportunities</h1>
        <p className="text-gray-600">
          Find meaningful ways to contribute to your community and build belonging for all
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-48">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Opportunities</option>
              <option value="matched">Best Matches</option>
              <option value="urgent">Urgent Need</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredOpportunities.length} opportunities
          {filter === "matched" && " that match your interests and skills"}
          {filter === "urgent" && " with urgent volunteer needs"}
        </div>
      </div>

      <div className="space-y-6">
        {filteredOpportunities.map(opportunity => (
          <div key={opportunity.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{opportunity.title}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(opportunity.urgency)}`}>
                    {opportunity.urgency === "high" ? "Urgent" : opportunity.urgency === "medium" ? "Moderate" : "Low"} Need
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="font-medium text-red-600">{opportunity.category}</span>
                  <span>📍 {opportunity.location}</span>
                  <span>⏰ {opportunity.timeCommitment}</span>
                </div>
              </div>
              <div className="text-right mt-2 lg:mt-0">
                <div className={`text-2xl font-bold ${getMatchColor(opportunity.matchScore)}`}>
                  {opportunity.matchScore}%
                </div>
                <div className="text-xs text-gray-500">Match Score</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{opportunity.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
                <p className="text-sm text-gray-600">{opportunity.requirements}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Schedule:</h4>
                <p className="text-sm text-gray-600">{opportunity.schedule}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Community Impact:</h4>
              <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{opportunity.impact}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Relevant Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {opportunity.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleApply}
                className="flex-1 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Apply to Volunteer
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </button>
              <button className="sm:w-auto border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                ❤️ Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No opportunities found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or filters to find more volunteer opportunities.</p>
          <button 
            onClick={() => {setFilter("all"); setSearchTerm("");}}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Show All Opportunities
          </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white mt-8">
        <h2 className="text-xl font-bold mb-2">Can't Find the Right Opportunity?</h2>
        <p className="mb-4 opacity-90">
          We're always looking for new ways to serve our community. Contact our Volunteer Coordinator 
          to discuss custom opportunities that match your unique skills and interests.
        </p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors">
          Contact Coordinator
        </button>
      </div>
    </div>
  );
};

export default Opportunities;