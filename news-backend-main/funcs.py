from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import *
# Connect to the database
engine = create_engine('postgresql://postgres:12345@localhost/feed1')

# Create a session
Session = sessionmaker(bind=engine)
session = Session()
session.expire_on_commit = False


#-------------------------------------------------------------
#                           USER CRUD
#-------------------------------------------------------------
# Create User
def create_user(email, name, password):
    user = User(email=email, name=name, password=password)
    session.add(user)
    try:

        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close() 

    
    return user

def update_user(email, name):
    user = get_user(email)
    user.name = name
    session.commit()
    return user

# Read User
def get_user(email):
    return session.query(User).get(email)

#-------------------------------------------------------------
#                       Post CRUD
#-------------------------------------------------------------
# Create Post
def create_post(title, body, user_email):
    post = Post(title=title, body=body, user_email=user_email)
    session.add(post)
    session.commit()
    return post

# Read Post
def get_post_by_query(query: str):
    return session.query(Post).filter(Post.body.like(query+"%",)).all()

def get_all_posts():
    return session.query(Post).all()

#-------------------------------------------------------------
#                       COMMENTS CRUD
#-------------------------------------------------------------

# Create Comment

def create_comment(text, user_id, post_id):
    comment = Comment(text=text, user_id=user_id, post_id=post_id)
    session.add(comment)
    session.commit()
    return comment

# get all comments
def get_all_comments(post_id):
    return session.query(Comment).filter(Comment.post_id == post_id).all()

Base.metadata.create_all(engine)
