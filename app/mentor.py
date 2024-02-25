from flask import Flask, Blueprint, jsonify, make_response
from flask_restful import Api, Resource, reqparse
from app.models import db,Mentor,Mentee
from app.auth import get_jwt_identity, jwt_required
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema,auto_field


class MentorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Mentor
mentor_schema = MentorSchema()

class MenteeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Mentee
mentee_schema = MenteeSchema()


mentor_bp=Blueprint('mentor_blueprint',__name__)
api=Api(mentor_bp)


mentor_parser = reqparse.RequestParser()
mentor_parser.add_argument('description', type=str, required=True, help='Mentor description is required')
mentor_parser.add_argument('skill_id', type=str, required=True, help='Skill ID is required')
mentor_parser.add_argument('user_id', type=str, required=True, help='User ID is required')


class MentorListResource(Resource):
    @jwt_required()
    def get(self):
        mentors = Mentor.query.filter_by(user_id=get_jwt_identity() )
        return [{'id': mentor.mentor_id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id} for mentor in mentors]

    def post(self):
        data = mentor_parser.parse_args()
        new_mentor = Mentor(description=data['description'], skill_id=data['skill_id'], user_id=data['user_id'])
        db.session.add(new_mentor)
        db.session.commit()
        return {'message': 'Mentor created successfully'}, 201

class MentorResource(Resource):
    @jwt_required()
    def get(self, mentor_id):
        mentor = Mentor.query.filter_by(mentor_id=mentor_id).first()

        if mentor is None:
            response = make_response(
                jsonify({"error": "Mentor not found"}),
                404
            )
            return response

        else:
            mentees = mentee_schema.dump(mentor.mentees, many=True)

            response = make_response(
                jsonify({
                    "mentor": mentor_schema.dump(mentor),
                    "mentees": mentees
                }),
                200
            )
            return response
    
    @jwt_required()
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
    
    @jwt_required()
    def delete(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            db.session.delete(mentor)
            db.session.commit()
            return {'message': 'Mentor deleted successfully'}, 200
        else:
            return {'message': 'Mentor not found'}, 404

api.add_resource(MentorListResource, '/mentors')
api.add_resource(MentorResource, '/mentors/<string:mentor_id>')
