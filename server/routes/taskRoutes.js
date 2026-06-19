const router=require("express").Router();

const auth=require("../middlewares/authMiddleware");

const role=require("../middlewares/roleMiddleware");

const task=require("../controllers/taskController");

// Admin Routes

router.post("/",auth,role("admin"),task.createTask);

router.get("/",auth,role("admin"),task.getAllTasks);

router.put("/:id",auth,role("admin"),task.updateTask);

router.delete("/:id",auth,role("admin"),task.deleteTask);

// User Routes

router.get("/mytasks",auth,role("user"),task.myTasks);

router.patch("/:id/status",auth,role("user"),task.updateStatus);

module.exports=router;