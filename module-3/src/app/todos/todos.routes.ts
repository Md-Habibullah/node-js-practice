import express, { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

export const todosRouter = express.Router();

const filePath = path.join(__dirname, '../../../db/todo.json')

todosRouter.get('/', (req: Request, res: Response) => {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' })
    console.log('from todosRouter')
    res.json(data)
})

todosRouter.post('/create-todo', (req: Request, res: Response) => {
    const data = req.body;
    console.log(req.query)
    // console.log(data)
    res.send('Hello World!')
})

todosRouter.get('/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body)
    res.send('hello world')
})
todosRouter.put('/update-todo/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body)
    res.send('hello world')
})
todosRouter.delete('/delete-todo/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body)
    res.send('hello world')
})