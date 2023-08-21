import React from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const naviagate = useNavigate();

  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <Header1 />
          <div className="container-fluid" style={{ minHeight: "55vh" }}>
            <div className="row d-flex align-items-center justify-content-md-center">
              {/* Your account heading */}
              <div className="col-lg-5  p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2">
                <h2 className="fw-bold text-decoration-underline fw-md-normal link-offset-2">
                  <BiLeftArrowAlt
                    className="back_icon"
                    onClick={() => (window.location.href = "/account-manufacturers")}
                  />{" "}
                  Account Manufacturers
                </h2>
              </div>
              <div className="col-lg-5 d-flex justify-content-center align-items-center">
                <h5 className="fw-bolder">Account&nbsp;: &nbsp;</h5>
                <h5>{location.state.AccountName}</h5>
              </div>
            </div>
            {/* capsule button */}
            <div
              id="capsuleButtons"
              className=" row d-flex gap-1 justify-content-center mt-3"
            ></div>
          </div>
          {/* Footer */}
          <div className="bottom mt-5">
            {/* <div className=""> */}
            <Footer />
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

export default Product;
