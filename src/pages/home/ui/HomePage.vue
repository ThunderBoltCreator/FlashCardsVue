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
import { useUrlSearchParams } from '@vueuse/core'

const searchParams = useUrlSearchParams()
searchParams.first = 'hello'
console.log(searchParams)
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
      <TableRow>
        <TableCell>cell 1</TableCell>
        <TableCell>cell 2</TableCell>
        <TableCell>cell 3</TableCell>
        <TableCell>cell 4</TableCell>
        <TableCell>cell 5</TableCell>
      </TableRow>
    </TableBody>
  </TableRoot>
  <div>pagination</div>
</template>
