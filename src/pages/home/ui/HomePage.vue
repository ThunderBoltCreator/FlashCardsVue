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
import { onMounted } from 'vue'
import { useDecksStore } from '@/entities/decks/model/decks-model.ts'
import { showToastWithModelResponse } from '@/shared/lib/notifications.ts'
import { AppPagination } from '@/widgets/pagination'

const decksStore = useDecksStore()

onMounted(async () => {
  const res = await decksStore.fetchDecks()
  showToastWithModelResponse(res)
})
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
  <AppPagination />
</template>
