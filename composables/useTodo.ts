import type {Todo} from "~/types/todo";

export const useTodo = () => {
    const {
        data,
        error,
        status,
        refresh
    } = useFetch<Todo[]>('/api/todos')

    const isPending = computed(() => status.value === 'pending')

    return {
        todos: data,
        error: error,
        isPending: isPending,
        refresh: refresh,
        addTodo: addTodo(refresh),
        updateTodo: updateTodo(refresh),
    }
}

const addTodo = (refresh: () => Promise<void>) => async (title: string, description: string) => {
    await $fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({title, description})
    })
    await refresh()
}

const updateTodo = (refresh: () => Promise<void>) => async (id: string, title: string, description: string, completed: boolean) => {
    await $fetch(`/api/todos`, {
        method: 'PUT',
        body: JSON.stringify({id, title, description, completed})
    })
    await refresh()
}