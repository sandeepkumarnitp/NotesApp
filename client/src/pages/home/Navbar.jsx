import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../store/slice/user/user.thunk";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    
  };

  return (
    <nav className="bg-gray-800 shadow-lg w-full fixed z-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Website Name/Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold">NotesApp</h1>
          </div>

          {/* Login/Logout Button */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-white text-sm font-medium">
                  🎉Welcome {isAuthenticated ? userProfile?.name : ""}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                <Link to="/auth">Create Account</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
