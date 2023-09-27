import React from "react";
import "./Header1.css";
import logo from "../images/BeautyFashionLogo.png";
import { IoMdCart } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
const Header1 = () => {
  const location = useLocation();
  // console.log(location.state.name);
  const showDropDownList = () => {
    document.getElementById("drop-down-list").classList.remove("d-none");
  };
  const hideDropDownList = () => {
    document.getElementById("drop-down-list").classList.add("d-none");
  };
  const tripleButton = () => {
    document.getElementById("welcome_name").classList.remove("d-none");
    document.getElementById("tripleButton").style.display = "none";
    document.getElementById("crossButton").classList.remove("d-none");
    document.getElementById("mobile_header_options").classList.remove("d-none");
  };
  const crossButton = () => {
    document.getElementById("welcome_name").classList.add("d-none");
    document.getElementById("tripleButton").style.display = "block";
    document.getElementById("crossButton").classList.add("d-none");
    document.getElementById("mobile_header_options").classList.add("d-none");
  };
  return (
    <>
      <div className="header_font_family">
        <div className="container-fluid">
          <div className="row header-bg-color ">
            <div className="main-header p-3">
              {/* logo */}
              <div className="col-3 col-md-2 col-lg-1" id="logo">
                <img
                  src={logo}
                  alt="logo"
                  width={"100%"}
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                ></img>
              </div>

              {/* welcome name */}
              <div
                id="welcome_name"
                className="col-7 d-none d-md-none fs-6 pt-1"
              >
                <span className="lightColor"> Welcome </span>{" "}
                {localStorage.getItem("User name")}
              </div>
              {/* triple button */}
              <div className="d-sm-flex d-md-none col-sm-1 col-1">
                <button
                  id="tripleButton"
                  className="tripleButton"
                  onClick={tripleButton}
                >
                  <AiOutlineMenu />{" "}
                </button>
                <button
                  id="crossButton"
                  className="tripleButton d-none"
                  onClick={crossButton}
                >
                  <RxCross1 />{" "}
                </button>
              </div>

              {/* header options */}
              <div className="d-none d-md-flex header-options ">
                {/* Customer Support */}
                <div>
                  <a
                    className="links-header header_font_family "
                    href="/customer-support"
                  >
                    Customer Support
                  </a>
                </div>
                {/* Sales Report */}
                <div>
                  <a className="links-header header_font_family " href="/reports">
                    Sales Report
                  </a>
                </div>
                {/* welcome name */}
                <div>
                  <span className="lightColor ms-3"> Welcome </span>{" "}
                  {localStorage.getItem("User name")}
                </div>
                {/* person logo and dropdown*/}
                <div>
                  <BsFillPersonFill
                    onMouseOver={showDropDownList}
                    onMouseOut={hideDropDownList}
                    className="ms-3"
                    style={{ fontSize: "28px", cursor: "pointer" }}
                  />
                  <div
                    id="drop-down-list"
                    className="list d-none"
                    onMouseOver={showDropDownList}
                    onMouseOut={hideDropDownList}
                  >
                    <ul className="p-2">
                      <li>
                        <a href="/orderList">Order List</a>
                      </li>
                      <li>
                        <a href="/reports">Reports </a>
                      </li>
                      <li>
                        <a href="/logout">LogOut</a>
                      </li>
                    </ul>{" "}
                  </div>
                </div>
                {/* cart logo */}
                <div className="text-dark position-relative">
                  <IoMdCart style={{ fontSize: "30px" }} className="mx-3 " />
                  {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                      99+
                    </span> */}
                  <div
                    className="position-absolute top-50 start-50 translate-middle btn btn-sm text-white rounded-pill"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      fontSize: "9px",
                      paddingBottom: "22px",
                      paddingLeft: "10px",
                    }}
                  >
                    {localStorage.getItem("Total Order in cart") === "0"
                      ? ""
                      : localStorage.getItem("Total Order in cart")}
                  </div>

                  {/* </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div id="mobile_header_options" className="col-12 d-none d-md-none">
              <div className="">
                <ul>
                  <li>
                    <a href="/customer-support">Customer Support</a>
                  </li>
                  <li>
                    <a href="/reports">Sales Report</a>
                  </li>
                  <li>
                    <a href="/orderList">Order List</a>
                  </li>
                  <li>
                    <a href="/reports">Reports</a>
                  </li>
                  <li>
                    <a href="#123">Cart</a>
                  </li>
                  <li>
                    <a href="/logout">LogOut</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header1;
