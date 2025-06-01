"use strict";
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
app.get('/', logger, (req, res) => {
    console.log();
    res.send('I am learning express JS with typescript!');
});
exports.default = app;
/**
 * server - server handling like - starting, closing, error handling of server. only relared to the server.
 * app - routing handle, middleware handle, route related error handling.
 * app folder - app business logic handling like create, read, update, delete, database related works.
 */ 
