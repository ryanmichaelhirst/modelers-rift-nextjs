import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Character as CharacterModel, Asset as AssetModel, User as UserModel, CurrentUser as CurrentUserModel } from '@prisma/client/index.d';
import { GraphqlContext } from 'graphql/typedefs/index';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Asset = {
  __typename?: 'Asset';
  character?: Maybe<Character>;
  characterId?: Maybe<Scalars['ID']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  s3Url?: Maybe<Scalars['String']>;
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

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Metadata = {
  __typename?: 'Metadata';
  currentPage?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<UserPayload>;
  logout?: Maybe<User>;
  signUp?: Maybe<UserPayload>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  assets?: Maybe<AssetsCollection>;
  character?: Maybe<Character>;
  characters?: Maybe<CharacterCollection>;
  currentUser?: Maybe<User>;
  jobs?: Maybe<Array<Maybe<Job>>>;
  user?: Maybe<User>;
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


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  token: Scalars['String'];
  user: User;
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Job: ResolverTypeWrapper<Job>;
  LoginInput: LoginInput;
  Metadata: ResolverTypeWrapper<Metadata>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignUpInput: SignUpInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserModel>;
  UserPayload: ResolverTypeWrapper<Omit<UserPayload, 'user'> & { user: ResolversTypes['User'] }>;
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
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Job: Job;
  LoginInput: LoginInput;
  Metadata: Metadata;
  Mutation: {};
  Query: {};
  SignUpInput: SignUpInput;
  String: Scalars['String'];
  User: UserModel;
  UserPayload: Omit<UserPayload, 'user'> & { user: ResolversParentTypes['User'] };
};

export type AssetResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType>;
  characterId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3Url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssetsCollectionResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['AssetsCollection'] = ResolversParentTypes['AssetsCollection']> = {
  collection?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  assets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterCollectionResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CharacterCollection'] = ResolversParentTypes['CharacterCollection']> = {
  collection?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type JobResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetadataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  signUp?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  assets?: Resolver<Maybe<ResolversTypes['AssetsCollection']>, ParentType, ContextType, Partial<QueryAssetsArgs>>;
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, Partial<QueryCharacterArgs>>;
  characters?: Resolver<Maybe<ResolversTypes['CharacterCollection']>, ParentType, ContextType, Partial<QueryCharactersArgs>>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type UserResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPayloadResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlContext> = {
  Asset?: AssetResolvers<ContextType>;
  AssetsCollection?: AssetsCollectionResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CharacterCollection?: CharacterCollectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Job?: JobResolvers<ContextType>;
  Metadata?: MetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
};


export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserPayload', token: string, user: { __typename?: 'User', id: string, name: string, email: string, password: string, createdAt: any, updatedAt: any, deletedAt?: any | null } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string, name: string, email: string, password: string, createdAt: any, updatedAt: any, deletedAt?: any | null } | null };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'UserPayload', token: string, user: { __typename?: 'User', id: string, name: string, email: string, password: string, createdAt: any, updatedAt: any, deletedAt?: any | null } } | null };

export type AssetsFragmentFragment = { __typename?: 'Asset', id?: string | null, characterId?: string | null, type?: string | null, name?: string | null, skin?: string | null, uri?: string | null, url?: string | null, s3Url?: string | null, duration?: number | null };

export type AssetsQueryVariables = Exact<{
  filter?: InputMaybe<AssetsFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type AssetsQuery = { __typename?: 'Query', assets?: { __typename?: 'AssetsCollection', collection?: Array<{ __typename?: 'Asset', id?: string | null, characterId?: string | null, type?: string | null, name?: string | null, skin?: string | null, uri?: string | null, url?: string | null, s3Url?: string | null, duration?: number | null, character?: { __typename?: 'Character', name?: string | null } | null } | null> | null } | null };

export type CharacterFragmentFragment = { __typename?: 'Character', id?: string | null, name?: string | null, displayName?: string | null, assets?: Array<{ __typename?: 'Asset', id?: string | null, type?: string | null, name?: string | null, skin?: string | null, uri?: string | null, url?: string | null, s3Url?: string | null, duration?: number | null } | null> | null };

export type CharactersQueryVariables = Exact<{
  filter?: InputMaybe<CharactersFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  includeAssets: Scalars['Boolean'];
}>;


export type CharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'CharacterCollection', collection?: Array<{ __typename?: 'Character', id?: string | null, name?: string | null, displayName?: string | null, assets?: Array<{ __typename?: 'Asset', id?: string | null, type?: string | null, name?: string | null, skin?: string | null, uri?: string | null, url?: string | null, s3Url?: string | null, duration?: number | null } | null> | null } | null> | null, metadata?: { __typename?: 'Metadata', totalCount?: number | null, totalPages?: number | null, currentPage?: number | null, pageSize?: number | null } | null } | null };

export type CharacterQueryVariables = Exact<{
  filter?: InputMaybe<CharactersFilter>;
  includeAssets: Scalars['Boolean'];
}>;


export type CharacterQuery = { __typename?: 'Query', character?: { __typename?: 'Character', id?: string | null, name?: string | null, displayName?: string | null, assets?: Array<{ __typename?: 'Asset', id?: string | null, type?: string | null, name?: string | null, skin?: string | null, uri?: string | null, url?: string | null, s3Url?: string | null, duration?: number | null } | null> | null } | null };

export type JobsIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsIndexQuery = { __typename?: 'Query', jobs?: Array<{ __typename?: 'Job', name?: string | null } | null> | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, name: string, email: string, password: string, createdAt: any, updatedAt: any, deletedAt?: any | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, password: string, createdAt: any, updatedAt: any, deletedAt?: any | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, name: string, email: string, password: string, createdAt: any, updatedAt: any, deletedAt?: any | null } | null };

export const AssetsFragmentFragmentDoc = gql`
    fragment AssetsFragment on Asset {
  id
  characterId
  type
  name
  skin
  uri
  url
  s3Url
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
    s3Url
    duration
  }
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  password
  createdAt
  updatedAt
  deletedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      name
      email
      password
      createdAt
      updatedAt
      deletedAt
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    id
    name
    email
    password
    createdAt
    updatedAt
    deletedAt
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    user {
      id
      name
      email
      password
      createdAt
      updatedAt
      deletedAt
    }
    token
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
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
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;