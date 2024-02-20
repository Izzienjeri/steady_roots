"""added tokenblocklist

Revision ID: cc90a35d46ff
Revises: ababdb26da76
Create Date: 2024-02-18 16:45:08.317459

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc90a35d46ff'
down_revision = 'd4dd4d1062df'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tokenblocklist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
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
    # ### end Alembic commands ###