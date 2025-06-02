"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
app.use('/todos', todos_routes_1.todosRouter);
app.use('/users', userRouter);
const logger = (req, res, next) => {
    console.log({
        utl: req.url,
        method: req.method,
        header: req.header
    });
    next();
};
app.get('/', logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(something)
        res.send('Welcome to the todos app');
    }
    catch (error) {
        // console.log(error)
        // res.status(400).send({ message: "something went wrong", error })
        next(error);
    }
}));
app.get('/error', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(something)
        res.send('welcome to error er duniya');
    }
    catch (error) {
        next(error);
    }
}));
// app.all(/.*/, async (req: Request, res: Response) => {
//     res.status(404).send({ message: "Route not found" });
// });
app.use((req, res, next) => {
    res.status(404).send({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(400).send({ message: "something went wrong", error });
    }
});
exports.default = app;
/**
 * server - server handling like - starting, closing, error handling of server. only relared to the server.
 * app - routing handle, middleware handle, route related error handling.
 * app folder - app business logic handling like create, read, update, delete, database related works.
 */ 
