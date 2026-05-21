import express from "express";
const router = express.Router();
import Task from "../models/Task.js"

//GET REQUEST http://localhost:3000/tasks?name=Max
router.get("/tasks", async (req, res) => {
    //req -> is the request so the 
    // payload you're receiving in case the user is sending you data

    //res -> the response you will send from your route
    try {
        //try this code
        //go to the database and fetch the response
        res.status(200).json({"name": "task1", "description": "buy milk"})
    } catch (error) {
        //if anything fails, please lets handle it by logging
        console.log(`router.get /tasks is failing: ${error}`)
    }
})

router.post("/tasks/new", async (req, res) => {
    try {
        const { title, dueDate } = req.body;
        console.log(`title: ${title}, dueDate: ${dueDate}`);
        // const title = req.body.title;
        // const dueDate = req.body.dueDate;
        const newTask = await Task.create({
            title: title,
            dueDate: dueDate
        });

        res.status(201).json({message: "Task created", task: newTask});
    } catch (error) {
        console.log(`Failed to get tasks: ${error}`);
        res.status(500).json({message: "Failed to get tasks"})
    }
});

export default router;