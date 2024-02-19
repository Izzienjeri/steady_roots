"""Updating tables

Revision ID: fb712c63296a
Revises: 
Create Date: 2024-02-19 17:09:09.586919

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb712c63296a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(), nullable=True))
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=False)
        batch_op.create_foreign_key(
            'fk_tokenblocklist_user_id_users_user_id',
            'users', ['user_id'], ['user_id']
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('id',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.drop_column('user_id')
