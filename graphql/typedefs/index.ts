import { YogaInitialContext } from '@graphql-yoga/node'
import prisma from '@lib/prisma'
import { gql } from 'graphql-tag'
import { IncomingMessage, ServerResponse } from 'http'

export type GraphqlContext = {
  prisma: typeof prisma
  userId: number | null
} & YogaInitialContext & {
    req: IncomingMessage
    res: ServerResponse
  }

export const typeDefs = gql`
  scalar DateTime

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
    assetsTypeIncludes: [String]
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
    s3Url: String
    duration: Float
  }

  type AssetsCollection {
    collection: [Asset]
    metadata: Metadata
  }

  type Job {
    name: String
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type UserPayload {
    user: User!
    token: String!
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
    user(id: ID!): User
    currentUser: User
  }

  type Mutation {
    signUp(input: SignUpInput!): UserPayload
    login(input: LoginInput!): UserPayload
    logout: User
  }
`
