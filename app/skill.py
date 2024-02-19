from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db, Skill
from app.auth import jwt_required



skill_bp=Blueprint('skill_blueprint',__name__)
api=Api(skill_bp)

skill_parser = reqparse.RequestParser()
skill_parser.add_argument('name', type=str, required=True, help='Name of the skill cannot be empty!')


class SkillListResource(Resource):

    @jwt_required
    def get(self):
        skills = Skill.query.all()
        return [{'id': skill.skill_id, 'name': skill.name, 'mentor_id': skill.mentor_id, 'mentee_id': skill.mentee_id} for skill in skills]
    
    @jwt_required
    def post(self):
        data = skill_parser.parse_args()
        new_skill = Skill(name=data['name'])
        db.session.add(new_skill)
        db.session.commit()
        return {'message': 'Skill created successfully'}, 201
    

class SkillResource(Resource):
    @jwt_required
    def get(self, skill_id):
        skill = Skill.query.get(skill_id)
        if skill:
            return {'id': skill.skill_id, 'name': skill.name, 'mentor_id': skill.mentor_id, 'mentee_id': skill.mentee_id}
        else:
            return {'message': 'Skill not found'}, 404
        
    @jwt_required
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
    
    @jwt_required
    def delete(self, skill_id):
        skill = Skill.query.get(skill_id)
        if skill:
            db.session.delete(skill)
            db.session.commit()
            return {'message': 'Skill deleted successfully'}, 200
        else:
            return {'message': 'Skill not found'}, 404    
        

api.add_resource(SkillListResource, '/skills')
api.add_resource(SkillResource, '/skills/<string:skill_id>')        