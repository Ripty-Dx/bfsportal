import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header1 from "./Header1";
import { BsFillPersonFill } from "react-icons/bs";
import Footer from "./Footer";

const AccountManufacturers = () => {
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  const [refApiData, setRefApiData] = useState(apiData);
  const { second } = apiData.current || {};

  const location = useLocation();
//   console.log(location);
//   console.log(refApiData);
//   console.log(second);
  const filteredArray=second.filter((ele)=>(ele.Name===location.state.acc_name));
console.log(filteredArray[0].data[0].Name);
  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <Header1 />
          <div className="container-fluid">
            <div className="row d-flex align-items-center justify-content-md-center">
              {/* Your account heading */}
              <div className="col-lg-5  p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2   ">
                <h2 className="fw-bold text-decoration-underline fw-md-normal link-offset-2">
                  Account Manufacturers
                </h2>
              </div>
              <div className="col-lg-5 d-flex justify-content-center align-items-center">
                <h5 className="fw-bolder">Account&nbsp;: &nbsp;</h5>
                <h5>{location.state.acc_name}</h5>
              </div>
            </div>
            {/* capsule button */}
            <div
              id="capsuleButtons"
              className=" row d-flex gap-1 justify-content-center mt-3"
            >
              {/* {console.log("inner", refApiData.current.second)} */}
              {
              filteredArray[0].data.map((element, index) => {
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
                            {element?.ManufacturerName__c}
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
          <div className="bottom">
            {/* <div className=""> */}
            <Footer />
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

export default AccountManufacturers;
