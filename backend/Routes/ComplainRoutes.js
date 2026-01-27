const express = require("express");
const router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
const Complain = require("../models/ComplainSchema");
const nodemailer = require("nodemailer");

router.post("/addcomplain", fetchuser, async (req, res) => {
  const { title, category, description, img } = req.body;
  if (!title || !category || !description) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const complain = new Complain({
      user: req.user.id,
      title,
      category,
      description,
      img,
    });
    const savedcomplain = await complain.save();
    return res.json({
      message: "Complaint registered successfully",
      complain: savedcomplain,
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error" + error.message });
  }
});
router.post("/mycomplains", fetchuser, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const complains = await Complain.find({ user: id });
    return res.json(complains);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + error.message });
  }
});
router.post("/categorycomplains", fetchuser, async (req, res) => {
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }
  try {
    if (category === "All Complaints") {
      const complains = await Complain.find({});
      return res.json(complains);
    } else {
      const complains = await Complain.find({ category: category });
      return res.json(complains);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + error.message });
  }
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "scmsproject001@gmail.com", // your Gmail address
    pass: "umqd dava yqpt hfni", // your Gmail password or app-specific password
  },
});
router.post("/updatecomplainstatus", async (req, res) => {    
  const { id, status, resolution, complaintMail, complaint } = req.body;

  try {
    // Step 1: Determine the next status
    let updatedstatus = "";
    if (status === "Pending") updatedstatus = "In Progress";
    else if (status === "In Progress") updatedstatus = "Resolved";
    else updatedstatus = status;

    // Step 2: Prepare update object
    const updateData = { status: updatedstatus };
    if (updatedstatus === "Resolved" && resolution) {
      updateData.resolution = resolution;
    }

    // Step 3: Update in database
    const updated = await Complain.findByIdAndUpdate(id, updateData, { new: true });

    // Step 4: Send email notification
    let mailOptions = {
      from: "scmsproject001@gmail.com",
      to: complaintMail,
      subject: "Complaint Status Update",
      text: `
Hello,

Your complaint status has been updated to: ${updatedstatus}

Complaint Details:
Title: ${complaint.title}
Description: ${complaint.description}

${updatedstatus === "Resolved" ? "Resolution: " + resolution : ""}

Thank you,
Smart Complaint Management System
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) console.log("Mail Error:", error);
      else console.log("✅ Email sent:", info.response);
    });

    // Step 5: Respond to client
    res.status(200).json({
      success: true,
      message: `Complaint updated to ${updatedstatus}`,
      data: updated,
    });
  } catch (error) {
    console.error("❌ Update Complaint Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;
