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
import messagesRouter from "./messages.js";
import authRouter from "./auth.js";
import { optionalAuth } from "../middleware/jwtAuth.js";

const router = Router();

// attach user from JWT when present (public routes stay public)
router.use(optionalAuth);

router.use(authRouter);
router.use(healthRouter);
router.use(moodRouter);
router.use(jitaiRouter);
router.use(statsRouter);
router.use(communityRouter);
router.use(workshopsRouter);
router.use(resourcesRouter);
router.use("/subscribe", subscribeRouter);
router.use("/chat", chatRouter);
router.use("/messages", messagesRouter);

export default router;
