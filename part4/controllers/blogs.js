const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

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

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  if (request.body.likes === undefined) {
    blog.likes = 0;
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();

    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
