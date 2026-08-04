import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/users.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

// signup controller
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new errorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(new errorHandler("user already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const tokenData = {
    _id: newUser?._id,
    email: newUser?.email,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRESIN,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIES_EXPIRES) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "user created successfully",
      response: { newUser, token },
    });
});

// login controller
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorHandler("All fields are required", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new errorHandler("Please enter a correct email or password!!", 400),
    );
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return next(
      new errorHandler("Please enter a correct email or password!!", 400),
    );
  }

  const tokenData = {
    _id: user?._id,
    email: user?.email,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRESIN,
  });

  res
    .status(201)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      response: { user, token },
    });
});

// getProfile controller
export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const profile = await User.findById(userId);
  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

// logout controller
export const logout = asyncHandler(async (req, res, next) => {
  res.status(200).clearCookie("token").json({
    success: true,
    message: "Logout Successfully",
  });
});
