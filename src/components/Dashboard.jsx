import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import "./Dashboard.css";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
const Dashboard = () => {
  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <div className="">
            <Header1 />
            <div className="container-fluid">
              <div className="row d-flex align-items-center justify-content-center ">
                {/* Your account heading */}
                <div className="col-lg-5 m-1 p-lg-2 col-md-4 p-md-1 ps-md-3">
                  <h2 className="fw-bold text-decoration-underline fw-md-normal link-offset-2">
                    Your Accounts
                  </h2>
                </div>
                {/* sort button */}

                {/* <div className="col-lg-8 m-1 p-2"> */}
                <div className=" col-lg-auto  col-md-2 d-flex p-lg-2 d-flex align-items-center justify-content-center">
                  Sort By: &nbsp;
                  <button className="btn btn-light fs-4 px-2 shadow-sm bg-white  pt-0 m-0">
                    <LiaSortAlphaDownSolid />
                  </button>
                </div>
                {/* dropdown button */}
                <div className=" col-lg-auto col-md-auto p-md-0  p-lg-2 dropdown">
                  {/* <div className=""> */}
                  <button
                    type="button"
                    className="btn btn-light dropdown-toggle shadow-sm bg-white"
                    data-bs-toggle="dropdown"
                  >
                    Manufactured By          </button>
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
                <div className=" col-lg-2 col-md-2  p-lg-2">
                  <form>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                  </form>
                </div>
                {/* reset button */}
                <div className=" col-lg-1 p-md-0 col-md-1">
                  {/* <button className="btn " id="resetButton"> */}
                  <button className="btn btn-outline-secondary ">Reset</button>
                </div>
                {/* </div> */}
              </div>
            </div>
            {/* Footer */}
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
