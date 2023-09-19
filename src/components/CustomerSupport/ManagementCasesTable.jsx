import React, { useState } from "react";
import ManagementCaseDetailPage from "./ManagementCaseDetailPage";
import "../CustomerSupport.css";

const ManagementCasesTable = ({ apiData }) => {
  const [detailState, setDetailState] = useState(false);
  const [detailPageData, setDetailPageData] = useState("");
  const handleDetails = (ele) => {
    setDetailState(true);
    setDetailPageData(ele);
    // console.log(ele);
  };
  return (
    <>
      <div className="">
        {detailState ? (
          <>
            <ManagementCaseDetailPage
              details={detailPageData}
              apiData={apiData}
            />
          </>
        ) : (
          <>
            <div
              className="table-responsive overflow-scroll table1"
              style={{ minHeight: "49vh" }}
            >
              <table className="table table-striped overflow-scroll">
                {/* table heading */}
                <thead>
                  <tr className="sticky-top thStyle">
                    <th
                      className="thStyle text-white text-center"
                      style={{ backgroundColor: "#828283" }}
                    >
                      Case
                    </th>
                    <th
                      className="thStyle text-white text-center"
                      style={{ backgroundColor: "#828283", width: "150px" }}
                    >
                      Manufacture
                    </th>
                    <th
                      className="thStyle text-white align-middle text-center"
                      style={{ backgroundColor: "#828283", width: "200px" }}
                    >
                      Account
                    </th>
                    <th
                      className="thStyle text-white"
                      style={{ backgroundColor: "#828283", width: "150px" }}
                    >
                      Contact
                    </th>
                    <th
                      className="thStyle text-white"
                      style={{ backgroundColor: "#828283", width: "150px" }}
                    >
                      Case Reason
                    </th>
                    <th
                      className="thStyle text-white"
                      style={{ backgroundColor: "#828283" }}
                    >
                      Status
                    </th>
                    <th
                      className="thStyle text-white"
                      style={{ backgroundColor: "#828283" }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiData?.data?.records?.length === 0 ? (
                    <>
                      <tr className="d-flex align-items-center justify-content-center">
                        No data
                      </tr>
                    </>
                  ) : (
                    <>
                      {console.log(apiData?.data?.records)}
                      {apiData?.data?.records.map((ele, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td className="align-middle">
                                <button
                                  className="caseNumber"
                                  onClick={() => handleDetails(ele)}
                                >
                                  {" "}
                                  {ele.CaseNumber}
                                </button>
                              </td>
                              <td className="align-middle">
                                {ele.ManufacturerName}
                              </td>
                              <td className="align-middle">
                                {ele.AccountName}
                              </td>
                              <td className="align-middle">
                                {ele.ContactName}
                              </td>
                              <td className="align-middle">{ele.Reason}</td>
                              <td className="align-middle">{ele.Status}</td>
                              <td className="align-middle">
                                {ele.Date_Opened__c} 
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* pagination */}

            {/* <Pagination apiData={apiData?.data?.records}  currentPage={currentPage} buttonArray={buttonArray}/> */}
          </>
        )}
      </div>
    </>
  );
};

export default ManagementCasesTable;
