import { Router, type IRouter } from "express";
import healthRouter from "./health";
import resourcesRouter from "./resources";
import workshopsRouter from "./workshops";
import communityRouter from "./community";
import subscribeRouter from "./subscribe";

const router: IRouter = Router();

router.use(healthRouter);
router.use(resourcesRouter);
router.use(workshopsRouter);
router.use(communityRouter);
router.use(subscribeRouter);

export default router;
