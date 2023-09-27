import React, { useEffect, useRef, useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import "./OrderList.css";
import "./Product.css";
import { useOrderList } from "../api/useOrderList";
import { useManufactureData } from "../api/useManufactureData";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
const OrderList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const originalOrderListData = useOrderList()?.data || [];
  // console.log(originalOrderListData);
  // const originalOrderListData = order?.data || [];
  const [orderListData, setOrderListData] = useState(originalOrderListData || []);
  //  set for order accounts
  const originalOrderAccounts = new Set(originalOrderListData.map((ele) => ele.Name));
  const [orderAccounts, setOrderAccounts] = useState([...originalOrderAccounts]);
  const [manufacturerFilter, setManufacturerFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);
  const [monthFilter, setMonthFilter] = useState(false);
  const [reset, setReset] = useState(false);
  const inputRef = useRef();
  const manufacturerData = useManufactureData()?.data?.records || [];
  // const date = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const dateFormat = (elementDate) => {
    const month = months[elementDate.substring(5, 7) - 1];
    return `${elementDate.substring(8, 10)} ${month} ${elementDate.substring(0, 4)}`;
  };
  React.useEffect(()=>{
    setOrderListData(originalOrderListData)
  },[originalOrderListData])
  useEffect(() => {
    console.log(orderListData);
    setReset(false);
    let filteredOrderData = originalOrderListData;
    let filteredAccounts = [...originalOrderAccounts];
    if (manufacturerFilter) {
      console.log("manu filter");
      filteredOrderData = originalOrderListData.filter((element) => !element.ManufacturerName__c.localeCompare(manufacturerFilter.Name));
      filteredAccounts = new Set(filteredOrderData.map((ele) => ele?.AccountName));
    }
    if (monthFilter) {
      console.log("month filter");
      filteredOrderData = filteredOrderData.filter((element) => Number(element.CloseDate.substring(5, 7)) === months.indexOf(monthFilter) + 1);
      filteredAccounts = new Set(filteredOrderData.map((ele) => ele?.AccountName));
    }
    // console.log(filteredAccounts);

    if (searchFilter) {
      console.log("search filter");
      const value = searchFilter?.target?.value?.toLowerCase();
      console.log(value, filteredAccounts);
      filteredAccounts = [...filteredAccounts].filter((ele) => ele.toLowerCase().includes(value));
      console.log(filteredAccounts);
      // setOrderAccounts([...filteredAccounts]);
    }
    setOrderListData(filteredOrderData);
    setOrderAccounts([...filteredAccounts]);
  }, [manufacturerFilter, searchFilter, monthFilter,orderListData]);

  useEffect(() => {
    // console.log(reset);
    setManufacturerFilter(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedMonth(false);
    setOrderListData(originalOrderListData);
    setOrderAccounts(originalOrderAccounts);
    setReset(false);
  }, [reset]);
  const handleSearch = (e) => {
    setSearchFilter(e);
    // const value = e.target.value?.toLowerCase();
    // const filteredAccounts = [...originalOrderAccounts].filter((ele) => ele.toLowerCase().includes(value));
    // return filteredAccounts;
    // setOrderAccounts(filteredAccounts);
  };
  const resetButton = (e) => {
    setReset(true);
    // console.log(originalOrderListData);
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
    setMonthFilter(ele);
    // const filteredOrderData = originalOrderListData.filter((element) => Number(element.CloseDate.substring(5, 7)) === months.indexOf(ele) + 1);
    // const filteredAccounts = new Set(filteredOrderData.map((ele) => ele.AccountName));
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
     <div style={{minHeight:"72vh"}}>
     {originalOrderListData?.length!==0 ? (
      
        <div style={{ backgroundColor: "rgb(250,250,250)", minHeight: "50vh", overflow: "hidden" }} className="pb-5">
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
                                          {/* {console.log(orderListData.filter((item) => !(item.AccountName.localeCompare(ele))))} */}
                                          {orderListData
                                            ?.filter((item) => !item?.AccountName.localeCompare(ele))
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
      ) : (
        <Loading />
      )}
     </div>

     <div className="bottom">
     <Footer />
     </div>
    </>
  );
};

export default OrderList;
