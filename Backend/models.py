from datetime import date, datetime
from extensions import db

# ------------------ USER ------------------
class User(db.Model):
    __tablename__ = "orphanage_users"

    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum("ADMIN", "DONOR", "STAFF", "PERSON"), nullable=False)
    phone = db.Column(db.String(15))
    address = db.Column(db.Text)
    status = db.Column(db.Enum("active", "inactive"), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    admin = db.relationship("Admin", back_populates="user", uselist=False)
    staff = db.relationship("Staff", back_populates="user", uselist=False)
    donor = db.relationship("Donor", back_populates="user", uselist=False)
    adoption_requests = db.relationship("AdoptionRequest", back_populates="user")
    notifications = db.relationship("Notification", back_populates="user")


# ------------------ ADMIN ------------------
class Admin(db.Model):
    __tablename__ = "admins"

    admin_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("orphanage_users.user_id"), nullable=False)

    user = db.relationship("User", back_populates="admin")


# ------------------ STAFF ------------------
class Staff(db.Model):
    __tablename__ = "staff"

    staff_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("orphanage_users.user_id"), nullable=False)
    designation = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.Float, default=0)
    performance = db.Column(db.String(50),default='poor')
    joining_date = db.Column(db.Date, nullable=False, default=date.today)
    user = db.relationship("User", back_populates="staff")
    leaves = db.relationship("StaffLeave", back_populates="staff")
    tasks = db.relationship("StaffTask", back_populates="staff")


class StaffLeave(db.Model):
    __tablename__ = "staff_leaves"

    leave_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    staff_id = db.Column(db.Integer, db.ForeignKey("staff.staff_id"), nullable=False)
    leave_date = db.Column(db.Date, nullable=False)
    subject = db.Column(db.String(255), default="General Leave")
    reason = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="pending")

    staff = db.relationship("Staff", back_populates="leaves")


class StaffTask(db.Model):
    __tablename__ = "staff_tasks"

    task_id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey("staff.staff_id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.Enum("pending", "completed"), default="pending")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    due_date = db.Column(db.Date)

    staff = db.relationship("Staff", back_populates="tasks")


# ------------------ DONOR ------------------
class Donor(db.Model):
    __tablename__ = "donors"

    donor_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("orphanage_users.user_id"), nullable=False)
    company_name = db.Column(db.String(100))
    profession = db.Column(db.String(100))
    approval_status = db.Column(db.Enum("pending", "approved", "rejected"), default="pending")

    user = db.relationship("User", back_populates="donor")
    donations = db.relationship("Donation", back_populates="donor")


class Donation(db.Model):
    __tablename__ = "donations"

    donation_id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey("donors.donor_id"), nullable=False)
    donation_type = db.Column(db.String(50))
    amount = db.Column(db.Float)
    payment_method = db.Column(db.String(50))
    food_count = db.Column(db.Integer)
    food_type = db.Column(db.String(50))
    clothes_count = db.Column(db.Integer)
    clothes_type = db.Column(db.String(50))
    other_details = db.Column(db.Text)
    message = db.Column(db.Text)
    donation_date = db.Column(db.Date)
    status = db.Column(db.String(20))

    donor = db.relationship("Donor", back_populates="donations")
    usage = db.relationship("DonationUsage", back_populates="donation")


class DonationUsage(db.Model):
    __tablename__ = "donation_usage"

    usage_id = db.Column(db.Integer, primary_key=True)
    donation_id = db.Column(db.Integer, db.ForeignKey("donations.donation_id"), nullable=False)
    used_for = db.Column(db.Enum("education", "food", "medical", "salary"))
    amount_used = db.Column(db.Float)   # ✅ CHANGE HERE
    used_date = db.Column(db.Date)

    donation = db.relationship("Donation", back_populates="usage")



# ------------------ CHILDREN ------------------
class Child(db.Model):
    __tablename__ = "children"

    child_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.Enum("Male", "Female", "Other"))
    date_of_birth = db.Column(db.Date)
    admission_date = db.Column(db.Date)
    education_level = db.Column(db.String(100))
    health_status = db.Column(db.String(100))
    overall_performance = db.Column(db.String(50))
    status = db.Column(db.Enum("available", "adopted"), default="available")
    image = db.Column(db.String(255))  # child image

    performances = db.relationship("ChildPerformance", back_populates="child", cascade="all, delete-orphan")
    adoption_requests = db.relationship("AdoptionRequest", back_populates="child")


class ChildPerformance(db.Model):
    __tablename__ = "child_performance"

    performance_id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey("children.child_id"), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    marks = db.Column(db.Integer)
    attendance = db.Column(db.Integer)
    remarks = db.Column(db.Text)
    image = db.Column(db.String(255))  # optional performance image

    child = db.relationship("Child", back_populates="performances")


class AdoptionRequest(db.Model):
    __tablename__ = "adoption_requests"

    adoption_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("orphanage_users.user_id"), nullable=False)
    child_id = db.Column(db.Integer, db.ForeignKey("children.child_id"), nullable=False)
    meeting_date = db.Column(db.Date)
    status = db.Column(db.Enum("pending", "approved", "rejected"), default="pending")
    admin_remark = db.Column(db.Text)
    request_date = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="adoption_requests")
    child = db.relationship("Child", back_populates="adoption_requests")


# ------------------ ACTIVITIES ------------------
class OrphanageActivity(db.Model):
    __tablename__ = "orphanage_activities"

    activity_id = db.Column(db.Integer, primary_key=True)
    activity_name = db.Column(db.String(100))
    activity_type = db.Column(db.Enum("sports", "cultural", "national"))
    activity_date = db.Column(db.Date)
    description = db.Column(db.Text)


# ------------------ NOTIFICATIONS ------------------
class Notification(db.Model):
    __tablename__ = "notifications"

    notification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("orphanage_users.user_id"), nullable=False)
    message = db.Column(db.Text)
    type = db.Column(db.Enum("email", "system"))
    status = db.Column(db.Enum("sent", "read"), default="sent")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="notifications")
