import { Router, type IRouter } from "express";
import healthRouter from "./health";
import resourcesRouter from "./resources";
import workshopsRouter from "./workshops";
import communityRouter from "./community";
import subscribeRouter from "./subscribe";
import chatRouter from "./chat";
import moodRouter from "./mood";
import jitaiRouter from "./jitai";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(resourcesRouter);
router.use(workshopsRouter);
router.use(communityRouter);
router.use(subscribeRouter);
router.use(chatRouter);
router.use(moodRouter);
router.use(jitaiRouter);
router.use(statsRouter);

export default router;
