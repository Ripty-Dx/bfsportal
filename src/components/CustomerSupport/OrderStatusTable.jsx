import React, { useMemo, useState } from "react";
import OrderStatusDetailPage from "./OrderStatusDetailPage";
import Pagination from "../../utils/Pagination";
let PageSize = 1;

const OrderStatusTable = ({ apiData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(apiData);
  const [detailState, setDetailState] = useState(false);
  const [detailPageData, setDetailPageData] = useState("");
  // console.log(apiData);
  const handleDetails = (ele) => {
    setDetailState(true);
    setDetailPageData(ele);
    // console.log(ele);
  }; // console.log(apiData);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return apiData?.data?.records.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <>
      <div className="">
        {detailState ? (
          <>
            <OrderStatusDetailPage details={detailPageData} apiData={apiData} />
          </>
        ) : (
          <>
            <div
              className="table-responsive overflow-scroll table1"
              style={{ minHeight: "49vh" }}
            >
              <table className="table table-striped overflow-scroll position-relative ">
                {/* table heading */}
                <thead>
                  <tr className="sticky-top thStyle">
                    <th
                      className="thStyle text-white"
                      style={{ backgroundColor: "#828283" }}
                    >
                      Case
                    </th>
                    <th
                      className="thStyle text-white"
                      style={{ backgroundColor: "#828283", width: "150px" }}
                    >
                      Manufacture
                    </th>
                    <th
                      className="thStyle text-white"
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
                  {currentTableData?.length === 0 ? (
                    <>
                      <tr className="position-absolute start-50">
                        No data
                      </tr>
                    </>
                  ) : (
                    <>
                      {console.log(apiData?.data?.records)}
                      {currentTableData?.map((ele, index) => {
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
            <div className="mt-2">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={apiData?.data?.records.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderStatusTable;
