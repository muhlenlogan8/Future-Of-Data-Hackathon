import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateDaysVolunteering = (joinDate) => {
    const start = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getNextMilestone = (hours) => {
    const milestones = [25, 50, 100, 250, 500, 1000];
    return milestones.find(milestone => milestone > hours) || milestones[milestones.length - 1];
  };

  const getMilestoneProgress = (hours) => {
    const nextMilestone = getNextMilestone(hours);
    const previousMilestone = nextMilestone === 25 ? 0 : 
      [0, 25, 50, 100, 250, 500].find((m, i, arr) => arr[i + 1] === nextMilestone) || 0;
    
    const progress = ((hours - previousMilestone) / (nextMilestone - previousMilestone)) * 100;
    return Math.min(progress, 100);
  };

  const recentActivities = [
    { date: "2025-09-05", activity: "Youth Basketball Coaching", hours: 3 },
    { date: "2025-09-03", activity: "Community Food Drive", hours: 4 },
    { date: "2025-08-30", activity: "Senior Fitness Program", hours: 2 },
  ];

  const upcomingOpportunities = [
    { date: "2025-09-08", title: "Back-to-School Supply Drive", category: "Community Events" },
    { date: "2025-09-10", title: "Youth Swim Lesson Assistant", category: "Youth Development" },
    { date: "2025-09-12", title: "Healthy Cooking Workshop", category: "Healthy Living" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          Thank you for being part of our volunteer community for {calculateDaysVolunteering(user.joinDate)} days
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Volunteer Hours</h2>
            <div className="bg-red-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{user.volunteerHours}</div>
          <div className="text-sm text-gray-500">Total hours contributed</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Programs Joined</h2>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{user.completedPrograms.length}</div>
          <div className="text-sm text-gray-500">Active volunteer programs</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Impact Level</h2>
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {user.volunteerHours >= 100 ? "High" : user.volunteerHours >= 25 ? "Growing" : "Starting"}
          </div>
          <div className="text-sm text-gray-500">Community impact</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Milestone Progress</h2>
            <span className="text-sm text-gray-500">Next: {getNextMilestone(user.volunteerHours)} hours</span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{user.volunteerHours} hours</span>
              <span>{getNextMilestone(user.volunteerHours)} hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getMilestoneProgress(user.volunteerHours)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Keep up the great work! You're {getNextMilestone(user.volunteerHours) - user.volunteerHours} hours away from your next milestone.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-800">{activity.activity}</div>
                  <div className="text-sm text-gray-500">{formatDate(activity.date)}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-red-600">{activity.hours}h</div>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/profile" 
            className="inline-block mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View all activity →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recommended Opportunities</h2>
          <Link 
            to="/opportunities" 
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingOpportunities.map((opportunity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
              <div className="text-sm text-gray-500 mb-1">{formatDate(opportunity.date)}</div>
              <div className="font-medium text-gray-800 mb-2">{opportunity.title}</div>
              <div className="text-sm text-red-600 mb-3">{opportunity.category}</div>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Building Belonging & Equity</h2>
        <p className="mb-4 opacity-90">
          Your volunteer work helps create inclusive communities where everyone can thrive. 
          Thank you for making a difference in the lives of youth, families, and seniors in our community.
        </p>
        <div className="flex flex-wrap gap-2">
          {user.interests.slice(0, 3).map(interest => (
            <span key={interest} className="bg-red-500 bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;