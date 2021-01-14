const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (previousBlog, currentBlog) => {
    return previousBlog.likes > currentBlog.likes
      ? previousBlog
      : currentBlog
  }

  const mostLikedBlog = blogs.reduce(reducer, blogs[0])

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}