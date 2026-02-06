from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
from datetime import datetime
from extensions import db
from models import Child, ChildPerformance
import os
children_bp = Blueprint("children", __name__, url_prefix="/api/children")

@children_bp.route("/ChildData", methods=["GET"])
@cross_origin(origin="http://localhost:5173", supports_credentials=True)
def get_children():
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
                "image": f"performance/{p.image}" if p.image else None
            } for p in c.performances
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
            "image": f"children/{c.child_id}.jpg",  # ya actual image filename
            "performances": performances
        })

    return jsonify(result)


# ------------------ For adoption person: Only performance info ------------------
@children_bp.route("/performance", methods=["GET"])
def get_children_performance():
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
            "performances": performances
        })

    return jsonify(result)

# ------------------ For admin: Full child details + performance ------------------
@children_bp.route("/admin", methods=["GET"])
def get_children_admin():
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
            "image": f"children/{c.image}" if c.image else None,  # ✅ correct path
            "performances": performances
        })

    return jsonify(result)



# Directory to save all child and performance images
IMAGE_DIR = "uploads/children"
os.makedirs(IMAGE_DIR, exist_ok=True)
@children_bp.route("/child", methods=["POST"])
def add_child():
    try:
        name = request.form.get("name")
        gender = request.form.get("gender")
        date_of_birth = request.form.get("date_of_birth")
        admission_date = request.form.get("admission_date")
        education_level = request.form.get("education_level")
        health_status = request.form.get("health_status")
        overall_performance = request.form.get("overall_performance")
        status = request.form.get("status", "available")

        # Convert date strings to datetime.date
        date_of_birth = datetime.strptime(date_of_birth, "%Y-%m-%d").date() if date_of_birth else None
        admission_date = datetime.strptime(admission_date, "%Y-%m-%d").date() if admission_date else None

        # Child image
        image_file = request.files.get("image")
        image_filename = None
        if image_file:
            image_filename = secure_filename(image_file.filename)
            image_file.save(os.path.join(IMAGE_DIR, image_filename))

        # Create child
        child = Child(
            name=name,
            gender=gender,
            date_of_birth=date_of_birth,
            admission_date=admission_date,
            education_level=education_level,
            health_status=health_status,
            overall_performance=overall_performance,
            status=status,
            image=image_filename
        )
        db.session.add(child)
        db.session.commit()

        # Add performances
        i = 0
        while True:
            year = request.form.get(f"performances[{i}][year]")
            if not year:
                break

            marks = request.form.get(f"performances[{i}][marks]")
            attendance = request.form.get(f"performances[{i}][attendance]")
            remarks = request.form.get(f"performances[{i}][remarks]")

            perf_image_file = request.files.get(f"performances[{i}][image]")
            perf_image_filename = None
            if perf_image_file:
                perf_image_filename = secure_filename(perf_image_file.filename)
                perf_image_file.save(os.path.join(IMAGE_DIR, perf_image_filename))

            performance = ChildPerformance(
                child_id=child.child_id,
                year=int(year),
                marks=int(marks) if marks else None,
                attendance=int(attendance) if attendance else None,
                remarks=remarks,
                image=perf_image_filename
            )
            db.session.add(performance)
            i += 1

        db.session.commit()
        return jsonify({"success": True, "child_id": child.child_id})

    except Exception as e:
        db.session.rollback()
        print("Error adding child:", e)  # <-- check this in your terminal
        return jsonify({"success": False, "error": str(e)}), 500
