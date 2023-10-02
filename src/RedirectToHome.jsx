import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

const RedirectToHome = ({ children }) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      // Navigate to some other page
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  }, [user]);

  return children;
};

export default RedirectToHome;
