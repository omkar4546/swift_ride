import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProtectedWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  //   console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <div>{children}</div>;
}

export default UserProtectedWrapper;
