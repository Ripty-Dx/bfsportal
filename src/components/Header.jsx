import React from "react";
import "./Header.css";
import logo from "../images/BeautyFashionLogo.png";
import { IoMdCart } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light nbColor ">
        <div className="container-fluid">
          <a className="navbar-brand ps-3" href="#12">
            <img src={logo} alt="logo" height={"45%"} width={"45%"}></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-1 mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#12">
                  Customer Support
                </a>
              </li>
              <li className="nav-item">
                <div className="nav-link light">|</div>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#12">
                  Sales Report
                </a>
              </li>
              <li className="nav-item">
                <div className="light nav-link">|</div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <span className="light"> Welcome </span> Name
                </div>
              </li>
              <li className="nav-item dropdown ">
                <a
                  className="nav-link  active dropdown-toggle "
                  href="#1"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsFillPersonFill />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#1">
                      Order List
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#1">
                      Reports
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#1">
                      LogOut
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <div className="nav-link active">
                  {" "}
                  <IoMdCart />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
