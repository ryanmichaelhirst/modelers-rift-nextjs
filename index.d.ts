/// <reference types="next/types/global" />
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const query: DocumentNode
  export default query
}
