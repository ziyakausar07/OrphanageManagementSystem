# backend/routes/adoption.py
from flask import Blueprint, request, jsonify
from extensions import db
from models import AdoptionRequest, Child, User
from services.email_service import email_admin_adoption

adoption_bp = Blueprint("adoption", __name__, url_prefix="/api/adoption")

@adoption_bp.route("/request", methods=["POST"])
def request_adoption():
    data = request.json
    print("DATA RECEIVED:", data) 
    user = User.query.get(data.get("user_id"))
    child = Child.query.get(data.get("child_id"))
    meeting_date = data.get("meeting_date")
    note = data.get("note", "")

    if not user or not child or not meeting_date:
        return jsonify({"message": "Missing required data"}), 400

    adoption = AdoptionRequest(
    user_id=user.user_id,       # link user
    child_id=child.child_id,    # link child
    meeting_date=meeting_date
)
    db.session.add(adoption)
    db.session.commit()
    print(adoption.adoption_id)  # ye ab unique ID dikhayega

    # Send email to admin
    email_admin_adoption(adoption.adoption_id, user.name, child.name, meeting_date)

    return jsonify({"message": "Adoption request submitted"}), 201

# -------- APPROVE / REJECT --------
@adoption_bp.route("/update/<int:adoption_id>", methods=["POST"])
def update_adoption(adoption_id):
    data = request.json
    adoption = AdoptionRequest.query.get(adoption_id)

    if not adoption:
        return jsonify({"message": "Adoption request not found"}), 404

    adoption.status = data["status"]

    if adoption.status == "approved":
        adoption.child.status = "adopted"

    db.session.commit()

    email_user_adoption_status(
        adoption.user.email,
        adoption.child.name,
        adoption.status
    )

    return jsonify({"message": "Updated"}), 200

@adoption_bp.route("/adoptions_status", methods=["GET"])
def get_adoptions_admin():
    requests = AdoptionRequest.query.all()
    result = []

    for r in requests:
        result.append({
            "adoption_id": r.adoption_id,

            # Child details
            "child_id": r.child.child_id,
            "child_name": r.child.name,

            # Requester details
            "user_id": r.user.user_id,
            "requester_name": r.user.name,
            "requester_email": r.user.email,
            "requester_phone": r.user.phone,
            "requester_address": r.user.address,

            # Request info
            "status": r.status,
            "admin_remark": r.admin_remark,
            "meeting_date": r.meeting_date.strftime("%Y-%m-%d") if r.meeting_date else None,
            "request_date": r.request_date.strftime("%Y-%m-%d %H:%M")
        })

    return jsonify(result)