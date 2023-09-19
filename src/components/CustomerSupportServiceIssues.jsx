import React, { useEffect, useState } from "react";
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
  const apiData = JSON.parse(localStorage.getItem("Api Data"));
  const key = apiData.data.api.access_token;
  const SalesRepId = apiData.data.user.Sales_Rep__c;
  const typeIdCustomerServiceIssues = "0123b0000007z9pAAA";
  const typeIdOrderStatus = "0123b0000007zc8AAA";
  const typeIdManagementCases = "0123b000000GfOEAA0";
  const typeIdMarketingSupportIssue = "0123b0000007z9uAAA";
  const [addNewInfo, setAddNewInfo] = useState(false);
  const [customerServiceIssues, setCustomerServiceIssues] = useState(true);
  const [managementCaseState, setManagementCaseState] = useState(false);
  const [marketingSupportIssue, setMarketingSupportIssue] = useState(false);
  const [orderStatusState, setOrderStatusState] = useState(false);
  const [customerSupportApiData, setCustomerSupportApiData] = useState("");
  const [apiDataOrderStatus, setApiDataOrderStatus] = useState("");
  const [apiDataManagementCases, setApiDataManagementCases] = useState("");
  const [apiDataMarketingSupportIssue, setApiDataMarketingSupportIssue] =
    useState("");
  const addInfo = () => {
    setAddNewInfo(true);
  };
  const viewList = () => {
    setAddNewInfo(false);
  };
  const managementCaseHandle = async () => {
    setAddNewInfo(false);
    setManagementCaseState(true);
    setCustomerServiceIssues(false);
    setMarketingSupportIssue(false);
    setOrderStatusState(false);
    setApiDataManagementCases(
      await fetchManagementCases(key, SalesRepId, typeIdManagementCases)
    );
  };
  const handleCustomerServiceIssues = () => {
    setAddNewInfo(false);
    setCustomerServiceIssues(true);
    setManagementCaseState(false);
    setMarketingSupportIssue(false);
    setOrderStatusState(false);
  };
  const handleMarketSupportIssue = async () => {
    setAddNewInfo(false);
    setCustomerServiceIssues(false);
    setManagementCaseState(false);
    setMarketingSupportIssue(true);
    setOrderStatusState(false);
    setApiDataMarketingSupportIssue(
      await fetchMarketingSupportIssue(
        key,
        SalesRepId,
        typeIdMarketingSupportIssue
      )
    );
  };
  const handleOrderStatus = async () => {
    setAddNewInfo(false);
    setCustomerServiceIssues(false);
    setManagementCaseState(false);
    setMarketingSupportIssue(false);
    setOrderStatusState(true);
    setApiDataOrderStatus(
      await fetchOrderStatus(key, SalesRepId, typeIdOrderStatus)
    );
  };
  const fetchCustomerSupportServiceIssues = (
    key,
    SalesRepId,
    typeIdCustomerServiceIssues
  ) => {
    return fetch(" https://dev.beautyfashionsales.com/beauty/0BBG33MCr", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        SalesRepId: SalesRepId,
        typeId: typeIdCustomerServiceIssues,
      }),
    })
      .then((response) => response.json())
      .then((data) => setCustomerSupportApiData(data))
      .catch((err) => console.log(err));
  };
  const fetchOrderStatus = (key, SalesRepId, typeIdOrderStatus) => {
    return fetch(" https://dev.beautyfashionsales.com/beauty/0BBG33MCr", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        SalesRepId: SalesRepId,
        typeId: typeIdOrderStatus,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };
  const fetchManagementCases = (key, SalesRepId, typeIdManagementCases) => {
    return fetch(" https://dev.beautyfashionsales.com/beauty/0BBG33MCr", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        SalesRepId: SalesRepId,
        typeId: typeIdManagementCases,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };
  const fetchMarketingSupportIssue = (
    key,
    SalesRepId,
    typeIdMarketingSupportIssue
  ) => {
    return fetch(" https://dev.beautyfashionsales.com/beauty/0BBG33MCr", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        SalesRepId: SalesRepId,
        typeId: typeIdMarketingSupportIssue,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCustomerSupportServiceIssues(
      key,
      SalesRepId,
      typeIdCustomerServiceIssues
    );
  }, []);
  return (
    <>
      <Header1 />
      <div
        className="container-fluid mb-2 "
        style={{ minHeight: "70vh", backgroundColor: "#fafafa" }}
      >
        {/* Your account heading */}
        <div className="row d-flex align-items-center justify-content-md-between pt-3">
          {/* <div className="col-1"></div> */}
          <div className="col-9 px-4 d-flex flex-direction-column justify-content-start align-items-center">
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
          <div className="col-2 ps-4 ">
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
          {/* <div className="col-1"></div> */}
        </div>
        {/* sub categories */}
        <div className="row d-flex align-items-center justify-content-md-between pt-3">
          {/* <div className="col-1"></div> */}
          <div className="col-12 d-flex ">
            <div className="col-3">
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
            <div className="col-9">
              {customerServiceIssues ? (
                <>
                  {addNewInfo ? (
                    <CustomerServiceIssuesAddNew />
                  ) : (
                    <CustomerServiceIssueTable
                      apiData={customerSupportApiData}
                    />
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
                    <ManagementCasesTable apiData={apiDataManagementCases} />
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
                    <MarketingSupportIssueTable
                      apiData={apiDataMarketingSupportIssue}
                    />
                  )}
                </>
              ) : (
                ""
              )}
              {orderStatusState ? (
                <>
                  {addNewInfo ? (
                    <OrderStatusAddNew />
                  ) : (
                    <OrderStatusTable apiData={apiDataOrderStatus} />
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* <div className="col-1"></div> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerSupportServiceIssues;
