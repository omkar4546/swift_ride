import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  //   console.log(token);

  //   useEffect(() => {
  //     if (!token) {
  //       navigate("/login");
  //     }
  //   }, [token]);

  useEffect(() => {
    // Check if token exists before making the request
    if (!token) {
      navigate("/captain-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;

          // Only update localStorage if a new token is provided
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          console.log(data);
          setCaptain(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);

        // Clear invalid token and redirect
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token, navigate]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return <div>{children}</div>;
}

export default CaptainProtectedWrapper;
