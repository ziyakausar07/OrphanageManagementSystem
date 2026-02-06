from flask import Blueprint, request, jsonify
from extensions import db
from models import Donor, User
from services.email_service import email_admin_donor, email_donor_status

donor_bp = Blueprint("donor", __name__, url_prefix="/api/donor")

@donor_bp.route("/request", methods=["POST"])
def donor_request():
    data = request.json

    donor = Donor(
        user_id=data["user_id"],
        company_name=data.get("company_name"),
        profession=data.get("profession")
    )

    db.session.add(donor)
    db.session.commit()

    user = User.query.get(donor.user_id)

    email_admin_donor(donor.donor_id, user.name)

    return jsonify({"message": "Donor request sent"}), 201


@donor_bp.route("/update/<int:donor_id>", methods=["POST"])
def update_donor(donor_id):
    donor = Donor.query.get_or_404(donor_id)
    donor.approval_status = request.json["status"]

    db.session.commit()

    email_donor_status(donor.user.email, donor.approval_status)

    return jsonify({"message": "Donor status updated"}), 200
