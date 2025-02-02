import { Router } from "express";
import {GetUserData} from '../controllers/UserData.controller.js'
import { verifyJWT} from "../middlewares/VerifyJWT.middleware.js";
const router  = Router();
router.use(verifyJWT);
router.route("/").get(GetUserData).post(AddUserData).put(updateuserData);
router.route("/:userdataID").get(getAnotherUserData);
export default router;