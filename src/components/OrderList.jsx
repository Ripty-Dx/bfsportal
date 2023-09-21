import React, { useEffect, useRef, useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import "./OrderList.css";
import "./Product.css";
import { useOrderList } from "../api/useOrderList";
import { useManufactureData } from "../api/useManufactureData";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import { GetOrderDetails } from "../api/useOrderDetails";
import classNames from "classnames";
const order = {
  status: 200,
  data: [
    {
      attributes: {
        type: "Opportunity",
        url: "/services/data/v56.0/sobjects/Opportunity/006Rb000001EdfFIAS",
      },
      Id: "006Rb000001EdfFIAS",
      AccountId: "0013b0000249nSbAAI",
      Name: "DesignersX Test Account",
      ManufacturerId__c: "a0O3b00000pY2vqEAC",
      Synced_Status__c: "1",
      Shipping_City__c: null,
      Shipping_Country__c: null,
      Shipping_method__c: null,
      Shipping_State__c: null,
      Shipping_Street__c: null,
      Shipping_Zip__c: null,
      Shipping_Account_Number__c: null,
      Type: "Wholesale Numbers",
      Season__c: "Wholesale Order",
      Account_Owner_FirstName__c: "Harsh",
      PO_Number__c: "DT092123RE003",
      Description: null,
      Amount: 300,
      CreatedDate: "2023-09-21T05:54:49.000+0000",
      CloseDate: "2023-09-21",
      ManufacturerName__c: "ReVive",
      AccountName: "DesignersX Test Account",
    },
    {
      attributes: {
        type: "Opportunity",
        url: "/services/data/v56.0/sobjects/Opportunity/006Rb000001EeJZIA0",
      },
      Id: "006Rb000001EeJZIA0",
      AccountId: "0013b000025Eq3XAAS",
      Name: "DSX Test Account",
      ManufacturerId__c: "a0O3b00000pY2vqEAC",
      Synced_Status__c: "1",
      Shipping_City__c: null,
      Shipping_Country__c: null,
      Shipping_method__c: null,
      Shipping_State__c: null,
      Shipping_Street__c: null,
      Shipping_Zip__c: null,
      Shipping_Account_Number__c: null,
      Type: "Wholesale Numbers",
      Season__c: "Wholesale Order",
      Account_Owner_FirstName__c: "Harsh",
      PO_Number__c: "DT092123RE004",
      Description: null,
      Amount: 192.5,
      CreatedDate: "2023-09-21T06:05:53.000+0000",
      CloseDate: "2023-09-21",
      ManufacturerName__c: "ReVive",
      AccountName: "DSX Test Account",
    },
  ],
};
const OrderList = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const [manufacturerFilter, setManufacturerFilter] = useState(null);
  const inputRef = useRef();
  const manufacturerData = useManufactureData()?.data?.records || [];
  const orderListData = useOrderList()?.data || [];
  console.log(orderListData);
  const date = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
  //  set for order accounts
  const orderAccounts = new Set();
  orderListData.map((ele) => orderAccounts.add(ele.Name));

  // console.log(orderAccounts);
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
  const handleViewOrder = (ele) => {
    navigate("/orderDetail", {
      state: {
        Opportunity_id: ele.Id,
      },
    });
  };
  return (
    <>
      <Header1 />
      <div style={{ backgroundColor: "rgb(250,250,250)", minHeight: "60vh", overflow: "hidden" }} className="pb-5">
        {/* heading and filters */}
        <div className="row d-flex align-items-center justify-content-md-center">
          {/* Order list heading */}
          <div className="col-lg-5  p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2">
            <h2 className="fw-bold fw-md-normal  ms-5">
              <BiLeftArrowAlt className="back_icon me-2" onClick={() => (window.location.href = "/dashboard")} /> Order List
            </h2>
          </div>
          {/* month drop down */}
          <div className=" col-md-auto p-md-0  p-lg-2 dropdown" id="month">
            <button type="button" className="btn btn-light dropdown-toggle shadow-sm bg-white px-3 position-relative" data-bs-toggle="dropdown" style={{ border: "1.5px solid rgb(184,184,184)" }}>
              {selectedMonth}
            </button>
            <div className="position-absolute monthBadge">Months</div>
            <ul className="dropdown-menu">
              {months?.map((ele, index) => (
                <>
                  <li key={index}>
                    <button className="dropdown-item" onClick={() => handleMonth(ele)}>
                      {ele}
                    </button>
                  </li>
                </>
              ))}
            </ul>
          </div>
          {/* manufactured by dropdown button */}
          <div className=" col-md-auto p-md-0  p-lg-2 dropdown" id="manufacturer">
            <button type="button" className="btn btn-light dropdown-toggle shadow-sm bg-white" data-bs-toggle="dropdown" style={{ border: "1.5px solid rgb(184,184,184)" }}>
              {manufacturerFilter?.Name || "Manufactured By"}
            </button>
            <ul className="dropdown-menu">
              {manufacturerData?.map((ele, index) => (
                <>
                  <li key={index}>
                    <button className="dropdown-item" onClick={() => handleManufacturedData(ele)}>
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
              <input type="text" className="form-control" placeholder="Search By Account" ref={inputRef} onChange={handleSearch} style={{ border: "1.5px solid rgb(184,184,184)" }} />
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
        <div></div>
        <div className="row mx-3 bg-white rounded-4 p-4 table-responsive position-relative">
          <table className="table  overflow-scroll">
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
                  <div className="position-absolute" style={{ top: "50%", left: "50%" }}>
                    Data not found
                  </div>
                </tbody>
              </>
            ) : (
              <>
                <tbody>
                  {[...orderAccounts].map((ele, index) => {
                    return (
                      <>
                        <div style={{ height: "10px" }}>&nbsp;</div>
                        <tr>
                          <td colSpan="6" className="p-0">
                            <div className="accordion" id="tableAccordion">
                              <div className="accordion-item">
                                <hr className="p-0 m-0"></hr>
                                <h2 className="accordion-header p-1 shadow-sm" style={{ backgroundColor: "rgb(248,250,251,1)" }}>
                                  <button className={`accordion-button ${index === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#tableRows${index}`} data-bs-parent="#tableAccordion" >
                                    <span className="">{ele}</span>
                                  </button>
                                </h2>
                                <hr className="p-0 m-0"></hr>
                                <div id={`tableRows${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""} `} data-bs-parent="#tableAccordion">
                                  <div className="accordion-body ms-3" id="innerTable">
                                    <div className="table-responsive ">
                                      <table className="table ">
                                        <tbody>s
                                          {orderListData?.map((element, index) => {
                                            console.log("orderListData", orderListData);
                                            return (
                                              <>
                                                <div style={{ height: "10px" }}>&nbsp;</div>
                                                <tr key={index} style={{ border: "1px solid #f1f1f1" }} className="shadow-sm ms-5">
                                                  <td style={{ width: "7em", backgroundColor: "rgb(248,250,251,1)" }}>{index + 1}</td>
                                                  <td style={{ width: "15.5em", backgroundColor: "rgb(248,250,251,1)" }}>{element.PO_Number__c}</td>
                                                  <td style={{ width: "13rem", backgroundColor: "rgb(248,250,251,1)" }}>{element.ManufacturerName__c}</td>
                                                  <td style={{ width: "16em", backgroundColor: "rgb(248,250,251,1)" }}>{element.Type}</td>
                                                  <td style={{ width: "13em", backgroundColor: "rgb(248,250,251,1)" }}>{element.Amount}</td>
                                                  <td style={{ width: "8em", backgroundColor: "rgb(248,250,251,1)" }}>{element.CloseDate}</td>
                                                  <td style={{ backgroundColor: "rgb(248,250,251,1)" }}>
                                                    <button className="Button" onClick={() => handleViewOrder(element)}>
                                                      View
                                                    </button>
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
