import express from "express";
import {
  SignUp,
  Signin,
  changePassword,
  deleteUser,
  editProfile,
  viewAllUsers,
  viweUser,
} from "../controllers/user-profiling.js";
const router = express.Router();

router.get("/signin", Signin);
router.post("/signup", SignUp);
router.get("/viewUser/:username", viweUser);
router.put("/editprofile/:username", editProfile);
router.put("/changePassword/:username", changePassword);
router.get("/allUsers", viewAllUsers);
router.delete("/deleteUser/:username", deleteUser);

export default router;
