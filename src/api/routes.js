"use strict";
import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/:timeUTC", controller.getMarsTime);
router.get("/", controller.getMarsTime);

export default router;
