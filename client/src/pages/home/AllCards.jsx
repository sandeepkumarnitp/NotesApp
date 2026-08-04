import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../store/slice/user/user.thunk";
import Card from "./Card";
import { getAllNotesThunk } from "../../store/slice/note/note.thunk";

const AllCards = () => {
  const { screenLoading, isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer,
  );

  const { allNotes } = useSelector((state) => state.noteReducer);

  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allNotes]);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await dispatch(getUserProfileThunk());
        await dispatch(getAllNotesThunk());
      }
    })();
  }, [isAuthenticated, screenLoading]);
  return (
    <div className="flex flex-wrap gap-15 px-20 pt-25 pb-10 h-screen overflow-y-auto">
      {allNotes?.map((note, idx) => (
        <Card key={idx} idx={idx} noteData={note} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default AllCards;
