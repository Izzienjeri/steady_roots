from functools import wraps
from flask import jsonify, make_response
from app.models import User
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            role = claims.get("role")  # Use get method to safely access 'role' key
            if role == "admin":
                return fn(*args, **kwargs)
            else:
                return make_response(jsonify(msg="Admins only!"), 403)

        return decorator

    return wrapper
