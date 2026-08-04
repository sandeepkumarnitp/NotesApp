import express from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { Note } from "../models/notes.model.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const createNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return next(new errorHandler("All fields are required"));
  }
  const response = await Note.create({ title, content, user: req.user._id });
  res.status(200).json({
    success: true,
    response,
  });
});

export const getNote = asyncHandler(async (req, res, next) => {
  const { noteId } = req.query;
  console.log("getNote:",noteId)
  const response = await Note.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(noteId),
      },
    },
    // {
    //   $project:{
    //     content:1
    //   }
    // }
  ]);

  console.log(response);
  res.status(200).json({
    success: true,
    response,
  });
});

export const updateNote = asyncHandler(async (req, res, next) => {
  const { noteId } = req.query;
  console.log(req.query);
  console.log(req.body);
  const response = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });

  console.log(response);
  res.status(200).json({
    success: true,
    response,
  });
});

export const getAllNotes = asyncHandler(async (req, res, next) => {
  const response = await Note.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    // {
    //   $unwind: '$content',
    // },
    // {
    //   $group: {
    //     _id: "$user",
    //     content: {
    //       $push: "$content",
    //     },
    //   },
    // },
  ]);
  res.status(200).json({ responseData: response });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
  const { noteId } = req.body;
  if (!noteId) {
    return next(new errorHandler("Note Id Wrong"));
  }
  const response = await Note.findByIdAndDelete(noteId, { new: true });
  res.status(200).json({
    success: true,
    response,
  });
});

export const addTask = asyncHandler(async (req, res, next) => {
  const noteId = req.query._id;

  if (!noteId) {
    return next(new errorHandler("All fields are required"));
  }

  const response = await Note.findByIdAndUpdate(
    noteId,
    {
      $push: {
        content: req.body,
      },
    },
    { new: true },
  );

  res.status(200).json({
    success: true,
    response,
  });
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { noteId, taskId } = req.query;
  const { text } = req.body;

  const response = await Note.findOneAndUpdate(
    {
      _id: noteId,
      "content._id": taskId, // ✅ find correct task
    },
    {
      $set: {
        "content.$.text": text, // ✅ update only that task
      },
    },
    { new: true },
  );

  console.log(response);
  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Note or Task not found",
    });
  }
  res.status(200).json({
    success: true,
    response,
  });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { noteId, taskId } = req.query;
  const response = await Note.findByIdAndUpdate(
    noteId,
    {
      $pull: {
        content: { _id: taskId }, // ✅ remove matching task
      },
    },
    { new: true },
  );
  console.log(response);
  res.status(200).json({
    success: true,
    response,
  });
});
