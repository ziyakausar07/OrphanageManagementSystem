import os
from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db
from models import *

# Blueprints
from routes.auth import auth_bp
from routes.admin import admin_bp
from routes.donor import donor_bp
from routes.adoption import adoption_bp
from routes.staff import staff_bp
from routes.donation import donation_bp
from routes.notification import notification_bp
from routes.children import children_bp
from routes.orphanage_activities import activities_bp


def create_app():
    # ✅ IMPORTANT: static folder setup
    app = Flask(
        __name__,
        static_url_path="",
        static_folder="uploads"   # 👈 uploads folder serve hoga
    )

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    
    # Enable CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True
    )

    # Create tables
    with app.app_context():
        db.create_all()

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(donor_bp, url_prefix="/api/donor")
    app.register_blueprint(adoption_bp, url_prefix="/api/adoption")
    app.register_blueprint(staff_bp, url_prefix="/api/staff")
    app.register_blueprint(donation_bp, url_prefix="/api/donation")
    app.register_blueprint(notification_bp, url_prefix="/api/notification")
    app.register_blueprint(children_bp, url_prefix="/api/children")

    app.register_blueprint(activities_bp)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
