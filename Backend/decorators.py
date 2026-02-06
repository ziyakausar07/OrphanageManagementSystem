from functools import wraps
from flask import request, jsonify
import jwt
import os
from models import User

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")

def role_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization")

            if not auth_header:
                return jsonify({"message": "Authorization header missing"}), 401

            # Expect: Bearer <token>
            parts = auth_header.split()
            if len(parts) != 2 or parts[0].lower() != "bearer":
                return jsonify({"message": "Invalid authorization format"}), 401

            token = parts[1]

            try:
                decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                return jsonify({"message": "Token expired"}), 401
            except jwt.InvalidTokenError:
                return jsonify({"message": "Invalid token"}), 401

            user_id = decoded.get("user_id")
            role = decoded.get("role")

            if not user_id or not role:
                return jsonify({"message": "Invalid token payload"}), 401

            # 🔥 CASE-INSENSITIVE ROLE CHECK (FIX)
            if role.lower() != required_role.lower():
                return jsonify({"message": "Unauthorized"}), 403

            # Optional: attach user to request
            request.user = User.query.get(user_id)

            return fn(*args, **kwargs)

        return wrapper
    return decorator
