import React from "react";
import "./Login.css";
import image from "../images/BFS-login-page1.jpg";
import logo from "../images/BeautyFashionLogo.png";
const Login = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-image">
        <div className="col-md-3 col-lg-6 p-0 m-0  image-section ">
            {/* <img src={image} height={"100%"}  width={"100%"} alt="makeup" /> */}
          </div>
          <div className="col-md-9 col-lg-6 col-sm-12 form-part">
            <div className="display-part">
            <div className="d-flex justify-content-center mt-3">
              <img src={logo} alt="logo" height={"120%"} width={"70%"}/>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <p className="logo-text"  >BFS PORTAL</p>
            </div>
            <div className="mt-2">
              <h3 className="c-gray detail-text">Enter detail to login below</h3>
            </div >
            <div className="mt-3 p-2">
              <form id="form-input">
                <div className="row form-input" >
                    <input type="text" className="loginInput" name="username" placeholder="Username"/>
                </div>
                <div className="row mt-4 form-input">
                <input type="password" className="loginInput" name="password"  placeholder="Password"/>

                </div>
                <div className="row">
                   <div className="col-md-6  d-flex justify-content-center align-items-center mt-4 p-1">
                    <a href="#1213827" className="text-dark forgotPassword">Forgot Password?</a>
                   </div>
                   <div className="col-md-6 d-flex justify-content-center mt-4 p-1 ">
                    <button className="bg-gray text-white login-button"> Login</button>
                   </div>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-center mt-5 apply mb-0">
                Don't have an account? &nbsp;
                <a href="#1213827" className="text-dark fw-bold">Apply now</a>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
