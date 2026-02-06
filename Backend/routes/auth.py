from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
from models import User, Staff, Donor, Admin
from extensions import db
from config import Config

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# ===================== REGISTER =====================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    # -----------------------
    # 1️⃣ Required fields
    # -----------------------
    if not data.get("name") or not data.get("email") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists"}), 409

    # -----------------------
    # 2️⃣ Create user
    # -----------------------
    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(data["password"]),
        role=data["role"].upper(),  # ensure uppercase
        phone=data.get("phone"),
        address=data.get("address"),
        status="active"
    )

    db.session.add(user)
    db.session.commit()  # commit to get user_id

    # -----------------------
    # 3️⃣ Create role-specific table entry
    # -----------------------
    role = user.role

    if role == "STAFF":
        new_staff = Staff(
            user_id=user.user_id,
            designation=data.get("designation", "Staff"),
            salary=data.get("salary", 30000),
            joining_date=data.get("joining_date", datetime.utcnow().date())
        )
        db.session.add(new_staff)

    elif role == "DONOR":
        new_donor = Donor(
            user_id=user.user_id,
            company_name=data.get("company_name"),
            profession=data.get("profession"),
            approval_status="pending"
        )
        db.session.add(new_donor)

    elif role == "ADMIN":
        new_admin = Admin(user_id=user.user_id)
        db.session.add(new_admin)

    db.session.commit()

    # -----------------------
    # 4️⃣ Generate JWT token
    # -----------------------
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
        "message": f"{role} registration successful",
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

    if not data.get("email") or not data.get("password"):
        return jsonify({"message": "Email and password required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    if user.status != "active":
        return jsonify({"message": "Account is inactive"}), 403

    # 🔐 CREATE JWT TOKEN
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
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.user_id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200
