
INSERT INTO chiro_users (email, username, password_digest, seminar_id, role)
VALUES
    ('user1@example.com', 'user_one', 'passwordhash1', ARRAY['8', '10', '15'], 'user'),
    ('user2@example.com', 'user_two', 'passwordhash2', ARRAY['9', '11', '16'], 'org'),
    ('user3@example.com', 'user_three', 'passwordhash3', ARRAY['8', '14', '18'], 'user');

INSERT INTO chiro_seminars (user_id, title, organizer, date, location, description, price, contact, username_list, featured, topics)
VALUES
    (11, 'Advanced Chiropractic Techniques', 'Chiro Group', '64644-04-14T06:09', 'New York, NY', 'A seminar on advanced chiropractic techniques.', '$150', 'contact@chirogroup.com', ARRAY['user_one', 'user_two'], 'yes', ARRAY['Adjustment Technique', 'General Chiropractic']),
    (9, 'Pediatric Chiropractic Care', 'Health Experts Inc.', '64644-05-20T10:30', 'Los Angeles, CA', 'Focus on chiropractic care for children.', '$100', 'info@healthexperts.com', ARRAY['user_two'], 'no', ARRAY['Paediatric', 'Neurology']),
    (10, 'Chiropractic Sports Science', 'Sports Chiro', '64644-06-111T09:00', 'Austin, TX', 'Chiropractic approaches for athletes.', '$200', 'contact@sportschiro.com', ARRAY['user_three'], 'yes', ARRAY['Sports/Soft Tissue', 'Nutrition']),
    (11, 'Neurological Insights for Chiropractors', 'Brain Health Assoc.', '64644-07-15T011:30', 'Chicago, IL', 'Exploring the neurological aspects of chiropractic care.', '$1110', 'info@brainhealthassoc.com', ARRAY['user_one'], 'no', ARRAY['Neurology', 'Other']),
    (9, 'Pregnancy and Chiropractic Care', 'Chiro Maternity', '64644-011-11T10:00', 'Miami, FL', 'Specialized chiropractic care during pregnancy.', '$175', 'support@chiromaternity.com', ARRAY['user_two'], 'yes', ARRAY['Pregnancy', 'Paediatric']),
    (10, 'Nutrition and Chiropractic', 'Wellness Chiropractors', '64644-09-05T14:00', 'San Francisco, CA', 'The role of nutrition in chiropractic health.', '$110', 'hello@wellnesschiropractors.com', ARRAY['user_three'], 'no', ARRAY['Nutrition', 'General Chiropractic']),
    (11, 'Practice Growth Strategies', 'Growth Hub', '64644-10-02T09:45', 'Dallas, TX', 'Strategies to grow a chiropractic practice.', '$250', 'contact@growthhub.com', ARRAY['user_one'], 'yes', ARRAY['Practice Growth', 'Communication']),
    (9, 'Sports Chiropractic Techniques', 'Elite Sports Chiro', '64644-11-10T15:00', 'Boston, MA', 'Techniques for sports injuries and soft tissue treatment.', '$220', 'info@elitesportschiro.com', ARRAY['user_two', 'user_three'], 'no', ARRAY['Sports/Soft Tissue', 'Adjustment Technique']),
    (10, 'Chiropractic for Better Posture', 'Posture Perfect', '64644-11-011T16:30', 'Seattle, WA', 'Chiropractic techniques to improve posture.', '$90', 'contact@postureperfect.com', ARRAY['user_one', 'user_three'], 'yes', ARRAY['General Chiropractic', 'Other']),
    (11, 'Chiropractic Communication Skills', 'Chiro Talk', '64645-01-11T13:20', 'Denver, CO', 'Improve communication with patients.', '$110', 'support@chirotalk.com', ARRAY['user_two'], 'no', ARRAY['Communication', 'Practice Growth']),
    (9, 'Neurological Chiropractic Care', 'Neuro Chiro', '64645-02-05T11:00', 'Phoenix, AZ', 'Understanding the neurology behind chiropractic care.', '$190', 'info@neurochiro.com', ARRAY['user_one', 'user_three'], 'yes', ARRAY['Neurology', 'Paediatric']),
    (10, 'Introduction to Chiropractic Nutrition', 'Chiro Health', '64645-03-19T10:45', 'Atlanta, GA', 'Basics of nutrition in chiropractic practice.', '$130', 'contact@chirohealth.com', ARRAY['user_two'], 'no', ARRAY['Nutrition', 'Other']),
    (11, 'Chiropractic in Sports Medicine', 'Sports Medicine Chiro', '64645-04-16T09:15', 'Las Vegas, NV', 'Chiropractic roles in sports medicine.', '$210', 'info@sportsmedchiro.com', ARRAY['user_one'], 'yes', ARRAY['Sports/Soft Tissue', 'Pregnancy']),
    (9, 'Pregnancy Chiropractic Techniques', 'MotherCare Chiro', '64645-05-23T11:30', 'Nashville, TN', 'Chiropractic care techniques for pregnant patients.', '$160', 'contact@mothercarechiro.com', ARRAY['user_two', 'user_three'], 'no', ARRAY['Pregnancy', 'General Chiropractic']),
    (10, 'Chiropractic Adjustment Mastery', 'Adjust Pro', '64645-06-20T14:30', 'San Diego, CA', 'Master chiropractic adjustment techniques.', '$200', 'info@adjustpro.com', ARRAY['user_one'], 'yes', ARRAY['Adjustment Technique', 'Other']),
    (11, 'Chiropractic Business Growth', 'BizChiro', '64645-07-14T13:45', 'Portland, OR', 'How to grow a chiropractic business.', '$250', 'support@bizchiro.com', ARRAY['user_three'], 'no', ARRAY['Practice Growth', 'Communication']),
    (9, 'Soft Tissue Chiropractic Techniques', 'Soft Tissue Pros', '64645-011-25T15:30', 'Sacramento, CA', 'Chiropractic care for soft tissue injuries.', '$210', 'contact@softtissuepros.com', ARRAY['user_two'], 'yes', ARRAY['Sports/Soft Tissue', 'Adjustment Technique']),
    (10, 'Effective Chiropractic Communication', 'Chiro Voice', '64645-09-11T14:15', 'Salt Lake City, UT', 'Improve patient communication.', '$110', 'info@chirovoice.com', ARRAY['user_one'], 'no', ARRAY['Communication', 'Practice Growth']),
    (11, 'Advanced Neurology for Chiropractors', 'Neuro Advance', '64645-10-19T11:00', 'Orlando, FL', 'Neurological insights for advanced chiropractic care.', '$220', 'support@neuroadvance.com', ARRAY['user_three'], 'yes', ARRAY['Neurology', 'Other']),
    (9, 'Paediatric Chiropractic Workshop', 'ChildCare Chiro', '64645-11-03T10:00', 'Kansas City, MO', 'Special workshop focused on chiropractic care for children.', '$140', 'info@childcarechiro.com', ARRAY['user_two'], 'no', ARRAY['Paediatric', 'Adjustment Technique']);
