import {PrismaClient} from "@prisma/client";
import {Todo} from "~/types/todo";
import {prisma} from "~/server/prisma";

export default defineEventHandler(async (event) => {
    const todos = await prisma.todo.findMany({
        orderBy: {
            created_at: 'asc'
        }
    })
    return todos.map(todo => {
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            completed: todo.completed
        } as Todo
    })
})