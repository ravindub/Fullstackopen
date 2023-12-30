const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  const maxBlog = blogs.reduce((max, blog) => {
    max = max.likes > blog.likes ? max : blog
    return max
  }, {})

  return maxBlog
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')

  const authorPairs = _.toPairs(authors)

  const maxAuthor = _.maxBy(authorPairs, ([author, value]) => value)

  return {
    author: maxAuthor[0],
    blogs: maxAuthor[1]
  }
}

const mostLikes = (blogs) => {
  const authors = _.reduce(
    blogs,
    (result, blog) => {
      result[blog.author] = (result[blog.author] || 0) + blog.likes
      return result
    },
    {}
  )

  const authorPairs = _.toPairs(authors)
  const maxAuthor = _.maxBy(authorPairs, ([author, likes]) => likes)

  return {
    author: maxAuthor[0],
    likes: maxAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
