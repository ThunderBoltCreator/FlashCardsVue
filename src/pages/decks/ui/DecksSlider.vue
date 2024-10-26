<script setup lang="ts">
import {
  NumberFieldInput,
  NumberFieldRoot,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack
} from 'radix-vue'
import { ref } from 'vue'
import { useDecksStore } from '@/entities/decks/model/decks-model.ts'

const props = withDefaults(
  defineProps<{
    onChange: (payload: number[]) => void
    min?: number
    max?: number
  }>(),
  {
    max: 100,
    min: 0
  }
)
const thumbs = ref([props.min, props.max])

function slide(payload: number[]) {
  thumbs.value = payload
}
</script>
<template>
  <div class="cards-counter-wrapper">
    <NumberFieldRoot :model-value="thumbs[0]" class="cards-counter">
      <NumberFieldInput class="cards-counter-input" />
    </NumberFieldRoot>
    <SliderRoot
      class="slider-root"
      :default-value="thumbs"
      @update:model-value="slide"
      @value-commit="onChange"
    >
      <SliderTrack class="SliderTrack">
        <SliderRange class="SliderRange" />
      </SliderTrack>
      <SliderThumb class="SliderThumb" />
      <SliderThumb class="SliderThumb" />
    </SliderRoot>
    <NumberFieldRoot :model-value="thumbs[1]" class="cards-counter">
      <NumberFieldInput class="cards-counter-input" />
    </NumberFieldRoot>
  </div>
</template>
<style>
.cards-counter-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.cards-counter-input {
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-dark-300);
  color: var(--color-light-100);
  border-radius: 2px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.cards-counter {
  width: 36px;
  height: 36px;
}
.slider-root {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 155px;
  height: 16px;
}
.SliderTrack {
  background-color: rgba(140, 97, 255, 0.5);
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
}
.SliderRange {
  position: absolute;
  background-color: var(--color-accent-500);
  border-radius: 9999px;
  height: 100%;
}

.SliderThumb {
  cursor: pointer;

  display: block;

  width: 16px;
  height: 16px;

  background-color: var(--color-light-100);
  border: 5px solid var(--color-accent-500);
  border-radius: 10px;
  box-shadow: 0 0 2px var(--color-accent-100);

  transition: border 0.1s ease;

  &:focus {
    border-width: 3px;
    outline: none;
    box-shadow: 0 0 8px var(--color-accent-100);
  }
}
.SliderThumb:hover {
}
.SliderThumb:focus {
  outline: none;
}
</style>
