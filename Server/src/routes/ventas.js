import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {get,post,del,getOne,put,cambio,mio} from '../controllers/ventas.controller';
// Routes
router.post('/',authenticateToken, post);
router.post('/cambio/:_id',authenticateToken, cambio);
router.get('/',authenticateToken, get);
router.get('/mio/:_id',authenticateToken, mio);
router.delete('/:_id',authenticateToken, del);
router.put('/:_id',authenticateToken, put);
router.get('/:_id',authenticateToken, getOne);


export default router;