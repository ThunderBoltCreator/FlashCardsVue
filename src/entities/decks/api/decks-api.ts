import { makeAuthorizedRequest } from '@/shared/config/api/api.ts'
import type { DeckAuthor } from '@/shared/config/api/generated.ts'

export type DecksOrderBy = keyof typeof DecksOrderBy

export const DecksOrderBy = {
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

export type FindAllDecksOptions = {
  /**
   * Filter by deck authorId
   */
  authorId?: string
  currentPage?: string
  itemsPerPage?: string
  maxCardsCount?: string
  minCardsCount?: string
  /**
   * Search by deck name
   */
  name?: string
  /**
    * A string that represents the name of the field to order by and the order direction.
    The format is: "field_name-order_direction".
    Available directions: "asc" and "desc".
    */
  orderBy?: DecksOrderBy
}

export interface Deck {
  author: DeckAuthor
  cardsCount: number
  /** @nullable */
  cover: null | string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
export interface PaginatedDecks {
  items: Deck[]
  pagination: Pagination
}

/**
 * Retrieve paginated decks list.
 * @summary Paginated decks list
 */
export const getPaginateDecks = (params?: URLSearchParams, options?: RequestInit) => {
  let query = ''
  if (params) {
    query = params.toString()
  }

  return makeAuthorizedRequest<PaginatedDecks>({
    method: 'GET',
    path: `/v2/decks?${query}`,
    ...options
  })
}
