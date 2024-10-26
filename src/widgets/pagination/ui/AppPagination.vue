<script lang="ts" setup>
import type { Pagination } from '@/entities/decks/api/decks-api.ts'
import { useRoute } from 'vue-router'
import { usePaginate } from '@/widgets/pagination/lib/use-paginate.ts'
import IconBase from '@/shared/ui/icon/IconBase.vue'
import BaseSelect from '@/shared/ui/select/BaseSelect.vue'
import AppTypography from '@/shared/ui/typography/AppTypography.vue'

type PaginationProps = Pagination

const route = useRoute()
const props = defineProps<PaginationProps>()
const emit = defineEmits<{
  (e: 'changePageSize', value: number): void
}>()

// paginate = [1, '...', 6, 7, 8, '...', 29]
const paginate = usePaginate(
  () => props.currentPage,
  2,
  () => props.totalPages
)

const ITEMS_PER_PAGE_VARIANTS = [5, 10, 15]
const changePageSize = (value: string) => {
  emit('changePageSize', Number(value))
}
</script>
<template>
  <div class="pagination-inner-wrapper">
    <ul class="paginate">
      <li :aria-disabled="props.currentPage === 1" class="paginate-button paginate-item">
        <RouterLink
          :to="{
            path: route.path,
            query: {
              ...route.query,
              page: props.currentPage - 1
            }
          }"
        >
          <IconBase name="sprite/paginate-arrow-left" />
        </RouterLink>
      </li>
      <template v-for="(page, index) in paginate" :key="page + index.toString()">
        <li class="paginate-item" :aria-checked="currentPage === page">
          <span v-if="typeof page === 'string' || page === currentPage">{{ page }}</span>
          <RouterLink
            v-else
            :to="{
              path: route.path,
              query: {
                ...route.query,
                page
              }
            }"
          >
            {{ page }}
          </RouterLink>
        </li>
      </template>
      <li
        :aria-disabled="props.currentPage === props.totalPages"
        class="paginate-button paginate-item"
      >
        <RouterLink
          :to="{
            path: route.path,
            query: {
              ...route.query,
              page: props.currentPage + 1
            }
          }"
          ><IconBase name="sprite/paginate-arrow-right"
        /></RouterLink>
      </li>
    </ul>
    <div class="page-size-select-wrapper">
      <AppTypography type="body2">Показать</AppTypography>
      <BaseSelect
        :on-change="changePageSize"
        :options="ITEMS_PER_PAGE_VARIANTS"
        :value="props.itemsPerPage"
      />
      <AppTypography type="body2">На странице</AppTypography>
    </div>
  </div>
</template>
<style scoped>
.pagination-inner-wrapper {
  display: flex;
  align-items: center;
  column-gap: 24px;
}
.paginate {
  display: flex;
  align-items: center;
}
.paginate-item {
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}
.paginate-item[aria-checked='true'] {
  background-color: var(--color-light-100);
  color: var(--color-dark-900);
}
.paginate-button {
  background: transparent;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.paginate-button a {
  display: flex;
  align-items: center;
  justify-content: center;
}
.paginate-button:not(:last-child) {
  margin-right: 18px;
}
.paginate-button:last-child {
  margin-left: 18px;
}

.paginate-button[aria-disabled='true'] {
  opacity: 0.3;
  pointer-events: none;
}
.page-size-select-wrapper {
  display: flex;
  align-items: center;
}
.page-size-select-wrapper > :last-child {
  margin-left: 9px;
}
.page-size-select-wrapper > :first-child {
  margin-right: 6px;
}
</style>
