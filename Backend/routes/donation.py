from flask import Blueprint, request, jsonify
from datetime import datetime, date
from extensions import db
from models import Donation, Donor, User
from services.email_service import email_admin_donation

donation_bp = Blueprint("donation", __name__, url_prefix="/api/donation")

@donation_bp.route("/add", methods=["POST"])
def add_donation():
    data = request.json

    if not data or "user_id" not in data:
        return jsonify({"error": "user_id required"}), 400

    # 1️⃣ Fetch user
    user = User.query.get(data["user_id"])
    if not user:
        return jsonify({"error": "User not found"}), 404

    # 2️⃣ Fetch or create donor
    donor = Donor.query.filter_by(user_id=user.user_id).first()
    if not donor:
        donor = Donor(user_id=user.user_id)
        db.session.add(donor)
        db.session.commit()

    donation_date_raw = data.get("donation_date")
    if isinstance(donation_date_raw, str):
        try:
            donation_date = datetime.strptime(donation_date_raw, "%Y-%m-%d").date()
        except ValueError:
            donation_date = date.today()
    elif isinstance(donation_date_raw, (date, datetime)):
        donation_date = donation_date_raw
    else:
        donation_date = date.today()

    # 3️⃣ Create donation
    donation = Donation(
        donor_id=donor.donor_id,
        donation_type=data.get("donation_type"),
        amount=data.get("amount"),
        payment_method=data.get("payment_method"),
        food_count=data.get("food_count"),
        food_type=data.get("food_type"),
        clothes_count=data.get("clothes_count"),
        clothes_type=data.get("clothes_type"),
        other_details=data.get("other_details"),
        message=data.get("message"),
        donation_date=donation_date,
        status="pending"
    )
    db.session.add(donation)
    db.session.commit()

    # 4️⃣ Send email to admin
    try:
        email_admin_donation(
            donation_id=donation.donation_id,
            donor_name=user.name,
            donation_type=donation.donation_type,
            donation_date=donation.donation_date
        )
    except Exception as e:
        print("Email notification error:", e)

    return jsonify({"message": "Donation submitted successfully", "donation_id": donation.donation_id}), 201

@donation_bp.route("/messages/<int:user_id>", methods=["GET"])
def donor_messages(user_id):
    user = User.query.get(user_id)
    if not user or not user.donor:
        return jsonify({"messages": []})
    donor = user.donor

    donations = donor.donations
    messages = [
        {
            "id": d.donation_id,
            "donation_type": d.donation_type,
            "status": d.status,
            "message": d.message or "",
            "date": d.donation_date.isoformat() if d.donation_date else None,
        }
        for d in donations if d.status != "pending"  # show only approved/rejected
    ]

    return jsonify({"messages": messages})