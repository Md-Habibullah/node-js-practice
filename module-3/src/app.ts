import express, { Application, NextFunction, Request, Response } from 'express'
import { todosRouter } from './app/todos/todos.routes';
const app: Application = express();
app.use(express.json());

const userRouter = express.Router();

app.use('/todos', todosRouter);
app.use('/users', userRouter);

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log({
        utl: req.url,
        method: req.method,
        header: req.header
    })
    next()
}

app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(something)
        res.send('Welcome to the todos app')
    } catch (error) {
        // console.log(error)
        // res.status(400).send({ message: "something went wrong", error })
        next(error)
    }
})

app.get('/error', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(something)
        res.send('welcome to error er duniya')
    } catch (error) {
        next(error)
    }
})

// app.all(/.*/, async (req: Request, res: Response) => {
//     res.status(404).send({ message: "Route not found" });
// });

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: "Route not found" });
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        console.log(error)
        res.status(400).send({ message: "something went wrong", error })
    }
})

export default app;

/**
 * server - server handling like - starting, closing, error handling of server. only relared to the server.
 * app - routing handle, middleware handle, route related error handling.
 * app folder - app business logic handling like create, read, update, delete, database related works.
 */