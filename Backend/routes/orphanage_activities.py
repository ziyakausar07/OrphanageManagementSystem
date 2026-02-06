from flask import Blueprint, jsonify
from extensions import db
from models import OrphanageActivity
from sqlalchemy import func

activities_bp = Blueprint(
    "orphanage_activities",
    __name__,
    url_prefix="/api/orphanage-activities"
)

@activities_bp.route("", methods=["GET"])
def get_activities_summary():
    results = (
        db.session.query(
            OrphanageActivity.activity_type,
            func.count(OrphanageActivity.activity_id).label("total")
        )
        .group_by(OrphanageActivity.activity_type)
        .all()
    )

    data = [
        {
            "activity_type": activity.activity_type,
            "total": activity.total
        }
        for activity in results
    ]

    return jsonify(data), 200
