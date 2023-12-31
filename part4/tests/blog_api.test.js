const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test('blog posts are returend as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('Verifying the existence of id property', async () => {
  const blogs = await api.get('/api/blogs');

  expect(blogs.body[0].id).toBeDefined();
});

test('Successfull creation of a new blog post', async () => {
  const newBlog = {
    title: 'TestBlog',
    author: 'test',
    url: 'www.test.com',
    likes: 2
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((r) => r.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('TestBlog');
});

afterAll(async () => {
  await mongoose.connection.close();
});
