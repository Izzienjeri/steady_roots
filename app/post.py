
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,Post
from app.auth import jwt_required, get_jwt_identity
from app.admin import admin_required

post_bp=Blueprint('post_blueprint',__name__)
api=Api(post_bp)



post_parser = reqparse.RequestParser()
post_parser.add_argument('title', type=str, required=True, help='Post title is required')
post_parser.add_argument('description', type=str, required=True, help='Post description is required')
post_parser.add_argument('date_posted', type=str, required=True, help='Date posted is required')
post_parser.add_argument('approved', type=bool, required=True, help='Approval status is required')
post_parser.add_argument('approved_by', type=str, required=False, help='Approved by')



import time

from datetime import datetime

class PostListResource(Resource):
    @jwt_required()
    def get(self):
<<<<<<< HEAD

        posts = Post.query.filter_by(user_id=get_jwt_identity() )
        return [{'id': post.post_id, 'title': post.title, 'description': post.description, 'date_posted': int(time.mktime(post.date_posted.timetuple())), 'approved': post.approved, 'approved_by': post.approved_by, 'user_id': post.user_id} for post in posts]
=======
        posts = Post.query.all()
        formatted_posts = []
        for post in posts:
            formatted_post = {
                'id': post.post_id,
                'title': post.title,
                'description': post.description,
                'date_posted': post.date_posted.strftime("%Y-%m-%d"),  
                'approved': post.approved,
                'approved_by': post.approved_by,
                'user_id': post.user_id
            }
            formatted_posts.append(formatted_post)
        return formatted_posts
>>>>>>> e57ba71a333452e9cf49fe1c6dea6760e7d0fb02

    @jwt_required()
    def post(self):
        data = post_parser.parse_args()
        new_post = Post(
            title=data['title'],
            description=data['description'],
            date_posted=datetime.now(),
            approved=data['approved'], 
            approved_by=None,  
            user_id=get_jwt_identity()  
        )
        db.session.add(new_post)
        db.session.commit()
        return {'message': 'Post created successfully'}, 201



class PostResource(Resource):
    @jwt_required()
    def get(self, post_id):
        post = Post.query.get(post_id)
        if post:
            return {'id': post.post_id, 'title': post.title, 'description': post.description, 'date_posted': post.date_posted, 'approved': post.approved, 'approved_by': post.approved_by, 'user_id': post.user_id}
        else:
            return {'message': 'Post not found'}, 404
    
    @jwt_required()
    def patch(self, post_id):
        data = post_parser.parse_args()
        post = Post.query.get(post_id)
        if post:
            post.title = data['title']
            post.description = data['description']
            post.date_posted = datetime.strptime(data['date_posted'], "%Y-%m-%d")
            post.approved = data['approved']
            post.approved_by = data['approved_by']
            
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
        
api.add_resource(PostListResource, '/posts')
api.add_resource(PostResource, '/posts/<string:post_id>')        