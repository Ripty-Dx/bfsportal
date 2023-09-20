import React, { useEffect, useRef, useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import "./OrderList.css";
import { useOrderList } from "../api/useOrderList";
import { useManufactureData } from "../api/useManufactureData";
import Accordion from "react-bootstrap/Accordion";

const OrderList = () => {
  const [manufacturerFilter, setManufacturerFilter] = useState(null);
  const inputRef = useRef();
  const manufacturerData = useManufactureData()?.data?.records || [];
  const orderListData = useOrderList()?.data || [];
  console.log(orderListData);
  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
  //  set for order accounts
  const orderAccounts = new Set();
  orderListData.map((ele) => orderAccounts.add(ele.Name));

  console.log(orderAccounts);
  const handleSearch = (e) => {
    const value = e.target.value?.toLowerCase();
    // const filteredData = brandListData.filter((account) =>
    //   account?.Name?.toLowerCase().includes(value)
    // );
    // setBrandListWithSorting(filteredData);
  };
  const resetButton = (e) => {
    setManufacturerFilter(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedMonth(months[date.getMonth()]);
  };
  const handleManufacturedData = (ele) => {
    setManufacturerFilter(ele);
    // const filteredData = brandListData.filter(
    //   (account) =>
    //     account.data.filter(
    //       (brand) => !brand.ManufacturerName__c.localeCompare(ele.Name)
    //     ).length > 0
    // );
    // setBrandListWithSorting(filteredData);
  };
  const handleMonth = (ele) => {
    setSelectedMonth(ele);
  };
  return (
    <>
      <Header1 />
      <div
        style={{
          backgroundColor: "rgb(250,250,250)",
          minHeight: "60vh",
          overflow: "hidden",
        }}
        className="pb-5"
      >
        {/* heading and filters */}
        <div className="row d-flex align-items-center justify-content-md-center">
          {/* Order list heading */}
          <div className="col-lg-5  p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2">
            <h2 className="fw-bold fw-md-normal  ms-5">
              <BiLeftArrowAlt
                className="back_icon me-2"
                onClick={() => (window.location.href = "/dashboard")}
              />{" "}
              Order List
            </h2>
          </div>
          {/* month drop down */}
          <div className=" col-md-auto p-md-0  p-lg-2 dropdown" id="month">
            <button
              type="button"
              className="btn btn-light dropdown-toggle shadow-sm bg-white px-3 position-relative"
              data-bs-toggle="dropdown"
              style={{ border: "1.5px solid rgb(184,184,184)" }}
            >
              {selectedMonth}
            </button>
            <div className="position-absolute monthBadge">Months</div>
            <ul className="dropdown-menu">
              {months?.map((ele, index) => (
                <>
                  <li key={index}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMonth(ele)}
                    >
                      {ele}
                    </button>
                  </li>
                </>
              ))}
            </ul>
          </div>
          {/* manufactured by dropdown button */}
          <div
            className=" col-md-auto p-md-0  p-lg-2 dropdown"
            id="manufacturer"
          >
            <button
              type="button"
              className="btn btn-light dropdown-toggle shadow-sm bg-white"
              data-bs-toggle="dropdown"
              style={{ border: "1.5px solid rgb(184,184,184)" }}
            >
              {manufacturerFilter?.Name || "Manufactured By"}
            </button>
            <ul className="dropdown-menu">
              {manufacturerData?.map((ele, index) => (
                <>
                  <li key={index}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleManufacturedData(ele)}
                    >
                      {ele.Name}
                    </button>
                  </li>
                </>
              ))}
            </ul>
          </div>
          {/* search button */}
          <div className="col-lg-2  col-md-2">
            <form id="">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                ref={inputRef}
                onChange={handleSearch}
                style={{ border: "1.5px solid rgb(184,184,184)" }}
              />
            </form>
          </div>
          {/* reset button */}
          <div className=" col-lg-1 col-md-1 ">
            <button className="Button" onClick={resetButton}>
              Reset
            </button>
          </div>
        </div>
        {/* list display */}
        <div className="row mx-3 bg-white rounded-4 p-4 table-responsive position-relative">
          <table
            className="table table-striped overflow-scroll"
            style={{ minHeight: "60vh" }}
          >
            {/* table heading */}
            <thead>
              <tr className="sticky-top ">
                <th>S.No</th>
                <th>PO Number</th>
                <th>Manufacturer</th>
                <th>Order Type</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            {orderListData?.length === 0 ? (
              <>
                <tbody>
                  <div
                    className="position-absolute"
                    style={{ top: "50%", left: "50%" }}
                  >
                    Data not found
                  </div>
                </tbody>
              </>
            ) : (
              <>
                <tbody>
                  <Accordion defaultActiveKey="0">
                    {[...orderAccounts].map((ele, index) => {
                      return (
                        <>
                          <tr>
                            <td colSpan="6">
                              <Accordion.Item eventKey={index}>
                                <Accordion.Header>{ele}</Accordion.Header>
                                <Accordion.Body>
                                  {orderListData?.map((ele, index) => {
                                    console.log("orderListData", orderListData);
                                    return (
                                      <>
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>{ele.PO_Number__c}</td>
                                          <td>{ele.ManufacturerName__c}</td>
                                          <td>{ele.Type}</td>
                                          <td>{ele.Amount}</td>
                                          <td>{ele.CloseDate}</td>
                                          <td>
                                            <button className="Button">
                                              View
                                            </button>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </Accordion.Body>
                              </Accordion.Item>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </Accordion>
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderList;
