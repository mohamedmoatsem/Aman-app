import { Router } from "express";
import healthRouter from "./health.js";
import moodRouter from "./mood.js";
import jitaiRouter from "./jitai.js";
import statsRouter from "./stats.js";
import subscribeRouter from "./subscribe.js";
import chatRouter from "./chat.js";
import communityRouter from "./community.js";
import workshopsRouter from "./workshops.js";
import resourcesRouter from "./resources.js";

const router = Router();

router.use(healthRouter);
router.use(moodRouter);
router.use(jitaiRouter);
router.use(statsRouter);
router.use(communityRouter);
router.use(workshopsRouter);
router.use(resourcesRouter);
router.use("/subscribe", subscribeRouter);
router.use("/chat", chatRouter);

export default router;
