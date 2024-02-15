from flask_sqlalchemy import SQLAlchemy
import uuid
from sqlalchemy import DateTime
from datetime import datetime

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    role = db.Column(db.String)
    email_subscription = db.Column(db.Boolean, default=False)
    profile = db.relationship("Profile", backref="user", uselist=False)
    experiences = db.relationship("Experience", backref="user")
    courses = db.relationship("Course", backref="user")
    memberships = db.relationship("Membership", backref="user")
    events = db.relationship("Event", backref="user")
    mentors = db.relationship("Mentor", backref="user")
    mentees = db.relationship("Mentee", backref="user")
    mailing_lists = db.relationship("MailingList", backref="user")
    posts = db.relationship("Post", backref="user")

    def __repr__(self):
        return f"User(user_id={self.user_id}, email={self.email}, role={self.role})"

class Profile(db.Model):
    __tablename__ = 'profiles'
    profile_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    photo_url = db.Column(db.String)
    password = db.Column(db.String)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"Profile(profile_id={self.profile_id}, first_name={self.first_name}, last_name={self.last_name})"

class Experience(db.Model):
    __tablename__ = 'experiences'
    experience_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    organisation = db.Column(db.String)
    job_title = db.Column(db.String)
    description = db.Column(db.String)
    start = db.Column(db.DateTime, default=datetime.utcnow)
    end = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"Experience(experience_id={self.experience_id}, organisation={self.organisation}, job_title={self.job_title})"

class Course(db.Model):
    __tablename__ = 'courses'
    course_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)
    level = db.Column(db.String)
    start = db.Column(db.DateTime, default=datetime.utcnow)
    end = db.Column(db.DateTime, default=datetime.utcnow)
    qualification = db.Column(db.String)

    def __repr__(self):
        return f"Course(course_id={self.course_id}, name={self.name}, level={self.level})"

class Membership(db.Model):
    __tablename__ = 'memberships'
    membership_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    amount = db.Column(db.Float)
    date_paid = db.Column(db.DateTime, default=datetime.utcnow)
    membership = db.Column(db.Boolean, default=False)
    expires = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"Membership(membership_id={self.membership_id}, amount={self.amount}, membership={self.membership})"

class Event(db.Model):
    __tablename__ = 'events'
    event_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String)
    description = db.Column(db.String)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    image = db.Column(db.String)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)
    approved = db.Column(db.Boolean)

    def __repr__(self):
        return f"Event(event_id={self.event_id}, name={self.name}, date={self.date})"

class Mentor(db.Model):
    __tablename__ = 'mentors'
    mentor_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    description = db.Column(db.String)
    skill_id = db.Column(db.String, db.ForeignKey("skills.skill_id"), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"Mentor(mentor_id={self.mentor_id}, description={self.description})"
class Mentee(db.Model):
    __tablename__ = 'mentees'
    mentee_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    start = db.Column(db.DateTime, default=datetime.utcnow)
    end = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)
    mentor_id = db.Column(db.String, db.ForeignKey("mentors.mentor_id"), nullable=False)

    def __repr__(self):
        return f"Mentee(mentee_id={self.mentee_id}, start={self.start}, end={self.end})"

class Email(db.Model):
    __tablename__ = 'emails'
    email_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    subject = db.Column(db.String)
    body = db.Column(db.Text)
    sender_email = db.Column(db.String)

    def __repr__(self):
        return f"Email(email_id={self.email_id}, subject={self.subject}, sender_email={self.sender_email})"

class MailingList(db.Model):
    __tablename__ = 'mailing_list'
    mailing_list_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    email_id = db.Column(db.String, db.ForeignKey("emails.email_id"), nullable=False)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"MailingList(mailing_list_id={self.mailing_list_id}, email_id={self.email_id}, user_id={self.user_id})"

class Post(db.Model):
    __tablename__ = 'posts'
    post_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    title = db.Column(db.String)
    description = db.Column(db.String)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    approved = db.Column(db.Boolean)
    approved_by = db.Column(db.String)
    user_id = db.Column(db.String, db.ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"Post(post_id={self.post_id}, title={self.title}, date_posted={self.date_posted})"

class Skill(db.Model):
    __tablename__ = 'skills'
    skill_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String)
    mentor_id = db.Column(db.String, db.ForeignKey("mentors.mentor_id"), nullable=False)
    mentee_id = db.Column(db.String, db.ForeignKey("mentees.mentee_id"), nullable=False)

    def __repr__(self):
        return f"Skill(skill_id={self.skill_id}, name={self.name})"