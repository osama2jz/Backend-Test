import express from "express";
import {
  SignUp,
  Signin,
  changePassword,
  editProfile,
  viweUser,
} from "../controllers/user-profiling.js";
const router = express.Router();

router.get("/signin", Signin);
router.post("/signup", SignUp);
router.get("/viewUser/:userId", viweUser);
router.put("/editprofile/:userId", editProfile);
router.put("/changePassword/:userId", changePassword);

export default router;
