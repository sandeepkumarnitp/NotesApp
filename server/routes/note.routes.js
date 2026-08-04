import express from "express";
import {
  addTask,
  createNote,
  deleteNote,
  deleteTask,
  getAllNotes,
  getNote,
  updateNote,
  updateTask,
} from "../controllers/note.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-note", isAuthenticated, createNote); // to create new notes
router.get("/get-note", getNote); // get any note as well as all tasks of it
router.get("/get-all-notes", isAuthenticated, getAllNotes); // get all notes
router.put("/update-note", updateNote);
router.delete("/delete-note", deleteNote); // delete a particular note

router.post("/add-task", addTask); // add new task in content array
router.put("/update-task", updateTask); // update any task
router.put("/delete-task", deleteTask); // delete any particular task

export default router;
