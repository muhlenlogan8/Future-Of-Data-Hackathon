import React, { useState, useEffect } from 'react';

const FlaskIntegration = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const FLASK_BASE_URL = 'http://localhost:5000';

  const fetchHello = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${FLASK_BASE_URL}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setMessage(result.message);
    } catch (err) {
      setError(`Failed to fetch hello message: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${FLASK_BASE_URL}/api/data`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${FLASK_BASE_URL}/api/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setUser(result.user);
    } catch (err) {
      setError(`Failed to fetch user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHello();
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">Flask + React Integration Example</h1>
            <p className="text-blue-100 mt-2">Demonstrating API calls from React to Flask backend</p>
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
                <div className="mt-2 text-sm">
                  Make sure the Flask backend is running on port 5000. Run: <code>python examples/app.py</code>
                </div>
              </div>
            )}

            {/* Hello Message Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Basic Hello Endpoint</h2>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">GET /</span>
                <button
                  onClick={fetchHello}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              {message && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-green-800">{message}</p>
                </div>
              )}
            </div>

            {/* Data List Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Data List Endpoint</h2>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">GET /api/data</span>
                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Refresh Data'}
                </button>
              </div>
              {data.length > 0 && (
                <div className="space-y-2">
                  {data.map(item => (
                    <div key={item.id} className="bg-gray-50 border rounded p-3">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <span className="text-xs text-gray-500">ID: {item.id}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Detail Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">User Detail Endpoint</h2>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">GET /api/user/&lt;id&gt;</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    min="1"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ID"
                  />
                  <button
                    onClick={fetchUser}
                    disabled={loading}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Fetch User'}
                  </button>
                </div>
              </div>
              {user && (
                <div className="bg-purple-50 border border-purple-200 rounded p-3">
                  <h3 className="font-medium text-purple-900">{user.name}</h3>
                  <p className="text-purple-700 text-sm">{user.email}</p>
                  <span className="text-xs text-purple-600">ID: {user.id}</span>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">How to Run This Example</h2>
              <ol className="list-decimal list-inside text-blue-800 text-sm space-y-1">
                <li>Start the Flask backend: <code className="bg-blue-100 px-2 py-1 rounded">cd examples && python app.py</code></li>
                <li>The Flask server will run on <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:5000</code></li>
                <li>Start the React frontend: <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code></li>
                <li>Navigate to this component to see the integration in action</li>
              </ol>
              <div className="mt-3 text-blue-700 text-sm">
                <p><strong>Note:</strong> Make sure Flask-CORS is installed: <code className="bg-blue-100 px-2 py-1 rounded">pip install flask flask-cors</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlaskIntegration;