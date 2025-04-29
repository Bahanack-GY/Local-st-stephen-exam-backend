import { Router } from "express";
import { createUser, login, submitScore, getUsers, getExams } from "../controllers/user.controller";


const router = Router();

router.post('/create', createUser);
router.post('/login', login);

router.post('/submitScore/:id', submitScore);

router.get('/all', getUsers);
router.get('/exams', getExams);


export default router;  