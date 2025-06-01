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
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const mongodb_2 = require("../../config/mongodb");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todos = yield collection.find({}).toArray();
    res.json(todos);
}));
exports.todosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    // console.log(id)
    const query = { _id: new mongodb_1.ObjectId(id) };
    const todos = yield collection.findOne(query);
    res.json(todos);
}));
exports.todosRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const { title, description, prioraty } = req.body;
    yield collection.insertOne({
        title: title,
        description: description,
        prioraty: prioraty,
        isCompleted: false
    });
    const todos = yield collection.find({}).toArray();
    res.json(todos);
}));
exports.todosRouter.get('/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('hello world');
});
exports.todosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, prioraty, isCompleted } = req.body;
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const updatedDoc = {
        $set: {
            title: title,
            description: description,
            prioraty: prioraty,
            isCompleted: isCompleted
        }
    };
    const filter = { _id: new mongodb_1.ObjectId(id) };
    const result = yield collection.updateOne(filter, updatedDoc, { upsert: true });
    res.send(result);
}));
exports.todosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const data = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    console.log(data);
    res.json(data);
}));
