import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("User name");
    localStorage.removeItem("Api Data");

    window.location.href = "/";
  }, []);
  return <></>;
};

export default Logout;
