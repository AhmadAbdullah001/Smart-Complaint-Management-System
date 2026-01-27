const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const fetchuser = require("../Middleware/fetchuser");
dotenv.config();
const secret = process.env.JWT_SECRET;

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, ID, password, role, category,email } = req.body;

    // Validate required fields
    if (!name || !ID || !password || !role || !email) {
      return res.status(422).json({ error: "Please fill all the required fields" });
    }

    // If Teacher, ensure category is selected
    if(role === "Teacher" && (!category || category.trim() === "")) {
      return res.status(422).json({ error: "Please select a category to manage" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ ID });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Prepare user data
    const newUserData = {
      name,
      ID,
      password: hashedPass,
      role,
      category: role === "Teacher" ? category : ""  // Only teacher has category
      ,email
    };

    // Create and save user
    const newUser = new User(newUserData);
    await newUser.save();

    // Generate JWT
    const data = { user: { id: newUser._id } };
    const authToken = jwt.sign(data, secret, { expiresIn: "7d" });

    return res.status(201).json({ authToken, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { ID, password } = req.body;

    if (!ID || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const exist = await User.findOne({ ID });
    if (!exist) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, exist.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const data = { user: { id: exist._id } };
    const authToken = jwt.sign(data, secret);

    return res.status(200).json({ authToken,exist });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/getuser", fetchuser, async (req, res) => {
    try {
      // Extract user ID from JWT token (added by fetchuser middleware)
      const userId = req.user.id;
  
      // Fetch user details from the database, excluding the password
      const user = await User.findById(userId).select("-password");
  
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
router.post('/fetchuserwithid',fetchuser,async(req,res)=>{
  try {
    const {id}=req.body;
    const user=await User.findById(id).select("-password");
    res.json(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
