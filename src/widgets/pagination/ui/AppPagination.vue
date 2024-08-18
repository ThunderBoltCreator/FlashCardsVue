<script lang="ts" setup>
import { useOffsetPagination } from '@vueuse/core'

const {} = useOffsetPagination({
  page: 1,
  total: 10
})
</script>
<template>
  <div>
    <button>кнопка</button>
    <button>цифры</button>
    <button>кнопка</button>
    <select>
      <option>3</option>
      <option>5</option>
      <option>7</option>
      <option>10</option>
    </select>
  </div>
</template>
<style scoped></style>
