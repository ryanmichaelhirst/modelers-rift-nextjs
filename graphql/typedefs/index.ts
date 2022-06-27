import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Metadata {
    totalCount: Int
    totalPages: Int
    currentPage: Int
    pageSize: Int
  }

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

  type CharacterCollection {
    collection: [Character]
    metadata: Metadata
  }

  input AssetsFilter {
    typeEq: String
    typeIncludes: [String]
    pathIncludes: [String]
    skinEq: String
    characterId: String
  }

  type Asset {
    id: ID
    character: Character
    characterId: ID
    type: String
    name: String
    skin: String
    uri: String
    url: String
    duration: Float
  }

  type AssetsCollection {
    collection: [Asset]
    metadata: Metadata
  }

  type Job {
    name: String
  }

  type Query {
    characters(
      filter: CharactersFilter
      page: Int
      pageSize: Int
      includeAssets: Boolean
    ): CharacterCollection
    character(filter: CharactersFilter, includeAssets: Boolean): Character
    assets(filter: AssetsFilter, page: Int, pageSize: Int): AssetsCollection
    jobs: [Job]
  }
`
