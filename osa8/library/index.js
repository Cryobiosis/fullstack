const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URL

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
*/

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/
/*
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
*/

const typeDefs = gql`
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!
  id: ID!
  bookCount: Int
  born: Int
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  findAuthor(name: String!): Author
  me: User
}

type Mutation {
  addBook(
    title: String!
    published: Int
    genres: [String]
    author: String!
  ): Book

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
}

`
//  
console.log('debug')

const resolvers = {
  Query: {
    bookCount: async () => await Book.count(), // books.length,
    authorCount: async () => await Author.count(), // authors.length,
    // MongooseError: Query was already executed: 
    // https://stackoverflow.com/questions/69346158/mongooseerror-query-was-already-executed-user-countdocuments
    allBooks: async (root, args) => {
      let _search = {}

      // Filter by genre
      if (args.genre) {
        _search = { genres: {$in: [args.genre] } }
      }
        
      // Filter by author
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        _search = { author: author._id }
      }
        
      /*
      if (args.genre) {
        // NOTE: genres is array, so multiple values
        _books = _books.filter(b => b.genres.includes(args.genre)
        )
      }
      if (args.author)
        _books = _books.filter(b => b.author === args.author)
      // return await Book.find({{author:})
      */
      return await Book.find(_search)
    },
    allAuthors: async (root, args) => await Author.find({}) // authors,
  },
  Author: {
    bookCount: async (root, args) => {
      const author = Author.findOne({ name: args.name })
      if (!author) return 0
      return await Book.count({author: root._id})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      if (args.author.length < 4) {
        throw new UserInputError('Author name < 4 chars')
      }
      const author = await Author.findOne({ name: args.author })
      // Save new author
      if (!author) {
        const _author = Author({ name: args.author })
        try {
          await _author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const authorId = author.id ? author.id : _author.id
      const _book = new Book({ ...args, author: authorId })

      // TODO: Add validation
      if (args.title.length < 4) {
        throw new UserInputError('Book title < 4 chars')
      }
      
      try {
        await _book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return _book
      /*
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      // Add also author if it is missing
      const _author = authors.filter(b => b.author === args.author)
      if (!_author.length) {
        const author = { 
          name: args.author,
          born: null, 
          id: uuid() 
        }
        authors = authors.concat(author)
      }
      */
      return book
    }, 

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    // TODO me
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
