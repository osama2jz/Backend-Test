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
router.get("/viewUser/:id", viweUser);
router.put("/editprofile/:id", editProfile);
router.put("/changePassword/:id", changePassword);
router.get("/allUsers", viewAllUsers);
router.delete("/deleteUser/:id", deleteUser);

export default router;
