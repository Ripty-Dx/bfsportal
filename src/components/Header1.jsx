import React from "react";
import "./Header1.css";
import logo from "../images/BeautyFashionLogo.png";
import { IoMdCart } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
const Header1 = () => {
  const showDropDownList = () => {
    document.getElementById("drop-down-list").classList.remove("d-none");
  };
  const hideDropDownList = () => {
    document.getElementById("drop-down-list").classList.add("d-none");
  };
  return (
    <>
      <div className="fixed-top header-bg-color  fontFamily">
        <div className="container-fluid">
          <div className="row ">
            <div className="main-header p-3">
              {/* logo */}
              <div className="col-3 col-md-2 col-lg-1">
                <img src={logo} alt="logo" width={"100%"}></img>
              </div>
              {/* welcome name */}
              <div className="col-7 d-md-none fs-6 pt-1">
                <span className="lightColor"> Welcome </span> Name
              </div>
              {/* triple button */}
              <div className="d-sm-flex d-md-none col-sm-9 col-1">
                <button className="tripleButton">
                  <AiOutlineMenu />{" "}
                </button>
              </div>

              {/* header options */}
              <div className="d-none d-md-flex header-options ">
                {/* Customer Support */}
                <div>
                  <a className="links-header fontFamily " href="#12">
                    Customer Support
                  </a>
                </div>
                {/* Sales Report */}
                <div>
                  <a className="links-header fontFamily " href="#12">
                    Sales Report
                  </a>
                </div>
                {/* welcome name */}
                <div>
                  <span className="lightColor ms-3"> Welcome </span> Ripty
                </div>
                {/* person logo and dropdown*/}
                <div>
                  <BsFillPersonFill
                    onMouseOver={showDropDownList}
                    onMouseOut={hideDropDownList}
                    className="ms-3"
                    style={{ fontSize: "28px",cursor:"pointer" }}
                  />
                  <div id="drop-down-list" className="list d-none" onMouseOver={showDropDownList} onMouseOut={hideDropDownList}>
                    <ul className="p-2" >
                      <li>
                        <a href="#12">Order List</a>
                      </li>
                      <li>
                        <a href="#12">Reports </a>
                      </li>
                      <li>
                        <a href="#12">LogOut</a>
                      </li>
                    </ul>{" "}
                  </div>
                </div>
                {/* cart logo */}
                <div className="text-dark">
                  <IoMdCart style={{ fontSize: "28px" }} className="mx-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header1;
