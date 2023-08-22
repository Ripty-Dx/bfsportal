import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import { RiInformationFill } from "react-icons/ri";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productApiData, setProductApiData] = useState([]);
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  // console.log("apidata",apiData.current);
  const searchButton = (e) => {};
  const redirectToAccountManufacturers = (e, name) => {
    e.preventDefault();
    navigate("/account-manufacturers", {
      state: {
        acc_name: name,
      },
    });
  };
  const accountId = apiData.current.second.filter(
    (ele) => ele.Name === location.state.AccountName
  );
  // console.log(accountId[0].Id);
  const manufacturerId = accountId[0].data.filter(
    (ele) => ele.ManufacturerName__c === location.state.ProductName
  );
  // console.log(manufacturerId[0].ManufacturerId__c );
  const fetchProductData = () => {
    fetch("https://dev.beautyfashionsales.com/beauty/HSc6cv4", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Manufacturer: `${manufacturerId[0].ManufacturerId__c}`,
        AccountId__c: `${accountId[0].Id}`,
        Sales_Rep__c: `${apiData.current.data.user.Sales_Rep__c}`,
        key: `${apiData?.current.data.api.access_token}`,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 400) {
          console.log("bad request");
          // window.localStorage.clear();
          // window.location.href=("/");
        } else if (result.status === 200) {
          setProductApiData(result);
          console.log("result", result);
        } else {
          console.log("NO result", result);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <>
      {/* {console.log(("productApiData", typeof productApiData.data?.status))} */}
      {/* {console.log(("productApiData", productApiData.data?.name))} */}
      {/* {console.log(("productApiData", productApiData))} */}
      {localStorage.getItem("User name") ? (
        <>
          <Header1 />
          <div className="container-fluid" style={{ minHeight: "55vh" }}>
            <div className="row d-flex align-items-center justify-content-md-between">
              {/* Your account heading */}
              <div className="col-5 d-flex flex-direction-column justify-content-center align-items-center col-md-auto py-md-1  mx-md-auto m-sm-2">
                <h3 className="fw-bold   fw-md-normal ">
                  <BiLeftArrowAlt
                    className="back_icon me-2"
                    onClick={(e) =>
                      redirectToAccountManufacturers(
                        e,
                        location.state.AccountName
                      )
                    }
                  />{" "}
                  {location.state.ProductName.toUpperCase()}
                </h3>
                <h5 className="fw-bolder">
                  &nbsp;-&nbsp;Account&nbsp;: &nbsp;
                </h5>
                <h5>{location.state.AccountName}</h5>
              </div>
              {/* Download Order From */}
              <div className="col-2 d-flex justify-content-center align-items-center">
                <button className="btn text-white bg-darkGrey">
                  Download Order From
                </button>
              </div>
              {/* Upload Order From */}
              <div className="col-2 d-flex justify-content-center align-items-center">
                <button className="btn text-white bg-darkGrey">
                  Upload Order From
                </button>
              </div>
              {/* Search button */}
              <div className=" col-2 col-md-2  p-lg-2 m-xs-5">
                <form id="searchForm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    onInput={searchButton}
                    id="searchButton"
                  />
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-3 ">
                <div className="rounded-2 p-2 ps-3 text-white bg-darkGrey d-flex align-items-center justify-content-start">
                  <RiInformationFill className="me-2" size={24} />
                  Minimum Order Amount : $0
                </div>
                <div className=" mt-2 rounded-2 p-2 ps-3 text-white bg-darkGrey d-flex  align-items-center justify-content-start">
                  <RiInformationFill className="me-2" size={24} />
                  Discount Offer : 50%
                </div>
                {/* sort by radio button */}
                <div className="mt-3">
                  <div className=" accordion" id="sortType">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                        >
                          <span className="fw-bold">Sort By:</span> &nbsp;
                          Relevance
                        </button>
                      </h2>
                      <hr className="p-0 m-0"></hr>

                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#sortType"
                      >
                        {" "}
                        <div className="accordion-body">
                          <div className="p-0 m-0">
                            <input
                              className=""
                              type="radio"
                              name="sortBy"
                              id="relevance"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="relevance"
                            >
                              Relevance
                            </label>
                          </div>
                          <div>
                            <input
                              className=""
                              type="radio"
                              name="sortBy"
                              id="priceHighToLow"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="priceHighToLow"
                            >
                              Price: High To Low
                            </label>
                          </div>{" "}
                          <div>
                            <input
                              className=""
                              type="radio"
                              name="sortBy"
                              id="priceLowToHigh"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="priceLowToHigh"
                            >
                              Price: Low To High
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* filters */}
                <div className="mt-3 bg-white rounded-2 p-2">
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <p className="fw-bold">Filter</p>
                    <button className="btn fs-6 text-white bg-darkGrey m-0">
                      Reset
                    </button>
                  </div>
                  <hr className="p-0 m-0"></hr>
                  <div className=" mt-1 accordion" id="productType">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                        >
                          <span className="fw-bold">Product Type</span>
                        </button>
                      </h2>
                      <hr className="p-0 m-0"></hr>

                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#productType"
                      >
                        {" "}
                        <div className="accordion-body">
                          <div className="p-0 m-0">
                            <input
                              className=""
                              type="radio"
                              name="product"
                              id="WholeSale"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="WholeSale"
                            >
                              WholeSale
                            </label>
                          </div>
                          <div>
                            <input
                              className=""
                              type="radio"
                              name="product"
                              id="Pre-Order"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="Pre-Order"
                            >
                              Pre-Order
                            </label>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-1 accordion" id="categoryType">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                        >
                          <span className="fw-bold">Category</span>
                        </button>
                      </h2>
                      <hr className="p-0 m-0"></hr>

                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#categoryType"
                      >
                        {" "}
                        <div className="accordion-body">
                          <div className="d-flex justify-content-start align-items-center">
                            <input
                              className=""
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="flexCheckDefault"
                            >
                              Default checkbox
                            </label>
                          </div>
                          <div className="d-flex justify-content-start align-items-center">
                            <input
                              className=""
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              className="form-check-label ms-3"
                              htmlFor="flexCheckChecked"
                            >
                              checkbox
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Product Code</th>
                        <th scope="col">UPC</th>
                        <th scope="col">List Price</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col">Min Qty</th>
                        <th scope="col">Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark Mark MarkMark Mark Mark Mark</td>
                        <td>Mark Mark MarkMark Mark Mark Mark</td>
                        <td>@mdo</td> <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td> <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="fw-bold">
                    Total Number of Product Quality:{" "}
                    <span className="fw-normal">0</span>
                  </p>
                  <button className="btn text-white bg-darkGrey">
                    Generate Order
                  </button>
                </div>
              </div>
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

export default Product;
