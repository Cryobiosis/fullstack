
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

const mostBlogs = (blogs) => {
  // console.log(blogs)
  if (blogs.length <= 0) return
  // console.log(blogs)

  // console.log(_.maxBy(blogs, 'author'));
  const _ = require('lodash')

  function author(blog) {
    return [blog.author]
  }

  const authors = _.flatMap(blogs, author)
  //const authors = _(blogs).groupBy("author")
  //const _.(authors).groupBy('nestedA.nestedB.id').size()

  // console.log('authors', authors)

  // TODO: There has to be better way to count values from array!!!???!?

  let author2 = ''
  let count = 0
  let maxCount = 0;
  let authorMap = []

  _.forEach(authors, function(value) {
    // console.log(value)
    if (!authorMap[value]) authorMap[value] = 1
    else authorMap[value]++

    // Save author name and count
    if (authorMap[value] > maxCount) {
      author2 = value
      count = authorMap[value]++
      maxCount++
    }

  })

  // console.log(_.maxBy(foo, function(o) { console.log(o); return o }))
  //console.log('count', _.countBy(authors, key))

  return { 'author': author2, 'blogs': count }
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes
}