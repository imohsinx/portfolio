import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

const RedirectToHome = ({ children }) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  }, [user, navigate]);

  return children;
};

export default RedirectToHome;
