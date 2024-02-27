from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db, Event
from app.auth import jwt_required, get_jwt_identity
from app.admin import admin_required
from datetime import datetime

event_bp = Blueprint('event_blueprint', __name__)
api = Api(event_bp)

event_parser = reqparse.RequestParser()
event_parser.add_argument('name', type=str, required=True, help='Event name is required')
event_parser.add_argument('description', type=str, required=True, help='Event description is required')
event_parser.add_argument('date', type=str, required=True, help='Event date is required')
event_parser.add_argument('image', type=str, required=True, help='Event image URL is required')
event_parser.add_argument('approved', type=bool, required=True, help='Event approval status is required')


class EventListResource(Resource):
    @jwt_required()
    def get(self):
            events = Event.query.all()
            formatted_events = []
            for event in events:
                 formatted_event = {
                      'id': event.event_id,
                      'name': event.name,
                      'description': event.description,
                      'date': event.date.strftime("%Y-%m-%d"),
                      'image': event.image,
                      'user_id': event.user_id
                 }
                 formatted_events.append(formatted_event)
            return formatted_events
            
    
     
    @jwt_required()
    def post(self):
            data = event_parser.parse_args()
            date_format = "%Y-%m-%d"
            date_obj = datetime.strptime(data['date'], date_format)
            new_event = Event(
                name=data['name'],
                description=data['description'],
                date=date_obj,
                image=data['image'],
                user_id= get_jwt_identity(),
                approved=data['approved']

            )
            
            db.session.add(new_event)
            db.session.commit()
            return {'message': 'Event created successfully'}, 201
       





class EventResource(Resource):
    @jwt_required()
    def get(self, event_id):
        try:
            event = Event.query.get(event_id)
            if event:
                return {
                    'id': event.event_id,
                    'name': event.name,
                    'description': event.description,
                    'date': event.date.strftime("%Y-%m-%d"),
                    'image': event.image,
                    'approved': event.approved
                }, 200
            else:
                return {'message': 'Event not found'}, 404
        except Exception as e:
            return {'message': str(e)}, 500

    @jwt_required()
    def patch(self, event_id):
        try:
            data = event_parser.parse_args()
            event = Event.query.get(event_id)
            if event:
                event.name = data['name']
                event.description = data['description']
                event.date = datetime.strptime(data['date'], "%Y-%m-%d")
                event.image = data['image']
                event.user_id = data['user_id']
                event.approved = data['approved']
                db.session.commit()
                return {'message': 'Event updated successfully'}, 200
            else:
                return {'message': 'Event not found'}, 404
        except Exception as e:
            return {'message': str(e)}, 500

    @jwt_required()
    def delete(self, event_id):
        try:
            event = Event.query.get(event_id)
            if event:
                db.session.delete(event)
                db.session.commit()
                return {'message': 'Event deleted successfully'}, 200
            else:
                return {'message': 'Event not found'}, 404
        except Exception as e:
            return {'message': str(e)}, 500


api.add_resource(EventListResource, '/events')
api.add_resource(EventResource, '/events/<string:event_id>')
