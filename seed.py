from app import db, app  
from models import User, Profile, Experience, Course, Membership, Event, MailingList, Skill, Mentor, Mentee, Post, Email

from datetime import datetime

def seed_users():
    users = [
        User(email='mark@example.com', password='password1', role='admin'),
        User(email='baraka@example.com', password='password2', role='user'),
    ]
    with app.app_context():
        db.session.add_all(users)
        db.session.commit()

def seed_profiles():
    profiles = [
        Profile(first_name='Mark', last_name='Doe', photo_url='https://example.com/mark.jpg', password='password1', user_id='user1_id'),
        Profile(first_name='Baraka', last_name='Smith', photo_url='https://example.com/baraka.jpg', password='password2', user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(profiles)
        db.session.commit()

def seed_experiences():
    experiences = [
        Experience(organisation='ABC Corporation', job_title='Software Engineer', description='Developed web applications using Python and Django', start=datetime.utcnow(), end=datetime.utcnow(), user_id='user1_id'),
        Experience(organisation='XYZ Company', job_title='Data Analyst', description='Performed data analysis using SQL and Python', start=datetime.utcnow(), end=datetime.utcnow(), user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(experiences)
        db.session.commit()

def seed_courses():
    courses = [
        Course(name='Python Programming', level='Intermediate', start=datetime.utcnow(), end=datetime.utcnow(), qualification='Certificate of Completion', user_id='user1_id'),
        Course(name='Data Science Fundamentals', level='Advanced', start=datetime.utcnow(), end=datetime.utcnow(), qualification='Certified Data Scientist', user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(courses)
        db.session.commit()

def seed_memberships():
    memberships = [
        Membership(amount=100.0, date_paid=datetime.utcnow(), membership=True, expires=datetime.utcnow(), user_id='user1_id'),
        Membership(amount=150.0, date_paid=datetime.utcnow(), membership=False, expires=datetime.utcnow(), user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(memberships)
        db.session.commit()

def seed_events():
    events = [
        Event(name='Tech Summit 2024', description='Annual technology conference featuring top industry speakers', date=datetime.utcnow(), image='tech_summit.jpg', user_id='user1_id', approved=True),
        Event(name='Data Analytics Workshop', description='Hands-on workshop covering data analysis techniques', date=datetime.utcnow(), image='data_workshop.jpg', user_id='user2_id', approved=False),
    ]
    with app.app_context():
        db.session.add_all(events)
        db.session.commit()

def seed_mentors():
    mentors = [
        Mentor(description='Experienced software engineer specializing in web development', skill_id='python_skill_id', user_id='user1_id'),
        Mentor(description='Data analyst with expertise in SQL and Python programming', skill_id='data_analysis_skill_id', user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(mentors)
        db.session.commit()

def seed_mentees():
    mentees = [
        Mentee(start=datetime.utcnow(), end=datetime.utcnow(), user_id='user1_id', mentor_id='mentor1_id'),
        Mentee(start=datetime.utcnow(), end=datetime.utcnow(), user_id='user2_id', mentor_id='mentor2_id'),
    ]
    with app.app_context():
        db.session.add_all(mentees)
        db.session.commit()

def seed_emails():
    emails = [
        Email(subject='Invitation to Tech Summit 2024', body='You are invited to attend our annual Tech Summit!', sender_email='noreply@example.com'),
        Email(subject='Data Workshop Registration', body='Register now for our upcoming Data Analytics Workshop!', sender_email='noreply@example.com'),
    ]
    with app.app_context():
        db.session.add_all(emails)
        db.session.commit()

def seed_mailing_lists():
    mailing_lists = [
        MailingList(email_id='email1_id', user_id='user1_id'),
        MailingList(email_id='email2_id', user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(mailing_lists)
        db.session.commit()

def seed_posts():
    posts = [
        Post(title='Introduction to Python Programming', description='Learn the basics of Python programming language', date_posted=datetime.utcnow(), approved=True, approved_by='admin', user_id='user1_id'),
        Post(title='Data Analysis Techniques', description='Explore various techniques for data analysis', date_posted=datetime.utcnow(), approved=False, approved_by=None, user_id='user2_id'),
    ]
    with app.app_context():
        db.session.add_all(posts)
        db.session.commit()

def seed_skills():
    skills = [
        Skill(name='Python Programming', mentor_id='mentor1_id', mentee_id='mentee1_id'),
        Skill(name='Data Analysis', mentor_id='mentor2_id', mentee_id='mentee2_id'),
    ]
    with app.app_context():
        db.session.add_all(skills)
        db.session.commit()

def main():
    seed_users()
    seed_profiles()
    seed_experiences()
    seed_courses()
    seed_memberships()
    seed_events()
    seed_mentors()
    seed_mentees()
    seed_emails()
    seed_mailing_lists()
    seed_posts()
    seed_skills()

if __name__ == '__main__':
    main()
