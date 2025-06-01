import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { client } from "../../config/mongodb";

export const todosRouter = express.Router();

todosRouter.get('/', async (req: Request, res: Response) => {
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const todos = await collection.find({}).toArray()
    res.json(todos)
})
todosRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    // console.log(id)
    const query = { _id: new ObjectId(id) }
    const todos = await collection.findOne(query)
    res.json(todos)
})

todosRouter.post('/create-todo', async (req: Request, res: Response) => {
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const { title, description, prioraty } = req.body

    await collection.insertOne({
        title: title,
        description: description,
        prioraty: prioraty,
        isCompleted: false
    });

    const todos = await collection.find({}).toArray()

    res.json(todos)
})

todosRouter.get('/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body)
    res.send('hello world')
})
todosRouter.put('/update-todo/:id', async (req, res) => {
    const id = req.params.id
    const { title, description, prioraty, isCompleted } = req.body

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const updatedDoc = {
        $set: {
            title: title,
            description: description,
            prioraty: prioraty,
            isCompleted: isCompleted
        }
    }

    const filter = { _id: new ObjectId(id) }
    const result = await collection.updateOne(filter, updatedDoc, { upsert: true })

    res.send(result)
})
todosRouter.delete('/delete-todo/:id', async (req, res) => {
    const id = req.params.id
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const data = await collection.deleteOne({ _id: new ObjectId(id) })
    console.log(data)
    res.json(data)
})