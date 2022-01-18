import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ChampionsFilter {
    nameCnt: String
    includeAssets: Boolean
  }

  type Champion {
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
    championIdsIncludes: [ID]
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
    users(filter: UsersFilter): [User]
    champions(filter: ChampionsFilter): [Champion]
    assets(filter: AssetsFilter): [Asset]
  }
`
