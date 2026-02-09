"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select, or_
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get('email') or not data.get('username') or not data.get('password'):
        return jsonify({"Error": "Email, username or password not exist"}), 400
    user_exist = db.session.execute(select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user_exist:
        return jsonify({"Error": "Email, username or password  exist"}), 400

    new_user = User(
        username=data.get('username'),
        firstname=data.get('firstname'),
        lastname=data.get('lastname'),
        email=data.get('email')
    )
    new_user.generate(data.get('password'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Register successfully"}),201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not (data.get('email') or data.get('username')) or not data.get('password'):
        return jsonify({"Error": "Email, username or password not exist"}), 400
    user = db.session.execute(
        select(User).where(
            or_(
                User.email == data.get("email"),
                User.username == data.get("username")
            )
        )
    ).scalar_one_or_none()
    if user is None:
        return jsonify({"Error": "Email, username or password not found"}), 404
    if user.check(data.get("password")):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Login successfully",
                        "token": access_token}), 200
    else:
        return jsonify({"Error": "Invalid username/email or password"}), 401


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"Error": "Not found"}), 404
    return jsonify(user.serialize()), 200
