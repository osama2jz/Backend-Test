import bcrypt from "bcrypt";
import {
  changePasswordSchema,
  signUpSchema,
  userSchema,
} from "../yupSchemas/user-profiling.js";

const users = [
  {
    id: 1,
    username: "exampleuser",
    password: "12345678",
    firstName: "Example",
    lastName: "User",
  },
];

//signin
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
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isPasswordValid = password === user.password;
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.json({ message: "Sign-in successful" });
};

//signup
export const SignUp = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    signUpSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already taken" });
  }
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user in the database (replace with your database logic)
    users.push({ username, password: hashedPassword, firstName, lastName });

    res.json({ message: "Sign-up successful" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//editprofile
export const editProfile = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { firstName, lastName } = req.body;
  try {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (firstName || lastName) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
    }
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//viewUser
export const viweUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User Found.", data: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//change password
export const changePassword = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { oldPassword, newPassword } = req.body;
  try {
    changePasswordSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
  try {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password === oldPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      res.json({ message: "Password Updated." });
    } else {
      res.json({ message: "Wrong Old Password." });
    }
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
