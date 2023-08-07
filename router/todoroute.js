"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const data = [];
router.get('/', (req, res, next) => {
    return res.status(200).json({ todos: data });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        task: req.body.task
    };
    data.push(newTodo);
    return res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: data });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = data.findIndex(item => item.id === tid);
    if (todoIndex >= 0) {
        data[todoIndex] = { id: data[todoIndex].id, task: req.body.task };
        return res.status(200).json({ message: 'Updated Todo', todos: data });
    }
    return res.status(404).json({ message: 'Could not find todo for this id' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = data.findIndex(item => item.id === tid);
    if (todoIndex >= 0) {
        data.splice(todoIndex, 1);
        return res.status(200).json({ message: 'Deleted Todo', todos: data });
    }
    return res.status(404).json({ message: 'Could not find todo for this id' });
});
exports.default = router;
