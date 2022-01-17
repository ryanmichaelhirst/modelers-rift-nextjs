import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Champion {
    id: ID
    name: String!
    assets: [Asset]
  }

  type User {
    id: Int
    username: String!
    password: String!
    email: String!
    name: String
  }

  type Asset {
    id: ID
    champion: Champion
    championId: ID
    type: String
    name: String
    skin: String
    path: String
  }

  type Query {
    users: [User]
    champions: [Champion]
    assets: [Asset]
  }
`
