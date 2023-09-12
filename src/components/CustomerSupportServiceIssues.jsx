import React, { useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import "./CustomerSupport.css";
import CustomerServiceIssuesAddNew from "./CustomerSupport/CustomerServiceIssuesAddNew";
import CustomerServiceIssueTable from "./CustomerSupport/CustomerServiceIssueTable";
import ManagementCasesTable from "./CustomerSupport/ManagementCasesTable";
import MarketingSupportIssueTable from "./CustomerSupport/MarketingSupportIssueTable";
import OrderStatusTable from "./CustomerSupport/OrderStatusTable";
import OrderStatusAddNew from "./CustomerSupport/OrderStatusAddNew";
import MarketingSupportAddNew from "./CustomerSupport/MarketingSupportAddNew";
import ManagementCaseAddNew from "./CustomerSupport/ManagementCaseAddNew";

const CustomerSupportServiceIssues = () => {
  const [addNewInfo, setAddNewInfo] = useState(false);
  const [customerServiceIssues, setCustomerServiceIssues] = useState(true);
  const [managementCaseState, setManagementCaseState] = useState(false);
  const [marketingSupportIssue, setMarketingSupportIssue] = useState(false);
  const [orderStatusState, setOrderStatusState] = useState(false);
  const addInfo = () => {
    setAddNewInfo(true);
  };
  const viewList = () => {
    setAddNewInfo(false);
  };
  const managementCaseHandle = () => {
    setAddNewInfo(false);
    setManagementCaseState(true);
    setCustomerServiceIssues(false);
    setMarketingSupportIssue(false);
    setOrderStatusState(false);
  };
  const handleCustomerServiceIssues = () => {
    setAddNewInfo(false);
    setCustomerServiceIssues(true);
    setManagementCaseState(false);
    setMarketingSupportIssue(false);
    setOrderStatusState(false);
  };
  const handleMarketSupportIssue = () => {
    setAddNewInfo(false);
    setCustomerServiceIssues(false);
    setManagementCaseState(false);
    setMarketingSupportIssue(true);
    setOrderStatusState(false);
  };
  const handleOrderStatus = () => {
    setAddNewInfo(false);
    setCustomerServiceIssues(false);
    setManagementCaseState(false);
    setMarketingSupportIssue(false);
    setOrderStatusState(true);
  };
  return (
    <>
      <Header1 />
      <div
        className="container-fluid mb-2 "
        style={{ minHeight: "70vh", backgroundColor: "#fafafa" }}
      >
        {/* Your account heading */}
        <div className="row d-flex align-items-center justify-content-md-between pt-3">
          <div className="col-1"></div>
          <div className="col-8 p-0 d-flex flex-direction-column justify-content-start align-items-center">
            <h3 className="fw-bold fs-4  fw-md-normal ">
              <BiLeftArrowAlt
                className="back_icon me-2"
                onClick={(e) => (window.location.href = "/")}
              />{" "}
              CUSTOMER SUPPORT
            </h3>
            <h5 className="subCategory">
              &nbsp;-&nbsp;Customer Service Issues
            </h5>
          </div>
          <div className="col-2 ">
            {addNewInfo ? (
              <button
                className=" ms-2 Button d-flex align-items-center justify-content-center"
                onClick={viewList}
              >
                View List
                <AiOutlineUnorderedList className="mx-2" />
              </button>
            ) : (
              <button
                className=" ms-2 Button d-flex align-items-center justify-content-center"
                onClick={addInfo}
              >
                Add New
                <AiOutlinePlusCircle className="mx-2" />
              </button>
            )}
          </div>
          <div className="col-1"></div>
        </div>
        {/* sub categories */}
        <div className="row d-flex align-items-center justify-content-md-between pt-3">
          <div className="col-1"></div>
          <div className="col-10 d-flex ">
            <div className="col-4">
              <div>
                <button
                  className={
                    customerServiceIssues
                      ? "subcategoryButton selectedSubCategory"
                      : "subcategoryButton"
                  }
                  onClick={handleCustomerServiceIssues}
                >
                  Customer Service Issues
                </button>
                <button
                  className={
                    managementCaseState
                      ? "subcategoryButton selectedSubCategory"
                      : "subcategoryButton"
                  }
                  onClick={managementCaseHandle}
                >
                  Management Cases
                </button>
                <button
                  className={
                    marketingSupportIssue
                      ? "subcategoryButton selectedSubCategory"
                      : "subcategoryButton"
                  }
                  onClick={handleMarketSupportIssue}
                >
                  Marketing Support Issues
                </button>
                <button
                  className={
                    orderStatusState
                      ? "subcategoryButton selectedSubCategory"
                      : "subcategoryButton"
                  }
                  onClick={handleOrderStatus}
                >
                  Order Status
                </button>
              </div>
            </div>
            <div className="col-8 mt-2">
              {customerServiceIssues ? (
                <>
                  {addNewInfo ? (
                    <CustomerServiceIssuesAddNew />
                  ) : (
                    <CustomerServiceIssueTable />
                  )}
                </>
              ) : (
                ""
              )}
              {managementCaseState ? (
                <>
                  {addNewInfo ? (
                    <ManagementCaseAddNew />
                  ) : (
                    <ManagementCasesTable />
                  )}
                </>
              ) : (
                ""
              )}
              {marketingSupportIssue ? (
                <>
                  {addNewInfo ? (
                    <MarketingSupportAddNew />
                  ) : (
                    <MarketingSupportIssueTable />
                  )}
                </>
              ) : (
                ""
              )}
              {orderStatusState ? (
                <>{addNewInfo ? <OrderStatusAddNew /> : <OrderStatusTable />}</>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerSupportServiceIssues;
