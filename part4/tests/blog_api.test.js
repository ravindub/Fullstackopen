const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('When some blogs are already saved', () => {
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
});

describe('Adding a new blog', () => {
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

  test('verifying that if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'TestBlog2',
      author: 'test2',
      url: 'www.test2.com'
    };

    const response = await api.post('/api/blogs').send(newBlog).expect(201);

    expect(response.body.likes).toEqual(0);
  });

  test('Verifying that if the title or url properties are missing from the request, the backend responds with the status code 400', async () => {
    const blogWithoutTitle = {
      author: 'test3',
      url: 'www.test3.com',
      likes: 3
    };

    const blogWithoutUrl = {
      title: 'TestBlog3',
      author: 'test3',
      likes: 4
    };

    await api.post('/api/blogs').send(blogWithoutTitle).expect(400);
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400);
  });
});

describe('Deleting a blog', () => {
  test('Successfully deletes a blog with a valid id', async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToDelete = startingBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await helper.blogsInDb();

    expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);

    const blogTitles = blogsAfterDeletion.map((blog) => blog.title);

    expect(blogTitles).not.toContain(blogToDelete.title);
  });
});

describe('Updating a blog', () => {
  test('Successfully updates a blog with valid id', async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToUpdate = startingBlogs[0];

    const blogWithNewData = {
      likes: 20
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogWithNewData)
      .expect(200);

    expect(updatedBlog.body.likes).toEqual(blogWithNewData.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
