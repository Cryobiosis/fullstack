import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born,
      bookCount
    }
  } 
`
export const ALL_BOOKS = gql`
query {
    allBooks {
      title,
      author,
      published
    }
  } 
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genre: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genre
    ) {
      title,
      author,
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $birthyear: Int!) {
    editAuthor(name: $name, setBornTo: $birthyear) {
       name,
       born,
       id
     }
  }
`

