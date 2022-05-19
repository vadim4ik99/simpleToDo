const express = require("express");
const router = express.Router();
const Task = require('../models/Task')


router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks) { res.status(400) }
        res.json(tasks)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:Id', async (req, res) => {
    try {
        const task = await Task.findById({ _id: req.params.Id })
        if (!task) { res.status(400) }
        res.json(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const todo = new Task(req.body)
        await todo.save()
        res.json(todo)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:Id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.Id, { content: req.body.content, date: Date.now() })
        res.json(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:Id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.Id)
        res.send(`task with ${req.params.Id} delete`)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;