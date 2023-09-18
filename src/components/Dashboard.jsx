import "./Dashboard.css";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { LiaSortAlphaUpSolid } from "react-icons/lia";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useRef(JSON.parse(localStorage.getItem("Api Data"))).current;
  const inputRef = useRef();
  // Original source of data
  const { second: brandListData } = userData || {};

  const [brandList, setBrandList] = useState(brandListData || []);
  const [sortInDescending, setSortInDescending] = useState(false);
  const [manufacturerData, setManufacturerData] = useState();
  const [manufacturerFilter, setManufacturerFilter] = useState(null);

  const setBrandListWithSorting = (data) => {
    const updatedBrandList = [...data];
    if (sortInDescending) {
      updatedBrandList.sort((a, b) => b.Name?.localeCompare(a.Name));
    } else {
      updatedBrandList.sort((a, b) => a.Name?.localeCompare(b.Name));
    }

    setBrandList(updatedBrandList);
  };

  const fetchManufacturedByData = () => {
    fetch("https://dev.beautyfashionsales.com/beauty/B0F9FC7237C", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: userData.data?.user?.access_token,
        link: "https://beautyfashionsales.my.salesforce.com/services/data/v56.0/query?q=SELECT Id, Name, Manufacturer_Logo__c,IsActive__c FROM Manufacturer__c where IsActive__c= 'active'  order by name",
      }),
    })
      .then((response) => response.json())
      .then((data) => setManufacturerData(data.data.records));  };

  useEffect(() => {
    fetchManufacturedByData();
  }, []);

  useEffect(() => {
    setBrandListWithSorting(brandList);
  }, [sortInDescending]);

  const handleSearch = (e) => {
    const value = e.target.value?.toLowerCase();
    const filteredData = brandListData.filter((brand) =>
      brand?.Name?.toLowerCase().includes(value)
    );
    setBrandListWithSorting(filteredData);
  };

  const resetButton = (e) => {
    setSortInDescending(false);
    setManufacturerFilter(null);
    setBrandList(brandListData);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      {/* {console.log(manufacturerData)} */}
      {localStorage.getItem("User name") ? (
        <>
          <div style={{ height: "100%" }}>
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
                  onClick={() => setSortInDescending((prev) => !prev)}
                  className="btn btn-light fs-4 px-2 shadow-sm bg-white  pt-0 m-0"
                >
                  {sortInDescending ? (
                    <>
                      <LiaSortAlphaUpSolid />
                    </>
                  ) : (
                    <LiaSortAlphaDownSolid />
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
                  {manufacturerFilter?.Name || "Manufactured By"}
                </button>
                <ul className="dropdown-menu">
                  {manufacturerData?.map((ele,index) => (
                    <>
                      <li key={index}>
                        <button 
                          className="dropdown-item"
                          onClick={() => setManufacturerFilter(ele)}
                        >
                          {ele.Name}
                        </button>
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
                    ref={inputRef}
                    onChange={handleSearch}
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
            {!brandList?.length ? (
              <div id="noData">
                <h5 className=" d-flex  align-items-center justify-content-center mt-5">
                  No data found
                </h5>
              </div>
            ) : null}
            {/* capsule button */}
            <div
              id="capsuleButtons"
              className=" row d-flex gap-1 justify-content-center mt-3"
            >
              {/* {console.log("inner", brandList)} */}
              {brandList?.map((element, index) => {
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
                          <button
                            className="btn fw-bold "
                            key={element.Id}
                            onClick={() => {
                              navigate("/account-manufacturers", {
                                state: {
                                  acc_name: element?.Name,
                                },
                              });
                            }}
                          >
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
        </>
      ) : (
        <>{(window.location.href = "/")}</>
      )}
    </>
  );
};

export default Dashboard;
