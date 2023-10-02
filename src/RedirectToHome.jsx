import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

const RedirectToHome = ({ children }) => {
  const { user } = useUserAuth();
  if (user) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};

export default RedirectToHome;
