const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Database/Model/user");
require("dotenv").config();

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successfully" });
  } catch (error) {
    // console.log("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECERET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successfully", token });
  } catch (error) {
    // console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signup,
  login,
};
