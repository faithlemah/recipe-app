import express from "express";
import { newUser, getAllUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/userAuthentication.js";


const router = express.Router()

router.post('/create', newUser)
router.post('/login', loginUser)
router.get('/', verifyToken, getAllUsers)
router.get('/:id',getUser)
router.put('/update/:id',updateUser)
router.put('/delete/:id',deleteUser)

export default router