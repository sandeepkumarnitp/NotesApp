import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteThunk,
  getAllNotesThunk,
} from "../../store/slice/note/note.thunk.js";
import { Link } from "react-router-dom";
import UpdateForm from "../components/UpdateForm.jsx";

const Card = ({ noteData, idx }) => {
  const noteId = noteData._id;
  const userId = noteData.user;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const response = await dispatch(deleteNoteThunk({ noteId }));
    if (response?.payload?.success) {
      await dispatch(getAllNotesThunk());
    }
  };

  return (
    <div className="flex items-start">
      <div className="w-xs bg-white border-t-6 border-blue-800 rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            className="w-full h-35 object-cover"
            src="https://images.unsplash.com/photo-1777661097541-e9ebeffe6aa2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Card"
          />
          <p className="absolute top-1 left-3 text-5xl text-gray-400 font-bold">
            {idx + 1}
          </p>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-500 mb-3">
            {noteData.title}
          </h2>
          <div className="">
            {noteData?.content?.map((tasks, i) => (
              <p
                key={i}
                className="text-gray-700 leading-4.5 text-md mb-1.5 flex items-start justify-start gap-1"
              >
                <span className="font-bold">{i + 1}.</span>{" "}
                <span>{tasks.text}</span>
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="mt-3 px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              <Link to={`/update-note/${userId}/${noteId}`}>Update</Link>
            </button>
            <button
              onClick={handleDelete}
              className="mt-3 px-4 py-1.5 bg-red-700 text-white rounded hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
