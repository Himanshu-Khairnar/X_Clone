import { Router } from "express";
import {GetUserData} from '../controllers/UserData.controller.js'
import { verify } from "jsonwebtoken";
const router  = Router();
router.use()
router.route("/").get(GetUserData).post(AddUserData).put(updateuserData);
router.route("/:userdataID").get(getAnotherUserData);
export default router;