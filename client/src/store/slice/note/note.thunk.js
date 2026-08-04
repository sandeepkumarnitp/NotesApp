import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utility/axiosInstance";

export const getAllNotesThunk = createAsyncThunk(
  "getAllNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/note/get-all-notes");
      return response.data;
    } catch (error) {
      console.log("get all notes thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const getNoteThunk = createAsyncThunk(
  "getNote",
  async ({ noteId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/note/get-note", {
        params: {
          noteId,
        },
      });
      return response.data;
    } catch (error) {
      console.log("get note thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const deleteNoteThunk = createAsyncThunk(
  "deleteNote",
  async ({ noteId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/note/delete-note", {
        data: { noteId },
      });
      return response.data;
    } catch (error) {
      console.log("delete note thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const createNoteThunk = createAsyncThunk(
  "createNote",
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/note/create-note", {
        title,
        content,
      });
      return response.data;
    } catch (error) {
      console.log("create note thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const updateNoteThunk = createAsyncThunk(
  "updateNote",
  async ({ title, content, noteId }, { rejectWithValue }) => {
    try {
      // console.log(title, content, noteId )
      const response = await axiosInstance.put(
        "/note/update-note",
        {
          title,
          content,
        },
        {
          params: {
            noteId,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log("update note thunk giving error ");
      return rejectWithValue(error);
    }
  },
);
