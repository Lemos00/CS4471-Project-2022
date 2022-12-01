from flask import Blueprint, request, jsonify
from db import Database
from login import LoginServer

user_blueprint = Blueprint('user', __name__, url_prefix='/user')
db = Database()
login_server = LoginServer()

# GET /user/<user_id>
@user_blueprint.route('/<user_id>', methods=['GET'])
def get_user(user_id: str):
    data = db.get_user_by_id(user_id)

    # If the user doesn't exist, return a 404
    if data is None:
        return jsonify({
            'status': False,
            'message': 'User not found',
        }), 404
    
    # Otherwise, return the user data
    return jsonify(data), 200

# POST /user/register
@user_blueprint.route('/register', methods=['POST'])
def add_user():
    # Get the user data from the request
    data = request.get_json()

    # add the user to the database
    # result = db.add_user(data['user_id'], data['username'])

    priv_key = login_server.derive_secret_key(data['username'], data['password'])
    # encrypted_password = login_server.encrypt(priv_key, data['password'])
    hash_password = login_server.encryptPassword(data['username'], data['password']).hex()

    result = db.add_user(data['username'], priv_key, hash_password,
        data['email'], data['first_name'], data['last_name'], data['admin_status'])

    # If the user already exists, return a 409
    if not result:
        return jsonify({
            'status': False,
            'message': 'User already exists',
        }), 409
    
    # Return a success message
    return jsonify({
        'status': True,
        'message': 'User added',
        'admin_status': data['admin_status'],
    }), 201

# POST /user/login
@user_blueprint.route('/login', methods=['POST'])
def login_user():
    # Get the user data from the request
    data = request.get_json()

    user = db.get_user_by_username(data['username'])
    
    if not user:
        return jsonify({
            'status': False,
            'message': 'Login failed',
        }), 401

    priv_key = user['priv_key']
    decrypted_password = login_server.decrypt(priv_key, bytes.fromhex(user['hash_password']))

    if decrypted_password == data['password']:
        return jsonify({
            'status': True,
            'message': 'Login successful',
            'admin_status': data['admin_status']
        }), 200
    else:
        return jsonify({
            'status': False,
            'message': 'Login failed',
        }), 401

# POST /user/receipt
@user_blueprint.route('/receipt', methods=['POST'])
def add_receipt():
    # Get the receipt data from the request
    data = request.get_json()

    # add the receipt to the database
    result = db.add_receipt(data['ticket_id'], data['user_id'], data['total_tickets'])

    # If the receipt already exists, return a 409
    if not result:
        return jsonify({
            'status': False,
            'message': 'Receipt already exists',
        }), 409
    
    # Return a success message
    return jsonify({
        'status': True,
        'message': 'Receipt added',
    }), 201