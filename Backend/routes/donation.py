from flask import Blueprint, request, jsonify
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
        donation_date=data.get("donation_date"),
        status="pending"
    )
    # 4️⃣ Send email to admin
    email_admin_donation(
        donation_id=donation.donation_id,
        donor_name=user.name,
        donation_type=donation.donation_type,
        donation_date=donation.donation_date
    )

    return jsonify({"message": "Donation submitted successfully"}), 201
@donation_bp.route("/messages/<int:user_id>", methods=["GET"])
def donor_messages(user_id):
    donor = User.query.get(user_id).donor
    if not donor:
        return jsonify({"error": "Donor not found"}), 404

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