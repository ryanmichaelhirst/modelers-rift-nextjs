import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CharactersFilter {
    nameCnt: String
    nameEq: String
    typeEq: String
    assetsTypeEq: String
  }

  type Character {
    id: ID
    name: String
    displayName: String
    assets: [Asset]
  }

  type Metadata {
    totalCount: Int
    totalPages: Int
    currentPage: Int
    pageSize: Int
  }

  type CharacterCollection {
    collection: [Character]
    metadata: Metadata
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
    typeIncludes: [String]
    characterName: String
  }

  type Asset {
    id: ID
    character: Character
    characterId: ID
    type: String
    name: String
    skin: String
    path: String
    duration: Float
  }

  type Job {
    name: String
  }

  type Query {
    users(filter: UsersFilter): [User]
    characters(
      filter: CharactersFilter
      page: Int
      pageSize: Int
      includeAssets: Boolean
    ): CharacterCollection
    character(filter: CharactersFilter, includeAssets: Boolean): Character
    assets(filter: AssetsFilter): [Asset]
    jobs: [Job]
  }
`
