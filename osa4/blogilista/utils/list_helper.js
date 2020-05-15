
const dummy = () => { return 1 }

const totalLikes = (blogs) => {
  // console.log(blogs)
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  // console.log(blogs)
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}