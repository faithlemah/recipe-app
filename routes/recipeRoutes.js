import { createRecipe, getAllRecipe,updateRecipe, deleteRecipe, getRecipe, LikeRecipe} from '../controllers/receipecontrollers.js';
import { verifyToken, adminStatus, profStatus } from '../middleware/authentication.js';
import{Router} from 'express';


const router = Router();

router.get("/like",LikeRecipe);
router.get('/',getAllRecipe);
router.get('/:id',verifyToken, getRecipe);
router.post('/create',verifyToken,profStatus,createRecipe);
router.put('/update/:id',verifyToken,adminStatus,updateRecipe);
router.delete('/delete/:id',verifyToken,adminStatus,deleteRecipe);

export default router;