import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!isAuthenticated) navigate("/auth");
  }, [isAuthenticated]);

  return children;
};

export default ProtectedRoute;
