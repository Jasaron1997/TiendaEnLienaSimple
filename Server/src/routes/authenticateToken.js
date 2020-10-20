import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';

// Controllers
import {auth} from '../controllers/authenticateToken.controller';

// Routes
router.post('/',authenticateToken, auth);

export default router;