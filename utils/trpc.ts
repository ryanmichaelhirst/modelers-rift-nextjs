import { createReactQueryHooks } from '@trpc/react'
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '../pages/api/trpc/[trpc]'

export const trpc = createReactQueryHooks<AppRouter>()

/**
 * Enum containing all api query paths
 */
export type TQuery = keyof AppRouter['_def']['queries']

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

export type CharacterGetOutput = InferQueryOutput<'character.get'>

export type Asset = Pick<NonNullable<CharacterGetOutput>, 'assets'>['assets'][0]

export type Character = CharacterGetOutput
