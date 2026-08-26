import React from "react";
import { useState } from "react";
import { createNoteThunk } from "../../store/slice/note/note.thunk";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NoteForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: [{ text: "" }],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleContentChange = (index, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index].text = value;
    setFormData({ ...formData, content: updatedContent });
  };

  const addContentField = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { text: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createNoteThunk(formData));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-linear-to-tl from-yellow-300 to-red-400">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Create Note
        </h2>
        <Link to="/">
          <p className="absolute top-4 right-7 font-bold font-sm px-2.5 py-1 text-center bg-gray-200 rounded-2xl ">
            X
          </p>
        </Link>

        {/* Title */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
          required
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter title"
          />
        </div>

        {/* Content Fields */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Content
          </label>
          {formData.content.map((item, index) => (
            <textarea
            required
              key={index}
              value={item.text}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter content"
            />
          ))}

          <button
            type="button"
            onClick={addContentField}
            className="text-blue-500 text-sm hover:underline"
          >
            + Add More
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
