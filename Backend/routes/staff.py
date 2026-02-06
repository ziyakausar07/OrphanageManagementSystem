from flask import Blueprint, request, jsonify
from datetime import datetime
from extensions import db
from models import StaffLeave, Staff, StaffTask, User

staff_bp = Blueprint("staff", __name__, url_prefix="/api/staff")

MONTHLY_LIMIT = 3
YEARLY_LIMIT = 15
@staff_bp.route("/<int:user_id>", methods=["GET"])
def get_staff_by_user_id(user_id):
    staff = Staff.query.filter_by(user_id=user_id).first()
    if not staff:
        return jsonify({"message": "Staff not found"}), 404

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "staff_id": staff.staff_id,
        "name": user.name,         # from User table
        "email": user.email,       # from User table
        "designation": staff.designation,
        "salary": staff.salary
        })


# Staff Dashboard
@staff_bp.route("/dashboard/<int:user_id>", methods=["GET"])
def staff_dashboard(user_id):
    staff = Staff.query.filter_by(user_id=user_id).first()
    if not staff:
        return jsonify({"error": "Staff not found"}), 404

    today = datetime.today()
    year = today.year
    month = today.month

    monthly_taken = StaffLeave.query.filter(
        StaffLeave.staff_id == staff.staff_id,
        db.extract("year", StaffLeave.leave_date) == year,
        db.extract("month", StaffLeave.leave_date) == month,
        StaffLeave.status == "approved"
    ).count()

    yearly_taken = StaffLeave.query.filter(
        StaffLeave.staff_id == staff.staff_id,
        db.extract("year", StaffLeave.leave_date) == year,
        StaffLeave.status == "approved"
    ).count()

    tasks_completed = StaffTask.query.filter_by(
        staff_id=staff.staff_id, status="completed"
    ).count()

    tasks_pending = StaffTask.query.filter_by(
        staff_id=staff.staff_id, status="pending"
    ).count()

    return jsonify({
        "monthlyTaken": monthly_taken,
        "yearlyTaken": yearly_taken,
        "monthlyRemaining": max(MONTHLY_LIMIT - monthly_taken, 0),
        "yearlyRemaining": max(YEARLY_LIMIT - yearly_taken, 0),
        "tasksCompleted": tasks_completed,
        "tasksPending": tasks_pending
    }), 200


# -----------------------------
# Get tasks for a user (automatically maps user_id -> staff_id)
# -----------------------------
@staff_bp.route("/tasks/<int:user_id>", methods=["GET"])
def get_tasks(user_id):
    staff = Staff.query.filter_by(user_id=user_id).first()
    if not staff:
        return jsonify({"tasks": []})  # No staff → empty list

    tasks = StaffTask.query.filter_by(staff_id=staff.staff_id).order_by(StaffTask.created_at.desc()).all()
    return jsonify({
        "tasks": [
            {
                "task_id": t.task_id,
                "title": t.title,
                "description": t.description,
                "status": t.status,
                "due_date": t.due_date.strftime("%Y-%m-%d") if t.due_date else None,
                "created_at": t.created_at.strftime("%Y-%m-%d")
            } for t in tasks
        ]
    })

# -----------------------------
# Add task (user_id → staff_id automatically)
# -----------------------------
@staff_bp.route("/tasks/add", methods=["POST"])
def add_task():
    data = request.get_json()
    user_id = data.get("user_id")
    title = data.get("title")
    description = data.get("description", "")

    if not user_id or not title:
        return jsonify({"error": "user_id and title are required"}), 400

    staff = Staff.query.filter_by(user_id=user_id).first()
    if not staff:
        return jsonify({"error": "Staff not found for this user"}), 400

    task = StaffTask(staff_id=staff.staff_id, title=title, description=description)
    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task added successfully",
        "task": {
            "task_id": task.task_id,
            "title": task.title,
            "description": task.description,
            "status": task.status
        }
    }), 201

# -----------------------------
# Delete task
# -----------------------------
@staff_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = StaffTask.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200

# -----------------------------
# Update task status
# -----------------------------
@staff_bp.route("/tasks/update/<int:task_id>", methods=["POST"])
def update_task_status(task_id):
    data = request.get_json()
    status = data.get("status")
    if status not in ["pending", "completed"]:
        return jsonify({"error": "Invalid status"}), 400

    task = StaffTask.query.get_or_404(task_id)
    task.status = status
    db.session.commit()
    return jsonify({"message": "Task status updated", "status": task.status}), 200
@staff_bp.route("/leave/update/<int:leave_id>", methods=["POST"])
def update_leave_status(leave_id):
    data = request.get_json()
    status = data.get("status")  # 'approved' or 'rejected'

    leave = StaffLeave.query.get_or_404(leave_id)
    leave.status = status
    db.session.commit()

    # Send notification to the staff
    staff = Staff.query.get(leave.staff_id)
    if staff:
        message = f"Your leave request on {leave.leave_date.strftime('%Y-%m-%d')} has been {status}."
        notification = Notification(
            user_id=staff.user_id,
            message=message,
            type="system",  # can also use 'email' if you want to send email
            status="sent"
        )
        db.session.add(notification)
        db.session.commit()

    return jsonify({"message": f"Leave {status} successfully"}), 200
# -----------------------------
# Update staff profile
# -----------------------------
@staff_bp.route("/<int:user_id>", methods=["PUT"])
def update_staff_profile(user_id):
    staff = Staff.query.filter_by(user_id=user_id).first()
    if not staff:
        return jsonify({"error": "Staff not found"}), 404

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    # Update User table fields
    user.name = data.get("name", user.name)

    # Email usually readonly (skip if you want)
    # user.email = data.get("email", user.email)

    # Update Staff table fields
    staff.designation = data.get("designation", staff.designation)
    staff.salary = data.get("salary", staff.salary)

    db.session.commit()

    return jsonify({
        "message": "Profile updated successfully",
        "name": user.name,
        "email": user.email,
        "designation": staff.designation,
        "salary": staff.salary
    }), 200
