import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiInformationFill } from "react-icons/ri";
import beautyProduct from "../images/BFS Portal Site.png";
const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productPageState, setProductPageState] = useState({
    sortBy: "Relevance",
    productType: "WholeSale",
    categoryType: [],
  });
  console.log("State",productPageState.categoryType);
  const [productApiData, setProductApiData] = useState([]);
  const apiData = useRef(JSON.parse(localStorage.getItem("Api Data")));
  const [categoryArray, setCategoryArray] = useState([]);
  const [allCategoriesForDisplay, setAllCategoriesForDisplay] = useState([]);
  const resetButton = (e) => {
    e.preventDefault();
    // setProductPageState((prev) => ({
    //   sortBy: "Relevance",
    //   productType: "WholeSale",
    //   categoryType: [],
    // }));
  };
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
          categorySetting(result);
          // console.log("result", result);
        } else {
          console.log("NO result", result);
        }
      })
      .catch((err) => console.log(err));
  };
  // console.log(productApiData.data?.records.filter((item)=>(item.Category__c==="SERUM")))
  // console.log(productApiData?.discount?.MinOrderAmount==null?0:productApiData?.discount?.MinOrderAmount);
  const sortByInputValue = (e) => {
    setProductPageState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(productPageState);
  };
  const sortByProductType = (e) => {
    setProductPageState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(productPageState);
  };
  // const [categoryCheckedBoxArray, setCategoryCheckedBoxArray] = useState([]);
  // console.log("categoryCheckedBoxArray", categoryCheckedBoxArray);

  const sortByCategoryType = (e) => {
    // console.log(e);
    if (e.target.checked) {
      console.log(typeof e.target.value);
      setProductPageState((prev) => ({
        ...prev,
        [e.target.name]: [...productPageState.categoryType, e.target.value],
      }));
    } else {
      setProductPageState((prev) => ({
        ...prev,
        [e.target.name]: productPageState.categoryType.filter(
          (ele) => ele !== e.target.value
        ),
      }));
    }
    // setcategoryCheckedBoxArray = [...productPageState.categoryType];
    // console.log("categoryCheckedBoxArray", categoryCheckedBoxArray);
    console.log(productPageState);
    // categoryCheckedBoxArray?.push(e.target.value);
  };
 
  const productsInCategory = (categoryName) => {
    // console.log("filter");
    if (productPageState.sortBy === "Price: Low To High") {
      let sortedRecords = [...productApiData.data?.records];
      sortedRecords.sort((a, b) => {
        if (a.usdRetail__c.includes("$") && b.usdRetail__c.includes("$")) {
          return +a.usdRetail__c.substring(1) - +b.usdRetail__c.substring(1);
        } else {
          if (!a.usdRetail__c.includes("$")) {
            return a.usdRetail__c - +b.usdRetail__c.substring(1);
          } else if (!b.usdRetail__c.includes("$")) {
            return +a.usdRetail__c.substring(1) - b.usdRetail__c;
          } else {
            return a.usdRetail__c - b.usdRetail__c;
          }
        }
      });
      // console.log(sortedRecords);
      return sortedRecords.filter((item) => item.Category__c === categoryName);
    } else if (productPageState.sortBy === "Price: High To Low") {
      let sortedRecords = [...productApiData.data?.records];
      sortedRecords.sort((a, b) => {
        if (a.usdRetail__c.includes("$") && b.usdRetail__c.includes("$")) {
          return +b.usdRetail__c.substring(1) - +a.usdRetail__c.substring(1);
        } else {
          if (!b.usdRetail__c.includes("$")) {
            return b.usdRetail__c - +a.usdRetail__c.substring(1);
          } else if (!a.usdRetail__c.includes("$")) {
            return +b.usdRetail__c.substring(1) - a.usdRetail__c;
          } else {
            return b.usdRetail__c - a.usdRetail__c;
          }
        }
      });
      // console.log(sortedRecords);
      return sortedRecords.filter((item) => item.Category__c === categoryName);
    } else {
      return productApiData.data?.records.filter(
        (item) => item.Category__c === categoryName
      );
    }
  };
  let categorySet;
  const categorySetting = (result = []) => {
    console.warn({ result, productApiData });
    // console.log("category setting");
    // console.log("product API Data", productApiData.data?.records);
    categorySet =
      result.length > 0
        ? result
        : new Set(productApiData.data?.records.map((item) => item.Category__c));
    if (categorySet.has("TESTER") || categorySet.has("Samples")) {
      categorySet.delete("TESTER");
      categorySet.delete("Samples");
      categorySet.add("TESTER");
      categorySet.add("Samples");
    }
    if (productPageState.productType === "WholeSale"){
    //  if( categorySet.has(null)){console.log("WholeSale_category",categorySet);}
      categorySet.delete("PREORDER");
      setProductPageState((prev) => ({
        ...prev,
        "categoryType": [...categorySet],
      }));
    }
    else if (productPageState.productType === "Pre-Order") {
      if (categorySet.has("PREORDER")) {
        categorySet.clear();
        categorySet.add("PREORDER");
        setProductPageState((prev) => ({
          ...prev,
          "categoryType": ["PREORDER"],
        }));
      }
      else{
        categorySet.clear();
      }
    } else {
      console.log("no product type selected");
    }
    console.log("categorySet", categorySet);
    setCategoryArray([...categorySet]);
    setAllCategoriesForDisplay([...categorySet]);
    console.log("categoryArray", categoryArray);

    return categorySet;
  };
  // console.log(productApiData.data?.records);
  useEffect(() => {
    fetchProductData();
    // categorySetting();
    // productsInCategory(null)
  }, [categoryArray]);
// }, []);

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
                <div className=" mt-2 rounded-2 p-1 text-white bg-darkGrey d-flex  align-items-center justify-content-start">
                  <RiInformationFill className="mx-2" size={24} />
                  <p className="p-1 minAmount">
                    Discount Offer : {productApiData?.discount?.margin}%
                  </p>
                  {/* {                  console.log((productApiData?.discount?.margin))}              */}
                </div>
                {/* sort by radio button */}
                <div className="mt-3 bg-white rounded-2">
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
                          {productPageState.sortBy}
                          {/* {console.log(productPageState.sortBy)} */}
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
                              value="Relevance"
                              onChange={sortByInputValue}
                              checked={
                                productPageState.sortBy === "Relevance"
                                  ? true
                                  : false
                              }
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
                              value="Price: High To Low"
                              onChange={sortByInputValue}
                              checked={
                                productPageState.sortBy === "Price: High To Low"
                                  ? true
                                  : false
                              }
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
                              value="Price: Low To High"
                              onChange={sortByInputValue}
                              checked={
                                productPageState.sortBy === "Price: Low To High"
                                  ? true
                                  : false
                              }
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
                <div className="mt-2 bg-white rounded-2 p-2 ">
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <h5 className="fw-bold fs-6">Filter</h5>
                    <button className="Button" onClick={resetButton}>
                      Reset
                    </button>
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
                              name="productType"
                              id="WholeSale"
                              value="WholeSale"
                              checked={
                                productPageState.productType === "WholeSale"
                                  ? true
                                  : false
                              }
                              onChange={sortByProductType}
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
                              name="productType"
                              id="Pre-Order"
                              value="Pre-Order"
                              onChange={sortByProductType}
                              checked={
                                productPageState.productType === "Pre-Order"
                                  ? true
                                  : false
                              }
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
                  <div className=" mt-1 accordion " id="categoryType">
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
                        <div
                          className="accordion-body overflow-auto"
                          style={{ height: "25vh" }}
                        >
                          {/* {console.log(productApiData.data?.records)} */}
                          {allCategoriesForDisplay?.map((ele) => {
                            // console.log(ele, typeof ele);
                            return (
                              <div className="d-flex justify-content-start align-items-center">
                                <input
                                  className=""
                                  type="checkbox"
                                  value={ele}
                                  id={ele}
                                  name="categoryType"
                                  key={ele}
                                  onChange={sortByCategoryType}
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
                    className="table-responsive overflow-auto"
                    style={{ height: "70vh" }}
                  >
                    <table
                      className="table table-striped overflow-auto"
                      style={{ width: "70vw" }}
                    >
                      <thead>
                        {/* table heading */}
                        <tr className="sticky-top">
                          <th scope="col" style={{ width: "100px" }}>
                            Image
                          </th>
                          <th scope="col" style={{ width: "280px" }}>
                            Title
                          </th>
                          <th scope="col" style={{ width: "200px" }}>
                            Product Code
                          </th>
                          <th scope="col" style={{ width: "180px" }}>
                            UPC
                          </th>
                          <th scope="col" style={{ width: "130px" }}>
                            List Price
                          </th>
                          <th scope="col" style={{ width: "130px" }}>
                            Sale Price
                          </th>
                          <th scope="col" style={{ width: "200px" }}>
                            Min Qty
                          </th>
                          <th scope="col" style={{ width: "200px" }}>
                            Qty
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {categoryArray?.length ? (
                          <>
                            {" "}
                            {productPageState.categoryType.length
                              ? productPageState.categoryType.map((ele) => {
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
                                              <hr className="p-0 m-0"></hr>
                                              <div
                                                id={`tableRows${ele}`}
                                                className="accordion-collapse collapse show"
                                                data-bs-parent="#tableAccordion"
                                              >
                                                {" "}
                                                <div
                                                  className="accordion-body"
                                                  id="innerTable"
                                                >
                                                  <div className="table-responsive ">
                                                    <table className="table table-striped">
                                                      <tbody>
                                                        {productsInCategory(
                                                          ele
                                                        ).map((item) => {
                                                          // console.log(item)
                                                          // console.log("ele",ele)
                                                          return (
                                                            <>
                                                              <tr>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "100px",
                                                                  }}
                                                                  className="p-0 ps-2"
                                                                >
                                                                  <img
                                                                    src={
                                                                      beautyProduct
                                                                    }
                                                                    height={
                                                                      "30px"
                                                                    }
                                                                    width={
                                                                      "30px"
                                                                    }
                                                                    alt="img"
                                                                    className="rounded-5 border-2 mt-2"
                                                                  ></img>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "500px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {item.Name}
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {
                                                                    item.ProductCode
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {
                                                                    item.ProductUPC__c
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {item.usdRetail__c.includes(
                                                                    "$"
                                                                  )
                                                                    ? `$${(+item.usdRetail__c.substring(
                                                                        1
                                                                      )).toFixed(
                                                                        2
                                                                      )}`
                                                                    : `$${item.usdRetail__c}.00`}
                                                                </td>
                                                                {/* *+item.usdRetail__c.substring(1) */}
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  $
                                                                  {item.usdRetail__c.includes(
                                                                    "$"
                                                                  )
                                                                    ? (
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
                                                                      ).toFixed(
                                                                        2
                                                                      )
                                                                    : (
                                                                        +item.usdRetail__c -
                                                                        (productApiData
                                                                          ?.discount
                                                                          ?.margin /
                                                                          100) *
                                                                          +item.usdRetail__c
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {
                                                                    item.Min_Order_QTY__c
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                >
                                                                  <div className="order bg-white rounded-3 p-1 d-flex justify-content-center align-items-center gap-2">
                                                                    <button className="orderButton">
                                                                      <AiOutlineMinus />
                                                                    </button>
                                                                    <div className="orderDisplay" id="orderDisplay">
                                                                      
                                                                    </div>
                                                                    <button className="orderButton">
                                                                      <AiOutlinePlus className="" />
                                                                    </button>
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
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })
                              : categoryArray?.map((ele) => {
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
                                              <hr className="p-0 m-0"></hr>
                                              <div
                                                id={`tableRows${ele}`}
                                                className="accordion-collapse collapse show"
                                                data-bs-parent="#tableAccordion"
                                              >
                                                {" "}
                                                <div
                                                  className="accordion-body"
                                                  id="innerTable"
                                                >
                                                  <div className="table-responsive ">
                                                    <table className="table table-striped">
                                                      <tbody>
                                                        {productsInCategory(
                                                          ele
                                                        ).map((item) => {
                                                          return (
                                                            <>
                                                              <tr>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "100px",
                                                                  }}
                                                                  className="p-0 ps-2"
                                                                >
                                                                  <img
                                                                    src={
                                                                      beautyProduct
                                                                    }
                                                                    height={
                                                                      "30px"
                                                                    }
                                                                    width={
                                                                      "30px"
                                                                    }
                                                                    alt="img"
                                                                    className="rounded-5 border-2 mt-2"
                                                                  ></img>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "500px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {item.Name}
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {
                                                                    item.ProductCode
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {
                                                                    item.ProductUPC__c
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {item.usdRetail__c.includes(
                                                                    "$"
                                                                  )
                                                                    ? `$${(+item.usdRetail__c.substring(
                                                                        1
                                                                      )).toFixed(
                                                                        2
                                                                      )}`
                                                                    : `$${item.usdRetail__c}.00`}
                                                                </td>
                                                                {/* *+item.usdRetail__c.substring(1) */}
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  $
                                                                  {item.usdRetail__c.includes(
                                                                    "$"
                                                                  )
                                                                    ? (
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
                                                                      ).toFixed(
                                                                        2
                                                                      )
                                                                    : (
                                                                        +item.usdRetail__c -
                                                                        (productApiData
                                                                          ?.discount
                                                                          ?.margin /
                                                                          100) *
                                                                          +item.usdRetail__c
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                  className="fs-small"
                                                                >
                                                                  {
                                                                    item.Min_Order_QTY__c
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "200px",
                                                                  }}
                                                                >
                                                                  <div className="order bg-white rounded-3 p-1 d-flex justify-content-center align-items-center gap-2">
                                                                    <button className="orderButton">
                                                                      <AiOutlineMinus />
                                                                    </button>
                                                                    <div className="orderDisplay">
                                                                      0
                                                                    </div>
                                                                    <button className="orderButton">
                                                                      <AiOutlinePlus className="" />
                                                                    </button>
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
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                          </>
                        ) : (
                          <div className="container">
                            <div className="row">
                              <div className="d-flex justify-content-center align-items-center">
                                
                                <div className="loading"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Total Number of Product Quality:{" "} */}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="fw-bold">
                    Total Number of Product Quality:{" "}
                    <span className="fw-normal">0</span>
                  </p>
                  <button className="Button">Generate Order</button>
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
