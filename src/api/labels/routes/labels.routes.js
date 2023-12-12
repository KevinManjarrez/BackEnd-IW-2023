import { Router } from "express";
import * as labelsController from "../controllers/labels.controller";

const router = Router();

router.get('/', labelsController.GetAllLabels);
router.get('/one', labelsController.GetOneLabels);

export default router;
