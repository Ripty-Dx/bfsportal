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
      ManufacturerName__c: "Eve Lom",
      AccountName: "DSX Test Account",
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
      CloseDate: "2023-01-1",
      ManufacturerName__c: "ReVive",
      AccountName: "DSX Test Account",
    },
  ],
};
const OrderList = () => {
  const navigate = useNavigate();
  const originalOrderListData = order?.data || [];
  const [orderListData, setOrderListData] = useState(originalOrderListData || []);
  //  set for order accounts
  const originalOrderAccounts = new Set(originalOrderListData.map((ele) => ele.Name));
  const [orderAccounts, setOrderAccounts] = useState([...originalOrderAccounts]);
  const [manufacturerFilter, setManufacturerFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);
  const [monthFilter, setMonthFilter] = useState(false);
  const inputRef = useRef();
  const manufacturerData = useManufactureData()?.data?.records || [];
  // const orderListData = useOrderList()?.data || [];
  // const date = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const dateFormat = (elementDate) => {
    const month = months[elementDate.substring(5, 7) - 1];
    return `${elementDate.substring(8, 10)} ${month} ${elementDate.substring(0, 4)}`;
  };
  useEffect(() => {
    let filteredOrderData = originalOrderListData;
    let filteredAccounts = [...originalOrderAccounts];
    if (manufacturerFilter) {
      console.log("manu filter");
      filteredOrderData = originalOrderListData.filter((element) => !element.ManufacturerName__c.localeCompare(manufacturerFilter.Name));
      // console.log(filteredOrderData);
      filteredAccounts = new Set(filteredOrderData.map((ele) => ele.AccountName));
    }
    if (monthFilter) {
      console.log("month filter");
      filteredOrderData = filteredOrderData.filter((element) => Number(element.CloseDate.substring(5, 7)) === months.indexOf(monthFilter) + 1);
      filteredAccounts = new Set(filteredOrderData.map((ele) => ele.AccountName));
    }
    if (searchFilter) {
      console.log("search filter");
      const value = searchFilter?.target?.value?.toLowerCase();
      console.log(filteredAccounts);
      filteredAccounts = [...filteredAccounts].filter((ele) => ele.toLowerCase().includes(value));
      // console.log(filteredAccounts);
      // setOrderAccounts([...filteredAccounts]);
    }
    setOrderListData(filteredOrderData);
    setOrderAccounts([...filteredAccounts]);
    // setOrderListData(filteredOrderData);
    // console.log(filteredAccounts);

    // setOrderAccounts([...filteredAccounts]);
  }, [manufacturerFilter, searchFilter, monthFilter]);
  useEffect(() => {}, []);

  const handleSearch = (e) => {
    setSearchFilter(e);
    // const value = e.target.value?.toLowerCase();
    // const filteredAccounts = [...originalOrderAccounts].filter((ele) => ele.toLowerCase().includes(value));
    // return filteredAccounts;
    // setOrderAccounts(filteredAccounts);
  };
  const resetButton = (e) => {
    setManufacturerFilter(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedMonth(false);
    setOrderListData(originalOrderListData);
    setOrderAccounts(originalOrderAccounts);
    console.log(originalOrderListData);
  };
  const handleManufacturedData = (manufacturer) => {
    setManufacturerFilter(manufacturer);
    // const filteredOrderData = originalOrderListData.filter((element) => !element.ManufacturerName__c.localeCompare(manufacturer.Name));
    // setOrderListData(filteredOrderData);
    // const filteredAccounts = new Set(filteredOrderData.map((ele) => ele.AccountName));
    // console.log({ filteredOrderData, filteredAccounts });
    // return { filteredOrderData, filteredAccounts };
    // setOrderAccounts(filteredAccounts);
  };
  const handleMonth = (ele) => {
    setSelectedMonth(ele);
    // const filteredOrderData = originalOrderListData.filter((element) => Number(element.CloseDate.substring(5, 7)) === months.indexOf(ele) + 1);
    // const filteredAccounts = new Set(filteredOrderData.map((ele) => ele.AccountName));
    setMonthFilter(ele);
    // console.log("month");
    // return { filteredOrderData, filteredAccounts };
    // setOrderListData(filteredMonthData);
    // setOrderAccounts(filteredAccounts);
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
      <div style={{ backgroundColor: "rgb(250,250,250)", minHeight: "100vh", overflow: "hidden" }} className="pb-5">
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
              {selectedMonth || "Select Month"}
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
              {/* {console.log(manufacturerFilter)} */}
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
            {orderListData?.length === 0 || [...orderAccounts].length === 0 ? (
              <>
                <tbody>
                  <div className="position-absolute" style={{ top: "66%", left: "50%" }}>
                    Data not found
                  </div>
                </tbody>
              </>
            ) : (
              <>
                <tbody className="accordion" id="tableAccordion">
                  {[...orderAccounts].map((ele, index) => {
                    return (
                      <>
                        <div style={{ height: "10px" }}>&nbsp;</div>
                        <tr>
                          <td colSpan="6" className="p-0">
                            <div className="accordion-item">
                              <hr className="p-0 m-0"></hr>
                              <h2 className="accordion-header p-1 shadow-sm" style={{ backgroundColor: "rgb(248,250,251,1)" }}>
                                <button
                                  className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#tableRows${index}`}
                                  data-bs-parent="#tableAccordion"
                                >
                                  <span className="">{ele}</span>
                                </button>
                              </h2>
                              <hr className="p-0 m-0"></hr>
                              <div id={`tableRows${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""} `} data-bs-parent="#tableAccordion">
                                <div className="accordion-body ms-4" id="innerTable">
                                  <div className="table-responsive ">
                                    <table className="table ">
                                      <tbody>
                                        {/* {console.log(orderListData.filter((item) => item.Name.localeCompare(ele)))} */}
                                        {orderListData
                                          ?.filter((item) => !item.AccountName.localeCompare(ele))
                                          .map((element, index) => {
                                            // console.log("orderListData", orderListData);
                                            return (
                                              <>
                                                <div style={{ height: "10px" }}>&nbsp;</div>
                                                <tr key={index} style={{ border: "1px solid #f1f1f1" }} className="shadow-sm ms-5">
                                                  <td style={{ width: "5.5em", backgroundColor: "rgb(248,250,251,1)" }}>{index + 1}</td>
                                                  <td style={{ width: "15.5em", backgroundColor: "rgb(248,250,251,1)" }}>{element.PO_Number__c}</td>
                                                  <td style={{ width: "13.5rem", backgroundColor: "rgb(248,250,251,1)" }}>{element.ManufacturerName__c}</td>
                                                  <td style={{ width: "17em", backgroundColor: "rgb(248,250,251,1)" }}>{element.Type}</td>
                                                  <td style={{ width: "13em", backgroundColor: "rgb(248,250,251,1)" }}>{element.Amount}</td>
                                                  <td style={{ width: "10em", backgroundColor: "rgb(248,250,251,1)" }}>{dateFormat(element.CloseDate)}</td>
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
