import express, { Request, Response } from "express";
import { Task } from "../models/Task";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});
    return res.json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:Id", async (req: Request, res: Response) => {
  try {
    const id = req.params.Id;
    if (!id) {
      res.status(400);
    }
    const task = await Task.findById(id);
    return res.json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const content = req.body;
    const task = Task.build(content);
    await task.save();
    return res.json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:Id", async (req: Request, res: Response) => {
  try {
    const id = req.params.Id;
    if (!id) {
      res.status(400).send("id dont found");
    }
    const task = await Task.findByIdAndUpdate(id, {
      content: req.body.content,
      date: Date.now(),
    });
    return res.json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:Id", async (req: Request, res: Response) => {
  try {
    const id = req.params.Id;
    if (!id) {
      res.status(400).send("id dont found");
    }
    const task = await Task.findByIdAndDelete(id);
    return res.send(`task with ${req.params.Id} delete`);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router as todoRoutes };
