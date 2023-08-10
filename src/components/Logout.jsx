import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("User name");
    window.location.href = "/";
  }, []);
  return <></>;
};

export default Logout;
