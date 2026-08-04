import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNoteThunk,
  updateNoteThunk,
} from "../../store/slice/note/note.thunk.js";

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: [{ text: "" }],
  });

  const { noteId } = useParams();
  const { singleNote } = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch note
  useEffect(() => {
    dispatch(getNoteThunk({ noteId }));
  }, [noteId, dispatch]);

  // Set form data when note loads
  useEffect(() => {
    if (singleNote) {
      setFormData({
        title: singleNote.title || "",
        content: singleNote.content.map((item) => ({ ...item })) || [
          { text: "" },
        ],
      });
    }
  }, [singleNote]);

  // Handle title change
  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  // Handle content change
  const handleContentChange = (index, value) => {
    const updatedContent = formData.content.map((item, i) =>
      i === index ? { ...item, text: value } : item,
    );

    setFormData({ ...formData, content: updatedContent });
  };

  // Add new content block
  const addContentField = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { text: "" }],
    });
  };

  // Remove content block
  const removeContentField = (index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index);
    setFormData({ ...formData, content: updatedContent });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Updated Data:", formData);
    const FormData = { ...formData, noteId };
    const response = await dispatch(updateNoteThunk(FormData));
    // console.log("after submit:", response);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Update Note
        </h2>

        {/* Title */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Content
          </label>

          {formData.content.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                value={item.text}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                type="button"
                onClick={() => removeContentField(index)}
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                X
              </button>
            </div>
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
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
