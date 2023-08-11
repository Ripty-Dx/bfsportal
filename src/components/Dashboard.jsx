import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import "./Dashboard.css";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { BsFillPersonFill } from "react-icons/bs";
const Dashboard = () => {
  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <div className="">
            <Header1 />
            <div className="container-fluid">
              <div className="row d-flex align-items-center justify-content-md-center">
                {/* Your account heading */}
                <div className="col-lg-5 m-md-1 p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2   ">
                  <h2 className="fw-bold text-decoration-underline fw-md-normal link-offset-2">
                    Your Accounts
                  </h2>
                </div>
                {/* sort button */}
                <div className=" col-lg-auto p-md-0 col-md-2 d-flex p-lg-2 d-flex align-items-center justify-content-lg-center justify-content-sm-left">
                  Sort By: &nbsp;
                  <button className="btn btn-light fs-4 px-2 shadow-sm bg-white  pt-0 m-0">
                    <LiaSortAlphaDownSolid />
                  </button>
                </div>
                {/* dropdown button */}
                <div className=" col-lg-auto col-md-auto p-md-0  p-lg-2   dropdown">
                  {/* <div className=""> */}
                  <button
                    type="button"
                    className="btn btn-light dropdown-toggle shadow-sm bg-white"
                    data-bs-toggle="dropdown"
                  >
                    Manufactured By{" "}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#1">
                        1
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#1">
                        2
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#1">
                        3
                      </a>
                    </li>
                  </ul>
                  {/* </div> */}
                </div>
                {/* search button */}
                <div className=" col-lg-2 col-md-2  p-lg-2 m-xs-5">
                  <form>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                  </form>
                </div>
                {/* reset button */}
                <div className=" col-lg-1 p-md-0 col-md-1 ">
                  {/* <button className="btn " id="resetButton"> */}
                  <button className="btn btn-outline-secondary">Reset</button>
                </div>
              </div>

              <div className="row d-flex gap-1 justify-content-center mt-3">
                <div className="col-md-3 ">
                  <div className="bg-white shadow rounded-3 d-flex align-items-center justify-content-center">
                    <span className="px-4  m-1 p-2">
                      <BsFillPersonFill
                        size={"35px"}
                        className="p-1 text-white rounded-circle border-0 icon"
                      />
                    </span>
                    <div className="transition mx-auto">
                      <button className="btn fw-bold ">Apothe</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div className="bg-white shadow rounded-3 d-flex align-items-center justify-content-center">
                    <span className="px-4  m-1 p-2">
                      <BsFillPersonFill
                        size={"35px"}
                        className="p-1 text-white rounded-circle border-0 icon"
                      />
                    </span>
                    <div className="transition mx-auto">
                      <button className="btn fw-bold ">Apothe</button>
                    </div>
                  </div>
                </div><div className="col-md-3 ">
                  <div className="bg-white shadow rounded-3 d-flex align-items-center justify-content-center">
                    <span className="px-4  m-1 p-2">
                      <BsFillPersonFill
                        size={"35px"}
                        className="p-1 text-white rounded-circle border-0 icon"
                      />
                    </span>
                    <div className="transition mx-auto">
                      <button className="btn fw-bold ">Apothe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="fixed-bottom">
              {/* <div className=""> */}
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
