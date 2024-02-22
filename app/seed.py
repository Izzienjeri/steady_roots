import uuid
from app.models import db, User, Profile, Experience, Course, Skill, Event, Membership, Post, Email, Mentor, Mentee
from app.app import create_app
from datetime import datetime

app = create_app()

def seed_users():
    user1 = User(email='user1@example.com', password='password')
    user2 = User(email='user2@example.com', password='password')
    db.session.add_all([user1, user2])
    db.session.commit()

def seed_profiles():
    profile1 = Profile(first_name='John', last_name='Doe', user_id=str(uuid.uuid4()))
    profile2 = Profile(first_name='Jane', last_name='Doe', user_id=str(uuid.uuid4()))
    db.session.add_all([profile1, profile2])
    db.session.commit()

def seed_experiences():
    experience1 = Experience(organisation='ABC Inc.', job_title='Software Engineer', description='Worked on web development projects.', user_id=str(uuid.uuid4()))
    experience2 = Experience(organisation='XYZ Corp.', job_title='Data Analyst', description='Analyzed data for business insights.', user_id=str(uuid.uuid4()))
    db.session.add_all([experience1, experience2])
    db.session.commit()

def seed_courses():
    course1 = Course(name='Python Programming', level='Intermediate', qualification='Certificate', user_id=str(uuid.uuid4()))
    course2 = Course(name='Data Science Fundamentals', level='Beginner', qualification='Certificate', user_id=str(uuid.uuid4()))
    db.session.add_all([course1, course2])
    db.session.commit()

def seed_skills():
    skill1 = Skill(name='Python', user_id=str(uuid.uuid4()))
    skill2 = Skill(name='Data Analysis', user_id=str(uuid.uuid4()))
    db.session.add_all([skill1, skill2])
    db.session.commit()

def seed_events():
    event1 = Event(name='Tech Conference', description='Annual technology conference', user_id=str(uuid.uuid4()), approved=True)
    event2 = Event(name='Data Summit', description='Gathering of data professionals', user_id=str(uuid.uuid4()), approved=True)
    db.session.add_all([event1, event2])
    db.session.commit()

def seed_memberships():
    membership1 = Membership(amount=50.0, membership=True, user_id=str(uuid.uuid4()))
    membership2 = Membership(amount=75.0, membership=True, user_id=str(uuid.uuid4()))
    db.session.add_all([membership1, membership2])
    db.session.commit()

def seed_posts():
    post1 = Post(title='Job Opportunity', description='Looking for a software engineer.', user_id=str(uuid.uuid4()), approved=True, approved_by='admin')
    post2 = Post(title='Spotlight', description='Featured member: Jane Doe', user_id=str(uuid.uuid4()), approved=True, approved_by='admin')
    db.session.add_all([post1, post2])
    db.session.commit()

def seed_emails():
    email1 = Email(subject='Welcome to our platform', body='Thank you for joining us!', sender_email='admin@example.com')
    email2 = Email(subject='Membership Renewal', body='Renew your membership now.', sender_email='admin@example.com')
    db.session.add_all([email1, email2])
    db.session.commit()

def seed_mentors():
    mentor1 = Mentor(description='Experienced in Python programming', user_id=str(uuid.uuid4()))
    mentor2 = Mentor(description='Skilled in data visualization', user_id=str(uuid.uuid4()))
    db.session.add_all([mentor1, mentor2])
    db.session.commit()



def seed_mentees():
    start_date = datetime.strptime('2023-01-01', '%Y-%m-%d')
    end_date = datetime.strptime('2023-12-31', '%Y-%m-%d')

    mentee1 = Mentee(start=start_date, end=end_date, user_id=str(uuid.uuid4()), mentor_id=str(uuid.uuid4()))
    mentee2 = Mentee(start=start_date, end=end_date, user_id=str(uuid.uuid4()), mentor_id=str(uuid.uuid4()))
    db.session.add_all([mentee1, mentee2])
    db.session.commit()




def seed_all():
    seed_users()
    seed_profiles()
    seed_experiences()
    seed_courses()
    seed_skills()
    seed_events()
    seed_memberships()
    seed_posts()
    seed_emails()
    seed_mentors()
    seed_mentees()
   

if __name__ == '__main__':
    with app.app_context():
        seed_all()