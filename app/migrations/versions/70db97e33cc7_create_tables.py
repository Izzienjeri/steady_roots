"""create tables

Revision ID: 70db97e33cc7
Revises: 
Create Date: 2024-02-25 20:32:02.782411

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '70db97e33cc7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('emails',
    sa.Column('email_id', sa.String(), nullable=False),
    sa.Column('subject', sa.String(), nullable=True),
    sa.Column('body', sa.Text(), nullable=True),
    sa.Column('sender_email', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('email_id')
    )
    op.create_table('mentees',
    sa.Column('mentee_id', sa.String(), nullable=False),
    sa.Column('start', sa.DateTime(), nullable=True),
    sa.Column('end', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('mentor_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['mentor_id'], ['mentors.mentor_id'], name='mentee_mentor_fk'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='mentee_user_fk'),
    sa.PrimaryKeyConstraint('mentee_id')
    )
    op.create_table('mentors',
    sa.Column('mentor_id', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('skill_id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['skill_id'], ['skills.skill_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='mentor_user_fk'),
    sa.PrimaryKeyConstraint('mentor_id', 'skill_id')
    )
    op.create_table('skills',
    sa.Column('skill_id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('mentor_id', sa.String(), nullable=True),
    sa.Column('mentee_id', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['mentee_id'], ['mentees.mentee_id'], name='skill_mentee_fk'),
    sa.ForeignKeyConstraint(['mentor_id'], ['mentors.mentor_id'], name='skill_mentor_fk'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='skill_user_fk'),
    sa.PrimaryKeyConstraint('skill_id')
    )
    op.create_table('users',
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('role', sa.String(), nullable=True),
    sa.Column('email_subscription', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('courses',
    sa.Column('course_id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('level', sa.String(), nullable=True),
    sa.Column('start', sa.DateTime(), nullable=True),
    sa.Column('end', sa.DateTime(), nullable=True),
    sa.Column('qualification', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='course_user_fk'),
    sa.PrimaryKeyConstraint('course_id')
    )
    op.create_table('events',
    sa.Column('event_id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('approved', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='event_user_fk'),
    sa.PrimaryKeyConstraint('event_id')
    )
    op.create_table('experiences',
    sa.Column('experience_id', sa.String(), nullable=False),
    sa.Column('organisation', sa.String(), nullable=True),
    sa.Column('job_title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('start', sa.DateTime(), nullable=True),
    sa.Column('end', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='experience_user_fk'),
    sa.PrimaryKeyConstraint('experience_id')
    )
    op.create_table('mailing_list',
    sa.Column('mailing_list_id', sa.String(), nullable=False),
    sa.Column('email_id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['email_id'], ['emails.email_id'], name='mailing_list_email_fk'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='mailing_list_user_fk'),
    sa.PrimaryKeyConstraint('mailing_list_id')
    )
    op.create_table('memberships',
    sa.Column('membership_id', sa.String(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('date_paid', sa.DateTime(), nullable=True),
    sa.Column('membership', sa.Boolean(), nullable=True),
    sa.Column('expires', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='membership_user_fk'),
    sa.PrimaryKeyConstraint('membership_id')
    )
    op.create_table('posts',
    sa.Column('post_id', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('date_posted', sa.DateTime(), nullable=True),
    sa.Column('approved', sa.Boolean(), nullable=True),
    sa.Column('approved_by', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='post_user_fk'),
    sa.PrimaryKeyConstraint('post_id')
    )
    op.create_table('profiles',
    sa.Column('profile_id', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('photo_url', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='profile_user_fk'),
    sa.PrimaryKeyConstraint('profile_id')
    )
    op.create_table('tokenblocklist',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_tokenblocklist_jti'), ['jti'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_tokenblocklist_jti'))

    op.drop_table('tokenblocklist')
    op.drop_table('profiles')
    op.drop_table('posts')
    op.drop_table('memberships')
    op.drop_table('mailing_list')
    op.drop_table('experiences')
    op.drop_table('events')
    op.drop_table('courses')
    op.drop_table('users')
    op.drop_table('skills')
    op.drop_table('mentors')
    op.drop_table('mentees')
    op.drop_table('emails')
    # ### end Alembic commands ###
