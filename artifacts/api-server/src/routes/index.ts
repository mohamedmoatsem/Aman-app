import { Router, type IRouter } from "express";
import healthRouter from "./health";
import resourcesRouter from "./resources";
import workshopsRouter from "./workshops";
import communityRouter from "./community";

const router: IRouter = Router();

router.use(healthRouter);
router.use(resourcesRouter);
router.use(workshopsRouter);
router.use(communityRouter);

export default router;
