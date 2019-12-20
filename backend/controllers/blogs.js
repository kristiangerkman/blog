const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

const getTokenFrom = request => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: { name: user.name, id: user._id },
      date: new Date()
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});
//TODO FIX THIS XD
//spagetti ala 4am
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const toBeUpdatedBlog = await Blog.findById(`${request.params.id}`);
    console.log(toBeUpdatedBlog);
    if (toBeUpdatedBlog) {
      const newBlog = {
        title: toBeUpdatedBlog.title,
        author: toBeUpdatedBlog.author,
        url: toBeUpdatedBlog.url,
        likes: toBeUpdatedBlog.likes + 1,
        user: toBeUpdatedBlog.user,
        date: toBeUpdatedBlog.date,
        id: toBeUpdatedBlog.id
      };
      console.log(toBeUpdatedBlog);
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        newBlog,
        {
          new: true
        }
      );
      response.json(updatedBlog.toJSON());
    } else {
      response.status(404).end();
      console.log("asd");
    }
  } catch (exception) {
    next(exception);
    console.log("asd");
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
