import { Router } from "express";
import * as ordenesController from '../controllers/ordenes.controller';

const router = Router();

router.get('/', ordenesController.GetAllOrders);
router.get('/:id', ordenesController.GatOneOrderByID);
router.post('/', ordenesController.AddOneOrder);
router.put('/:id', ordenesController.UpdateOneOrder);
router.patch('/actualizar/:id',ordenesController.UpdatePatchOneOrder);
//router.patch('/:id',ordenesController.updateProduct);

router.delete('/:id', ordenesController.DeleteOneOrder);


export default router;