import { GraphQLResolveInfo } from 'graphql';
import { Champion as ChampionModel, Asset as AssetModel } from '@prisma/client/index.d';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  champion?: Maybe<Champion>;
  championId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  skin?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AssetsFilter = {
  championIdsIncludes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  nameCnt?: InputMaybe<Scalars['String']>;
  typeEq?: InputMaybe<Scalars['String']>;
};

export type Champion = {
  __typename?: 'Champion';
  assets?: Maybe<Array<Maybe<Asset>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type ChampionsFilter = {
  includeAssets?: InputMaybe<Scalars['Boolean']>;
  nameCnt?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  assets?: Maybe<Array<Maybe<Asset>>>;
  champions?: Maybe<Array<Maybe<Champion>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryAssetsArgs = {
  filter?: InputMaybe<AssetsFilter>;
};


export type QueryChampionsArgs = {
  filter?: InputMaybe<ChampionsFilter>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UsersFilter>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UsersFilter = {
  nameCnt?: InputMaybe<Scalars['String']>;
  usernameCnt?: InputMaybe<Scalars['String']>;
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
  AssetsFilter: AssetsFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Champion: ResolverTypeWrapper<ChampionModel>;
  ChampionsFilter: ChampionsFilter;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UsersFilter: UsersFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: AssetModel;
  AssetsFilter: AssetsFilter;
  Boolean: Scalars['Boolean'];
  Champion: ChampionModel;
  ChampionsFilter: ChampionsFilter;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Query: {};
  String: Scalars['String'];
  User: User;
  UsersFilter: UsersFilter;
};

export type AssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  champion?: Resolver<Maybe<ResolversTypes['Champion']>, ParentType, ContextType>;
  championId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChampionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Champion'] = ResolversParentTypes['Champion']> = {
  assets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  assets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType, RequireFields<QueryAssetsArgs, never>>;
  champions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Champion']>>>, ParentType, ContextType, RequireFields<QueryChampionsArgs, never>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>;
  Champion?: ChampionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export type AssetsIndexQueryVariables = Exact<{
  filter?: InputMaybe<AssetsFilter>;
}>;


export type AssetsIndexQuery = { __typename?: 'Query', assets?: Array<{ __typename?: 'Asset', id?: string | null | undefined, championId?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, path?: string | null | undefined } | null | undefined> | null | undefined };

export type ChampionsIndexQueryVariables = Exact<{
  filter?: InputMaybe<ChampionsFilter>;
}>;


export type ChampionsIndexQuery = { __typename?: 'Query', champions?: Array<{ __typename?: 'Champion', id?: string | null | undefined, name?: string | null | undefined, assets?: Array<{ __typename?: 'Asset', id?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, skin?: string | null | undefined, path?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type UsersIndexQueryVariables = Exact<{
  filter?: InputMaybe<UsersFilter>;
}>;


export type UsersIndexQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id?: number | null | undefined, username?: string | null | undefined, email?: string | null | undefined, name?: string | null | undefined } | null | undefined> | null | undefined };


export const AssetsIndexDocument = gql`
    query AssetsIndex($filter: AssetsFilter) {
  assets(filter: $filter) {
    id
    championId
    type
    name
    skin
    path
  }
}
    `;

/**
 * __useAssetsIndexQuery__
 *
 * To run a query within a React component, call `useAssetsIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetsIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetsIndexQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAssetsIndexQuery(baseOptions?: Apollo.QueryHookOptions<AssetsIndexQuery, AssetsIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssetsIndexQuery, AssetsIndexQueryVariables>(AssetsIndexDocument, options);
      }
export function useAssetsIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssetsIndexQuery, AssetsIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssetsIndexQuery, AssetsIndexQueryVariables>(AssetsIndexDocument, options);
        }
export type AssetsIndexQueryHookResult = ReturnType<typeof useAssetsIndexQuery>;
export type AssetsIndexLazyQueryHookResult = ReturnType<typeof useAssetsIndexLazyQuery>;
export type AssetsIndexQueryResult = Apollo.QueryResult<AssetsIndexQuery, AssetsIndexQueryVariables>;
export const ChampionsIndexDocument = gql`
    query ChampionsIndex($filter: ChampionsFilter) {
  champions(filter: $filter) {
    id
    name
    assets {
      id
      type
      name
      skin
      path
    }
  }
}
    `;

/**
 * __useChampionsIndexQuery__
 *
 * To run a query within a React component, call `useChampionsIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useChampionsIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChampionsIndexQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useChampionsIndexQuery(baseOptions?: Apollo.QueryHookOptions<ChampionsIndexQuery, ChampionsIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChampionsIndexQuery, ChampionsIndexQueryVariables>(ChampionsIndexDocument, options);
      }
export function useChampionsIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChampionsIndexQuery, ChampionsIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChampionsIndexQuery, ChampionsIndexQueryVariables>(ChampionsIndexDocument, options);
        }
export type ChampionsIndexQueryHookResult = ReturnType<typeof useChampionsIndexQuery>;
export type ChampionsIndexLazyQueryHookResult = ReturnType<typeof useChampionsIndexLazyQuery>;
export type ChampionsIndexQueryResult = Apollo.QueryResult<ChampionsIndexQuery, ChampionsIndexQueryVariables>;
export const UsersIndexDocument = gql`
    query UsersIndex($filter: UsersFilter) {
  users(filter: $filter) {
    id
    username
    email
    name
  }
}
    `;

/**
 * __useUsersIndexQuery__
 *
 * To run a query within a React component, call `useUsersIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersIndexQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersIndexQuery(baseOptions?: Apollo.QueryHookOptions<UsersIndexQuery, UsersIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersIndexQuery, UsersIndexQueryVariables>(UsersIndexDocument, options);
      }
export function useUsersIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersIndexQuery, UsersIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersIndexQuery, UsersIndexQueryVariables>(UsersIndexDocument, options);
        }
export type UsersIndexQueryHookResult = ReturnType<typeof useUsersIndexQuery>;
export type UsersIndexLazyQueryHookResult = ReturnType<typeof useUsersIndexLazyQuery>;
export type UsersIndexQueryResult = Apollo.QueryResult<UsersIndexQuery, UsersIndexQueryVariables>;