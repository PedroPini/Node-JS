import express from "express";
const router = express.Router();
import Task from "../models/Task.js"

//GET REQUEST http://localhost:3000/tasks?name=Max
router.get("/tasks", async (req, res) => {
    //req -> is the request so the 
    // payload you're receiving in case the user is sending you data

    //res -> the response you will send from your route
    try {
        console.log("ROUTER GET TEST");
        const filter = {};
        let query = Task.find(filter);

        const tasks = await query;
        res.json({ message: "Tasks retrieved successfully", tasks: tasks})

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

//http://localhost:4000/tasks/complete/2
router.patch("/tasks/complete/:id", async(req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate(taskId, {completed: true}, {returnDocument: "after"})

        if(!task) { 
            return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json({message: "Task completed", task: task})
    } catch (error) {
        console.log("Failed to complete the task: ", error);
        res.status(500).json({message: "Failed to complete the task"});
    }
})

router.patch("/tasks/incomplete/:id", async(req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate(taskId, {completed: false}, {returnDocument: "after"})

        if(!task) { 
            return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json({message: "Task marked as incomplete", task: task})
    } catch (error) {
        console.log("Failed to set the task to incomplete: ", error);
        res.status(500).json({message: "Failed to set the task to incomplete"});
    }
})

//http://localhost:4000/tasks/id/

//DELETE
//CREATE
router.delete("/tasks/delete/:id", async(req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json({message:"Task deleted", task: task})

    } catch (error) {
        console.log("Failed to delete task: ", error);
        res.status(500).json({message: "Failed to delete task"});
    }
})

export default router;