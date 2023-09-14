import React, { useState } from "react";
import "./Login.css";
// import image from "../images/BFS-login-page1.jpg";
import logo from "../images/BeautyFashionLogo.png";
import portal_login_image from "../images/BFS Portal Site.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  });

  const onInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(loginData);
  };

  const fetchUserData = (email, password) => {
    return fetch(" https://dev.beautyfashionsales.com/beauty/85mB&7viTC6P", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const clearInput = () => {
    document.getElementById("form-input").reset();
    setLoginData({
      username: null,
      password: null,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiData = await fetchUserData(loginData.username, loginData.password);
    setLoading(false);
    if (JSON.stringify(apiData?.data?.status) === "400") {
      clearInput();
      alert("Enter Valid Credentials");
    } else if (JSON.stringify(apiData?.status) === "200") {
      localStorage.setItem("User name", apiData.data.user.Name);
      localStorage.setItem("Api Data", JSON.stringify(apiData));
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("User name");
    if (userData) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row position bg-white">
        <div className="col-md-3 col-lg-6 col-12 p-0 m-0  image-section  ">
          <img
            src={portal_login_image}
            height={"100%"}
            width={"100%"}
            alt="makeup"
          />
        </div>
        <div className="col-md-9 col-lg-6 col-sm-12 form-part m-auto">
          <div className="display-part">
            <div className="d-flex justify-content-center">
              <img src={logo} alt="logo" height={"90%"} width={"60%"} />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <p className="logo-text">BFS PORTAL</p>
            </div>
            <div className="mt-2">
              <h3 className="c-gray detail-text">
                Enter detail to login below
              </h3>
            </div>
            <div className="mt-3 p-2">
              <form id="form-input">
                <div className="row form-input">
                  <input
                    type="text"
                    className="loginInput"
                    name="username"
                    placeholder="Username"
                    onChange={onInputChange}
                    onPaste={onInputChange}
                  />
                </div>
                <div className="row mt-4 form-input">
                  <input
                    type="password"
                    className="loginInput"
                    name="password"
                    placeholder="Password"
                    onChange={onInputChange}
                    onPaste={onInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6  d-flex justify-content-center align-items-center mt-3 p-1">
                    <a href="#1213827" className="text-dark forgotPassword">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center mt-3 p-1 ">
                    <button
                      className="bg-gray text-white login-button"
                      onClick={login}
                      disabled={loading}
                    >
                      {loading ? <div className="loadingSpinner" /> : "Login"}
                    </button>
                  </div>
                </div>
                <hr></hr>
              </form>
            </div>
            <div className="d-flex justify-content-center mt-3 apply mb-0">
              Don't have an account? &nbsp;
              <a href="#1213827" className="text-dark fw-bold">
                Apply now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
