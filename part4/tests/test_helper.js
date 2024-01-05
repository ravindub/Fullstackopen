const Blog = require('../models/blog');
const User = require('../models/user');

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
};
