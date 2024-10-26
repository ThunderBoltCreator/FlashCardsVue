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
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useDecksStore } from '@/entities/decks/model/decks-model.ts'
import { AppPagination } from '@/widgets/pagination'
import { FullPageSpinner } from '@/shared/ui/spinner'
import { useRoute, useRouter } from 'vue-router'
import { useRouteQuery } from '@vueuse/router'
import SearchField from '@/features/search-field/ui/SearchField.vue'
import { refDebounced } from '@vueuse/core'
import DecksSwitcher from '@/pages/decks/ui/DecksSwitcher.vue'
import DecksSlider from '@/pages/decks/ui/DecksSlider.vue'
import { Button } from '@/shared/ui/button'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const route = useRoute()
const router = useRouter()
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
function cancelRequest() {
  if (controller) {
    console.log('cancel request')
    controller.abort()
  }
}
function onSliderChange(sliderPayload: number[]) {
  console.log('onSliderChange', sliderPayload)
  router.push({
    query: {
      ...route.query,
      minCardsCount: sliderPayload[0],
      maxCardsCount: sliderPayload[1]
    }
  })
}
function clearFilters() {
  router.push({
    path: route.path
  })
}
watch(itemsPerPage, (value, oldValue) => {
  if (value !== oldValue) {
    router.push({
      query: {
        ...route.query,
        page: 1
      }
    })
  }
})

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
onMounted(async () => {
  isLoading.value = true
  await decksStore.fetchMinMax()
  isLoading.value = false
})
onUnmounted(() => {
  console.log('unmount')
  cancelRequest()
})

const searchName = ref('')
const debouncedSearchName = refDebounced(searchName, 500)

watch(debouncedSearchName, () => {
  router.push({
    query: {
      ...route.query,
      name: debouncedSearchName.value,
      page: 1
    }
  })
})
</script>
<template>
  <AppTypography type="h1">Decks list</AppTypography>
  <template v-if="decksStore.minMaxCount">
    <div class="filters">
      <SearchField model class-name="search" />
      <DecksSwitcher />
      <DecksSlider
        :on-change="onSliderChange"
        :min="decksStore.minMaxCount[0]"
        :max="decksStore.minMaxCount[1]"
      />
      <Button variant="secondary" class="clear-filter-btn" @click="clearFilters">
        <IconBase name="sprite/trash" />
        <AppTypography type="subtitle2"> Clear Filter </AppTypography>
      </Button>
    </div>
    <TableRoot class="table">
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
      @change-page-size="router.push({ query: { ...route.query, itemsPerPage: $event } })"
    />
  </template>
  <FullPageSpinner v-if="isLoading" />
</template>
<style scoped>
.filters {
  margin-bottom: 36px;
  display: flex;
  align-items: flex-end;
  gap: 24px;
}
.clear-filter-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 24px;

  &:deep(svg) {
    font-size: 14px;
  }
}
.search {
  height: 36px;
}
.table {
  margin-bottom: 24px;
}
:deep(.search) {
  max-width: 300px;
}
</style>
