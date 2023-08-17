import Header1 from "./Header1";
import Footer from "./Footer";
import "./Dashboard.css";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { LiaSortAlphaUpSolid } from "react-icons/lia";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
const Dashboard = () => {
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  const { second } = apiData.current || {};
  // let refApiData = {};
  const [refApiData, setRefApiData] = useState(apiData);
  // console.log(refApiData);
  const [sortInDescending, setSortInDescending] = useState(false);
  const [searchText, setSearchText] = useState(null);
  // console.log(refApiData.current.second);
  // console.log(sortInDescending);
  const sortAccounts = (e, data) => {
    e?.preventDefault();
    if (sortInDescending) {
      console.log("sort in descending is true");
      //descending order
      data.sort((a, b) => {
        const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      if (e.type === "input") {
      } else setSortInDescending(false);
    } else {
      //ascending order
      console.log("sort in descending is false");

      data.sort((a, b) => {
        const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        // names must be equal
        return 0;
      });
      if (e.type === "input") {
      } else setSortInDescending(true);
    }
    // console.log("sort", refApiData.current.second);
  };
  const searchButton = (e) => {
    // console.log(e);
    // console.log(second);
    setSearchText(document.getElementById("searchButton").value);
    var searchTextString = document.getElementById("searchButton").value;
    // console.log("searchTextString", searchTextString);
    if (searchTextString === "") {
      refApiData.current.second = [...second];
      document.getElementById("noData").classList.add("d-none");
      document.getElementById("capsuleButtons").classList.remove("d-none");
    } else {
      let filteredObjectsArray = [];
      second?.map((obj) => {
        if (obj.Name.toUpperCase().match(searchTextString.toUpperCase()))
          filteredObjectsArray.push(obj);
        return 1;
      });
      // console.log({ aaa: apiData.current.second, filteredObjectsArray });
      if (filteredObjectsArray.length > 0) {
        // refApiData.current.second = [...filteredObjectsArray];
        console.log("before sort", filteredObjectsArray);
        console.log(sortInDescending);
        // sortAccounts(e, filteredObjectsArray );
        // console.log(filteredObjectsArray);
       setRefApiData({ current: { second: filteredObjectsArray } });
       if (sortInDescending) {

        setSortInDescending(false);
        sortAccounts(e, refApiData.current.second);
      }
      else{
        // sortAccounts(e, filteredObjectsArray);

      }
      console.log("aftersort", filteredObjectsArray);
      
        document.getElementById("noData").classList.add("d-none");
        document.getElementById("capsuleButtons").classList.remove("d-none");
      } else {
        document.getElementById("noData").classList.remove("d-none");
        document.getElementById("capsuleButtons").classList.add("d-none");
      }
    }
    // console.log("refApiData.current.second", refApiData.current.second);
  };
  const resetButton = (e) => {
    e?.preventDefault();
    if (sortInDescending) {
      sortAccounts(e, refApiData.current.second);
    }
    document.getElementById("searchForm").reset();
    // refApiData.current.second = [...second];
    searchButton(e);
  };
  // useEffect(() => {
  //   searchButton();
  // }, [searchText]);
  return (
    <>
      {console.log("sortInDescending", sortInDescending)}
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
                  <button
                    className="btn btn-light fs-4 px-2 shadow-sm bg-white  pt-0 m-0"
                    onClick={(e) => sortAccounts(e, refApiData.current.second)}
                  >
                    {sortInDescending ? (
                      <LiaSortAlphaUpSolid />
                    ) : (
                      <LiaSortAlphaDownSolid />
                    )}
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
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#1">
                        1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#1">
                        2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#1">
                        3
                      </a>
                    </li>
                  </ul>
                  {/* </div> */}
                </div>
                {/* search button */}
                <div className=" col-lg-2 col-md-2  p-lg-2 m-xs-5">
                  <form id="searchForm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onInput={searchButton}
                      id="searchButton"
                    />
                  </form>
                </div>
                {/* reset button */}
                <div className=" col-lg-1 p-md-0 col-md-1 ">
                  {/* <button className="btn " id="resetButton"> */}
                  <button
                    className="btn btn-outline-secondary"
                    onClick={resetButton}
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* no data found */}
              <div id="noData" className="d-none">
                <h5 className=" d-flex  align-items-center justify-content-center mt-5">
                  No data found
                </h5>
              </div>
              {/* capsule button */}
              <div
                id="capsuleButtons"
                className=" row d-flex gap-1 justify-content-center mt-3"
              >
                {/* {console.log("inner", refApiData.current.second)} */}
                {refApiData.current.second.map((element, index) => {
                  return (
                    <>
                      <div className="" key={index} style={{ width: "350px" }}>
                        <div className="mt-2 bg-white shadow rounded-3 d-flex align-items-center justify-content-center">
                          {/* logo */}
                          <div className="col-md-4 mx-auto">
                            <div className="d-flex align-items-center justify-content-center">
                              <BsFillPersonFill
                                size={"35px"}
                                className="p-1 text-white rounded-circle border-0 icon"
                              />
                            </div>
                          </div>
                          {/* accounts */}
                          <div
                            style={{ minHeight: "65px", flex: "1 1 auto" }}
                            className="col-md-8 d-flex align-items-center justify-content-center transition "
                          >
                            <button className="btn fw-bold " key={element.Id}>
                              {element?.Name}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
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
