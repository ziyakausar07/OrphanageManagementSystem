from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from itsdangerous import URLSafeTimedSerializer
import jwt
from services.email_service import email_forgot_password

from models import User, Staff, Donor, Admin
from extensions import db
from config import Config

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# 🔐 Serializer
serializer = URLSafeTimedSerializer(Config.SECRET_KEY)

# ===================== REGISTER =====================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("name") or not data.get("email") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists"}), 409

    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(data["password"]),
        role=data["role"].upper(),
        status="active"
    )

    db.session.add(user)
    db.session.commit()

    if user.role == "STAFF":
        db.session.add(Staff(user_id=user.user_id, designation="Staff"))
    elif user.role == "DONOR":
        db.session.add(Donor(user_id=user.user_id))
    elif user.role == "ADMIN":
        db.session.add(Admin(user_id=user.user_id))

    db.session.commit()

    token = jwt.encode(
        {
            "user_id": user.user_id,
            "role": user.role,
            "exp": datetime.utcnow() + timedelta(hours=8)
        },
        Config.SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user": {
            "id": user.user_id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 201


# ===================== LOGIN =====================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data.get("email")).first()
    if not user or not check_password_hash(user.password, data.get("password")):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "user_id": user.user_id,
            "role": user.role,
            "exp": datetime.utcnow() + timedelta(hours=8)
        },
        Config.SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user": {
            "id": user.user_id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200


# ===================== FORGOT PASSWORD =====================
@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    email = request.json.get("email")

    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not registered"}), 404

    token = serializer.dumps(email, salt="password-reset")

    try:
        email_forgot_password(user.email, token)
        print("[OK] FORGOT PASSWORD EMAIL SENT")
    except Exception as e:
        print("[WARN] Forgot password email failed to send:", e)

    print("EMAIL:", user.email)
    print("TOKEN:", token)

    return jsonify({"message": "Reset link sent to your email"}), 200


# ===================== RESET PASSWORD =====================
@auth_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):
    data = request.json or {}
    new_password = data.get("password")

    if not new_password:
        return jsonify({"message": "Password required"}), 400

    try:
        email = serializer.loads(
            token,
            salt="password-reset",
            max_age=3600  # 1 hour
        )
    except Exception as e:
        print("RESET TOKEN ERROR:", e)
        return jsonify({"message": "Invalid or expired token"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()

    print("PASSWORD RESET FOR:", user.email)
    return jsonify({"message": "Password reset successful"}), 200
