create database orphanage_db;
CREATE TABLE orphanage_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','DONOR','STAFF','PERSON') NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-----------------------
-- Users: Admin, Staff, Donor, Person
-- --------------------
INSERT INTO orphanage_users (name, email, password, role, phone, address) VALUES
('Admin One','admin1@example.com','hashedpassword','ADMIN','1234567890','Orphanage HQ'),
('Admin Two','admin2@example.com','hashedpassword','ADMIN','1234567891','Orphanage HQ');

-- Staff (10)
INSERT INTO orphanage_users (name, email, password, role, phone, address) VALUES
('Staff One','staff1@example.com','hashedpassword','STAFF','1111111111','Orphanage'),
('Staff Two','staff2@example.com','hashedpassword','STAFF','1111111112','Orphanage'),
('Staff Three','staff3@example.com','hashedpassword','STAFF','1111111113','Orphanage'),
('Staff Four','staff4@example.com','hashedpassword','STAFF','1111111114','Orphanage'),
('Staff Five','staff5@example.com','hashedpassword','STAFF','1111111115','Orphanage'),
('Staff Six','staff6@example.com','hashedpassword','STAFF','1111111116','Orphanage'),
('Staff Seven','staff7@example.com','hashedpassword','STAFF','1111111117','Orphanage'),
('Staff Eight','staff8@example.com','hashedpassword','STAFF','1111111118','Orphanage'),
('Staff Nine','staff9@example.com','hashedpassword','STAFF','1111111119','Orphanage'),
('Staff Ten','staff10@example.com','hashedpassword','STAFF','1111111120','Orphanage');
insert into staff values(41,'Staff eleven','staff11@example.com','77769','STAFF','1111111120','Orphanage');

-- Donors (15)
INSERT INTO orphanage_users (name, email, password, role, phone, address) VALUES
('Donor One','donor1@example.com','hashedpassword','DONOR','2221111111','City A'),
('Donor Two','donor2@example.com','hashedpassword','DONOR','2221111112','City B'),
('Donor Three','donor3@example.com','hashedpassword','DONOR','2221111113','City C'),
('Donor Four','donor4@example.com','hashedpassword','DONOR','2221111114','City D'),
('Donor Five','donor5@example.com','hashedpassword','DONOR','2221111115','City E'),
('Donor Six','donor6@example.com','hashedpassword','DONOR','2221111116','City F'),
('Donor Seven','donor7@example.com','hashedpassword','DONOR','2221111117','City G'),
('Donor Eight','donor8@example.com','hashedpassword','DONOR','2221111118','City H'),
('Donor Nine','donor9@example.com','hashedpassword','DONOR','2221111119','City I'),
('Donor Ten','donor10@example.com','hashedpassword','DONOR','2221111120','City J'),
('Donor Eleven','donor11@example.com','hashedpassword','DONOR','2221111121','City K'),
('Donor Twelve','donor12@example.com','hashedpassword','DONOR','2221111122','City L'),
('Donor Thirteen','donor13@example.com','hashedpassword','DONOR','2221111123','City M'),
('Donor Fourteen','donor14@example.com','hashedpassword','DONOR','2221111124','City N'),
('Donor Fifteen','donor15@example.com','hashedpassword','DONOR','2221111125','City O');

-- Persons (optional, for adoption requests etc)
INSERT INTO orphanage_users (name, email, password, role) VALUES
('Person One','person1@example.com','hashedpassword','PERSON'),
('Person Two','person2@example.com','hashedpassword','PERSON'),
('Person Three','person3@example.com','hashedpassword','PERSON');
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES orphanage_users(user_id)
        ON DELETE CASCADE
);
-- --------------------
-- Admins table
-- --------------------
INSERT INTO admins (user_id) VALUES (1),(2);
CREATE TABLE children (
    child_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender ENUM('Male','Female','Other'),
    date_of_birth DATE,
    admission_date DATE,
    education_level VARCHAR(100),
    health_status VARCHAR(100),
    overall_performance VARCHAR(50),
    status ENUM('available','adopted') DEFAULT 'available'
);
-- --------------------
-- Children table (50)
-- --------------------
INSERT INTO children
(name, gender, date_of_birth, admission_date, education_level, health_status, overall_performance, status, image)
VALUES
('Child 1','Male','2014-01-10','2023-01-01','Primary','Good','Good','available','children/child_1.png'),

('Child 2','Female','2014-02-12','2023-01-03','Primary','Good','Good','available','children/child_2.png'),

('Child 3','Male','2013-03-15','2023-01-05','Primary','Average','Good','available','children/child_3.png'),

('Child 4','Female','2015-04-18','2023-01-07','Primary','Good','Excellent','available','children/child_4.png'),

('Child 5','Male','2016-05-20','2023-01-09','Nursery','Good','Good','available','children/child_5.png'),

('Child 6','Female','2015-06-22','2023-01-11','Primary','Average','Good','available','children/child_6.png'),

('Child 7','Male','2014-07-25','2023-01-13','Primary','Good','Excellent','available','children/child_7.png'),

('Child 8','Female','2016-08-27','2023-01-15','Nursery','Good','Good','available','children/child_8.png'),

('Child 9','Male','2013-09-10','2023-01-17','Primary','Average','Average','available','children/child_9.png'),

('Child 10','Female','2014-10-12','2023-01-19','Primary','Good','Excellent','available','children/child_10.png'),

('Child 11','Male','2015-11-14','2023-01-21','Primary','Good','Good','available','children/child_11.png'),

('Child 12','Female','2016-12-16','2023-01-23','Nursery','Good','Good','available','children/child_12.png'),

('Child 13','Male','2013-01-18','2023-01-25','Primary','Average','Good','available','children/child_13.png'),

('Child 14','Female','2014-02-20','2023-01-27','Primary','Good','Excellent','available','children/child_14.png'),

('Child 15','Male','2015-03-22','2023-01-29','Primary','Good','Good','available','children/child_15.png');

CREATE TABLE child_performance (
    performance_id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    year YEAR NOT NULL,
    marks INT,
    attendance INT,
    remarks TEXT,
    image VARCHAR(255),   -- same child image
    FOREIGN KEY (child_id) REFERENCES children(child_id)
        ON DELETE CASCADE
);



CREATE TABLE adoption_requests (
    adoption_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    child_id INT NOT NULL,
    meeting_date DATE,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    admin_remark TEXT,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES orphanage_users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (child_id) REFERENCES children(child_id)
        ON DELETE CASCADE
);
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    designation VARCHAR(100),
    salary DECIMAL(10,2),
    joining_date DATE,
    status ENUM('active','inactive') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES orphanage_users(user_id)
);
ALTER TABLE staff
ADD COLUMN performance VARCHAR(50);

CREATE TABLE staff_leaves (
    leave_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    leave_date DATE NOT NULL,
    subject VARCHAR(150) NOT NULL,
    reason TEXT,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
drop table staff_leaves;
select * from notifications where user_id=7;
select * from staff_leaves;
CREATE TABLE donors (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(100),
    profession VARCHAR(100),
    approval_status ENUM('pending','approved','rejected') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES orphanage_users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE staff_tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('pending','completed') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
        
);

CREATE TABLE donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    donation_type ENUM('Money','Food','Clothes','Other') NOT NULL,

    -- Money
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),

    -- Food
    food_count INT,
    food_type ENUM('Veg','Non-Veg'),

    -- Clothes
    clothes_count INT,
    clothes_type VARCHAR(100),

    -- Other
    other_details TEXT,

    message TEXT,
    donation_date DATE,
    status ENUM('pending','approved','rejected','received') DEFAULT 'pending',

    FOREIGN KEY (donor_id) REFERENCES donors(donor_id)
        ON DELETE CASCADE
);

CREATE TABLE donation_usage (
    usage_id INT AUTO_INCREMENT PRIMARY KEY,
    donation_id INT NOT NULL,
    used_for ENUM('education','food','medical','salary'),
    amount_used DECIMAL(10,2),
    used_date DATE,
    FOREIGN KEY (donation_id) REFERENCES donations(donation_id)
);
drop table donation_usage;
CREATE TABLE orphanage_activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_name VARCHAR(100),
    activity_type ENUM('sports','cultural','national'),
    activity_date DATE,
    description TEXT
);
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT,
    type ENUM('email','system'),
    status ENUM('sent','read') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES orphanage_users(user_id)
        ON DELETE CASCADE
);
ALTER TABLE children
ADD COLUMN image VARCHAR(255);

select * from orphanage_users;

ALTER TABLE Staff
ADD COLUMN performance FLOAT DEFAULT 0;






-- --------------------
-- Staff table
-- --------------------
INSERT INTO staff (user_id, designation, salary, joining_date) VALUES
(3,'Caretaker',20000,'2023-01-01'),
(4,'Cook',18000,'2023-01-15'),
(5,'Teacher',22000,'2023-02-01'),
(6,'Cleaner',17000,'2023-02-10'),
(7,'Helper',18000,'2023-03-01'),
(8,'Nurse',25000,'2023-03-15'),
(9,'Driver',19000,'2023-04-01'),
(10,'Security',18000,'2023-04-10'),
(11,'Accountant',24000,'2023-05-01'),
(12,'Assistant',20000,'2023-05-15');


-- --------------------
-- Donors table
-- --------------------
INSERT INTO donors (user_id, company_name, profession, approval_status) VALUES
(13,'ABC Corp','Business','approved'),
(14,'XYZ Ltd','Entrepreneur','approved'),
(15,'Foodies Inc','Chef','approved'),
(16,'Happy Org','Philanthropist','approved'),
(17,'Kind Hearts','Business','approved'),
(18,'Generous Ltd','Entrepreneur','approved'),
(19,'Donors United','Business','approved'),
(20,'Charity Co','Philanthropist','approved'),
(21,'Helping Hands','Business','approved'),
(22,'Goodwill Inc','Entrepreneur','approved'),
(23,'Kindness Corp','Chef','approved'),
(24,'Hope Ltd','Business','approved'),
(25,'Smile Org','Entrepreneur','approved'),
(26,'Bright Hearts','Business','approved'),
(27,'Care Inc','Philanthropist','approved');

-- --------------------
-- Donations (mix of money & clothes)
-- --------------------
INSERT INTO donations 
(donor_id, donation_type, amount, payment_method, clothes_count, clothes_type, message, donation_date, status)
VALUES
(1, 'Money', 1000.00, 'UPI', NULL, NULL, 'Keep up the good work', '2023-06-01', 'approved'),
(2, 'Money', 500.00, 'Credit Card', NULL, NULL, 'Happy to help', '2023-06-03', 'approved'),
(3, 'Clothes', NULL, NULL, 10, 'T-Shirts', 'For the children', '2023-06-05', 'approved'),
(4, 'Money', 1500.00, 'Bank Transfer', NULL, NULL, 'Donation', '2023-06-06', 'pending'),
(5, 'Clothes', NULL, NULL, 5, 'Jackets', 'Winter wear', '2023-06-07', 'approved'),
(6, 'Money', 2000.00, 'UPI', NULL, NULL, 'Support education', '2023-06-08', 'approved'),
(7, 'Clothes', NULL, NULL, 20, 'Shoes', 'For children', '2023-06-09', 'pending'),
(8, 'Money', 750.00, 'Credit Card', NULL, NULL, 'Medical support', '2023-06-10', 'approved'),
(9, 'Clothes', NULL, NULL, 15, 'School Uniforms', 'School uniforms', '2023-06-11', 'approved'),
(10, 'Money', 1200.00, 'UPI', NULL, NULL, 'For orphanage needs', '2023-06-12', 'approved'),
(11, 'Clothes', NULL, NULL, 8, 'Sweaters', 'Winter donation', '2023-06-13', 'rejected'),
(12, 'Money', 1800.00, 'Bank Transfer', NULL, NULL, 'General donation', '2023-06-14', 'approved'),
(13, 'Clothes', NULL, NULL, 12, 'Shoes', 'Sports activity', '2023-06-15', 'approved'),
(14, 'Money', 600.00, 'Credit Card', NULL, NULL, 'Happy to contribute', '2023-06-16', 'pending'),
(15, 'Clothes', NULL, NULL, 25, 'T-Shirts', 'Clothes donation', '2023-06-17', 'approved');

-- ---------------------------
-- Adoption Requests (15 entries)
-- ---------------------------
INSERT INTO adoption_requests (user_id, child_id, meeting_date, status, admin_remark)
VALUES
(16, 17, '2023-06-05', 'approved', 'All documents verified'),
(17, 18, '2023-06-10', 'pending', NULL),
(18, 19, '2023-07-01', 'rejected', 'Does not meet criteria'),
(19, 20, '2023-07-15', 'approved', 'Family background OK'),
(20, 21, '2023-08-03', 'pending', NULL),
(21, 22, '2023-08-20', 'approved', 'Documents verified'),
(22, 23, '2023-09-05', 'rejected', 'Incomplete application'),
(23, 24, '2023-09-15', 'pending', NULL),
(24, 25, '2023-10-01', 'approved', 'All good'),
(25, 26, '2023-10-10', 'pending', NULL),
(26, 27, '2023-11-05', 'approved', 'Approved by admin'),
(27, 28, '2023-11-20', 'rejected', 'Not eligible'),
(28, 29, '2023-12-01', 'approved', 'Background check done'),
(29, 30, '2023-12-15', 'pending', NULL),
(30, 17, '2024-01-05', 'approved', 'Approved, ready for adoption');

-- ---------------------------
-- Notifications for Staff (sample)
-- ---------------------------

INSERT INTO notifications (user_id, message, type, status, created_at)
VALUES
(3, 'Your leave request has been approved.', 'system', 'read', '2024-01-05 09:30:00'),
(3, 'Monthly performance report is available.', 'email', 'sent', '2024-01-10 14:15:00'),

(4, 'New child assigned for monitoring.', 'system', 'sent', '2024-01-07 10:00:00'),
(4, 'Salary updated for the month.', 'email', 'read', '2024-01-08 11:45:00'),

(5, 'Leave request pending approval.', 'system', 'sent', '2024-01-03 08:00:00'),
(5, 'Staff meeting scheduled on 2024-01-15.', 'email', 'sent', '2024-01-04 15:20:00'),

(6, 'Performance review completed.', 'system', 'read', '2024-01-06 16:00:00'),
(6, 'Reminder: Submit daily report.', 'email', 'sent', '2024-01-09 09:10:00'),

(7, 'New activity assigned for children.', 'system', 'sent', '2024-01-05 13:30:00'),
(7, 'Salary credited for the month.', 'email', 'read', '2024-01-12 10:25:00'),

(8, 'Leave request approved.', 'system', 'read', '2024-01-08 12:00:00'),
(8, 'Submit attendance report.', 'email', 'sent', '2024-01-10 09:45:00'),

(9, 'New donor assigned for follow-up.', 'system', 'sent', '2024-01-06 14:30:00'),
(9, 'Monthly donation summary available.', 'email', 'sent', '2024-01-11 15:00:00'),

(10, 'Reminder: Children health check tomorrow.', 'system', 'sent', '2024-01-07 10:30:00'),
(10, 'Salary increment approved.', 'email', 'read', '2024-01-13 11:15:00'),

(11, 'Staff training scheduled.', 'system', 'sent', '2024-01-09 09:00:00'),
(11, 'Submit activity report.', 'email', 'sent', '2024-01-12 14:50:00'),

(12, 'Leave request rejected.', 'system', 'read', '2024-01-05 08:45:00'),
(12, 'Reminder: Update child progress.', 'email', 'sent', '2024-01-10 13:20:00');
select * from notifications;
INSERT INTO child_performance
(child_id, year, marks, attendance, remarks, image)
SELECT
child_id,
2023,
80,
90,
'Good',
image
FROM children
LIMIT 15;
INSERT INTO staff_tasks (staff_id, title, description, status, due_date) VALUES
(1,'Attendance','Mark daily attendance','pending','2026-01-22'),
(2,'Kitchen Check','Check kitchen hygiene','completed','2026-01-18'),
(3,'Medical Report','Prepare medical report','pending','2026-01-28'),
(1,'Inventory','Update store inventory','completed','2026-01-15'),
(2,'Counseling','Child counseling session','pending','2026-02-01'),
(3,'School Visit','Visit nearby school','pending','2026-01-26'),
(1,'Donation Record','Update donation records','completed','2026-01-14'),
(2,'Food Distribution','Distribute food','completed','2026-01-16'),
(3,'Health Camp','Arrange health camp','pending','2026-02-05'),
(1,'Cleaning','Supervise cleaning','completed','2026-01-13'),
(2,'Staff Meeting','Attend staff meeting','pending','2026-01-24'),
(3,'Exam Prep','Help children prepare exams','pending','2026-02-10'),
(1,'Maintenance','Check building maintenance','pending','2026-01-30'),
(2,'Uniform Check','Check uniforms','completed','2026-01-12'),
(3,'Library Update','Arrange library books','pending','2026-02-03');
select * from staff;
INSERT INTO donation_usage (donation_id, used_for, amount_used, used_date) VALUES
(1, 'education', 500.00, '2023-06-10'),
(2, 'food', 300.00, '2023-06-12'),
(3, 'clothes', 0.00, '2023-06-15'),  -- clothes counted, not money
(4, 'education', 1000.00, '2023-06-20'),
(5, 'food', 200.00, '2023-06-22'),
(6, 'salary', 1500.00, '2023-06-25'),
(7, 'medical', 0.00, '2023-06-28'),
(8, 'education', 750.00, '2023-07-01'),
(9, 'clothes', 0.00, '2023-07-03'),
(10, 'food', 1200.00, '2023-07-05'),
(11, 'clothes', 0.00, '2023-07-07'),
(12, 'salary', 1800.00, '2023-07-10'),
(13, 'education', 500.00, '2023-07-12'),
(14, 'food', 600.00, '2023-07-15'),
(15, 'clothes', 0.00, '2023-07-18');

INSERT INTO orphanage_activities (activity_name, activity_type, activity_date, description) VALUES
('Sports Day', 'sports', '2023-06-15', 'Annual sports event for all children.'),
('Art Competition', 'cultural', '2023-06-20', 'Painting and drawing competition for creative children.'),
('Independence Day Celebration', 'national', '2023-08-15', 'National celebration with flag hoisting and performances.'),
('Health Checkup Camp', 'cultural', '2023-09-10', 'Routine medical checkup for all children.'),
('Music & Dance Workshop', 'cultural', '2023-10-05', 'Interactive workshop to enhance artistic skills.'),
('Annual Sports Meet', 'sports', '2023-11-12', 'Inter-class sports competitions and awards.'),
('Republic Day Celebration', 'national', '2024-01-26', 'Cultural programs and patriotic activities.');

INSERT INTO donation_usage (donation_id, used_for, amount_used, used_date)
VALUES
(1, 'education', 2500.00, '2025-01-05'),
(1, 'food', 1200.00, '2025-01-07'),
(2, 'medical', 5000.00, '2025-01-10'),
(3, 'salary', 8000.00, '2025-01-12'),
(2, 'food', 900.00, '2025-01-15'),
(4, 'education', 3000.00, '2025-01-18'),
(5, 'medical', 4500.50, '2025-01-20');
UPDATE staff SET performance = 'Excellent' WHERE staff_id = 1;
UPDATE staff SET performance = 'Good'      WHERE staff_id = 2;
UPDATE staff SET performance = 'Average'   WHERE staff_id = 3;
UPDATE staff SET performance = 'Excellent' WHERE staff_id = 4;
UPDATE staff SET performance = 'Poor'      WHERE staff_id = 5;
UPDATE staff SET performance = 'Good'      WHERE staff_id = 6;
UPDATE staff SET performance = 'Average'   WHERE staff_id = 7;
SELECT used_for, SUM(amount_used)
FROM donation_usage
GROUP BY used_for;
ALTER TABLE donation_usage
MODIFY amount_used FLOAT;
select * from staff;
INSERT INTO staff (user_id, designation, salary, joining_date) VALUES
(56,'Caretaker',20000,'2023-01-01');
select * from children;
UPDATE staff
SET performance = 1.0
WHERE performance = 'Poor';
DELETE FROM children
WHERE child_id = 32;
INSERT INTO donations
(donor_id, donation_type, amount, payment_method, message, donation_date, status)
VALUES
(1, 'Money', 5000.00, 'UPI', 'For children education', '2025-01-05', 'approved'),
(2, 'Money', 12000.00, 'Credit Card', 'Monthly support', '2025-01-12', 'approved'),
(3, 'Money', 2500.00, 'Cash', 'Keep up the good work', '2025-01-18', 'received');
INSERT INTO donations
(donor_id, donation_type, amount, payment_method, message, donation_date, status)
VALUES
(2, 'Food', 100, 'Veg', 'Lunch for kids', '2025-01-08', 'received'),
(4, 'Food', 50, 'Non-Veg', 'Protein meal support', '2025-01-20', 'approved');
INSERT INTO donations
(donor_id, donation_type, amount, payment_method, message, donation_date, status)
VALUES
(1, 'Clothes', 40, 'Winter Jackets', 'For winter season', '2025-01-10', 'received'),
(5, 'Clothes', 25, 'School Uniforms', 'Uniforms for students', '2025-01-22', 'approved');
INSERT INTO donations
(donor_id, donation_type, amount, payment_method, message, donation_date, status)
VALUES
(3, 'Other', 'Books and stationery items', 'Educational materials', '2025-01-15', 'approved'),
(4, 'Other', 'First aid kits and medicines', 'Medical support', '2025-01-25', 'received');
INSERT INTO donations
(donor_id, donation_type, food_count, food_type, message, donation_date, status)
VALUES
(2, 'Food', 100, 'Veg', 'Lunch for kids', '2025-01-08', 'received'),
(4, 'Food', 50, 'Non-Veg', 'Protein meal support', '2025-01-20', 'approved');
INSERT INTO donations
(donor_id, donation_type, clothes_count, clothes_type, message, donation_date, status)
VALUES
(1, 'Clothes', 40, 'Winter Jackets', 'For winter season', '2025-01-10', 'received'),
(5, 'Clothes', 25, 'School Uniforms', 'Uniforms for students', '2025-01-22', 'approved');
INSERT INTO donations
(donor_id, donation_type, other_details, message, donation_date, status)
VALUES
(3, 'Other', 'Books and stationery items', 'Educational materials', '2025-01-15', 'approved'),
(4, 'Other', 'First aid kits and medicines', 'Medical support', '2025-01-25', 'received');
SELECT used_date, amount_used FROM donation_usage ORDER BY used_date;

