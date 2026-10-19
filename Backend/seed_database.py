import os
from datetime import date, datetime, timedelta
from werkzeug.security import generate_password_hash
from app import create_app
from extensions import db
from models import (
    User, Admin, Staff, Donor, Child, ChildPerformance,
    Donation, DonationUsage, AdoptionRequest, StaffLeave,
    StaffTask, OrphanageActivity, Notification
)

app = create_app()

def seed():
    with app.app_context():
        db.session.expire_on_commit = False
        print("[INFO] Starting comprehensive database seeding...", flush=True)

        # 1. Clean existing records safely
        print("[INFO] Cleaning old records...", flush=True)
        try:
            db.session.execute(db.text("SET FOREIGN_KEY_CHECKS = 0"))
            tables = [
                "donation_usage", "donations", "adoption_requests",
                "child_performance", "staff_leaves", "staff_tasks",
                "notifications", "orphanage_activities", "children",
                "staff", "donors", "admins", "orphanage_users"
            ]
            for t in tables:
                db.session.execute(db.text(f"DELETE FROM `{t}`"))
            db.session.execute(db.text("SET FOREIGN_KEY_CHECKS = 1"))
            db.session.commit()
            print("[INFO] Tables cleaned successfully.", flush=True)
        except Exception as e:
            db.session.rollback()
            print("[WARN] Cleanup error:", e, flush=True)

        today = date.today()

        # 2. Seed Users
        print("[INFO] Seeding Users...")
        # Common passwords hashed with Werkzeug
        admin_pass = generate_password_hash("admin123")
        staff_pass = generate_password_hash("staff123")
        donor_pass = generate_password_hash("donor123")
        person_pass = generate_password_hash("person123")

        users_data = [
            # Admins (2)
            {
                "name": "Dr. Ayesha Khan",
                "email": "admin@orphanage.com",
                "password": admin_pass,
                "role": "ADMIN",
                "phone": "+91 9876543210",
                "address": "Orphanage Administrative HQ, Civil Lines, Delhi",
                "status": "active"
            },
            {
                "name": "Rajesh Sharma",
                "email": "admin1@example.com",
                "password": admin_pass,
                "role": "ADMIN",
                "phone": "+91 9876543211",
                "address": "Orphanage Campus Residence 1, Delhi",
                "status": "active"
            },

            # Staff (8)
            {
                "name": "Sunita Verma",
                "email": "sunita.caretaker@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122201",
                "address": "Staff Quarters Block A, Orphanage Campus",
                "status": "active"
            },
            {
                "name": "Ramesh Patel",
                "email": "ramesh.cook@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122202",
                "address": "Near Central Market, Sector 4, Noida",
                "status": "active"
            },
            {
                "name": "Pooja Sharma",
                "email": "pooja.teacher@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122203",
                "address": "Mayur Vihar Phase 1, East Delhi",
                "status": "active"
            },
            {
                "name": "Manoj Tiwari",
                "email": "manoj.sports@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122204",
                "address": "Laxmi Nagar, Delhi",
                "status": "active"
            },
            {
                "name": "Dr. Kavita Joshi",
                "email": "kavita.counselor@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122205",
                "address": "Indirapuram, Ghaziabad",
                "status": "active"
            },
            {
                "name": "Anjali Gupta",
                "email": "anjali.nurse@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122206",
                "address": "Saket, South Delhi",
                "status": "active"
            },
            {
                "name": "Vikram Singh",
                "email": "vikram.security@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122207",
                "address": "Orphanage Campus Security Guard Station",
                "status": "active"
            },
            {
                "name": "Deepak Malhotra",
                "email": "deepak.admin@example.com",
                "password": staff_pass,
                "role": "STAFF",
                "phone": "+91 9811122208",
                "address": "Rohini Sector 9, Delhi",
                "status": "active"
            },

            # Donors (8)
            {
                "name": "Amitabh Roy",
                "email": "amitabh.roy@techinnovations.com",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011101",
                "address": "Cyber City, DLF Phase 2, Gurugram",
                "status": "active"
            },
            {
                "name": "Meera Deshmukh",
                "email": "meera@deshmukhfoundation.org",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011102",
                "address": "Bandra West, Mumbai",
                "status": "active"
            },
            {
                "name": "Vikram Bajaj",
                "email": "bajaj.foods@bajajgroup.in",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011103",
                "address": "Nariman Point, Mumbai",
                "status": "active"
            },
            {
                "name": "Kiran Mazumdar",
                "email": "kiran@biowellness.com",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011104",
                "address": "Koramangala, Bengaluru",
                "status": "active"
            },
            {
                "name": "Rohit Malhotra",
                "email": "rohit@malhotralogistics.com",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011105",
                "address": "Vasant Kunj, New Delhi",
                "status": "active"
            },
            {
                "name": "Harish Narang",
                "email": "harish.csr@tatatrust.org",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011106",
                "address": "Fort, Mumbai",
                "status": "active"
            },
            {
                "name": "Dr. Sanjay Bhatt",
                "email": "dr.bhatt@cityhospital.com",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011107",
                "address": "Connaught Place, New Delhi",
                "status": "active"
            },
            {
                "name": "Priya Nair",
                "email": "priya.nair@lawfirm.in",
                "password": donor_pass,
                "role": "DONOR",
                "phone": "+91 9822011108",
                "address": "Jubilee Hills, Hyderabad",
                "status": "active"
            },

            # Adoption Persons (4)
            {
                "name": "Arun & Neha Mehra",
                "email": "arun.mehra@example.com",
                "password": person_pass,
                "role": "PERSON",
                "phone": "+91 9833011101",
                "address": "Green Park Main, New Delhi",
                "status": "active"
            },
            {
                "name": "Siddharth & Pallavi Joshi",
                "email": "siddharth.joshi@example.com",
                "password": person_pass,
                "role": "PERSON",
                "phone": "+91 9833011102",
                "address": "Aundh, Pune, Maharashtra",
                "status": "active"
            },
            {
                "name": "Rohan & Shalini Kapoor",
                "email": "rohan.kapoor@example.com",
                "password": person_pass,
                "role": "PERSON",
                "phone": "+91 9833011103",
                "address": "Golf Course Road, Gurugram",
                "status": "active"
            },
            {
                "name": "Vivek & Simran Bansal",
                "email": "vivek.bansal@example.com",
                "password": person_pass,
                "role": "PERSON",
                "phone": "+91 9833011104",
                "address": "Sector 17, Chandigarh",
                "status": "active"
            }
        ]

        user_objs = {}
        for u_data in users_data:
            u = User(**u_data)
            db.session.add(u)
            user_objs[u_data["email"]] = u

        db.session.commit()
        print(f"[INFO] Created {len(user_objs)} users.", flush=True)

        # 3. Admins table
        admin_users = [user_objs["admin@orphanage.com"], user_objs["admin1@example.com"]]
        for au in admin_users:
            db.session.add(Admin(user_id=au.user_id))

        # 4. Staff table
        staff_details = [
            ("sunita.caretaker@example.com", "Senior Caretaker", 22000.0, "Excellent", date(2022, 2, 1)),
            ("ramesh.cook@example.com", "Head Chef & Nutritionist", 20000.0, "Good", date(2022, 4, 15)),
            ("pooja.teacher@example.com", "Senior Primary Teacher", 26000.0, "Excellent", date(2021, 7, 10)),
            ("manoj.sports@example.com", "Sports & Activities Coach", 21000.0, "Good", date(2023, 1, 5)),
            ("kavita.counselor@example.com", "Child Psychologist / Counselor", 32000.0, "Excellent", date(2021, 10, 1)),
            ("anjali.nurse@example.com", "Resident Nurse & Health Officer", 25000.0, "Excellent", date(2022, 8, 12)),
            ("vikram.security@example.com", "Head of Campus Security", 19000.0, "Good", date(2023, 3, 20)),
            ("deepak.admin@example.com", "Administrative & Accounts Assistant", 24000.0, "Average", date(2022, 11, 1)),
        ]
        staff_objs = []
        for email, desig, sal, perf, join_date in staff_details:
            u = user_objs[email]
            st = Staff(
                user_id=u.user_id,
                designation=desig,
                salary=sal,
                performance=perf,
                joining_date=join_date
            )
            db.session.add(st)
            staff_objs.append(st)

        # 5. Donors table
        donor_details = [
            ("amitabh.roy@techinnovations.com", "Tech Innovations Ltd", "Software Architect", "approved"),
            ("meera@deshmukhfoundation.org", "Deshmukh Charitable Foundation", "Philanthropist", "approved"),
            ("bajaj.foods@bajajgroup.in", "Bajaj Food Products Pvt Ltd", "Managing Director", "approved"),
            ("kiran@biowellness.com", "BioWellness Laboratories", "Healthcare Entrepreneur", "approved"),
            ("rohit@malhotralogistics.com", "Malhotra Logistics & Transport", "Business Owner", "approved"),
            ("harish.csr@tatatrust.org", "Tata Community Initiatives", "CSR Lead Officer", "approved"),
            ("dr.bhatt@cityhospital.com", "City Multi-Speciality Hospital", "Chief Pediatrician", "approved"),
            ("priya.nair@lawfirm.in", "Nair & Associates Legal Services", "Senior Corporate Partner", "approved"),
        ]
        donor_objs = []
        for email, comp, prof, status in donor_details:
            u = user_objs[email]
            dn = Donor(
                user_id=u.user_id,
                company_name=comp,
                profession=prof,
                approval_status=status
            )
            db.session.add(dn)
            donor_objs.append(dn)

        db.session.commit()
        print(f"[INFO] Created {len(staff_objs)} staff and {len(donor_objs)} donors.", flush=True)

        # 6. Seed Children (16 children mapped cleanly to child_1.png .. child_16.png)
        print("[INFO] Seeding 16 Children...", flush=True)
        children_data = [
            ("Aarav Sharma", "Male", date(2016, 4, 12), date(2022, 3, 15), "Grade 4", "Healthy", "Excellent", "available", "child_1.png"),
            ("Ananya Patel", "Female", date(2017, 8, 20), date(2022, 6, 10), "Grade 3", "Healthy", "Good", "available", "child_2.png"),
            ("Kabir Verma", "Male", date(2015, 11, 5), date(2021, 9, 1), "Grade 5", "Healthy", "Excellent", "available", "child_3.png"),
            ("Diya Sen", "Female", date(2018, 2, 14), date(2023, 1, 18), "Grade 2", "Good", "Good", "available", "child_4.png"),
            ("Rohan Gupta", "Male", date(2014, 6, 25), date(2020, 8, 12), "Grade 6", "Healthy", "Excellent", "adopted", "child_5.png"),
            ("Isha Nair", "Female", date(2019, 9, 30), date(2023, 5, 11), "Grade 1", "Good", "Average", "available", "child_6.png"),
            ("Vivaan Joshi", "Male", date(2016, 12, 3), date(2022, 4, 20), "Grade 4", "Healthy", "Good", "available", "child_7.png"),
            ("Tara Kapoor", "Female", date(2017, 3, 18), date(2022, 7, 5), "Grade 3", "Healthy", "Excellent", "available", "child_8.png"),
            ("Aditya Rao", "Male", date(2015, 5, 22), date(2021, 11, 14), "Grade 5", "Healthy", "Good", "adopted", "child_9.png"),
            ("Riya Mehta", "Female", date(2018, 10, 9), date(2023, 2, 28), "Grade 2", "Healthy", "Average", "available", "child_10.png"),
            ("Aryan Singh", "Male", date(2014, 1, 15), date(2020, 4, 10), "Grade 7", "Healthy", "Excellent", "available", "child_11.png"),
            ("Meera Reddy", "Female", date(2019, 7, 12), date(2023, 9, 1), "Nursery", "Good", "Good", "available", "child_12.png"),
            ("Reyansh Das", "Male", date(2016, 9, 28), date(2022, 10, 15), "Grade 4", "Healthy", "Good", "available", "child_13.png"),
            ("Tanvi Deshmukh", "Female", date(2017, 11, 19), date(2022, 12, 5), "Grade 3", "Healthy", "Excellent", "available", "child_14.png"),
            ("Dev Kulkarni", "Male", date(2015, 3, 8), date(2021, 7, 22), "Grade 5", "Healthy", "Good", "adopted", "child_15.png"),
            ("Pari Chopra", "Female", date(2018, 5, 30), date(2023, 4, 15), "Grade 2", "Healthy", "Good", "available", "child_16.png")
        ]

        child_objs = []
        for name, gender, dob, adm, edu, hlth, perf, stat, img in children_data:
            ch = Child(
                name=name,
                gender=gender,
                date_of_birth=dob,
                admission_date=adm,
                education_level=edu,
                health_status=hlth,
                overall_performance=perf,
                status=stat,
                image=img
            )
            db.session.add(ch)
            child_objs.append(ch)

        db.session.commit()
        print(f"[INFO] Created {len(child_objs)} children.", flush=True)

        # 7. Seed Child Performance
        print("[INFO] Seeding Child Performance...", flush=True)
        remarks_pool = [
            "Outstanding performance in science and mathematics. Very active and helpful classmate.",
            "Consistently tops in English storytelling and fine arts. Shows strong leadership potential.",
            "Excellent regular attendance and enthusiastic participation in sports day games.",
            "Great discipline, polite manners, and notable progress in reading comprehension.",
            "Very talented in singing, drawing, and stage drama. Loved by peers and teachers.",
            "Dedicated student with high curiosity. Actively completes all library assignments."
        ]
        for idx, ch in enumerate(child_objs):
            # 2025 performance
            p1 = ChildPerformance(
                child_id=ch.child_id,
                year=2025,
                marks=80 + (idx % 18),
                attendance=90 + (idx % 9),
                remarks=remarks_pool[idx % len(remarks_pool)],
                image=ch.image
            )
            # 2026 performance
            p2 = ChildPerformance(
                child_id=ch.child_id,
                year=2026,
                marks=83 + ((idx + 3) % 15),
                attendance=92 + ((idx + 2) % 7),
                remarks=remarks_pool[(idx + 2) % len(remarks_pool)],
                image=ch.image
            )
            db.session.add(p1)
            db.session.add(p2)

        # 8. Seed Donations
        print("[INFO] Seeding Donations...", flush=True)
        # Relative dates to ensure weekly, monthly, yearly donations are all active!
        donations_plan = [
            # Recent: within last 7 days (weekly)
            (donor_objs[0], "Money", 25000.0, "UPI", None, None, None, None, None, "Monthly support for children education fund", today - timedelta(days=2), "approved"),
            (donor_objs[1], "Money", 50000.0, "Bank Transfer", None, None, None, None, None, "Quarterly sponsorship for nutritious meals", today - timedelta(days=4), "approved"),
            (donor_objs[2], "Food", None, None, 150, "Veg", None, None, None, "Fresh fruits, vegetables, and pulses for 150 meals", today - timedelta(days=3), "received"),
            (donor_objs[3], "Clothes", None, None, None, None, 60, "School Uniforms & Shoes", None, "Full sets of new school uniforms for primary grade kids", today - timedelta(days=5), "received"),

            # Earlier in the current month (monthly)
            (donor_objs[4], "Money", 15000.0, "UPI", None, None, None, None, None, "Medical and regular health checkup assistance", today - timedelta(days=12), "approved"),
            (donor_objs[5], "Money", 75000.0, "Bank Transfer", None, None, None, None, None, "Tata CSR grant for library books & digital tablets", today - timedelta(days=16), "approved"),
            (donor_objs[6], "Money", 30000.0, "Credit Card", None, None, None, None, None, "Donation for pediatric medicines and first aid supplies", today - timedelta(days=20), "approved"),
            (donor_objs[7], "Clothes", None, None, None, None, 45, "Winter Sweaters & Blankets", None, "Warm woolens for winter season protection", today - timedelta(days=22), "received"),

            # Earlier this year (yearly)
            (donor_objs[0], "Money", 35000.0, "Bank Transfer", None, None, None, None, None, "Annual stationery, sports kits and notebooks support", today - timedelta(days=60), "approved"),
            (donor_objs[1], "Money", 100000.0, "Bank Transfer", None, None, None, None, None, "Special scholarship fund for high school transition", today - timedelta(days=90), "approved"),
            (donor_objs[2], "Food", None, None, 200, "Veg", None, None, None, "Wheat flour, rice, lentils, and cooking oil supplies", today - timedelta(days=75), "received"),
            (donor_objs[3], "Money", 20000.0, "UPI", None, None, None, None, None, "Sports festival celebration & trophies sponsorship", today - timedelta(days=110), "approved"),
            (donor_objs[4], "Other", None, None, None, None, None, None, "10 Computer Tablets for Online Learning", "Interactive learning devices with educational software preloaded", today - timedelta(days=80), "approved"),
            (donor_objs[5], "Money", 60000.0, "Bank Transfer", None, None, None, None, None, "Staff healthcare & teacher enrichment training allowance", today - timedelta(days=130), "approved"),
            (donor_objs[6], "Money", 18000.0, "UPI", None, None, None, None, None, "Dentistry and vision checkup clinic sponsorship", today - timedelta(days=150), "approved"),
            (donor_objs[7], "Money", 40000.0, "Credit Card", None, None, None, None, None, "Campus playground renovation and equipment fund", today - timedelta(days=180), "approved"),
        ]

        donation_objs = []
        for dn_entry in donations_plan:
            d_obj = Donation(
                donor_id=dn_entry[0].donor_id,
                donation_type=dn_entry[1],
                amount=dn_entry[2],
                payment_method=dn_entry[3],
                food_count=dn_entry[4],
                food_type=dn_entry[5],
                clothes_count=dn_entry[6],
                clothes_type=dn_entry[7],
                other_details=dn_entry[8],
                message=dn_entry[9],
                donation_date=dn_entry[10],
                status=dn_entry[11]
            )
            db.session.add(d_obj)
            donation_objs.append(d_obj)

        db.session.commit()
        print(f"[INFO] Created {len(donation_objs)} donations.", flush=True)

        # 9. Seed Donation Usage (for performance charts: weekly, monthly, yearly)
        print("[INFO] Seeding Donation Usage...", flush=True)
        usage_plan = [
            # Recent: past 7 days (weekly)
            (donation_objs[0], "education", 12000.0, today - timedelta(days=1)),
            (donation_objs[1], "food", 18000.0, today - timedelta(days=3)),
            (donation_objs[0], "medical", 6500.0, today - timedelta(days=5)),

            # Earlier this month (monthly)
            (donation_objs[4], "education", 15000.0, today - timedelta(days=14)),
            (donation_objs[5], "salary", 25000.0, today - timedelta(days=18)),
            (donation_objs[6], "medical", 14000.0, today - timedelta(days=21)),
            (donation_objs[1], "food", 22000.0, today - timedelta(days=25)),

            # Earlier this year (yearly)
            (donation_objs[8], "education", 28000.0, today - timedelta(days=65)),
            (donation_objs[9], "education", 45000.0, today - timedelta(days=95)),
            (donation_objs[10], "food", 32000.0, today - timedelta(days=78)),
            (donation_objs[11], "salary", 20000.0, today - timedelta(days=115)),
            (donation_objs[13], "salary", 40000.0, today - timedelta(days=135)),
            (donation_objs[14], "medical", 16000.0, today - timedelta(days=155)),
            (donation_objs[15], "education", 25000.0, today - timedelta(days=185))
        ]

        for d_target, category, amt, u_date in usage_plan:
            u_rec = DonationUsage(
                donation_id=d_target.donation_id,
                used_for=category,
                amount_used=amt,
                used_date=u_date
            )
            db.session.add(u_rec)

        # 10. Seed Adoption Requests
        print("[INFO] Seeding Adoption Requests...", flush=True)
        person_users = [
            user_objs["arun.mehra@example.com"],
            user_objs["siddharth.joshi@example.com"],
            user_objs["rohan.kapoor@example.com"],
            user_objs["vivek.bansal@example.com"]
        ]

        adoption_data = [
            (person_users[0], child_objs[4], today - timedelta(days=40), "approved", "Comprehensive home background investigation verified. All criteria met and approved by child welfare committee."),
            (person_users[1], child_objs[8], today - timedelta(days=25), "approved", "Legal documentation and financial stability checks cleared successfully."),
            (person_users[2], child_objs[14], today - timedelta(days=10), "approved", "Formal adoption decree granted. Child successfully placed with loving adoptive family."),
            (person_users[0], child_objs[0], today + timedelta(days=5), "pending", "Initial interview scheduled for next week. Awaiting police verification clearance."),
            (person_users[1], child_objs[1], today + timedelta(days=12), "pending", "Counseling session in progress. Documentation under review by admin committee."),
            (person_users[3], child_objs[2], today - timedelta(days=15), "rejected", "Application rejected due to incomplete income tax documentation and temporary residence status."),
            (person_users[2], child_objs[6], today + timedelta(days=8), "pending", "Interactive family meeting scheduled at the orphanage reception center.")
        ]

        for p_user, ch, meet_date, stat, remark in adoption_data:
            ad = AdoptionRequest(
                user_id=p_user.user_id,
                child_id=ch.child_id,
                meeting_date=meet_date,
                status=stat,
                admin_remark=remark,
                request_date=datetime.utcnow() - timedelta(days=15)
            )
            db.session.add(ad)

        # 11. Seed Staff Tasks
        print("[INFO] Seeding Staff Tasks...", flush=True)
        tasks_data = [
            (staff_objs[0], "Morning Routine & Health Check", "Ensure all dormitories are sanitized and children have completed breakfast and uniform inspection.", "completed", today - timedelta(days=1)),
            (staff_objs[0], "Laundry & Wardrobe Organizing", "Supervise seasonal clothing distribution and winter linen wash.", "pending", today + timedelta(days=3)),
            (staff_objs[1], "Weekly Kitchen Hygiene Audit", "Deep clean pantry, inspect food grain safety, and plan weekly balanced menu.", "completed", today - timedelta(days=2)),
            (staff_objs[1], "Special Sunday Feast Preparation", "Prepare wholesome paneer, kheer, and seasonal fruits menu for festive lunch.", "pending", today + timedelta(days=4)),
            (staff_objs[2], "Mid-Term Progress Card Finalization", "Collate term evaluation marks and prepare parent-teacher progress sheets.", "completed", today - timedelta(days=5)),
            (staff_objs[2], "Science Exhibition Project Mentorship", "Guide primary students with working volcano and solar system science models.", "pending", today + timedelta(days=7)),
            (staff_objs[3], "Inter-Orphanage Badminton Tournament", "Prepare court markings, string racquets, and finalize student participation roster.", "pending", today + timedelta(days=6)),
            (staff_objs[4], "Individual Child Emotional Counseling", "Conduct 1-on-1 counseling check-ins for newly admitted children to aid smooth acclimatization.", "completed", today - timedelta(days=3)),
            (staff_objs[5], "Bi-Monthly Pediatric Immunization Camp", "Coordinate routine vaccinations and height/weight growth index documentation.", "completed", today - timedelta(days=4)),
            (staff_objs[5], "First Aid Supplies Inventory Restock", "Order emergency antiseptic creams, bandages, and multivitamin supplements.", "pending", today + timedelta(days=2)),
            (staff_objs[6], "CCTV & Security Perimeter Inspection", "Inspect boundary lighting, gate log registers, and fire extinguisher expiry tags.", "completed", today - timedelta(days=2)),
            (staff_objs[7], "Monthly Accounts & Utility Bill Filing", "Verify water, electricity, and pantry grocery invoices against monthly budget.", "pending", today + timedelta(days=5))
        ]

        for st, title, desc, stat, d_date in tasks_data:
            stk = StaffTask(
                staff_id=st.staff_id,
                title=title,
                description=desc,
                status=stat,
                due_date=d_date
            )
            db.session.add(stk)

        # 12. Seed Staff Leaves
        print("[INFO] Seeding Staff Leaves...", flush=True)
        leaves_data = [
            (staff_objs[0], today - timedelta(days=10), "Family Wedding Leave", "Attending niece's marriage ceremony in native village.", "approved"),
            (staff_objs[1], today - timedelta(days=5), "Medical Rest Leave", "Recovering from viral flu under doctor's advisory rest.", "approved"),
            (staff_objs[2], today + timedelta(days=8), "Higher Education Exam Leave", "Appearing for B.Ed semester practical examinations.", "pending"),
            (staff_objs[4], today - timedelta(days=20), "Personal Urgent Work", "Property documentation registration in home town.", "approved"),
            (staff_objs[5], today + timedelta(days=14), "Annual Family Leave", "Visiting elderly parents in Himachal Pradesh.", "pending")
        ]

        for st, l_date, subj, reason, stat in leaves_data:
            sl = StaffLeave(
                staff_id=st.staff_id,
                leave_date=l_date,
                subject=subj,
                reason=reason,
                status=stat
            )
            db.session.add(sl)

        # 13. Seed Orphanage Activities
        print("[INFO] Seeding Orphanage Activities...", flush=True)
        activities_data = [
            ("Annual Sports Meet 2026", "sports", today - timedelta(days=30), "Exciting 100m sprint, relay race, tug-of-war, and football championship with trophy distribution."),
            ("Yoga & Mindfulness Morning Workshop", "sports", today - timedelta(days=12), "Interactive breathing exercises, surya namaskar, and guided meditation for holistic wellness."),
            ("Diwali & Eid Joy of Giving Celebration", "cultural", today - timedelta(days=45), "Grand festive evening with cultural dance, diya decoration, traditional drama, and special sweets feast."),
            ("Art, Clay Modeling & Craft Fair", "cultural", today - timedelta(days=18), "Creative exhibition showcasing hand-painted canvases, ceramic clay pots, and handmade greeting cards."),
            ("Music & Folk Dance Talent Show", "cultural", today + timedelta(days=15), "Vibrant inter-house classical music, tabla recital, and energetic group folk dance performances."),
            ("Independence Day Flag Hoisting & Parade", "national", today - timedelta(days=70), "Patriotic celebration with national flag hoisting, ceremonial march-past, and freedom fighter enactments."),
            ("Republic Day Cultural & Drama Fest", "national", today - timedelta(days=90), "Recitation of Indian Constitution preamble, patriotic poetry recital, and student awards presentation."),
            ("Inter-School Science & Robotics Fair", "cultural", today + timedelta(days=25), "Interactive science models, robotics basics workshop, and quiz contest with visiting school teams.")
        ]

        for name, a_type, a_date, desc in activities_data:
            act = OrphanageActivity(
                activity_name=name,
                activity_type=a_type,
                activity_date=a_date,
                description=desc
            )
            db.session.add(act)

        # 14. Seed Notifications
        print("[INFO] Seeding Notifications...", flush=True)
        notifs_data = [
            (admin_users[0].user_id, "New adoption request received from Arun & Neha Mehra for Aarav Sharma.", "system", "sent"),
            (admin_users[0].user_id, "Donation of ₹50,000 received via Bank Transfer from Deshmukh Foundation.", "email", "read"),
            (admin_users[1].user_id, "Staff leave request submitted by Pooja Sharma for exam dates.", "system", "sent"),
            (staff_objs[0].user_id, "Your leave request for Family Wedding was approved by Admin.", "system", "read"),
            (staff_objs[2].user_id, "Reminder: Submit mid-term student performance cards before the upcoming weekend.", "email", "sent"),
            (staff_objs[5].user_id, "Monthly pediatric health camp schedule has been confirmed for Friday.", "system", "sent"),
            (donor_objs[0].user_id, "Thank you! Your donation of ₹25,000 has been verified. Tax exemption certificate issued.", "email", "read"),
            (person_users[0].user_id, "Your meeting date for child adoption counseling has been confirmed.", "email", "sent")
        ]

        for u_id, msg, n_type, stat in notifs_data:
            notif = Notification(
                user_id=u_id,
                message=msg,
                type=n_type,
                status=stat,
                created_at=datetime.utcnow() - timedelta(hours=12)
            )
            db.session.add(notif)

        db.session.commit()
        print("[SUCCESS] All records committed successfully! Database is now richly populated.", flush=True)

if __name__ == "__main__":
    seed()
