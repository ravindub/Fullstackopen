const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'winter',
    author: 'marie',
    url: 'www.ole.com',
    likes: 5
  },
  {
    title: 'Autumn',
    author: 'anna',
    url: 'www.yle.com',
    likes: 2
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blog posts are returend as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('Verifying the existence of id property', async () => {
  const blogs = await api.get('/api/blogs');

  expect(blogs.body[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
