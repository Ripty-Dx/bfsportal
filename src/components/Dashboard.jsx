import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
const Dashboard = () => {
  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <div className="">
            <Header1 />
            <div className="">
              <div className=" ">Your Accounts</div>
              <div className=" ">Your Accounts</div>
            </div>
            <div className="fixed-bottom">
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <>
          {(window.location.href = "/")}
          {/* {window.location.replace("/")} */}
          {/* { navigate("/")} */}
        </>
      )}
    </>
  );
};

export default Dashboard;
