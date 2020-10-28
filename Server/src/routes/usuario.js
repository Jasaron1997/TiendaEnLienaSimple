import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {get,post,del,getOne,put} from '../controllers/usuario.controller';
// Routes
router.post('/', post);
router.get('/', get);
router.delete('/:_id/',authenticateToken, del);
router.put('/:_id',authenticateToken, put);
router.get('/:_id', authenticateToken,getOne);


export default router;