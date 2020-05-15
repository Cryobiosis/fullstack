
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
  if (blogs.length <= 0) return

  //let maxKey = 0
  let maxLikes = 0;
  const reducer = (max, item) => {
    // console.log(item._id, item.likes, maxLikes, max)
    if (item.likes > maxLikes) {
      maxLikes = item.likes
      return item._id;
    }
    return max
  }
  const maxID = blogs.reduce(reducer, 0)

  if (maxID) {
    const blogArray = blogs.filter(tmp => tmp._id === maxID)
    const blog = blogArray[0]
    // console.log(blog)
    return {"title": blog.title, "author": blog.author, "likes": blog.likes}
  }
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}