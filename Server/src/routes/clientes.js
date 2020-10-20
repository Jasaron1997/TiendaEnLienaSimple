import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {get,post,del,getOne,put} from '../controllers/clientes.controller';
// Routes
router.post('/', post);
router.get('/', get);
router.delete('/:_id/', del);
router.put('/:_id', put);
router.get('/:_id', getOne);


export default router;