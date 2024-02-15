from models import db,User, Profile, Experience, Course, Membership, Event,MailingList, Skill, Mentor, Mentee, Post, Email
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate

app = Flask(__name__)
db.init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app,db)

api = Api(app)



user_parser = reqparse.RequestParser()
user_parser.add_argument('email', type=str, required=True, help='Email is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')
user_parser.add_argument('role', type=str, required=True, help='Role is required')
user_parser.add_argument('email_subscription', type=bool, default=False)

profile_parser = reqparse.RequestParser()
profile_parser.add_argument('first_name', type=str, required=True, help='First name is required')
profile_parser.add_argument('last_name', type=str, required=True, help='Last name is required')
profile_parser.add_argument('photo_url', type=str, required=True, help='Photo URL is required')
profile_parser.add_argument('password', type=str, required=True, help='Password is required')
profile_parser.add_argument('user_id', type=str, required=True, help='User ID is required')

experience_parser = reqparse.RequestParser()
experience_parser.add_argument('organisation', type=str, required=True, help='Organisation is required')
experience_parser.add_argument('job_title', type=str, required=True, help='Job title is required')
experience_parser.add_argument('description', type=str, required=True, help='Description is required')
experience_parser.add_argument('start', type=str, required=True, help='Start date is required')
experience_parser.add_argument('end', type=str, required=True, help='End date is required')
experience_parser.add_argument('user_id', type=str, required=True, help='User ID is required')

course_parser = reqparse.RequestParser()
course_parser.add_argument('name', type=str, required=True, help='Course name is required')
course_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
course_parser.add_argument('level', type=str, required=True, help='Course level is required')
course_parser.add_argument('start', type=str, required=True, help='Start date is required')
course_parser.add_argument('end', type=str, required=True, help='End date is required')
course_parser.add_argument('qualification', type=str, required=True, help='Qualification is required')

membership_parser = reqparse.RequestParser()
membership_parser.add_argument('amount', type=float, required=True, help='Membership amount is required')
membership_parser.add_argument('membership', type=bool, required=True, help='Membership status is required')
membership_parser.add_argument('expires', type=str, required=True, help='Expiration date is required')
membership_parser.add_argument('user_id', type=str, required=True, help='User ID is required')

event_parser = reqparse.RequestParser()
event_parser.add_argument('name', type=str, required=True, help='Event name is required')
event_parser.add_argument('description', type=str, required=True, help='Event description is required')
event_parser.add_argument('date', type=str, required=True, help='Event date is required')
event_parser.add_argument('image', type=str, required=True, help='Event image URL is required')
event_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
event_parser.add_argument('approved', type=bool, required=True, help='Event approval status is required')

mentor_parser = reqparse.RequestParser()
mentor_parser.add_argument('description', type=str, required=True, help='Mentor description is required')
mentor_parser.add_argument('skill_id', type=str, required=True, help='Skill ID is required')
mentor_parser.add_argument('user_id', type=str, required=True, help='User ID is required')

mentee_parser = reqparse.RequestParser()
mentee_parser.add_argument('start', type=str, required=True, help='Start date is required')
mentee_parser.add_argument('end', type=str, required=True, help='End date is required')
mentee_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
mentee_parser.add_argument('mentor_id', type=str, required=True, help='Mentor ID is required')


email_parser = reqparse.RequestParser()
email_parser.add_argument('subject', type=str, required=True, help='Email subject is required')
email_parser.add_argument('body', type=str, required=True, help='Email body is required')
email_parser.add_argument('sender_email', type=str, required=True, help='Sender email is required')


mailing_list_parser = reqparse.RequestParser()
mailing_list_parser.add_argument('email_id', type=str, required=True, help='Email ID is required')
mailing_list_parser.add_argument('user_id', type=str, required=True, help='User ID is required')


post_parser = reqparse.RequestParser()
post_parser.add_argument('title', type=str, required=True, help='Post title is required')
post_parser.add_argument('description', type=str, required=True, help='Post description is required')
post_parser.add_argument('date_posted', type=str, required=True, help='Date posted is required')
post_parser.add_argument('approved', type=bool, required=True, help='Approval status is required')
post_parser.add_argument('approved_by', type=str, required=False, help='Approved by')


skill_parser = reqparse.RequestParser()
skill_parser.add_argument('name', type=str, required=True, help='Skill name is required')
skill_parser.add_argument('mentor_id', type=str, required=True, help='Mentor ID is required')
skill_parser.add_argument('mentee_id', type=str, required=True, help='Mentee ID is required')

class UserList(Resource):
    def get(self):
        users = User.query.all()
        return [{'id': user.user_id, 'email': user.email, 'role': user.role, 'email_subscription': user.email_subscription} for user in users]

    def post(self):
        data = user_parser.parse_args()
        new_user = User(email=data['email'], password=data['password'], role=data['role'], email_subscription=data['email_subscription'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

class User(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return {'id': user.user_id, 'email': user.email, 'role': user.role, 'email_subscription': user.email_subscription}
        else:
            return {'message': 'User not found'}, 404

    def patch(self, user_id):
        data = user_parser.parse_args()
        user = User.query.get(user_id)
        if user:
            user.email = data['email']
            user.password = data['password']
            user.role = data['role']
            user.email_subscription = data['email_subscription']
            db.session.commit()
            return {'message': 'User updated successfully'}, 200
        else:
            return {'message': 'User not found'}, 404

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}, 200
        else:
            return {'message': 'User not found'}, 404
class ProfileList(Resource):
    def get(self):
        profiles = Profile.query.all()
        return [{'id': profile.profile_id, 'first_name': profile.first_name, 'last_name': profile.last_name, 'photo_url': profile.photo_url} for profile in profiles]

    def post(self):
        data = profile_parser.parse_args()
        new_profile = Profile(first_name=data['first_name'], last_name=data['last_name'], photo_url=data['photo_url'], password=data['password'], user_id=data['user_id'])
        db.session.add(new_profile)
        db.session.commit()
        return {'message': 'Profile created successfully'}, 201

class Profile(Resource):
    def get(self, profile_id):
        profile = Profile.query.get(profile_id)
        if profile:
            return {'id': profile.profile_id, 'first_name': profile.first_name, 'last_name': profile.last_name, 'photo_url': profile.photo_url}
        else:
            return {'message': 'Profile not found'}, 404

    def patch(self, profile_id):
        data = profile_parser.parse_args()
        profile = Profile.query.get(profile_id)
        if profile:
            profile.first_name = data['first_name']
            profile.last_name = data['last_name']
            profile.photo_url = data['photo_url']
            profile.password = data['password']
            profile.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Profile updated successfully'}, 200
        else:
            return {'message': 'Profile not found'}, 404

    def delete(self, profile_id):
        profile = Profile.query.get(profile_id)
        if profile:
            db.session.delete(profile)
            db.session.commit()
            return {'message': 'Profile deleted successfully'}, 200
        else:
            return {'message': 'Profile not found'}, 404

class ExperienceList(Resource):
    def get(self):
        experiences = Experience.query.all()
        return [{'id': experience.experience_id, 'organisation': experience.organisation, 'job_title': experience.job_title, 'description': experience.description, 'start': experience.start, 'end': experience.end} for experience in experiences]

    def post(self):
        data = experience_parser.parse_args()
        new_experience = Experience(organisation=data['organisation'], job_title=data['job_title'], description=data['description'], start=data['start'], end=data['end'], user_id=data['user_id'])
        db.session.add(new_experience)
        db.session.commit()
        return {'message': 'Experience created successfully'}, 201

class Experience(Resource):
    def get(self, experience_id):
        experience = Experience.query.get(experience_id)
        if experience:
            return {'id': experience.experience_id, 'organisation': experience.organisation, 'job_title': experience.job_title, 'description': experience.description, 'start': experience.start, 'end': experience.end}
        else:
            return {'message': 'Experience not found'}, 404

    def patch(self, experience_id):
        data = experience_parser.parse_args()
        experience = Experience.query.get(experience_id)
        if experience:
            experience.organisation = data['organisation']
            experience.job_title = data['job_title']
            experience.description = data['description']
            experience.start = data['start']
            experience.end = data['end']
            experience.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Experience updated successfully'}, 200
        else:
            return {'message': 'Experience not found'}, 404

    def delete(self, experience_id):
        experience = Experience.query.get(experience_id)
        if experience:
            db.session.delete(experience)
            db.session.commit()
            return {'message': 'Experience deleted successfully'}, 200
        else:
            return {'message': 'Experience not found'}, 404

class CourseList(Resource):
    def get(self):
        courses = Course.query.all()
        return [{'id': course.course_id, 'name': course.name, 'level': course.level, 'start': course.start, 'end': course.end, 'qualification': course.qualification} for course in courses]

    def post(self):
        data = course_parser.parse_args()
        new_course = Course(name=data['name'], user_id=data['user_id'], level=data['level'], start=data['start'], end=data['end'], qualification=data['qualification'])
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

class Course(Resource):
    def get(self, course_id):
        course = Course.query.get(course_id)
        if course:
            return {'id': course.course_id, 'name': course.name, 'level': course.level, 'start': course.start, 'end': course.end, 'qualification': course.qualification}
        else:
            return {'message': 'Course not found'}, 404

    def patch(self, course_id):
        data = course_parser.parse_args()
        course = Course.query.get(course_id)
        if course:
            course.name = data['name']
            course.level = data['level']
            course.start = data['start']
            course.end = data['end']
            course.qualification = data['qualification']
            course.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Course updated successfully'}, 200
        else:
            return {'message': 'Course not found'}, 404

    def delete(self, course_id):
        course = Course.query.get(course_id)
        if course:
            db.session.delete(course)
            db.session.commit()
            return {'message': 'Course deleted successfully'}, 200
        else:
            return {'message': 'Course not found'}, 404

class MembershipList(Resource):
    def get(self):
        memberships = Membership.query.all()
        return [{'id': membership.membership_id, 'amount': membership.amount, 'membership': membership.membership, 'expires': membership.expires} for membership in memberships]

    def post(self):
        data = membership_parser.parse_args()
        new_membership = Membership(amount=data['amount'], membership=data['membership'], expires=data['expires'], user_id=data['user_id'])
        db.session.add(new_membership)
        db.session.commit()
        return {'message': 'Membership created successfully'}, 201

class Membership(Resource):
    def get(self, membership_id):
        membership = Membership.query.get(membership_id)
        if membership:
            return {'id': membership.membership_id, 'amount': membership.amount, 'membership': membership.membership, 'expires': membership.expires}
        else:
            return {'message': 'Membership not found'}, 404

    def patch(self, membership_id):
        data = membership_parser.parse_args()
        membership = Membership.query.get(membership_id)
        if membership:
            membership.amount = data['amount']
            membership.membership = data['membership']
            membership.expires = data['expires']
            membership.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Membership updated successfully'}, 200
        else:
            return {'message': 'Membership not found'}, 404

    def delete(self, membership_id):
        membership = Membership.query.get(membership_id)
        if membership:
            db.session.delete(membership)
            db.session.commit()
            return {'message': 'Membership deleted successfully'}, 200
        else:
            return {'message': 'Membership not found'}, 404

class EventList(Resource):
    def get(self):
        events = Event.query.all()
        return [{'id': event.event_id, 'name': event.name, 'description': event.description, 'date': event.date, 'image': event.image, 'approved': event.approved} for event in events]

    def post(self):
        data = event_parser.parse_args()
        new_event = Event(name=data['name'], description=data['description'], date=data['date'], image=data['image'], user_id=data['user_id'], approved=data['approved'])
        db.session.add(new_event)
        db.session.commit()
        return {'message': 'Event created successfully'}, 201

class Event(Resource):
    def get(self, event_id):
        event = Event.query.get(event_id)
        if event:
            return {'id': event.event_id, 'name': event.name, 'description': event.description, 'date': event.date, 'image': event.image, 'approved': event.approved}
        else:
            return {'message': 'Event not found'}, 404

    def patch(self, event_id):
        data = event_parser.parse_args()
        event = Event.query.get(event_id)
        if event:
            event.name = data['name']
            event.description = data['description']
            event.date = data['date']
            event.image = data['image']
            event.user_id = data['user_id']
            event.approved = data['approved']
            db.session.commit()
            return {'message': 'Event updated successfully'}, 200
        else:
            return {'message': 'Event not found'}, 404

    def delete(self, event_id):
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()
            return {'message': 'Event deleted successfully'}, 200
        else:
            return {'message': 'Event not found'}, 404

class MentorList(Resource):
    def get(self):
        mentors = Mentor.query.all()
        return [{'id': mentor.mentor_id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id} for mentor in mentors]

    def post(self):
        data = mentor_parser.parse_args()
        new_mentor = Mentor(description=data['description'], skill_id=data['skill_id'], user_id=data['user_id'])
        db.session.add(new_mentor)
        db.session.commit()
        return {'message': 'Mentor created successfully'}, 201

class Mentor(Resource):
    def get(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            return {'id': mentor.mentor_id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id}
        else:
            return {'message': 'Mentor not found'}, 404

    def patch(self, mentor_id):
        data = mentor_parser.parse_args()
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            mentor.description = data['description']
            mentor.skill_id = data['skill_id']
            mentor.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Mentor updated successfully'}, 200
        else:
            return {'message': 'Mentor not found'}, 404

    def delete(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            db.session.delete(mentor)
            db.session.commit()
            return {'message': 'Mentor deleted successfully'}, 200
        else:
            return {'message': 'Mentor not found'}, 404

class MenteeList(Resource):
    def get(self):
        mentees = Mentee.query.all()
        return [{'id': mentee.mentee_id, 'start': mentee.start, 'end': mentee.end, 'user_id': mentee.user_id, 'mentor_id': mentee.mentor_id} for mentee in mentees]

    def post(self):
        data = mentee_parser.parse_args()
        new_mentee = Mentee(start=data['start'], end=data['end'], user_id=data['user_id'], mentor_id=data['mentor_id'])
        db.session.add(new_mentee)
        db.session.commit()
        return {'message': 'Mentee created successfully'}, 201

class Mentee(Resource):
    def get(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            return {'id': mentee.mentee_id, 'start': mentee.start, 'end': mentee.end, 'user_id': mentee.user_id, 'mentor_id': mentee.mentor_id}
        else:
            return {'message': 'Mentee not found'}, 404

    def patch(self, mentee_id):
        data = mentee_parser.parse_args()
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            mentee.start = data['start']
            mentee.end = data['end']
            mentee.user_id = data['user_id']
            mentee.mentor_id = data['mentor_id']
            db.session.commit()
            return {'message': 'Mentee updated successfully'}, 200
        else:
            return {'message': 'Mentee not found'}, 404

    def delete(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            db.session.delete(mentee)
            db.session.commit()
            return {'message': 'Mentee deleted successfully'}, 200
        else:
            return {'message': 'Mentee not found'}, 404

class EmailList(Resource):
    def get(self):
        emails = Email.query.all()
        return [{'id': email.email_id, 'subject': email.subject, 'body': email.body, 'sender_email': email.sender_email} for email in emails]

    def post(self):
        data = email_parser.parse_args()
        new_email = Email(subject=data['subject'], body=data['body'], sender_email=data['sender_email'])
        db.session.add(new_email)
        db.session.commit()
        return {'message': 'Email created successfully'}, 201

class Email(Resource):
    def get(self, email_id):
        email = Email.query.get(email_id)
        if email:
            return {'id': email.email_id, 'subject': email.subject, 'body': email.body, 'sender_email': email.sender_email}
        else:
            return {'message': 'Email not found'}, 404

    def patch(self, email_id):
        data = email_parser.parse_args()
        email = Email.query.get(email_id)
        if email:
            email.subject = data['subject']
            email.body = data['body']
            email.sender_email = data['sender_email']
            db.session.commit()
            return {'message': 'Email updated successfully'}, 200
        else:
            return {'message': 'Email not found'}, 404

    def delete(self, email_id):
        email = Email.query.get(email_id)
        if email:
            db.session.delete(email)
            db.session.commit()
            return {'message': 'Email deleted successfully'}, 200
        else:
            return {'message': 'Email not found'}, 404

class MailingListList(Resource):
    def get(self):
        mailing_lists = MailingList.query.all()
        return [{'id': mailing_list.mailing_list_id, 'email_id': mailing_list.email_id, 'user_id': mailing_list.user_id} for mailing_list in mailing_lists]

    def post(self):
        data = mailing_list_parser.parse_args()
        new_mailing_list = MailingList(email_id=data['email_id'], user_id=data['user_id'])
        db.session.add(new_mailing_list)
        db.session.commit()
        return {'message': 'Mailing list created successfully'}, 201

class MailingList(Resource):
    def get(self, mailing_list_id):
        mailing_list = MailingList.query.get(mailing_list_id)
        if mailing_list:
            return {'id': mailing_list.mailing_list_id, 'email_id': mailing_list.email_id, 'user_id': mailing_list.user_id}
        else:
            return {'message': 'Mailing list not found'}, 404

    def patch(self, mailing_list_id):
        data = mailing_list_parser.parse_args()
        mailing_list = MailingList.query.get(mailing_list_id)
        if mailing_list:
            mailing_list.email_id = data['email_id']
            mailing_list.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Mailing list updated successfully'}, 200
        else:
            return {'message': 'Mailing list not found'}, 404

    def delete(self, mailing_list_id):
        mailing_list = MailingList.query.get(mailing_list_id)
        if mailing_list:
            db.session.delete(mailing_list)
            db.session.commit()
            return {'message': 'Mailing list deleted successfully'}, 200
        else:
            return {'message': 'Mailing list not found'}, 404

class PostList(Resource):
    def get(self):
        posts = Post.query.all()
        return [{'id': post.post_id, 'title': post.title, 'description': post.description, 'date_posted': post.date_posted, 'approved': post.approved, 'approved_by': post.approved_by, 'user_id': post.user_id} for post in posts]

    def post(self):
        data = post_parser.parse_args()
        new_post = Post(title=data['title'], description=data['description'], date_posted=data['date_posted'], approved=data['approved'], approved_by=data['approved_by'], user_id=data['user_id'])
        db.session.add(new_post)
        db.session.commit()
        return {'message': 'Post created successfully'}, 201

class Post(Resource):
    def get(self, post_id):
        post = Post.query.get(post_id)
        if post:
            return {'id': post.post_id, 'title': post.title, 'description': post.description, 'date_posted': post.date_posted, 'approved': post.approved, 'approved_by': post.approved_by, 'user_id': post.user_id}
        else:
            return {'message': 'Post not found'}, 404

    def patch(self, post_id):
        data = post_parser.parse_args()
        post = Post.query.get(post_id)
        if post:
            post.title = data['title']
            post.description = data['description']
            post.date_posted = data['date_posted']
            post.approved = data['approved']
            post.approved_by = data['approved_by']
            post.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Post updated successfully'}, 200
        else:
            return {'message': 'Post not found'}, 404

    def delete(self, post_id):
        post = Post.query.get(post_id)
        if post:
            db.session.delete(post)
            db.session.commit()
            return {'message': 'Post deleted successfully'}, 200
        else:
            return {'message': 'Post not found'}, 404

class SkillList(Resource):
    def get(self):
        skills = Skill.query.all()
        return [{'id': skill.skill_id, 'name': skill.name, 'mentor_id': skill.mentor_id, 'mentee_id': skill.mentee_id} for skill in skills]

    def post(self):
        data = skill_parser.parse_args()
        new_skill = Skill(name=data['name'], mentor_id=data['mentor_id'], mentee_id=data['mentee_id'])
        db.session.add(new_skill)
        db.session.commit()
        return {'message': 'Skill created successfully'}, 201

class Skill(Resource):
    def get(self, skill_id):
        skill = Skill.query.get(skill_id)
        if skill:
            return {'id': skill.skill_id, 'name': skill.name, 'mentor_id': skill.mentor_id, 'mentee_id': skill.mentee_id}
        else:
            return {'message': 'Skill not found'}, 404

    def patch(self, skill_id):
        data = skill_parser.parse_args()
        skill = Skill.query.get(skill_id)
        if skill:
            skill.name = data['name']
            skill.mentor_id = data['mentor_id']
            skill.mentee_id = data['mentee_id']
            db.session.commit()
            return {'message': 'Skill updated successfully'}, 200
        else:
            return {'message': 'Skill not found'}, 404

    def delete(self, skill_id):
        skill = Skill.query.get(skill_id)
        if skill:
            db.session.delete(skill)
            db.session.commit()
            return {'message': 'Skill deleted successfully'}, 200
        else:
            return {'message': 'Skill not found'}, 404





api.add_resource(EmailList, '/emails')
api.add_resource(Email, '/emails/<string:email_id>')
api.add_resource(MailingListList, '/mailing-lists')
api.add_resource(MailingList, '/mailing-lists/<string:mailing_list_id>')
api.add_resource(PostList, '/posts')
api.add_resource(Post, '/posts/<string:post_id>')
api.add_resource(SkillList, '/skills')
api.add_resource(Skill, '/skills/<string:skill_id>')

api.add_resource(MentorList, '/mentors')
api.add_resource(Mentor, '/mentors/<string:mentor_id>')
api.add_resource(MenteeList, '/mentees')
api.add_resource(Mentee, '/mentees/<string:mentee_id>')

api.add_resource(CourseList, '/courses')
api.add_resource(Course, '/courses/<string:course_id>')
api.add_resource(MembershipList, '/memberships')
api.add_resource(Membership, '/memberships/<string:membership_id>')
api.add_resource(EventList, '/events')
api.add_resource(Event, '/events/<string:event_id>')


api.add_resource(ProfileList, '/profiles')
api.add_resource(Profile, '/profiles/<string:profile_id>')
api.add_resource(ExperienceList, '/experiences')
api.add_resource(Experience, '/experiences/<string:experience_id>')
api.add_resource(UserList, '/users')
api.add_resource(User, '/users/<string:user_id>')


