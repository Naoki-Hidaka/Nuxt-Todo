<script setup lang="ts">

import TodoItem from "~/components/todo/TodoItem.vue";
import {useTodo} from "~/composables/useTodo";
import type {Todo} from "~/types/todo";

const {todos, error, isPending, refresh, addTodo, updateTodo} = useTodo()
const {start: showLoading, finish: hideLoading} = useLoadingIndicator()
const onRefreshClick = async () => {
  await refresh()
}

watch(isPending, (value) => {
  console.log(`isPending: ${value}`)
  if (value) {
    showLoading()
  } else {
    hideLoading()
  }
})

const tabItems = [
  {
    label: 'すべて',
    slot: 'all'
  },
  {
    label: '未完了',
    slot: 'incomplete'
  },
  {
    label: '完了',
    slot: 'complete'
  }
]

const onCheckClick = async (todo: Todo, completed: boolean) => {
  await updateTodo(todo.id, todo.title, todo.description, completed)
}
</script>

<template>
  <UButton block class="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600" label="更新" @click="onRefreshClick"
           :loading="isPending"/>
  <div class="mt-6">
    <div v-if="error != null && !isPending">
      <p>エラーが発生しました</p>
      <p>{{ error.statusMessage }}</p>
    </div>
    <TodoLoading v-if="isPending && todos == null"/>
    <UTabs
        v-else
        :items="tabItems"
        :ui="{
          list: {
            background: 'bg-gray-200'
          },
        }"
    >
      <template #all="{item}">
        <TodoItem v-for="todo in todos" :todo="todo" @check="onCheckClick" :key="todo.id"/>
      </template>

      <template #incomplete="{item}">
        <TodoItem v-for="todo in todos?.filter(v => !v.completed)" :todo="todo" @check="onCheckClick" :key="todo.id"/>
      </template>

      <template #complete="{item}">
        <TodoItem v-for="todo in todos?.filter(v => v.completed)" :todo="todo" @check="onCheckClick" :key="todo.id"/>
      </template>

    </UTabs>
  </div>
</template>

<style scoped>

</style>