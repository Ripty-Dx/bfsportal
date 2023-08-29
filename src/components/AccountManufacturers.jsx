import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header1 from "./Header1";
import { BiLeftArrowAlt } from "react-icons/bi";
import Footer from "./Footer";
import "./Dashboard.css";
const AccountManufacturers = () => {
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  const { second } = apiData.current || {};
  const location = useLocation();
  const navigate = useNavigate();
console.log(location);
  //   console.log(location);
  //   console.log(refApiData);
  //   console.log(second);
  const filteredArray = second?.filter(
    (ele) => ele.Name === location?.state?.acc_name
  );
  // console.log(filteredArray[0].data[0].Name);
  const redirectToProductPage = (e, ProductName, AccountName) => {
    e.preventDefault();
    navigate("/product", {
      state: {
        ProductName: ProductName,
        AccountName: AccountName,
      },
    });
  };
  return (
    <>
      {localStorage.getItem("User name") ? (
        <>
          <Header1 />
          <div className="container-fluid" style={{ minHeight: "60vh" }}>
            <div className="row d-flex align-items-center justify-content-md-center">
              {/* Your account heading */}
              <div className="col-lg-5  p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2">
                <h2 className="fw-bold text-decoration-underline fw-md-normal link-offset-2">
                  <BiLeftArrowAlt
                    className="back_icon me-2"
                    onClick={() => (window.location.href = "/dashboard")}
                  />{" "}
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
              {filteredArray[0]?.data.map((element, index) => {
                return (
                  <>
                    <div className="" key={index} style={{ width: "350px" }}>
                      <div className="mt-2 bg-white shadow rounded-3 d-flex align-items-center justify-content-center">
                        {/* logo */}
                        <div className="col-md-6 mx-auto">
                          <div className="d-flex align-items-center justify-content-center">
                            <img
                              src={`./images/${element?.ManufacturerName__c}.png`}
                              // src={}
                              alt={element?.ManufacturerName__c}
                              width={"80%"}
                              height={"80%"}
                              // className="p-1"
                            />
                          </div>
                        </div>
                        {/* accounts */}
                        <div
                          style={{ minHeight: "60px", flex: "1 1 auto" }}
                          className="col-md-6 d-flex align-items-center justify-content-center transition "
                        >
                          <button
                            className="btn fw-bold "
                            key={element.Id}
                            onClick={(e) =>
                              redirectToProductPage(
                                e,
                                element?.ManufacturerName__c,
                                location.state.acc_name
                              )
                            }
                          >
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
          <div className="bottom mt-5">
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
