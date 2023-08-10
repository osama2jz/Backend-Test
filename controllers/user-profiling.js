import bcrypt from "bcrypt";
import {
  changePasswordSchema,
  signUpSchema,
  userSchema,
} from "../yupSchemas/user-profiling.js";
import user from "../models/userModel.js";

//signin with monngo
export const Signin = async (req, res) => {
  const { username, password } = req.body;

  //validate using yup
  try {
    userSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
  const found = await user.findOne({ username: username }).select("+password");
  if (!found) {
    return res.status(404).json({ error: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, found.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.json({ message: "Sign-in successful" });
};

//signup with monngo
export const SignUp = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    signUpSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
  const alreadyExists = await user.findOne({ userName: username });
  if (alreadyExists) {
    return res.status(400).json({ error: "Username already taken" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.json({ message: "Sign-up successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//editprofile with mongo
export const editProfile = async (req, res) => {
  const username = req.params.username;
  try {
    const userFound = await user.findOne({ username });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.findOneAndUpdate({ username: username }, req.body);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//viewUser with mongo
export const viweUser = async (req, res) => {
  const username = req.params.username;
  try {
    const userFound = await user.findOne({ username });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User Found.", data: userFound });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all users with mongo
export const viewAllUsers = async (req, res) => {
  try {
    const userFound = await user.find();
    res.json({ message: "Users Found.", data: userFound });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete user with mongo
export const deleteUser = async (req, res) => {
  const username = req.params.username;
  try {
    const userFound = await user.findOne({ username });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.deleteOne({ username });
    res.json({ message: "User Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//change password
export const changePassword = async (req, res) => {
  const username = req.params.username;
  const { oldPassword, newPassword } = req.body;
  try {
    changePasswordSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
  try {
    const userFound = await user.findOne({ username }).select("+password");
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    const correctPassword = await bcrypt.compare(
      oldPassword,
      userFound.password
    );
    if (correctPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.findOneAndUpdate(
        { username: username },
        { password: hashedPassword }
      );
      res.json({ message: "Password Updated." });
    } else {
      res.json({ message: "Old password is wrong." });
    }
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
