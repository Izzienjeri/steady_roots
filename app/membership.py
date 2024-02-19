from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,Membership
from app.auth import jwt_required
from app.roles import admin_required

membership_bp=Blueprint('membership_blueprint',__name__)
api=Api(membership_bp)



membership_parser = reqparse.RequestParser()
membership_parser.add_argument('amount', type=float, required=True, help='Membership amount is required')
membership_parser.add_argument('membership', type=bool, required=True, help='Membership status is required')
membership_parser.add_argument('expires', type=str, required=True, help='Expiration date is required')
membership_parser.add_argument('user_id', type=str, required=True, help='User ID is required')


import time

class MembershipListResource(Resource):
    @jwt_required
    def get(self):
        memberships = Membership.query.all()
        return [{'id': membership.membership_id, 'amount': membership.amount, 'membership': membership.membership, 'expires': int(time.mktime(membership.expires.timetuple()))} for membership in memberships]

    @jwt_required
    def post(self):
        data = membership_parser.parse_args()
        new_membership = Membership(amount=data['amount'], membership=data['membership'], expires=data['expires'], user_id=data['user_id'])
        db.session.add(new_membership)
        db.session.commit()
        return {'message': 'Membership created successfully'}, 201

class MembershipResource(Resource):
    @jwt_required
    def get(self, membership_id):
        membership = Membership.query.get(membership_id)
        if membership:
            return {'id': membership.membership_id, 'amount': membership.amount, 'membership': membership.membership, 'expires': membership.expires}
        else:
            return {'message': 'Membership not found'}, 404
    
    @jwt_required
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
    
    @jwt_required
    @admin_required
    def delete(self, membership_id):
        membership = Membership.query.get(membership_id)
        if membership:
            db.session.delete(membership)
            db.session.commit()
            return {'message': 'Membership deleted successfully'}, 200
        else:
            return {'message': 'Membership not found'}, 404

api.add_resource(MembershipListResource, '/memberships')
api.add_resource(MembershipResource, '/memberships/<string:membership_id>')        