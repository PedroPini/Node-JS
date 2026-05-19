import express from "express";
const router = express.Router();


//GET REQUEST http://localhost:3000/tasks
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
        const payload = req.body.class;
        if(payload == 1){
            res.status(201).json({"status": "Great class"})
        } else {
            res.status(201).json({"status": "Not so Great class"})
        }
        
    } catch (error) {
        console.log(`router.get /tasks is failing: ${error}`)
        res.status(404).json({"error": error.code, "message": error.message})
    }
})
export default router;