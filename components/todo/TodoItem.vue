<script setup lang="ts">
import type {Todo} from "~/types/todo";

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'check', todo: Todo, completed: boolean): void
}>()

const onCheckClick = (completed: boolean) => {
  emit('check', props.todo, completed)
}
</script>

<template>
  <UCard class="mb-4">
    <div class="flex flex-row items-center">
      <p class="flex-grow text-lg font-semibold">{{todo.title}}</p>
      <UCheckbox color="yellow" :model-value="todo.completed" @change="onCheckClick"/>
    </div>
  </UCard>
</template>

<style scoped>

</style>