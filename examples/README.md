# Flask + React Integration Example

This example demonstrates how to create a Flask backend API that can be called from a React frontend.

## Files

- `app.py` - Simple Flask backend with REST API endpoints
- `requirements.txt` - Python dependencies for the Flask app
- `../frontend/src/examples/FlaskIntegration.jsx` - React component that calls the Flask API

## Setup Instructions

### 1. Start the Flask Backend

```bash
cd examples
pip install -r requirements.txt
python app.py
```

The Flask server will start on `http://localhost:5000`

### 2. Start the React Frontend

From the project root:

```bash
cd frontend
npm install
npm run dev
```

### 3. View the Integration

Navigate to the FlaskIntegration component in your React app to see the integration in action.

## API Endpoints

The Flask backend provides these endpoints:

- `GET /` - Returns a simple hello message
- `GET /api/data` - Returns a list of sample data
- `GET /api/user/<id>` - Returns user information for the given ID

## Features Demonstrated

- CORS configuration for cross-origin requests
- JSON API responses from Flask
- Async fetch requests from React
- Error handling in both frontend and backend
- Loading states in React components
- Dynamic API calls with parameters