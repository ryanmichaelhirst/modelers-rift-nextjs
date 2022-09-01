import { YogaInitialContext } from '@graphql-yoga/node'
import type { PrismaService } from '@lib/prisma'
import { gql } from 'graphql-tag'
import { IncomingMessage, ServerResponse } from 'http'

export type GraphqlContext = {
  prismaService: PrismaService
  userId: number | null
  sessionId: string | null
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
