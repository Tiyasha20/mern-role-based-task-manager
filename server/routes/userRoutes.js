const express=require('express');
const router=express.Router();

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const { getUsers } = require("../controllers/userController");
router.get("/", auth, role("admin"), getUsers);

module.exports = router;