from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,MailingList
from app.auth import jwt_required, get_jwt_identity

MailingList_bp=Blueprint('mailinglist_blueprint',__name__)
api=Api(MailingList_bp)

mailing_list_parser = reqparse.RequestParser()
mailing_list_parser.add_argument('email_id', type=str, required=True, help='Email ID is required')
mailing_list_parser.add_argument('user_id', type=str, required=True, help='User ID is required')





class MailingListResource(Resource):
    @jwt_required()
    def get(self):
        mailing_lists = MailingList.query.filter_by(user_id=get_jwt_identity() )
        return [{'id': mailing_list.mailing_list_id, 'email_id': mailing_list.email_id, 'user_id': mailing_list.user_id} for mailing_list in mailing_lists]
    
    @jwt_required()
    def post(self):
        data = mailing_list_parser.parse_args()
        new_mailing_list = MailingList(email_id=data['email_id'], user_id=data['user_id'])
        db.session.add(new_mailing_list)
        db.session.commit()
        return {'message': 'Mailing list created successfully'}, 201

class MailingListById(Resource):
    @jwt_required()
    def get(self, mailing_list_id):
        mailing_list = MailingList.query.get(mailing_list_id)
        if mailing_list:
            return {'id': mailing_list.mailing_list_id, 'email_id': mailing_list.email_id, 'user_id': mailing_list.user_id}
        else:
            return {'message': 'Mailing list not found'}, 404
    
    @jwt_required()
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
    
    @jwt_required()
    def delete(self, mailing_list_id):
        mailing_list = MailingList.query.get(mailing_list_id)
        if mailing_list:
            db.session.delete(mailing_list)
            db.session.commit()
            return {'message': 'Mailing list deleted successfully'}, 200
        else:
            return {'message': 'Mailing list not found'}, 404

api.add_resource(MailingListResource, '/mailing-lists')
api.add_resource(MailingListById, '/mailing-lists/<string:mailing_list_id>')