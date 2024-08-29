<script lang="ts" setup>
import type { Pagination } from '@/entities/decks/api/decks-api.ts'
import { computed } from 'vue'
import { type RouteLocationRaw, useRoute } from 'vue-router'
import { usePaginate } from '@/widgets/pagination/lib/use-paginate.ts'
import IconBase from '@/shared/ui/icon/IconBase.vue'

type PaginationProps = Pagination

const route = useRoute()
const props = defineProps<PaginationProps>()

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.currentPage === props.totalPages)

const nextPageUrl = computed<RouteLocationRaw>(() => ({
  path: route.path,
  query: {
    ...route.query,
    page: props.currentPage + 1
  }
}))
const previousPageUrl = computed<RouteLocationRaw>(() => ({
  path: route.path,
  query: {
    ...route.query,
    page: props.currentPage - 1
  }
}))
// paginate = [1, '...', 6, 7, 8, '...', 29]
const paginate = usePaginate(
  () => props.currentPage,
  1,
  () => props.totalPages
)
</script>
<template>
  <div>
    <ul class="paginate">
      <li :aria-disabled="isFirstPage" class="paginate-button paginate-item">
        <RouterLink :to="previousPageUrl"
          ><IconBase name="sprite/paginate-arrow-left"
        /></RouterLink>
      </li>
      <template v-for="page in paginate" :key="page">
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
      <li :aria-disabled="isLastPage" class="paginate-button paginate-item">
        <RouterLink :to="nextPageUrl"><IconBase name="sprite/paginate-arrow-right" /></RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
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
</style>
