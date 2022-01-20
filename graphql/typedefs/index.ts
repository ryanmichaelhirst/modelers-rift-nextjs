import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CharactersFilter {
    nameCnt: String
    typeEq: String
    includeAssets: Boolean
  }

  type Character {
    id: ID
    name: String
    assets: [Asset]
  }

  input UsersFilter {
    usernameCnt: String
    nameCnt: String
  }

  type User {
    id: Int
    username: String
    password: String
    email: String
    name: String
  }

  input AssetsFilter {
    nameCnt: String
    typeEq: String
    characterIdsIncludes: [ID]
  }

  type Asset {
    id: ID
    character: Character
    characterId: ID
    type: String
    name: String
    skin: String
    path: String
  }

  type Query {
    users(filter: UsersFilter): [User]
    characters(filter: CharactersFilter): [Character]
    assets(filter: AssetsFilter): [Asset]
  }
`
