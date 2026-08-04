import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AllCards from "./AllCards";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-linear-to-tl from-yellow-300 to-red-400">
      <Navbar />
      <div className="fixed bottom-10 right-5">
        <button className="px-3 py-1 rounded font-bold text-lg  bg-green-600 text-white">
          <Link to="/create-note">Create</Link>
        </button>
      </div>
      <AllCards />
    </div>
  );
};

export default Home;
