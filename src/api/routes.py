"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select, or_

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get('email') or not data.get('username') or not data.get('password'):
        return jsonify({"Error": "Email, username or password not exist"}), 400
    user_exist = db.session.execute(select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user_exist:
        return jsonify({"Error": "Email, username or password not exist"}), 400

    new_user = User(
        username=data.get('username'),
        firstname=data.get('firstname'),
        lastname=data.get('lastname'),
        email=data.get('email')
    )
    new_user.generate(data.get('password'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Login successfully"})


@api.route('login', method=['POST'])
def login():
    data = request.get_json()
    if not data.get('email') or not data.get('username') or not data.get('password'):
        return jsonify({"Error": "Email, username or password not exist"}), 400
    user = db.session.execute(
        select(User).where(
            or_(
                User.email == data.get("email"),
                User.username == data.get("username")
            )
        )
    ).scalar_one_or_none()

    if user:
        return jsonify({"Error": "Email, username or password not exist"}), 400