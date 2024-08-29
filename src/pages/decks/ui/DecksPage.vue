<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import {
  TableRoot,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell
} from '@/shared/ui/table'
import { onUnmounted, ref, watch } from 'vue'
import { useDecksStore } from '@/entities/decks/model/decks-model.ts'
import { AppPagination } from '@/widgets/pagination'
import { FullPageSpinner } from '@/shared/ui/spinner'
import { useRoute } from 'vue-router'
import { useRouteQuery } from '@vueuse/router'

const route = useRoute()
const decksStore = useDecksStore()
const isLoading = ref(false)

const page = useRouteQuery('page', '1')
const authorId = useRouteQuery('authorId', '')
const itemsPerPage = useRouteQuery('itemsPerPage', '10')
const maxCardsCount = useRouteQuery('maxCardsCount', '100')
const minCardsCount = useRouteQuery('minCardsCount', '0')
const deckName = useRouteQuery('name', '')
const orderBy = useRouteQuery('orderBy', 'name-asc')

let controller: null | AbortController = null
const cancelRequest = () => {
  if (controller) {
    controller.abort()
  }
}

watch(
  route,
  async () => {
    cancelRequest()

    controller = new AbortController()
    const signal = controller.signal
    isLoading.value = true
    await decksStore.fetchDecks(
      {
        currentPage: page.value,
        authorId: authorId.value,
        itemsPerPage: itemsPerPage.value,
        maxCardsCount: maxCardsCount.value,
        minCardsCount: minCardsCount.value,
        name: deckName.value,
        orderBy: orderBy.value
      },
      {
        signal
      }
    )
    isLoading.value = false
  },
  {
    immediate: true
  }
)

onUnmounted(() => {
  console.log('onUnmounted')
  cancelRequest()
})

//TODO maybe fix typescript
</script>
<template>
  <AppTypography type="h1">Decks list</AppTypography>
  <div>filters and sorts</div>
  <TableRoot>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Cards</TableHeaderCell>
        <TableHeaderCell>Last Updated</TableHeaderCell>
        <TableHeaderCell>Created by</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow v-for="deck in decksStore.decks" :key="deck.id">
        <TableCell>{{ deck.name }}</TableCell>
        <TableCell>{{ deck.cardsCount }}</TableCell>
        <TableCell>{{ new Date(deck.updated).toLocaleDateString() }}</TableCell>
        <TableCell>{{ new Date(deck.created).toLocaleDateString() }}</TableCell>
        <TableCell>actions</TableCell>
      </TableRow>
    </TableBody>
  </TableRoot>
  <AppPagination
    v-if="decksStore.decksPagination"
    :current-page="decksStore.decksPagination.currentPage"
    :total-pages="decksStore.decksPagination.totalPages"
    :items-per-page="decksStore.decksPagination.itemsPerPage"
    :total-items="decksStore.decksPagination.totalItems"
  />
  <FullPageSpinner v-if="isLoading" />
</template>
