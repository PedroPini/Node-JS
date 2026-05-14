import express from "express";
const router = express.Router();

//app.get("/tasks")
router.get("/tasks", async (req, res) => {
    try {
        res.status(200).json({"name": "task1", "description": "buy milk"})
    } catch (error) {
        console.log(`router.get /tasks is failing: ${error}`)
    }
})

//app.get("/potatoes")

export default router;