import Header1 from "./Header1";
import Footer from "./Footer";
import "./Dashboard.css";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { LiaSortAlphaUpSolid } from "react-icons/lia";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const fetchManufacturedByData = () => {
    fetch("https://dev.beautyfashionsales.com/beauty/B0F9FC7237C", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: "00D30000001G9fh!AQMAQEb7YGJoFTEGCHe2YS0LlqEilZVAo7ZJ3KdhD5W9gVa.FN6mhAxmq_qNZtt7..pFQiFB9W8W7vu3qVcIO39o5D0MkSYy",
        link: "https://beautyfashionsales.my.salesforce.com/services/data/v56.0/query?q=SELECT Id, Name, Manufacturer_Logo__c,IsActive__c FROM Manufacturer__c where IsActive__c= 'active'  order by name",
      }),
    })
      .then((response) => response.json())
      .then((data) => setManufacturedData(data.data.records));
  };
  const navigate=useNavigate();

  const [manufacturedData, setManufacturedData] = useState(null);
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  const { second } = apiData.current || {};
  const [refApiData, setRefApiData] = useState(apiData);
  const [sortInDescending, setSortInDescending] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [resetButtonClicked, setResetButtonClicked] = useState(false);
  // console.log(refApiData.current.second);
  // console.log(sortInDescending);
  const redirectToAccountManufacturers=(name)=>{
    navigate("/account-manufacturers",{
      state:{
        acc_name:name,
      }
    })

  }
  const sortAccounts = (e, data, type) => {
    e?.preventDefault();
    if (type === "ascending") {
      //ascending order
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
      // setResetButtonClicked(false)
      //descending order
      // console.log("sort in descending is false");

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
    setSearchText(document.getElementById("searchButton").value);
    var searchTextString = document.getElementById("searchButton").value;
    if (searchTextString === "") {
      refApiData.current.second = [...second];
      if (sortInDescending) {
        sortAccounts(e, refApiData.current.second, "descending");
      }
      document.getElementById("noData").classList.add("d-none");
      document.getElementById("capsuleButtons").classList.remove("d-none");
    } else {
      let filteredObjectsArray = [];
      second?.map((obj) => {
        if (obj.Name.toUpperCase().match(searchTextString.toUpperCase()))
          filteredObjectsArray.push(obj);
        return 1;
      });
      if (filteredObjectsArray.length > 0) {
        // console.log("before sort", filteredObjectsArray);
        if (sortInDescending) {
          sortAccounts(e, filteredObjectsArray, "descending");
        }
        setRefApiData({ current: { second: filteredObjectsArray } });
        // console.log("after sort", filteredObjectsArray);
        document.getElementById("noData").classList.add("d-none");
        document.getElementById("capsuleButtons").classList.remove("d-none");
      } else {
        document.getElementById("noData").classList.remove("d-none");
        document.getElementById("capsuleButtons").classList.add("d-none");
      }
    }
  };
  const resetButton = (e) => {
    setResetButtonClicked(true);
    e?.preventDefault();
    console.log("reset clicked");
    console.log(refApiData.current.second);
    sortAccounts(e, refApiData.current.second, "ascending");
    console.log(sortInDescending);
    setSortInDescending(false);
    setRefApiData({ current: { second: second } });
    document.getElementById("searchForm").reset();
    searchButton(e);
    console.log(sortInDescending);
  };
  useEffect(() => {
    fetchManufacturedByData();
    //   setSortInDescending(false);
    //   setResetButtonClicked(false);
  }, []);
  return (
    <>
      {console.log(manufacturedData)}
      {/* {console.log("sortInDescending", sortInDescending)} */}
      {localStorage.getItem("User name") ? (
        <>
          <div className="position-relative">
            <Header1 />
            <div className="container-fluid" style={{ minHeight: "60vh" }} >
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
                    {sortInDescending ? (
                      <>
                        <LiaSortAlphaUpSolid
                          onClick={(e) =>
                            sortAccounts(
                              e,
                              refApiData.current.second,
                              "ascending"
                            )
                          }
                        />
                      </>
                    ) : (
                      <LiaSortAlphaDownSolid
                        onClick={(e) =>
                          sortAccounts(
                            e,
                            refApiData.current.second,
                            "descending"
                          )
                        }
                      />
                    )}
                  </button>
                </div>
                {/* manufactured by dropdown button */}
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
                    {manufacturedData?.map((ele) => (
                      <>
                        <li>
                          <a className="dropdown-item" href="#1" >
                            {ele.Name} 
                          </a>
                        </li>
                      </>
                    ))}
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
                            <button className="btn fw-bold " key={element.Id} onClick={()=>redirectToAccountManufacturers(element?.Name)} >
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
            <div className="bottom mt-5">
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
