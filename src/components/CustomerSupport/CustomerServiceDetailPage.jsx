import React, { useState } from "react";
import CustomerServiceIssueTable from "./CustomerServiceIssueTable";
import { BiLeftArrowAlt } from "react-icons/bi";

const CustomerServiceDetailPage = ({ details, apiData }) => {
  const [backToCustomerServiceIssue, setBackToCustomerServiceIssue] =
    useState(false);
  const handleBackToManagementCase = () => {
    setBackToCustomerServiceIssue(true);
  };
  return (
    <>
      {backToCustomerServiceIssue ? (
        <CustomerServiceIssueTable apiData={apiData} />
      ) : (
        <>
          <div className="container basicInfo">
            {/* basic info */}
            <div className="row">
              <div className="d-flex justify-content-evenly position-relative">
                <div className="basicInfoHeadingDiv ">Details</div>

                <div className="d-flex justify-content-evenly  col-12 mt-3">
                  {/* back arrow */}

                  <div className="col-1 mt-4">
                    <h2 className="fw-bold text-decoration-underline fw-md-normal link-offset-2">
                      <BiLeftArrowAlt
                        className="back_icon me-2"
                        onClick={handleBackToManagementCase}
                      />{" "}
                    </h2>
                  </div>
                  <div className="col-5">
                    <div className="mb-3 mt-4">
                      <label className="form-label detailPageLabel">
                        Account Name
                      </label>
                      <div className="detailInformationDiv">
                        {details.AccountName}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Manufacturer
                      </label>
                      <div className="detailInformationDiv">
                        {details.ManufacturerName}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Case Reason
                      </label>
                      <div className="detailInformationDiv">
                        {details.Reason}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Associated PO Number
                      </label>
                      <div className="detailInformationDiv">
                        {details.Associated_PO_Number__c}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Associated Invoice Number
                      </label>
                      <div className="detailInformationDiv">
                        {details.Associated_Invoice_Number__c ?? "   "}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Case Origin
                      </label>
                      <div className="detailInformationDiv">
                        {details.Origin}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Date Opened
                      </label>
                      <div className="detailInformationDiv">
                        {details.Date_Opened__c}
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mb-3 mt-4">
                      <label className="form-label detailPageLabel">
                        Contact Name
                      </label>
                      <div className="detailInformationDiv">
                        {details.ContactName}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Opportunity{" "}
                      </label>
                      <div className="detailInformationDiv">
                        {details.Opportunity__c}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Priority{" "}
                      </label>
                      <div className="detailInformationDiv">
                        {details.Priority}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Associated Order Number{" "}
                      </label>
                      <div className="detailInformationDiv">
                        {details.Associated_Order_Number__c}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Net Value of DIF or CM Amount
                      </label>
                      <div className="detailInformationDiv">
                        {details.Net_Value_of_DIF__c}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Status
                      </label>
                      <div className="detailInformationDiv">
                        {details.Status}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label detailPageLabel">
                        Date Closed
                      </label>
                      <div className="detailInformationDiv">
                        {details.Date_Closed__c}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-1"></div> */}
                </div>
              </div>
            </div>
            {/* subject and description */}
            <div className="row  pb-4">
              <div className="col-12 d-flex justify-content-end">
                {/* <div className="col-1"></div> */}
                <div className="mb-3 col-11 pe-3 ps-4 d-flex flex-column justify-content-evenly ">
                  <label className="form-label detailPageLabel"> Subject</label>
                  <div className="detailInformationDiv">{details.Subject}</div>
                </div>
              </div>
              <div className="col-12  d-flex justify-content-end">
                <div className="mb-3 mb-3 col-11 pe-3 ps-4 d-flex flex-column justify-content-evenly ">
                  <label className="form-label detailPageLabel">
                    {" "}
                    Description
                  </label>
                  <div className="detailInformationDiv">
                    {details.Description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerServiceDetailPage;
