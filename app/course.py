from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db, Course
from app.auth import jwt_required, get_jwt_identity
from datetime import datetime

course_bp = Blueprint('course_blueprint', __name__)
api = Api(course_bp)

course_parser = reqparse.RequestParser()
course_parser.add_argument('name', type=str, required=True, help='Course name is required')
course_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
course_parser.add_argument('level', type=str, required=True, help='Course level is required')
course_parser.add_argument('start', type=str, required=True, help='Start date is required')
course_parser.add_argument('end', type=str, required=True, help='End date is required')
course_parser.add_argument('qualification', type=str, required=True, help='Qualification is required')

class CourseListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        courses = Course.query.filter_by(user_id=user_id).all()
        formatted_courses = []
        for course in courses:
            formatted_course = {
                'id': course.course_id,
                'name': course.name,
                'level': course.level,
                'start': course.start.timestamp(),
                'end': course.end.timestamp(),
                'qualification': course.qualification

            }
            formatted_courses.append(formatted_course)
        return formatted_courses  
    

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = course_parser.parse_args()
        start_date = datetime.strptime(data['start'], '%Y-%m-%d')
        end_date = datetime.strptime(data['end'], '%Y-%m-%d')

        new_course = Course(
            name=data['name'],
            level=data['level'],
            start=start_date,  
            end=end_date,
            qualification=data['qualification'],
            user_id = user_id
        )
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201
     
        

class CourseResource(Resource):
    @jwt_required()
    def get(self, course_id):
        course = Course.query.get(course_id)
        if course:
            return {
                'id': course.course_id,
                'name': course.name,
                'level': course.level,
                'start': course.start,
                'end': course.end,
                'qualification': course.qualification
            }
        else:
            return {'message': 'Course not found'}, 404
        
    @jwt_required()
    def patch(self, course_id):
        data = course_parser.parse_args()
        course = Course.query.get(course_id)
        if course:
            course.name = data['name']
            course.level = data['level']
            
            start_date = datetime.strptime(data['start'], '%Y-%m-%d')
            end_date = datetime.strptime(data['end'], '%Y-%m-%d')
            
            course.start = start_date  
            course.end = end_date      
            course.qualification = data['qualification']
            course.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Course updated successfully'}, 200
        else:
            return {'message': 'Course not found'}, 404
        
    @jwt_required()
    def delete(self, course_id):
        course = Course.query.get(course_id)
        if course:
            db.session.delete(course)
            db.session.commit()
            return {'message': 'Course deleted successfully'}, 200
        else:
            return {'message': 'Course not found'}, 404

api.add_resource(CourseListResource, '/courses')
api.add_resource(CourseResource, '/courses/<string:course_id>')
