import {z} from "zod";
import {v4 as uuidv4} from 'uuid';
import {prisma} from "~/server/prisma";


const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
})

export default defineEventHandler(async (event) => {
    try {
        const {title, description} = await readValidatedBody(event, body => bodySchema.parse(body))
        await prisma.todo.create({
            data: {
                id: uuidv4(),
                title: title,
                description: description,
                completed: false
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