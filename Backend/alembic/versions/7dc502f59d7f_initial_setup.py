"""Initial setup

Revision ID: 7dc502f59d7f
Revises: 
Create Date: 2024-09-05 12:20:45.182282

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7dc502f59d7f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users',
                    sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
                    sa.Column('email', sa.String(), nullable=False, unique=True),
                    sa.Column('password', sa.String(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('phone', sa.String(), nullable=True),
                    sa.Column('isAdmin', sa.Boolean(), server_default='FALSE', nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()'))
                    )

    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
                    sa.Column('match_id', sa.Integer(), nullable=False),
                    sa.Column('content', sa.JSON(), nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
                    )

    op.create_table('main_background_images',
                    sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
                    sa.Column('image', sa.LargeBinary(), nullable=False),
                    sa.Column('altText', sa.String(), nullable=True),
                    sa.Column('active', sa.Boolean(), server_default='TRUE', nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
                    )

    op.create_table('cricket_background_images',
                    sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
                    sa.Column('image', sa.LargeBinary(), nullable=False),
                    sa.Column('altText', sa.String(), nullable=True),
                    sa.Column('active', sa.Boolean(), server_default='TRUE', nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
                    )

    op.create_table('football_background_images',
                    sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
                    sa.Column('image', sa.LargeBinary(), nullable=False),
                    sa.Column('altText', sa.String(), nullable=True),
                    sa.Column('active', sa.Boolean(), server_default='TRUE', nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
                    )


def downgrade() -> None:
    op.drop_table('football_background_images')
    op.drop_table('cricket_background_images')
    op.drop_table('main_background_images')
    op.drop_table('reviews')
    op.drop_table('users')