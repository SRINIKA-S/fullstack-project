from flask import Flask, request
from flask_cors import CORS, cross_origin
from funcs import *
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# Login with create user
@app.route('/auth', methods=['POST'])
@cross_origin()
def auth():
    json = request.get_json()
    email = json['email']
    password = json['password']
    name = json['name']
    if not (email and password and name):
        return {"status": False, "message": "Please provide email, password and name"}
    
    user = get_user(email)
    if user:
        if user.password == password:
            update_user(email, name)
            return {"status": True, "message": "Logged in successfully", "user": {"name":user.name,"email":user.email,"password":user.password}}
        return {"status": True, "message": "Wrong password", "user": {"name":user.name,"email":user.email,"password":user.password}}
    else:
        user= create_user(email, name, password)
        return {"status": True, "message": "User created successfully", "user": {"name":user.name,"email":user.email,"password":user.password}}

def user_serializer(user):
    return {
        "email": user.email,
        "name": user.name,
    }

# Create Post
@app.route("/post", methods=["POST"])
@cross_origin()
def create_post_():
    json = request.get_json()
    title = json['title']
    text = json['text']
    user_email = json['user_email']
    post = create_post(title, text, user_email)
    return {"status": True, "message": "Post created successfully", "post": {"title":post.title,"text":post.body,"user_email":post.user_email}}

# Create Comment
@app.route("/comment", methods=["POST"])
@cross_origin()
def create_comment_():
    json = request.get_json()
    text = json['text']
    post_id = json['post_id']
    user_email = json['user_email']
    comment = create_comment(text=text, post_id=post_id, user_email=user_email)
    return {"status": True, "message": "Comment created successfully", "comment": {"text":comment.text,"post_id":comment.post_id,"user_email":comment.user_email}}

# Get search post
@app.route("/post", methods=["GET"])
@cross_origin()
def get_post():
    query = request.args.get('q', default=None, type=str)
    print(query)
    if query:
        posts = get_post_by_query(query)
    else:
        posts = get_all_posts()
    users_map = {post.user_email: None for post in posts}
    for user_email in users_map:
        users_map[user_email] = get_user(user_email)
    return {"status": True, "message": "Post found successfully", "posts": [{"title":post.title,"text":post.body,"user":user_serializer(users_map[post.user_email])} for post in posts]}

print("""
Login user: /auth, POST, {"email": "email", "password": "password", "name": "name"}
Create post: /post, POST, {"title": "title", "text": "text", "user_email": "user_email"}
Create comment: /comment, POST, {"text": "text", "post_id": "post_id", "user_email": "user_email"}
Search post: /post, GET, {"query": "query"}
""")

if __name__ == '__main__':
    app.run(debug=True,port=5001)

