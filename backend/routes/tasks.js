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

// router.post()

// GET http://localhost:3000/create/max
router.get("/potatoes", async (req, res) => {
    try {
        res.status(200).json({"name": "task1", "description": "buy milk"})
    } catch (error) {
        console.log(`router.get /tasks is failing: ${error}`)
    }
})

// POST http://localhost:3000/create/potatoes
router.post("/create/potatoes", async (req, res) => {
    try {
        console.log(` This is the payload we received ${JSON.stringify(req.body)}`) //[object Object] into string
        const taskName = req.body.taskName; /// const taskName = "Buy Milk"
        const date = req.body.date;
        const tags = req.body.tags;
        res.status(201).json({"status": "Task Created", "task name": taskName, "Task Date": date, "tags": tags})
        
    } catch (error) {
        console.log(`router.get /tasks is failing: ${error}`)
        res.status(404).json({"error": error.code, "message": error.message})
    }
})

//TODO: POST /create/notes -> note: string, date: string, tag:array
export default router;