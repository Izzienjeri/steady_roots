from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db, Event
from app.auth import jwt_required
from app.roles import admin_required


event_bp=Blueprint('event_blueprint',__name__)
api=Api(event_bp)

event_parser = reqparse.RequestParser()
event_parser.add_argument('name', type=str, required=True, help='Event name is required')
event_parser.add_argument('description', type=str, required=True, help='Event description is required')
event_parser.add_argument('date', type=str, required=True, help='Event date is required')
event_parser.add_argument('image', type=str, required=True, help='Event image URL is required')
event_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
event_parser.add_argument('approved', type=bool, required=True, help='Event approval status is required')




import time

class EventListResource(Resource):
    @jwt_required
    def get(self):
        events = Event.query.all()
        return [{'id': event.event_id, 'name': event.name, 'description': event.description, 'date': int(time.mktime(event.date.timetuple())), 'image': event.image, 'approved': event.approved} for event in events]

    @jwt_required
    @admin_required 
    def post(self):
        data = event_parser.parse_args()
        new_event = Event(name=data['name'], description=data['description'], date=data['date'], image=data['image'], user_id=data['user_id'], approved=data['approved'])
        db.session.add(new_event)
        db.session.commit()
        return {'message': 'Event created successfully'}, 201

class EventResource(Resource):
    @jwt_required
    def get(self, event_id):
        event = Event.query.get(event_id)
        if event:
            return {'id': event.event_id, 'name': event.name, 'description': event.description, 'date': event.date, 'image': event.image, 'approved': event.approved}
        else:
            return {'message': 'Event not found'}, 404
        
    @jwt_required
    @admin_required
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
        
    @jwt_required
    @admin_required 
    def delete(self, event_id):
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()
            return {'message': 'Event deleted successfully'}, 200
        else:
            return {'message': 'Event not found'}, 404




api.add_resource(EventListResource, '/events')
api.add_resource(EventResource, '/events/<string:event_id>')
