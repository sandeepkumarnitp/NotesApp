import { createSlice } from "@reduxjs/toolkit";
import {
  createNoteThunk,
  deleteNoteThunk,
  getAllNotesThunk,
  getNoteThunk,
  updateNoteThunk,
} from "./note.thunk";

const initialState = {
  singleNote: null,
  allNotes: null,
  deletedNote: null,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ************** get all notes thunk*************
    builder
      .addCase(getAllNotesThunk.pending, (state, action) => {})
      .addCase(getAllNotesThunk.fulfilled, (state, action) => {
        state.allNotes = action.payload?.responseData;
      })
      .addCase(getAllNotesThunk.rejected, (state, action) => {});

    // **************** get Note thunk ******************
    builder
      .addCase(getNoteThunk.pending, (state, action) => {})
      .addCase(getNoteThunk.fulfilled, (state, action) => {
        state.singleNote = action.payload?.response[0];
        // console.log(state.singleNote)
      })
      .addCase(getNoteThunk.rejected, (state, action) => {});

    // ***************** delete Note Thunk *******************
    builder
      .addCase(deleteNoteThunk.pending, (state, action) => {})
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.deletedNote = action.payload?.response;
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {});

    // ******************** create note thunk *****************
    builder
      .addCase(createNoteThunk.pending, (state, action) => {})
      .addCase(createNoteThunk.fulfilled, (state, action) => {})
      .addCase(createNoteThunk.rejected, (state, action) => {});

    builder
      .addCase(updateNoteThunk.pending, (state, action) => {})
      .addCase(updateNoteThunk.fulfilled, (state, action) => {})
      .addCase(updateNoteThunk.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = noteSlice.actions; //synchronous function

export default noteSlice.reducer;
