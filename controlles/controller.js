const Task = require("../models/Task");

exports.getAllTodos = (req, res) => {
    Task.find({}, (err, task) => {
        if (err) res.send(err)
        res.json(task)
    })

};

exports.createTodo = (req, res) => {
    const todo = new Task(req.body);

    todo.save((err, task) => {
        if (err || !task) {
            return res.status(400).json({
                error: "something went wrong",
            });
        }
        res.json({ task });
    });
};

exports.updateTodo = (req, res) => {
    Task.findByIdAndUpdate(req.params.Id, { content: req.body.content, date: Date.now() }, (err, task) => {
        if (err) res.send(err)
        res.json(task)
    })
};

exports.deleteTodo = (req, res) => {
    const id = req.params.Id
    Task.findByIdAndDelete(id, (err, task) => {
        if (err)
            res.send(err);
        res.json({ message: 'Task deleted' });
    });
};

exports.getByIdTodo = (req, res) => {
    Task.findById({ _id: req.params.Id }, (err, task) => {
        if (err) res.send(err)
        res.json(task)
    })
}
