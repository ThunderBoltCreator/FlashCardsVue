<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import { AppTypography } from '@/shared/ui/typography'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

async function switchDecksAuthor(author: string) {
  if (author === 'my') {
    await router.push({
      query: {
        ...route.query,
        authorId: 'caller',
        page: 1
      }
    })
  }
  if (author === 'all') {
    await router.push({
      query: {
        ...route.query,
        authorId: '',
        page: 1
      }
    })
  }
}
</script>
<template>
  <div class="author-tabs-wrapper">
    <AppTypography type="body2" class="toggle-widget-title">Show decks cards</AppTypography>
    <TabsRoot default-value="all" @update:model-value="switchDecksAuthor">
      <TabsList class="author-tabs">
        <TabsTrigger class="tabs-item" value="my"> My Cards </TabsTrigger>
        <TabsTrigger class="tabs-item" value="all"> All Cards </TabsTrigger>
      </TabsList>
    </TabsRoot>
  </div>
</template>
<style scoped>
.author-tabs-wrapper {
}
.author-tabs {
  height: 36px;
}
.toggle-widget-title {
  margin-bottom: 5px;
}
.tabs-item {
  height: 100%;
  background-color: transparent;
  padding: 6px 24px;
  border: 1px solid var(--color-dark-300);
  cursor: pointer;

  transition: 0.3s ease;
  &:first-child {
    border-radius: 2px 0 0 2px;
  }
  &:last-child {
    border-radius: 0 2px 2px 0;
  }

  &[data-active='true'] {
    background-color: var(--color-accent-500);
    color: var(--color-light-100);
    border-color: transparent;
  }
}
</style>
