import {z} from 'zod'
import {prisma} from "~/server/prisma";

const bodySchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    completed: z.boolean()
})

export default defineEventHandler(async (event) => {
    try {
        const {id, title, description, completed} = await readValidatedBody(event, param => bodySchema.parse(param))
        await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
                completed: completed
            }
        })
        return
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw createError({statusCode: 400, statusMessage: 'Bad Request', cause: {message: e.errors}})
        }
        throw createError({statusCode: 500, statusMessage: 'Internal Server Error', cause: e})
    }
})