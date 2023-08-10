import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <Header1 />
          <Footer />
        </>
      ) : (
        <>
          {window.location.href="/"}
          {/* {window.location.replace("/")} */}
          {/* { navigate("/")} */}
        </>
      )}
    </>
  );
};

export default Dashboard;
