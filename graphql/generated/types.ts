import { GraphQLResolveInfo } from 'graphql';
import { Character as CharacterModel, Asset as AssetModel } from '@prisma/client/index.d';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Asset = {
  __typename?: 'Asset';
  character?: Maybe<Character>;
  characterId?: Maybe<Scalars['ID']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  skin?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AssetsCollection = {
  __typename?: 'AssetsCollection';
  collection?: Maybe<Array<Maybe<Asset>>>;
  metadata?: Maybe<Metadata>;
};

export type AssetsFilter = {
  characterId?: InputMaybe<Scalars['String']>;
  pathIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skinEq?: InputMaybe<Scalars['String']>;
  typeEq?: InputMaybe<Scalars['String']>;
  typeIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Character = {
  __typename?: 'Character';
  assets?: Maybe<Array<Maybe<Asset>>>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type CharacterCollection = {
  __typename?: 'CharacterCollection';
  collection?: Maybe<Array<Maybe<Character>>>;
  metadata?: Maybe<Metadata>;
};

export type CharactersFilter = {
  assetsTypeEq?: InputMaybe<Scalars['String']>;
  assetsTypeIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nameCnt?: InputMaybe<Scalars['String']>;
  nameEq?: InputMaybe<Scalars['String']>;
  typeEq?: InputMaybe<Scalars['String']>;
};

export type Job = {
  __typename?: 'Job';
  name?: Maybe<Scalars['String']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  currentPage?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  assets?: Maybe<AssetsCollection>;
  character?: Maybe<Character>;
  characters?: Maybe<CharacterCollection>;
  jobs?: Maybe<Array<Maybe<Job>>>;
};


export type QueryAssetsArgs = {
  filter?: InputMaybe<AssetsFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};


export type QueryCharacterArgs = {
  filter?: InputMaybe<CharactersFilter>;
  includeAssets?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharactersFilter>;
  includeAssets?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Asset: ResolverTypeWrapper<AssetModel>;
  AssetsCollection: ResolverTypeWrapper<Omit<AssetsCollection, 'collection'> & { collection?: Maybe<Array<Maybe<ResolversTypes['Asset']>>> }>;
  AssetsFilter: AssetsFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Character: ResolverTypeWrapper<CharacterModel>;
  CharacterCollection: ResolverTypeWrapper<Omit<CharacterCollection, 'collection'> & { collection?: Maybe<Array<Maybe<ResolversTypes['Character']>>> }>;
  CharactersFilter: CharactersFilter;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Job: ResolverTypeWrapper<Job>;
  Metadata: ResolverTypeWrapper<Metadata>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: AssetModel;
  AssetsCollection: Omit<AssetsCollection, 'collection'> & { collection?: Maybe<Array<Maybe<ResolversParentTypes['Asset']>>> };
  AssetsFilter: AssetsFilter;
  Boolean: Scalars['Boolean'];
  Character: CharacterModel;
  CharacterCollection: Omit<CharacterCollection, 'collection'> & { collection?: Maybe<Array<Maybe<ResolversParentTypes['Character']>>> };
  CharactersFilter: CharactersFilter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Job: Job;
  Metadata: Metadata;
  Query: {};
  String: Scalars['String'];
};

export type AssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType>;
  characterId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssetsCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssetsCollection'] = ResolversParentTypes['AssetsCollection']> = {
  collection?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  assets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterCollection'] = ResolversParentTypes['CharacterCollection']> = {
  collection?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  assets?: Resolver<Maybe<ResolversTypes['AssetsCollection']>, ParentType, ContextType, RequireFields<QueryAssetsArgs, never>>;
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, never>>;
  characters?: Resolver<Maybe<ResolversTypes['CharacterCollection']>, ParentType, ContextType, RequireFields<QueryCharactersArgs, never>>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>;
  AssetsCollection?: AssetsCollectionResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CharacterCollection?: CharacterCollectionResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  Metadata?: MetadataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


export type AssetsFragmentFragment = { __typename?: 'Asset', id?: string | null | undefined, characterId?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, uri?: string | null | undefined, url?: string | null | undefined, duration?: number | null | undefined };

export type AssetsQueryVariables = Exact<{
  filter?: InputMaybe<AssetsFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type AssetsQuery = { __typename?: 'Query', assets?: { __typename?: 'AssetsCollection', collection?: Array<{ __typename?: 'Asset', id?: string | null | undefined, characterId?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, uri?: string | null | undefined, url?: string | null | undefined, duration?: number | null | undefined, character?: { __typename?: 'Character', name?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type CharacterFragmentFragment = { __typename?: 'Character', id?: string | null | undefined, name?: string | null | undefined, displayName?: string | null | undefined, assets?: Array<{ __typename?: 'Asset', id?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, uri?: string | null | undefined, url?: string | null | undefined, duration?: number | null | undefined } | null | undefined> | null | undefined };

export type CharactersQueryVariables = Exact<{
  filter?: InputMaybe<CharactersFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  includeAssets: Scalars['Boolean'];
}>;


export type CharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'CharacterCollection', collection?: Array<{ __typename?: 'Character', id?: string | null | undefined, name?: string | null | undefined, displayName?: string | null | undefined, assets?: Array<{ __typename?: 'Asset', id?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, uri?: string | null | undefined, url?: string | null | undefined, duration?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined, metadata?: { __typename?: 'Metadata', totalCount?: number | null | undefined, totalPages?: number | null | undefined, currentPage?: number | null | undefined, pageSize?: number | null | undefined } | null | undefined } | null | undefined };

export type CharacterQueryVariables = Exact<{
  filter?: InputMaybe<CharactersFilter>;
  includeAssets: Scalars['Boolean'];
}>;


export type CharacterQuery = { __typename?: 'Query', character?: { __typename?: 'Character', id?: string | null | undefined, name?: string | null | undefined, displayName?: string | null | undefined, assets?: Array<{ __typename?: 'Asset', id?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, uri?: string | null | undefined, url?: string | null | undefined, duration?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type JobsIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsIndexQuery = { __typename?: 'Query', jobs?: Array<{ __typename?: 'Job', name?: string | null | undefined } | null | undefined> | null | undefined };

export const AssetsFragmentFragmentDoc = gql`
    fragment AssetsFragment on Asset {
  id
  characterId
  type
  name
  skin
  uri
  url
  duration
}
    `;
export const CharacterFragmentFragmentDoc = gql`
    fragment CharacterFragment on Character {
  id
  name
  displayName
  assets @include(if: $includeAssets) {
    id
    type
    name
    skin
    uri
    url
    duration
  }
}
    `;
export const AssetsDocument = gql`
    query Assets($filter: AssetsFilter, $page: Int, $pageSize: Int) {
  assets(filter: $filter, page: $page, pageSize: $pageSize) {
    collection {
      ...AssetsFragment
      character {
        name
      }
    }
  }
}
    ${AssetsFragmentFragmentDoc}`;

/**
 * __useAssetsQuery__
 *
 * To run a query within a React component, call `useAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useAssetsQuery(baseOptions?: Apollo.QueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, options);
      }
export function useAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, options);
        }
export type AssetsQueryHookResult = ReturnType<typeof useAssetsQuery>;
export type AssetsLazyQueryHookResult = ReturnType<typeof useAssetsLazyQuery>;
export type AssetsQueryResult = Apollo.QueryResult<AssetsQuery, AssetsQueryVariables>;
export const CharactersDocument = gql`
    query Characters($filter: CharactersFilter, $page: Int, $pageSize: Int, $includeAssets: Boolean!) {
  characters(
    filter: $filter
    page: $page
    pageSize: $pageSize
    includeAssets: $includeAssets
  ) {
    collection {
      ...CharacterFragment
    }
    metadata {
      totalCount
      totalPages
      currentPage
      pageSize
    }
  }
}
    ${CharacterFragmentFragmentDoc}`;

/**
 * __useCharactersQuery__
 *
 * To run a query within a React component, call `useCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharactersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      includeAssets: // value for 'includeAssets'
 *   },
 * });
 */
export function useCharactersQuery(baseOptions: Apollo.QueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, options);
      }
export function useCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, options);
        }
export type CharactersQueryHookResult = ReturnType<typeof useCharactersQuery>;
export type CharactersLazyQueryHookResult = ReturnType<typeof useCharactersLazyQuery>;
export type CharactersQueryResult = Apollo.QueryResult<CharactersQuery, CharactersQueryVariables>;
export const CharacterDocument = gql`
    query Character($filter: CharactersFilter, $includeAssets: Boolean!) {
  character(filter: $filter, includeAssets: $includeAssets) {
    ...CharacterFragment
  }
}
    ${CharacterFragmentFragmentDoc}`;

/**
 * __useCharacterQuery__
 *
 * To run a query within a React component, call `useCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      includeAssets: // value for 'includeAssets'
 *   },
 * });
 */
export function useCharacterQuery(baseOptions: Apollo.QueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
      }
export function useCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export type CharacterQueryHookResult = ReturnType<typeof useCharacterQuery>;
export type CharacterLazyQueryHookResult = ReturnType<typeof useCharacterLazyQuery>;
export type CharacterQueryResult = Apollo.QueryResult<CharacterQuery, CharacterQueryVariables>;
export const JobsIndexDocument = gql`
    query JobsIndex {
  jobs {
    name
  }
}
    `;

/**
 * __useJobsIndexQuery__
 *
 * To run a query within a React component, call `useJobsIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useJobsIndexQuery(baseOptions?: Apollo.QueryHookOptions<JobsIndexQuery, JobsIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsIndexQuery, JobsIndexQueryVariables>(JobsIndexDocument, options);
      }
export function useJobsIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsIndexQuery, JobsIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsIndexQuery, JobsIndexQueryVariables>(JobsIndexDocument, options);
        }
export type JobsIndexQueryHookResult = ReturnType<typeof useJobsIndexQuery>;
export type JobsIndexLazyQueryHookResult = ReturnType<typeof useJobsIndexLazyQuery>;
export type JobsIndexQueryResult = Apollo.QueryResult<JobsIndexQuery, JobsIndexQueryVariables>;