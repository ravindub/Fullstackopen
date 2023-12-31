const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const user = request.user;

    const blog = new Blog(body);

    blog.user = user._id;

    if (body.likes === undefined) {
      blog.likes = 0;
    }

    if (!body.title || !body.url) {
      return response.status(400).json({
        error: 'Title or Url cannot be empty'
      });
    }

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
);

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'invalid user' });
    }
  }
);

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const blog = {
    likes: request.body.likes
  };

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  });

  response.status(200).json(updatedNote);
});

module.exports = blogsRouter;
