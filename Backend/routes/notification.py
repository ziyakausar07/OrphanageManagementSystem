# backend/routes/notification.py
from flask import Blueprint, request, jsonify
from extensions import db
from models import Notification, User
from utils.email import send_email

notification_bp = Blueprint("notification", __name__, url_prefix="/api/notification")

# ===================== SEND NOTIFICATION =====================
@notification_bp.route("/send", methods=["POST"])
def send_notification():
    data = request.json
    user_id = data.get("user_id")
    message = data.get("message")
    type_ = data.get("type", "system")  # 'email' or 'system'

    if not user_id or not message:
        return jsonify({"message": "user_id and message are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Save notification
    notification = Notification(
        user_id=user_id,
        message=message,
        type=type_
    )
    db.session.add(notification)
    db.session.commit()

    # Send email if needed
    if type_ == "email":
        send_email(user.email, "Orphanage Notification", message)

    return jsonify({"message": "Notification sent"}), 200


# ===================== GET USER NOTIFICATIONS (WITH ROLE) =====================
@notification_bp.route("/user/<int:user_id>", methods=["GET"])
def get_notifications(user_id: int):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    notifications = (
        db.session.query(
            Notification.notification_id,
            Notification.message,
            Notification.type,
            Notification.status,
            Notification.created_at,
            User.role
        )
        .join(User, Notification.user_id == User.user_id)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )

    data = {
        "messages": [
            {
                "notification_id": n.notification_id,
                "message": n.message,
                "type": n.type,
                "status": n.status,
                "role": n.role,   # ✅ role from orphanage_users
                "created_at": n.created_at.isoformat() if n.created_at else None
            }
            for n in notifications
        ]
    }

    return jsonify(data), 200


# ===================== MARK AS READ =====================
@notification_bp.route("/read/<int:notification_id>", methods=["POST"])
def mark_as_read(notification_id: int):
    notification = Notification.query.get(notification_id)
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    notification.status = "read"
    db.session.commit()

    return jsonify({"message": "Notification marked as read"}), 200

