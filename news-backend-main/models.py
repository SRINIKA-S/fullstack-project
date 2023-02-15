from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    email = Column(String(100), primary_key=True)
    name = Column(String(100))
    password = Column(String(100))
    posts = relationship('Post', backref='author')
    comments = relationship('Comment', backref='commenter')

class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100))
    body = Column(String(1000))
    user_email = Column(String(100), ForeignKey('users.email'))
    comments = relationship('Comment', backref='post')

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String(500))
    user_email = Column(String(100), ForeignKey('users.email'))
    post_id = Column(Integer, ForeignKey('posts.id'))
