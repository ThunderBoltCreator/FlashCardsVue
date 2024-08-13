import { makeAuthorizedRequest } from '@/shared/config/api/api.ts'
import type { DeckWithAuthor, Pagination } from '@/shared/config/api/generated.ts'

export type DecksControllerFindAllV2OrderBy = keyof typeof DecksControllerFindAllV2OrderBy

export const DecksControllerFindAllV2OrderBy = {
  'authorname-asc': 'author.name-asc',
  'authorname-desc': 'author.name-desc',
  'cardsCount-asc': 'cardsCount-asc',
  'cardsCount-desc': 'cardsCount-desc',
  'created-asc': 'created-asc',
  'created-desc': 'created-desc',
  'name-asc': 'name-asc',
  'name-desc': 'name-desc',
  null: 'null',
  'updated-asc': 'updated-asc',
  'updated-desc': 'updated-desc'
} as const

export type DecksControllerFindAllV2Params = {
  /**
   * Filter by deck authorId
   */
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  /**
   * Search by deck name
   */
  name?: string
  /**
    * A string that represents the name of the field to order by and the order direction.
    The format is: "field_name-order_direction".
    Available directions: "asc" and "desc".
    */
  orderBy?: DecksControllerFindAllV2OrderBy
}
export interface PaginatedDecks {
  items: DeckWithAuthor[]
  pagination: Pagination
}

/**
 * Retrieve paginated decks list.
 * @summary Paginated decks list
 */
export const getPaginateDecks = (options: DecksControllerFindAllV2Params) => {
  return makeAuthorizedRequest<PaginatedDecks>({ method: 'GET', path: `/v2/decks` })
}
