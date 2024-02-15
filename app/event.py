from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from models import db, Event 


event_bp=Blueprint('event_blueprint',__name__)
api=Api(event_bp)
