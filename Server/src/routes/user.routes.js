import {Router} from "express";
import { login } from "../controllers/user.controller.js";

const router = Router();

router.route('/login').post(login);

export default router