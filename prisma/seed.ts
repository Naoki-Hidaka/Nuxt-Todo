import {PrismaClient} from "@prisma/client";
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database')
    await prisma.todo.create({
        data: {
            id: uuidv4(),
            title: 'My First Todo',
            description: 'This is my first todo',
            completed: false
        }
    })
    await prisma.todo.create({
        data: {
            id: uuidv4(),
            title: 'My Second Todo',
            description: 'This is my second todo',
            completed: false
        }
    })
    await prisma.todo.create({
        data: {
            id: uuidv4(),
            title: 'My Third Todo',
            description: 'This is my third todo',
            completed: false
        }
    })
    await prisma.todo.create({
        data: {
            id: uuidv4(),
            title: 'My Fourth Todo',
            description: 'This is my fourth todo',
            completed: false
        }
    })
    console.log('Seeding complete')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })