import React, { useState } from "react";

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });

  const milestones = [
    { hours: 25, title: "Community Helper", description: "Your first 25 hours of service", icon: "🌟", achieved: user.volunteerHours >= 25 },
    { hours: 50, title: "Dedicated Volunteer", description: "50 hours of making a difference", icon: "🏆", achieved: user.volunteerHours >= 50 },
    { hours: 100, title: "Community Champion", description: "100 hours of building belonging", icon: "🎖️", achieved: user.volunteerHours >= 100 },
    { hours: 250, title: "Impact Leader", description: "250 hours of transforming lives", icon: "👑", achieved: user.volunteerHours >= 250 },
    { hours: 500, title: "Community Pillar", description: "500 hours of extraordinary service", icon: "💎", achieved: user.volunteerHours >= 500 },
    { hours: 1000, title: "Legacy Builder", description: "1000+ hours of lasting impact", icon: "🌈", achieved: user.volunteerHours >= 1000 },
  ];

  const volunteerHistory = [
    { date: "2025-09-05", program: "Youth Basketball Coaching", hours: 3, location: "Main Gymnasium", impact: "Coached 18 youth in teamwork and sportsmanship" },
    { date: "2025-09-03", program: "Community Food Drive", hours: 4, location: "Community Center", impact: "Helped distribute food to 35 families" },
    { date: "2025-08-30", program: "Senior Fitness Program", hours: 2, location: "Fitness Center", impact: "Assisted 12 seniors with exercise routines" },
    { date: "2025-08-28", program: "After-School Tutoring", hours: 2.5, location: "Learning Center", impact: "Helped 8 children with homework and reading" },
    { date: "2025-08-25", program: "Community Garden", hours: 3, location: "YMCA Garden", impact: "Maintained garden that provides fresh produce to food bank" },
    { date: "2025-08-22", program: "Teen Leadership Workshop", hours: 2, location: "Teen Center", impact: "Mentored 10 teens in leadership development" },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...user });
  };

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getNextMilestone = () => {
    return milestones.find(milestone => !milestone.achieved);
  };

  const interestOptions = [
    "Youth Development", "Healthy Living", "Social Responsibility", "Childcare",
    "Fitness Programs", "Senior Programs", "Community Events", "Education Support",
    "Food Services", "Administrative Support"
  ];

  const availabilityOptions = [
    "Weekday Mornings", "Weekday Afternoons", "Weekday Evenings",
    "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}'s Profile</h1>
            <p className="text-gray-600">YMCA Volunteer since {formatDate(user.joinDate)}</p>
          </div>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={editForm.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Areas of Interest</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map(interest => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={interest}
                      checked={editForm.interests.includes(interest)}
                      onChange={(e) => handleCheckboxChange(e, 'interests')}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availabilityOptions.map(time => (
                  <label key={time} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={time}
                      checked={editForm.availability.includes(time)}
                      onChange={(e) => handleCheckboxChange(e, 'availability')}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills & Talents</label>
              <textarea
                name="skills"
                value={editForm.skills}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Contact Information</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                {user.age && <p className="text-gray-600">Age: {user.age}</p>}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Areas of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span key={interest} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {user.availability.map(time => (
                    <span key={time} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              {user.skills && (
                <div>
                  <h3 className="font-semibold text-gray-800">Skills & Talents</h3>
                  <p className="text-gray-600">{user.skills}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Milestone Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map(milestone => (
            <div
              key={milestone.hours}
              className={`p-4 rounded-lg border-2 transition-all ${
                milestone.achieved
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`text-2xl ${milestone.achieved ? "" : "grayscale opacity-50"}`}>
                  {milestone.icon}
                </div>
                {milestone.achieved ? (
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Earned
                  </div>
                ) : (
                  <div className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
                    {milestone.hours}h
                  </div>
                )}
              </div>
              <h3 className={`font-semibold mb-1 ${milestone.achieved ? "text-green-800" : "text-gray-600"}`}>
                {milestone.title}
              </h3>
              <p className={`text-sm ${milestone.achieved ? "text-green-700" : "text-gray-500"}`}>
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        {getNextMilestone() && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-100 to-red-50 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Next Milestone</h3>
            <p className="text-red-700">
              You're {getNextMilestone().hours - user.volunteerHours} hours away from earning 
              "{getNextMilestone().title}" - keep up the amazing work!
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer Activity History</h2>
        <div className="space-y-4">
          {volunteerHistory.map((activity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.program}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{formatDate(activity.date)}</span>
                    <span>📍 {activity.location}</span>
                    <span className="font-medium text-red-600">{activity.hours} hours</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg mt-3">
                <strong>Impact:</strong> {activity.impact}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <div className="text-lg font-semibold text-gray-800">
            Total Volunteer Hours: <span className="text-red-600">{user.volunteerHours}</span>
          </div>
          <p className="text-gray-600 mt-2">
            Thank you for your dedication to building belonging and equity in our community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;