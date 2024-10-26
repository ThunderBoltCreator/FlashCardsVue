import { computed, type Ref, ref, toValue, watchEffect } from 'vue'

function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

const DOTS = '...'

export function usePaginate(
  currentPage: () => number,
  siblingCount: number,
  totalPagesCount: () => number
) {
  const paginate = ref<Ref<(string | number)[]> | null>(null)

  function getPaginate() {
    const page = toValue(currentPage)
    // const totalPages = toValue(totalPagesCount)
    const totalPages = computed(() => {
      const pagesCount = toValue(totalPagesCount)
      return pagesCount === 0 ? 1 : pagesCount
    })

    if (totalPages.value === 1) {
      paginate.value = range(1, 1)
    }
    const totalPageNumbers = computed(() => siblingCount + 5)

    if (totalPageNumbers.value >= totalPages.value) {
      paginate.value = range(1, totalPages.value)
      return
    }

    const leftSiblingIndex = computed(() => Math.max(page - siblingCount, 1))
    const rightSiblingIndex = computed(() => Math.min(page + siblingCount, totalPages.value))

    const shouldShowLeftDots = computed(() => leftSiblingIndex.value > 2)
    const shouldShowRightDots = computed(() => rightSiblingIndex.value < totalPages.value - 2)

    const firstPageIndex = 1
    const lastPageIndex = totalPages.value

    if (!shouldShowLeftDots.value && shouldShowRightDots.value) {
      const leftItemCount = computed(() => 3 + 2 * siblingCount)
      const leftRange = range(1, leftItemCount.value)

      paginate.value = [...leftRange, DOTS, totalPages.value]
    }

    if (shouldShowLeftDots.value && !shouldShowRightDots.value) {
      const rightItemCount = computed(() => 3 + 2 * siblingCount)
      const rightRange = range(totalPages.value - rightItemCount.value + 1, totalPages.value)

      paginate.value = [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots.value && shouldShowRightDots.value) {
      const middleRange = range(leftSiblingIndex.value, rightSiblingIndex.value)

      paginate.value = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }

  watchEffect(() => {
    getPaginate()
  })

  return paginate
}
