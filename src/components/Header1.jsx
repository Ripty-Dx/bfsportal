import React from "react";
import "./Header1.css";
import logo from "../images/BeautyFashionLogo.png";
import { IoMdCart } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
const Header1 = () => {
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
                <div>
                  <a className="links-header fontFamily " href="#12">
                    Customer Support
                  </a>
                </div>
                <div>
                  <a className="links-header fontFamily " href="#12">
                    Sales Report
                  </a>
                </div>
                <div>
                  <span className="lightColor ms-3"> Welcome </span> Ripty
                </div>
                <div>
                  <BsFillPersonFill
                    className="ms-3"
                    style={{ fontSize: "28px" }}
                  />
                </div>
                <div className="text-dark">
                  <IoMdCart style={{ fontSize: "28px" }} className="ms-3" />
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
