import express, { Application, Request, Response } from 'express'
import fs from 'fs';
import path from 'path';
import { todosRouter } from './app/todos/todos.routes';
const app: Application = express();
app.use(express.json());

const userRouter = express.Router();

app.use('/todos', todosRouter);
app.use('/users', userRouter);



const filePath = path.join(__dirname, '../db/todo.json')

app.get('/', (req: Request, res: Response) => {
    console.log()
    res.send('I am learning express JS with typescript!')
})

export default app;

/**
 * server - server handling like - starting, closing, error handling of server. only relared to the server.
 * app - routing handle, middleware handle, route related error handling.
 * app folder - app business logic handling like create, read, update, delete, database related works.
 */