# You don't need mail or app for adoption emails
# Only import what's actually used
from models import User
from utils.email import send_email
from config import Config

FRONTEND_URL = "http://localhost:5173"

# ================= ADOPTION =================

def email_admin_adoption(adoption_id, user_name, child_name, meeting_date):
    admins = User.query.filter_by(role="ADMIN").all()
    link = f"{FRONTEND_URL}/admin/adoptions/{adoption_id}"
    for admin in admins:
        send_email(
            admin.email,
            "New Adoption Request",
            f"""
New Adoption Request Received

Applicant: {user_name}
Child: {child_name}
Meeting Date: {meeting_date}

Review request:
{link}
"""
        )

def email_user_adoption_status(user_email, child_name, status):
    send_email(
        user_email,
        "Adoption Request Update",
        f"Your adoption request for {child_name} has been {status.upper()}."
    )

# ================= DONOR =================
def email_admin_donor(donor_id, donor_name):
    admins = User.query.filter_by(role="ADMIN").all()
    link = f"{FRONTEND_URL}/admin/donors/{donor_id}"

    for admin in admins:
        send_email(
            admin.email,
            "New Donor Request",
            f"New donor request from {donor_name}\n\nReview:\n{link}"
        )

def email_donor_status(email, status):
    send_email(
        email,
        "Donor Request Update",
        f"Your donor request has been {status.upper()}."
    )

# ================= STAFF LEAVE =================
def email_admin_leave(leave_id, staff_name):
    admins = User.query.filter_by(role="ADMIN").all()
    link = f"{FRONTEND_URL}/admin/staff-leave/{leave_id}"

    for admin in admins:
        send_email(
            admin.email,
            "Staff Leave Request",
            f"{staff_name} requested leave.\n\nReview:\n{link}"
        )

def email_staff_leave_status(email, status):
    send_email(
        email,
        "Leave Request Update",
        f"Your leave request has been {status.upper()}."
    )

# ================= DONATION =================
def email_admin_donation(donation_id, donor_name, donation_type, donation_date):
    admins = User.query.filter_by(role="ADMIN").all()
    link = f"{FRONTEND_URL}/admin/donations/{donation_id}"

    for admin in admins:
        send_email(
            admin.email,
            "New Donation Request 💝",
            f"""
New Donation Request Received

Donor Name: {donor_name}
Donation Type: {donation_type}
Donation Date: {donation_date}

Review donation request:
{link}
"""
        )

def email_donation_status(user_email, donation_type, status):
    send_email(
        user_email,
        "Donation Request Update",
        f"Your {donation_type} donation request has been {status.upper()}."
    )
