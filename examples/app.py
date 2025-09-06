from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify({
        'message': 'Hello from Flask!',
        'status': 'success'
    })

@app.route('/api/data')
def get_data():
    return jsonify({
        'data': [
            {'id': 1, 'name': 'Item 1', 'description': 'First example item'},
            {'id': 2, 'name': 'Item 2', 'description': 'Second example item'},
            {'id': 3, 'name': 'Item 3', 'description': 'Third example item'}
        ],
        'total': 3,
        'status': 'success'
    })

@app.route('/api/user/<int:user_id>')
def get_user(user_id):
    return jsonify({
        'user': {
            'id': user_id,
            'name': f'User {user_id}',
            'email': f'user{user_id}@example.com'
        },
        'status': 'success'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)