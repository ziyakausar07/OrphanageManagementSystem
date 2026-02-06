from flask import Blueprint, jsonify, request
from datetime import date, timedelta,datetime
from sqlalchemy import func
from models import Donation, DonationUsage
from extensions import db
from decorators import role_required
from models import AdoptionRequest, Donor, Staff, StaffLeave, Donation, Child, User
from services.email_service import (
    email_user_adoption_status,
    email_donor_status,
    email_staff_leave_status
)
from flask_cors import cross_origin

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")


# ================= DASHBOARD =================
@admin_bp.route("/dashboard", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def dashboard():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    today = date.today()

    weekly = db.session.query(func.sum(Donation.amount))\
        .filter(Donation.donation_date >= today - timedelta(days=7))\
        .scalar() or 0

    monthly = db.session.query(func.sum(Donation.amount))\
        .filter(func.month(Donation.donation_date) == today.month)\
        .scalar() or 0

    yearly = db.session.query(func.sum(Donation.amount))\
        .filter(func.year(Donation.donation_date) == today.year)\
        .scalar() or 0

    return jsonify({
        "children": Child.query.count(),
        "staff": Staff.query.count(),
        "donors": Donor.query.count(),
        "weekly_donation": float(weekly),
        "monthly_donation": float(monthly),
        "yearly_donation": float(yearly)
    }), 200


# ================= ADOPTIONS =================
@admin_bp.route("/adoptions", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def all_adoptions():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    data = [
        {
            "id": a.adoption_id,
            "user": a.user.name,
            "email": a.user.email,
            "child": a.child.name,
            "status": a.status
        } for a in AdoptionRequest.query.all()
    ]
    return jsonify(data), 200


@admin_bp.route("/adoption/<int:id>", methods=["PUT", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def update_adoption(id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    status = request.json.get("status")
    adoption = AdoptionRequest.query.get_or_404(id)
    adoption.status = status

    if status == "approved":
        adoption.child.status = "adopted"

    db.session.commit()

    email_user_adoption_status(adoption.user.email, adoption.child.name, status)

    return jsonify({"message": "Adoption status updated"}), 200


# ================= DONATIONS =================
@admin_bp.route("/donations", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)
def donations():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    donors = Donor.query.all()

    donor_list = []
    total_amount = 0

    for d in donors:
        # 🔹 har donor ka total donation
        donor_total = sum(
            donation.amount or 0 for donation in d.donations
        )

        donor_list.append({
            "_id": d.donor_id,
            "name": d.user.name,
            "amount": float(donor_total),
            "status": d.approval_status
        })

        total_amount += donor_total

    return jsonify({
        "list": donor_list,
        "summary": {
            "totalDonors": len(donors),
            "totalAmount": float(total_amount)
        }
    }), 200


@admin_bp.route("/donations/<int:id>", methods=["PUT", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def update_donor_status(id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    status = request.json.get("status")
    if status not in ["pending", "approved", "rejected"]:
        return jsonify({"error": "Invalid status"}), 400

    donor = Donor.query.get_or_404(id)
    donor.approval_status = status
    db.session.commit()

    email_donor_status(donor.user.email, status)
    return jsonify({"message": f"Donor status updated to {status}"}), 200


# ================= STAFF =================
@admin_bp.route("/staff", methods=["GET", "OPTIONS"])

@cross_origin(origin="http://localhost:5173", supports_credentials=True)
def get_staff():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    staff_list = Staff.query.all()
    data = [
        {
            "id": s.staff_id,
            "name": s.user.name,
            "email": s.user.email,
            "designation": s.designation,
            "salary": s.salary or 0,
            "performance": s.performance or 0
        }
        for s in staff_list
    ]
    return jsonify(data), 200


@admin_bp.route("/staff/<int:staff_id>", methods=["PUT", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def update_staff(staff_id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    staff = Staff.query.get_or_404(staff_id)
    user = staff.user
    data = request.json

    # Update fields safely
    if "name" in data:
        user.name = data["name"]

    if "email" in data:
        existing = User.query.filter(User.email == data["email"], User.user_id != user.user_id).first()
        if existing:
            return jsonify({"message": "Email already in use"}), 400
        user.email = data["email"]

    if "designation" in data:
        staff.designation = data["designation"]

    if "salary" in data:
        staff.salary = data["salary"] or 0

    if "performance" in data:
        staff.performance = data["performance"] or 0

    db.session.commit()

    return jsonify({
        "message": "Staff updated successfully",
        "staff": {
            "id": staff.staff_id,
            "name": user.name,
            "email": user.email,
            "designation": staff.designation,
            "salary": staff.salary or 0,
            "performance": staff.performance or 0
        }
    }), 200


@admin_bp.route("/staff/<int:staff_id>", methods=["DELETE", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def delete_staff(staff_id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    staff = Staff.query.get_or_404(staff_id)
    db.session.delete(staff)
    db.session.commit()

    return jsonify({"message": "Staff deleted successfully"}), 200


# ================= STAFF LEAVES =================
@admin_bp.route("/staff-leaves", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def staff_leaves():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    leaves = StaffLeave.query.all()
    data = [
        {
            "id": l.leave_id,
            "staff": l.staff.user.name,
            "status": l.status
        }
        for l in leaves
    ]
    return jsonify(data), 200


@admin_bp.route("/staff-leave/<int:id>", methods=["PUT", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def update_leave(id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    status = request.json.get("status")
    leave = StaffLeave.query.get_or_404(id)
    leave.status = status
    db.session.commit()

    email_staff_leave_status(leave.staff.user.email, status)
    return jsonify({"message": "Leave status updated"}), 200


# ================= SALARY INCREMENT (OPTIONAL) =================
@admin_bp.route("/staff/<int:staff_id>/salary", methods=["PUT", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)

def increment_salary(staff_id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    staff = Staff.query.get_or_404(staff_id)
    staff.salary += 1000
    db.session.commit()
    return jsonify({"message": "Salary incremented", "salary": staff.salary}), 200
@admin_bp.route("/orphanage-performance", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)
def orphanage_performance():

    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    try:
        total_donation = db.session.query(func.sum(Donation.amount)).scalar() or 0
        used_donation = db.session.query(func.sum(DonationUsage.amount_used)).scalar() or 0

        education = db.session.query(func.sum(DonationUsage.amount_used))\
            .filter(DonationUsage.used_for == "education").scalar() or 0

        medical = db.session.query(func.sum(DonationUsage.amount_used))\
            .filter(DonationUsage.used_for == "medical").scalar() or 0

        food = db.session.query(func.sum(DonationUsage.amount_used))\
            .filter(DonationUsage.used_for == "food").scalar() or 0

        return jsonify({
            "total": float(total_donation),
            "used": float(used_donation),
            "remaining": float(total_donation - used_donation),
            "education": float(education),
            "health": float(medical),
            "food": float(food)
        }), 200

    except Exception as e:
        print("🔥 ORPHANAGE PERFORMANCE ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ================= CHILDREN (ADMIN) =================
# ================= CHILDREN (ADMIN) =================

@admin_bp.route("/children", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)
 # JWT token ke saath admin check
def get_children_admin():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    try:
        children = Child.query.all()
        result = []

        for c in children:
            performances = [
                {
                    "performance_id": p.performance_id,
                    "year": p.year,
                    "marks": p.marks,
                    "attendance": p.attendance,
                    "remarks": p.remarks,
                    "image": getattr(p, "image", None)
                }
                for p in c.performances
            ]

            result.append({
                "child_id": c.child_id,
                "name": c.name,
                "gender": c.gender,
                "date_of_birth": c.date_of_birth.strftime("%Y-%m-%d") if c.date_of_birth else None,
                "admission_date": c.admission_date.strftime("%Y-%m-%d") if c.admission_date else None,
                "education_level": c.education_level,
                "health_status": c.health_status,
                "overall_performance": c.overall_performance,
                "status": c.status,
                "image": f"children/{c.image}" if c.image else None,
                "performances": performances
            })

        return jsonify(result), 200

    except Exception as e:
        print("🔥 ADMIN CHILDREN FETCH ERROR:", e)
        return jsonify({"error": str(e)}), 500


@admin_bp.route("/donation-performance", methods=["GET", "OPTIONS"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)
def donation_performance():
    perf_type = request.args.get("type")

    # 🔹 DB se latest date uthao
    reference_date = db.session.query(
        func.max(DonationUsage.used_date)
    ).scalar()

    if not reference_date:
        return jsonify({
            "type": perf_type,
            "total": 0
        }), 200

    q = db.session.query(func.sum(DonationUsage.amount_used))

    if perf_type == "weekly":
        start_date = reference_date - timedelta(days=7)
        q = q.filter(
            DonationUsage.used_date.between(start_date, reference_date)
        )

    elif perf_type == "monthly":
        q = q.filter(
            func.extract("month", DonationUsage.used_date) == reference_date.month,
            func.extract("year", DonationUsage.used_date) == reference_date.year
        )

    elif perf_type == "yearly":
        q = q.filter(
            func.extract("year", DonationUsage.used_date) == reference_date.year
        )

    total = q.scalar() or 0

    return jsonify({
        "type": perf_type,
        "total": float(total)
    }), 200