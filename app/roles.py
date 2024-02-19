from flask_jwt_extended import get_jwt_identity, jwt_required
from functools import wraps
from flask import jsonify
from models import User

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user.role != 'admin':
            return jsonify({"msg": "Admin privilege required"}), 403
        return fn(*args, **kwargs)
    return wrapper

def normal_user_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user.role != 'user':
            return jsonify({"msg": "Normal user privilege required"}), 403
        return fn(*args, **kwargs)
    return wrapper
