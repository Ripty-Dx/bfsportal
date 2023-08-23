import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import { RiInformationFill } from "react-icons/ri";
import beautyProduct from "../images/BFS Portal Site.png"
const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productApiData, setProductApiData] = useState([]);
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  const categorySet = new Set(
    productApiData.data?.records.map((item) => item.Category__c)
  );
  if (categorySet.has("TESTER") || categorySet.has("Samples")) {
    // console.log("yes");
    categorySet.delete("TESTER");
    categorySet.delete("Samples");
    categorySet.add("TESTER");
    categorySet.add("Samples");
  }
  // console.log(categorySet);
  let categoryArray = [...categorySet];
  // console.log(categoryArray);
  // console.log(productApiData.data?.records.filter((item)=>(item.Category__c==="SERUM")))
  // console.log(productApiData?.discount?.MinOrderAmount==null?0:productApiData?.discount?.MinOrderAmount);
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
          window.localStorage.clear();
          window.location.href = "/";
        } else if (result.status === 200) {
          setProductApiData(result);
          console.log("result", result);
        } else {
          console.log("NO result", result);
        }
      })
      .catch((err) => console.log(err));
  };
  const productsInCategory = (categoryName) => {
    // console.log("filter");
    return productApiData.data?.records.filter(
      (item) => item.Category__c === categoryName
    );
  };

  // console.log(s[0].Name);
  useEffect(() => {
    fetchProductData();
    // productsInCategory(null)
  }, []);
  return (
    <>
      {/* {console.log(("productApiData", typeof productApiData.data?.status))} */}
      {/* {console.log(("productApiData", productApiData.data?.name))} */}
      {/* {console.log(("productApiData", productApiData))} */}
      {localStorage.getItem("User name") ? (
        <>
          {}
          {/* {console.log(productsInCategory(null))} */}
          <Header1 />
          <div
            className="container-fluid mb-2"
            style={{ minHeight: "55vh", backgroundColor: "#f2f2f2" }}
          >
            <div className="row d-flex align-items-center justify-content-md-between">
              {/* Your account heading */}
              <div className="col-auto p-0 d-flex flex-direction-column justify-content-center align-items-center col-md-auto   mx-md-auto m-sm-2">
                <h3 className="fw-bold fs-4  fw-md-normal ">
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
                <h5 className="fs-5">{location.state.AccountName}</h5>
              </div>
              {/* Download Order From */}
              <div className=" col-auto d-flex justify-content-center align-items-center">
                <button className="Button">Download Order From</button>
              </div>
              {/* Upload Order From */}
              <div className="col-auto  d-flex justify-content-center align-items-center">
                <button className="Button">Upload Order From</button>
              </div>
              {/* Search button */}
              <div className=" col-2 col-md-2  m-xs-5">
                <form id="searchForm">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Enter Product Name"
                    onInput={searchButton}
                    id="searchButton"
                  />
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-3 ">
                {/* Minimum Order Amount */}
                <div className="rounded-2 p-1  text-white bg-darkGrey d-flex align-items-center justify-content-start">
                  <RiInformationFill className="mx-2" size={24} />
                  <p className="p-1 minAmount">
                    Minimum Order Amount : $
                    {productApiData?.discount?.MinOrderAmount == null
                      ? 0
                      : productApiData?.discount?.MinOrderAmount}{" "}
                  </p>
                </div>
                {/* Discount Offer */}
                <div className=" mt-1 rounded-2 p-1 text-white bg-darkGrey d-flex  align-items-center justify-content-start">
                  <RiInformationFill className="mx-2" size={24} />
                  <p className="p-1 minAmount">
                    Discount Offer : {productApiData?.discount?.margin}%
                  </p>
                  {/* {                  console.log((productApiData?.discount?.margin))}              */}
                </div>
                {/* sort by radio button */}
                <div
                  className="mt-2 bg-white rounded-2 overflow-auto"
                  style={{ height: "12vh" }}
                >
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
                <div
                  className="mt-2 bg-white rounded-2 p-2 overflow-auto"
                  style={{ height: "28vh" }}
                >
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <h5 className="fw-bold fs-6">Filter</h5>
                    <button className="Button">Reset</button>
                  </div>
                  {/* Product Type */}
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
                  {/* Category Type */}
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
                          {/* {console.log(productApiData.data?.records)} */}
                          {categoryArray?.map((ele) => {
                            return (
                              <div className="d-flex justify-content-start align-items-center">
                                <input
                                  className=""
                                  type="checkbox"
                                  value={ele}
                                  id={ele}
                                  name="categoryType"
                                  key={ele}
                                />
                                <label
                                  className="form-check-label ms-3"
                                  htmlFor={ele}
                                >
                                  {ele?.toUpperCase() || "NO CATEGORY"}
                                </label>
                                {/* {console.log(ele)} */}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9  ">
                <div className="bg-white p-1 rounded-3 ">
                  <div
                    className="table-responsive overflow-scroll"
                    style={{ height: "50vh" }}
                  >
                    <table
                      className="table table-striped overflow-scroll"
                      style={{ width: "80vw" }}
                    >
                      <thead>
                        {/* table heading */}
                        <tr className="sticky-top">
                          <th scope="col" style={{ width: "250px" }}>
                            Image
                          </th>
                          <th scope="col" style={{ width: "600px" }}>
                            Title
                          </th>
                          <th scope="col" style={{ width: "500px" }}>
                            Product Code
                          </th>
                          <th scope="col" style={{ width: "500px" }}>
                            UPC
                          </th>
                          <th scope="col" style={{ width: "400px" }}>
                            List Price
                          </th>
                          <th scope="col" style={{ width: "300px" }}>
                            Sale Price
                          </th>
                          <th scope="col" style={{ width: "400px" }}>
                            Min Qty
                          </th>
                          <th scope="col" style={{ width: "600px" }}>
                            Qty
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {categoryArray.map((ele) => {
                          return (
                            <>
                              <tr>
                                <td
                                  colSpan="8"
                                  style={{ textAlign: "left" }}
                                  className="p-0 ps-2"
                                >
                                  <div
                                    className="  accordion"
                                    id="tableAccordion"
                                  >
                                    <div className="accordion-item">
                                      <h2 className="accordion-header p-0">
                                        <button
                                          className="accordion-button"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#tableRows${ele}`}
                                        >
                                          <span className="p-0">
                                            {ele?.toUpperCase() ||
                                              "NO CATEGORY"}
                                          </span>
                                        </button>
                                      </h2>

                                      <div
                                        id={`tableRows${ele}`}
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#tableAccordion"
                                      >
                                        {" "}
                                        <div className="accordion-body">
                                          <div className="table-responsive ">
                                            <table className="table table-striped">
                                              <tbody>
                                                {productsInCategory(ele).map(
                                                  (item) => {
                                                    return (
                                                      <>
                                                        <tr>
                                                          <td
                                                            style={{
                                                              width: "200px",
                                                            }}
                                                            className="p-0 ps-2"
                                                          >
                                                            <img
                                                              src={beautyProduct} height={"30px"} width={"30px"}
                                                              alt="img"
                                                              className="rounded-5 border-2 mt-1"
                                                            ></img>
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "700px",
                                                            }}
                                                            className="fs-small"
                                                          >
                                                            {item.Name}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "400px",
                                                            }}
                                                            className="fs-small"
                                                          >
                                                            {item.ProductCode}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "400px",
                                                            }}
                                                            className="fs-small"
                                                          >
                                                            {item.ProductUPC__c}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "400px",
                                                            }}
                                                            className="fs-small"
                                                          >
                                                            {item.usdRetail__c}
                                                          </td>
                                                          {/* *+item.usdRetail__c.substring(1) */}
                                                          <td
                                                            style={{
                                                              width: "350px",
                                                            }}
                                                            className="fs-small"
                                                          >
                                                            $
                                                            {(
                                                              +item.usdRetail__c.substring(
                                                                1
                                                              ) -
                                                              (productApiData
                                                                ?.discount
                                                                ?.margin /
                                                                100) *
                                                                +item.usdRetail__c.substring(
                                                                  1
                                                                )
                                                            ).toFixed(2)}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "600px",
                                                            }}
                                                            className="fs-small"
                                                          >
                                                            {
                                                              item.Min_Order_QTY__c
                                                            }
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "400px",
                                                            }}
                                                          >
                                                            <div className="bg-white rounded-3 p-1 d-flex justify-content-center align-items-center">
                                                              <button className="Button">
                                                                -
                                                              </button>
                                                              <p>0</p>
                                                              <button className="Button">
                                                                +
                                                              </button>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Total Number of Product Quality:{" "} */}
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
          <div className="bottom">
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
