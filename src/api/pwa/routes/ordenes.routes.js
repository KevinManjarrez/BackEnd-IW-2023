import { Router } from "express";
import * as ordersController from "../controllers/ordenes.controller";

const router = Router();

router.get("/", ordersController.GetAllOrders);
router.get("/:id", ordersController.GetOneOrderByID);
router.post("/", ordersController.AddOneOrder);
router.put("/:id", ordersController.UpdateOneOrder);
router.patch("/actualizar/:id", ordersController.UpdatePatchOneOrder);
router.delete("/:id", ordersController.DeleteOneOrder);

export default router;
