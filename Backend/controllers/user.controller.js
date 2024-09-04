import bcrypt from "bcryptjs";
import { User } from "../model/User.model.js"; // Assuming User is a Mongoose model
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Registration Function
// Registration Function
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Check if all required fields are provided
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please complete all fields",
        success: false,
      });
    }

    // Check if user already exists with the provided email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload profile photo to Cloudinary if a file is provided
    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Create the user
    user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        profilePhoto: user.profile.profilePhoto, // Send profilePhoto in response
      },
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check for missing fields
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Missing fields", success: false });
    }

    // Find the user by email and role
    const user = await User.findOne({ email, role });

    // If user is not found
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or role", success: false });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    // Return the user data along with the token
    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl, // Add other fields as necessary
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Logout Function
export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Ensures secure flag is only used in production
      })
      .json({
        message: "Successfully logged out",
        success: true,
      });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      message: "Server error during logout",
      success: false,
    });
  }
};

// Update User Information Function
export const updateUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id; // Assuming userId is obtained from middleware authentication
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    console.log("Received data:", {
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
    });

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    if (cloudResponse) {
      user.profile.resume = cloudinary.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    console.log("Updated user data:", user);

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        bio: user.profile.bio,
        skills: user.profile.skills,
        profilePhoto: user.profile.profilePhoto,
      },
    });
  } catch (error) {
    console.error("Error while updating user information:", error);
    res.status(500).json({
      message: "Server error during update",
      success: false,
    });
  }
};

// Get User Profile Function
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the isAuthenticated middleware
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        bio: user.profile.bio,
        skills: user.profile.skills,
        profilePhoto: user.profile.profilePhoto, // Include profile photo here
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
