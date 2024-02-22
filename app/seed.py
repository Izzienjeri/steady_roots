import random
from datetime import datetime, timedelta
from app.models import db, User, Profile, Experience, Course, Membership, Event, Post, Email, Mentor, Mentee, Skill
from werkzeug.security import generate_password_hash
from app.app import create_app
import uuid

def generate_uuid():
    return str(uuid.uuid4())

app = create_app()

# Ensure the application context is active for all functions
with app.app_context():

    def seed_users():
        users = [
            {"email": "John@gmail.com", "password": "user_password"},
            {"email": "Jane@gmail.com", "password": "user_password"},
            {"email": "Michael@gmail.com", "password": "user_password"},
            {"email": "Emily@gmail.com", "password": "user_password"},
            {"email": "David@gmail.com", "password": "user_password"},
            {"email": "Sarah@gmail.com", "password": "user_password"},
            {"email": "Daniel@gmail.com", "password": "user_password"},
            {"email": "Olivia@gmail.com", "password": "user_password"}
        ]
        for user_data in users:
            user = User.query.filter_by(email=user_data["email"]).first()
            if not user:
                user = User(user_id=generate_uuid(), email=user_data["email"], password=generate_password_hash(user_data["password"]))
                db.session.add(user)
        db.session.commit()

    def seed_profiles():
        users = User.query.filter(User.email.in_(["John@gmail.com", "Jane@gmail.com", "Michael@gmail.com", "Emily@gmail.com", "David@gmail.com", "Sarah@gmail.com", "Daniel@gmail.com", "Olivia@gmail.com"])).all()
        profiles = [
            {"first_name": "John", "last_name": "Pierce", "photo_url": "https://media.istockphoto.com/id/1372138855/photo/cheerful-black-manager-with-digital-tablet-walking-by-office.jpg?s=612x612&w=0&k=20&c=PU58BwF0lhQwDqhmIKHHg_i2qYUqypZGLxXiwGFjIxQ=", "user_id": users[0].user_id},
            {"first_name": "Jane", "last_name": "Smith", "photo_url": "https://media.istockphoto.com/id/1398994132/photo/happy-businesswoman-using-a-digital-tablet-young-leading-businesswoman-using-a-wireless.jpg?s=612x612&w=0&k=20&c=BM3E3osJBZSukhs98G6vn7HXe8QQTExGaymi2a61T3E=", "user_id": users[1].user_id},
            {"first_name": "Michael", "last_name": "Johnson", "photo_url": "https://media.istockphoto.com/id/890698790/photo/portrait-of-handsome-afro-man-using-his-mobile.jpg?s=612x612&w=0&k=20&c=Xv1mkR6pMyv81t6sr3ZV9KZnKCFiOMvGou8DxauqiAY=", "user_id": users[2].user_id},
            {"first_name": "Emily", "last_name": "Brown", "photo_url": "https://media.istockphoto.com/id/1319763830/photo/portrait-of-smiling-mixed-race-woman-looking-at-camera.jpg?s=612x612&w=0&k=20&c=L0d04sc89UuLW0G80UCu4egl0tQwyl8PLKsIZotbP_U=", "user_id": users[3].user_id},
            {"first_name": "David", "last_name": "Wilson", "photo_url": "https://media.istockphoto.com/id/1093999178/photo/young-handsome-man-isolated-on-gray-textured-wall-smiling-while-pointing-with-index-finger-to.jpg?s=612x612&w=0&k=20&c=aWWGm-GcKc-hL8dl1RUaO41JE-cKZdT9AF8QD7jDgwc=", "user_id": users[4].user_id},
            {"first_name": "Sarah", "last_name": "Lee", "photo_url": "https://media.istockphoto.com/id/1289362630/photo/beautiful-girl-with-curly-hairstyle.jpg?s=612x612&w=0&k=20&c=noPt_qkk65jYY6v0kTTvyOjcm53k-2hQoDvsyJAQMtA=", "user_id": users[5].user_id},
            {"first_name": "Daniel", "last_name": "Clark", "photo_url": "https://media.istockphoto.com/id/1342849839/photo/beautiful-afro-woman-with-pigtails-and-stylish-clothes.jpg?s=612x612&w=0&k=20&c=tR_IMMATG4jHJTuGgwQ-hjuY7mte7fEtEvYAefjjbtg=", "user_id": users[6].user_id},
            {"first_name": "Olivia", "last_name": "Thomas", "photo_url": "https://media.istockphoto.com/id/1428235898/photo/stylish-pretty-african-woman-with-afro-hairstyle-posing-near-geometric-wall.jpg?s=612x612&w=0&k=20&c=bCi5lcUVEfxjrwh3kgheNgKMbil98--oksmHDV1WXY4=", "user_id": users[7].user_id}
        ]
        for profile_data in profiles:
            profile = Profile.query.filter_by(user_id=profile_data["user_id"]).first()
            if not profile:
                profile = Profile(**profile_data)
                db.session.add(profile)
        db.session.commit()

    def seed_experience():
        users = User.query.filter(User.email.in_(["John@gmail.com", "Jane@gmail.com", "Michael@gmail.com", "Emily@gmail.com", "David@gmail.com", "Sarah@gmail.com", "Daniel@gmail.com", "Olivia@gmail.com"])).all()

        experiences = [
            Experience(organisation="Google", job_title="Software Engineer", description="Worked on web development projects.", user_id=users[0].user_id),
            Experience(organisation="Apple", job_title="Data Analyst", description="Analyzed data using Python and SQL.", user_id=users[1].user_id),
            Experience(organisation="Microsoft", job_title="Frontend Developer", description="Developed user interfaces using React and Angular.", user_id=users[2].user_id),
            Experience(organisation="Amazon", job_title="Backend Developer", description="Built APIs using Node.js.", user_id=users[3].user_id),
            Experience(organisation="Tesla", job_title="Java Developer", description="Developed enterprise applications using Java.", user_id=users[4].user_id),
            Experience(organisation="IBM", job_title="Full Stack Developer", description="Worked on both frontend and backend development.", user_id=users[5].user_id),
            Experience(organisation="Oracle", job_title="UI/UX Designer", description="Designed user interfaces for web and mobile applications.", user_id=users[6].user_id),
            Experience(organisation="Walmart", job_title="DevOps Engineer", description="Managed deployment pipelines and infrastructure.", user_id=users[7].user_id)
        ]

        db.session.add_all(experiences)
        db.session.commit()


    def seed_courses():
        users = User.query.filter(User.email.in_(["John@gmail.com", "Jane@gmail.com", "Michael@gmail.com", "Emily@gmail.com", "David@gmail.com", "Sarah@gmail.com", "Daniel@gmail.com", "Olivia@gmail.com"])).all()

        courses = [
            Course(name="Python for Data Science", level="Advanced", qualification="Certificate", user_id=users[0].user_id),
            Course(name="JavaScript Basics", level="Advanced", qualification="Course Completion", user_id=users[1].user_id),
            Course(name="Advanced Java Programming", level="Advanced", qualification="Diploma", user_id=users[2].user_id),
            Course(name="HTML/CSS Fundamentals", level="Beginner", qualification="Course Completion", user_id=users[3].user_id),
            Course(name="SQL Mastery", level="Advanced", qualification="Certification", user_id=users[4].user_id),
            Course(name="React Development Bootcamp", level="Intermediate", qualification="Bootcamp Certificate", user_id=users[5].user_id),
            Course(name="Angular Essentials", level="Intermediate", qualification="Course Completion", user_id=users[6].user_id),
            Course(name="Node.js In-Depth", level="Advanced", qualification="Certification", user_id=users[7].user_id)
        ]
        db.session.add_all(courses)
        db.session.commit()


    def seed_memberships():
        membership_amount = 2000.00
        users = User.query.all()
        for user in users:
            membership = Membership.query.filter_by(user_id=user.user_id).first()
            if not membership:
                membership = Membership(amount=membership_amount, membership=True, user_id=user.user_id)
                db.session.add(membership)
        db.session.commit()

    def seed_events():
        users = User.query.all()  # Retrieve all users

        events = [
            {"name": "Tech Conference 2024", "description": "Annual tech conference covering various topics in technology.", "date": datetime(2024, 4, 15), "image": "https://media.istockphoto.com/id/915052660/photo/media-concept-video-wall-with-screens.jpg?s=612x612&w=0&k=20&c=LCOhooelqquc90UT2oBm0nm1wAyBBOSwfIFFT-gITkI=", "approved": True},
            {"name": "Data Science Workshop", "description": "Hands-on workshop on data science techniques and tools.", "date": datetime(2024, 5, 20), "image": "https://media.istockphoto.com/id/1390716712/photo/data-science-concept.jpg?s=612x612&w=0&k=20&c=07gv8l8_-G970V2m_ALeJG1E33N5t2YHdKJmRPJIG0o=", "approved": True},
            {"name": "Web Development Bootcamp", "description": "Intensive bootcamp for learning web development from scratch.", "date": datetime(2024, 6, 10), "image": "https://media.istockphoto.com/id/1350852919/vector/web-development-concept-vector-line-infographic-design-with-icons-6-options-or-steps-for.jpg?s=612x612&w=0&k=20&c=ybDylGVWk7XQKCMncU4DM_VnFdqauZvRckxVXYmougk=", "approved": True},
            {"name": "Cybersecurity Conference", "description": "Conference focusing on the latest trends and challenges in cybersecurity.", "date": datetime(2024, 7, 5), "image": "https://media.istockphoto.com/id/1412282189/photo/lock-network-technology-concept.jpg?s=612x612&w=0&k=20&c=hripuxLs9pS_7Ln6YWQR-Ow2_-BU5RdQ4vOY8s1q1iQ=", "approved": True},
            {"name": "AI Symposium", "description": "Symposium exploring advancements and applications of artificial intelligence.", "date": datetime(2024, 8, 15), "image": "https://media.istockphoto.com/id/1440356809/photo/artificial-intelligence-technology-robot-futuristic-data-science-data-analytics-quantum.jpg?s=612x612&w=0&k=20&c=rmkxBaRiWay0ghLSP91Zhei6NQWfaKSRv3zlzF-2BDs=", "approved": True},
            {"name": "Blockchain Summit", "description": "Summit discussing the impact of blockchain technology across industries.", "date": datetime(2024, 9, 20), "image": "https://media.istockphoto.com/id/1341880384/photo/information-blocks-concept.jpg?s=612x612&w=0&k=20&c=wH3PIApq9-BI4hI7nL55MYE_EDpldY9dIkZZHTs6c8M=", "approved": True}
        ]
        for event_data in events:
            # For simplicity, let's associate each event with the first user
            event_data["user_id"] = users[0].user_id
            event = Event.query.filter_by(name=event_data["name"]).first()
            if not event:
                event = Event(**event_data)
                db.session.add(event)
        db.session.commit()


    def seed_posts():
        posts = [
            {"title": "Job Opportunity: Software Engineer", "description": "We're hiring experienced software engineers to join our team. Apply now!", "approved": True, "approved_by": "Admin", "user_email": "John@gmail.com"},
            {"title": "Data Science Internship Opportunity", "description": "Exciting opportunity for data science enthusiasts to intern with us. Apply now!", "approved": True, "approved_by": "Admin", "user_email": "Jane@gmail.com"},
            {"title": "Web Development Bootcamp Registration Open", "description": "Register now for our upcoming web development bootcamp and kickstart your career in tech!", "approved": True, "approved_by": "Admin", "user_email": "Michael@gmail.com"},
            {"title": "Tech Conference 2024 Speaker Lineup Announced", "description": "Check out our impressive lineup of speakers for Tech Conference 2024. Don't miss it!", "approved": True, "approved_by": "Admin", "user_email": "Emily@gmail.com"},
            {"title": "Join Our Cybersecurity Team", "description": "We're looking for cybersecurity experts to join our team. Apply now!", "approved": True, "approved_by": "Admin", "user_email": "David@gmail.com"}
        ]
        for post_data in posts:
            user = User.query.filter_by(email=post_data.pop("user_email")).first()  # Remove user_email from post_data and retrieve user
            if user:
                post = Post.query.filter_by(title=post_data["title"]).first()
                if not post:
                    post_data["user_id"] = user.user_id  # Add user_id to post_data
                    post = Post(**post_data)
                    db.session.add(post)
        db.session.commit()


    def seed_emails():
        emails = [
            {"subject": "Welcome to Our Newsletter", "body": "Thank you for subscribing to our newsletter!", "sender_email": "newsletter@example.com"},
            {"subject": "New Product Launch", "body": "Check out our latest product launch and avail special discounts!", "sender_email": "info@example.com"}
        ]
        for email_data in emails:
            email = Email.query.filter_by(subject=email_data["subject"]).first()
            if not email:
                email = Email(**email_data)
                db.session.add(email)
        db.session.commit()

   

    def seed_mentors_and_mentees():
        mentor_emails = ["John@gmail.com", "Jane@gmail.com", "Michael@gmail.com", "Emily@gmail.com"]
        mentor_ids = {'John@gmail.com': '3187eb84-f979-49a9-8c24-269349d226a2', 
                    'Jane@gmail.com': '6e003ddc-72ea-449e-b316-ab583150570a', 
                    'Michael@gmail.com': 'af763cdd-4a0c-4815-b3d3-86a44799ad7b', 
                    'Emily@gmail.com': 'ab641e77-7e65-448e-ad9d-708ccb7b6d14'}


        mentors = []
        mentees = []

        users = User.query.all()

        for user in users:
            mentor_id = mentor_ids.get(user.email, None)
            if mentor_id:
                mentor = Mentor.query.filter_by(user_id=user.user_id).first()
                if not mentor:
                    mentor = Mentor(user_id=user.user_id, mentor_id=mentor_id)
                    mentors.append(mentor)
                mentee = Mentee(user_id=user.user_id, mentor_id=mentor_id)
                mentees.append(mentee)
            else:
                default_mentor_id = 'default_mentor_id_here'  # Provide a default mentor ID here
                mentee = Mentee(user_id=user.user_id, mentor_id=default_mentor_id)
                mentees.append(mentee)

     

        db.session.add_all(mentors)
        db.session.add_all(mentees)
        db.session.commit()

        


     
    


    def seed_skills():
        skill_names = ["Python", "JavaScript", "Java", "HTML/CSS", "SQL", "React", "Angular", "Node.js"]
        users = User.query.all()
        skills = []
        for user in users:
            skill = Skill.query.filter_by(user_id=user.user_id).first()
            if not skill:
                skill = Skill(name=random.choice(skill_names), user_id=user.user_id)
                skills.append(skill)
        db.session.add_all(skills)
        db.session.commit()

    seed_users()
    seed_profiles()
    seed_experience()
    seed_courses()
    seed_memberships()
    seed_events()
    seed_posts()
    seed_emails()
    seed_mentors_and_mentees()
    seed_skills()
