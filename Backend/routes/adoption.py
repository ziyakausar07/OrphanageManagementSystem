# backend/routes/adoption.py
from flask import Blueprint, request, jsonify
from extensions import db
from models import AdoptionRequest, Child, User
from services.email_service import email_admin_adoption

from datetime import datetime

adoption_bp = Blueprint("adoption", __name__, url_prefix="/api/adoption")

@adoption_bp.route("/request", methods=["POST"])
def request_adoption():
    data = request.json or {}
    print("DATA RECEIVED:", data) 
    user = User.query.get(data.get("user_id"))
    child = Child.query.get(data.get("child_id"))
    meeting_date_raw = data.get("meeting_date")
    note = data.get("note", "")

    if not user or not child or not meeting_date_raw:
        return jsonify({"message": "Missing required data"}), 400

    if isinstance(meeting_date_raw, str):
        try:
            meeting_date = datetime.strptime(meeting_date_raw, "%Y-%m-%d").date()
        except ValueError:
            meeting_date = datetime.utcnow().date()
    else:
        meeting_date = meeting_date_raw

    adoption = AdoptionRequest(
        user_id=user.user_id,
        child_id=child.child_id,
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
@adoption_bp.route("/adoption/<int:adoption_id>", methods=["POST", "PUT"])
def update_adoption(adoption_id):
    data = request.json or {}
    adoption = AdoptionRequest.query.get(adoption_id)

    if not adoption:
        return jsonify({"message": "Adoption request not found"}), 404

    status = data.get("status")
    if status:
        adoption.status = status
    if "admin_remark" in data:
        adoption.admin_remark = data["admin_remark"]

    if adoption.status == "approved" and adoption.child:
        adoption.child.status = "adopted"

    db.session.commit()

    try:
        from services.email_service import email_user_adoption_status
        email_user_adoption_status(
            adoption.user.email,
            adoption.child.name,
            adoption.status
        )
    except Exception as e:
        print("Email sending error:", e)

    return jsonify({"message": "Updated"}), 200

@adoption_bp.route("/adoptions_status", methods=["GET"])
def get_adoptions_admin():
    requests = AdoptionRequest.query.all()
    result = []

    for r in requests:
        result.append({
            "adoption_id": r.adoption_id,

            # Child details
            "child_id": r.child.child_id if r.child else None,
            "child_name": r.child.name if r.child else "Unknown",

            # Requester details
            "user_id": r.user.user_id if r.user else None,
            "requester_name": r.user.name if r.user else "Unknown",
            "requester_email": r.user.email if r.user else "",
            "requester_phone": r.user.phone if r.user else "",
            "requester_address": r.user.address if r.user else "",

            # Request info
            "status": r.status,
            "admin_remark": r.admin_remark,
            "meeting_date": r.meeting_date.strftime("%Y-%m-%d") if r.meeting_date else None,
            "request_date": r.request_date.strftime("%Y-%m-%d %H:%M") if r.request_date else None
        })

    return jsonify(result)