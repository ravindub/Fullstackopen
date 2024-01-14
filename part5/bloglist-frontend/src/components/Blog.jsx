import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    try {
      const response = await blogService.create(newBlog);

      setBlogs(blogs.concat(response));

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Create New Blog</h1>

        <form onSubmit={addBlog}>
          <div>
            Title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </div>
          <div>
            Url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            {blog.title} {blog.author}
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
