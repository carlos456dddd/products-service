import express from 'express';
import {register, login} from '../controllers/authController.js';
import { authenticate } from '../middelware/auth.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/papas', authenticate, (request, response) => {

    response.json({user: request.user})

})



export default router
