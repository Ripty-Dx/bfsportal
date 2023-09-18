import React, { useState } from "react";
import ManagementCaseDetailPage from "./ManagementCaseDetailPage";
import { Pagination } from "../../utils/Pagination";
import { usePagination } from "../../utils/usePagination";

const ManagementCasesTable = ({ apiData }) => {
  const [detailState, setDetailState] = useState(false);
  const [detailPageData, setDetailPageData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, buttonArray } = usePagination(
    apiData?.data?.records?.length,
    4,
    currentPage,
    apiData?.data?.records
  );

  console.log(data, buttonArray);
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
              <table
                className="table  table-striped overflow-scroll"
                //   style={{ width: "60vw" }}
              >
                <thead>
                  {/* table heading */}
                  <tr className="sticky-top">
                    <th
                      style={{
                        width: "100px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      Case
                    </th>
                    <th
                      style={{
                        width: "100px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      Manufacture
                    </th>
                    <th
                      style={{
                        width: "100px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      Account
                    </th>
                    <th
                      style={{
                        width: "100px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      Contact
                    </th>
                    <th
                      style={{
                        width: "400px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      Case Reason
                    </th>
                    <th
                      style={{
                        width: "100px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        width: "100px",
                        backgroundColor: "#828283",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
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
                      {data?.map((ele, index) => {
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
                              <td className="align-middle text-center">
                                {ele.ManufacturerName}
                              </td>
                              <td className="align-middle text-center">
                                {ele.AccountName}
                              </td>
                              <td className="align-middle text-center">
                                {ele.ContactName}
                              </td>
                              <td className="align-middle text-center">
                                {ele.Reason}
                              </td>
                              <td className="align-middle text-center">
                                {ele.Status}
                              </td>
                              <td className="align-middle text-center">
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
            {buttonArray?.map((ele, index) => {
              return (
                <button key={index} onClick={() => setCurrentPage(ele)}>
                  {ele}
                </button>
              );
            })}
            {/* <Pagination apiData={apiData?.data?.records}  currentPage={currentPage} buttonArray={buttonArray}/> */}
          </>
        )}
      </div>
    </>
  );
};

export default ManagementCasesTable;
