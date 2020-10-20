import { Router } from 'express'
const router = Router();

// Controllers
import {auth} from '../controllers/auth.controller';

// Routes
router.post('/', auth);

export default router;