import { Router } from "express";

import {postLike} from "../controllers/Like.controller.js"
const router = Router()

router.route('/:tweet').post(postLike)
export default router;