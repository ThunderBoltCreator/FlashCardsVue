import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  type Deck,
  type FindAllDecksOptions,
  getMinMaxCardsCount,
  type Pagination
} from '@/entities/decks/api/decks-api.ts'
import { getPaginateDecks } from '@/entities/decks/api/decks-api.ts'
import type { ResponseFromModel } from '@/shared/lib/notifications.ts'
import type { AppError } from '@/shared/config/api/api.ts'

export const useDecksStore = defineStore('decks', () => {
  const decks = ref<Deck[] | null>(null)
  const decksPagination = ref<Pagination | null>(null)
  const minMaxCount = ref<number[] | null>(null)

  async function fetchDecks(
    params?: FindAllDecksOptions,
    options?: RequestInit
  ): Promise<ResponseFromModel> {
    try {
      const queryParams = new URLSearchParams(params)
      const { items, pagination } = await getPaginateDecks(queryParams, options)

      decks.value = items
      decksPagination.value = pagination
      return {
        type: 'success',
        message: 'Decks fetched'
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e)
      }
      const error = e as AppError
      return {
        type: 'error',
        message: error.message
      }
    }
  }

  async function fetchMinMax() {
    try {
      const { min, max } = await getMinMaxCardsCount()

      minMaxCount.value = [min, max]
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e)
      }
      const error = e as AppError
      return {
        type: 'error',
        message: error.message
      }
    }
  }

  return { fetchDecks, decks, decksPagination, fetchMinMax, minMaxCount }
})
