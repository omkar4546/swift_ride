import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CaptainLogout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return <div>UserLogout</div>;
}

export default CaptainLogout;
