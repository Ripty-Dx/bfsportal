import React from "react";

const CustomerServiceIssueTable = ({apiData}) => {
  // console.log(apiData.data.records.length);
  return (
    <>
      <div className="">
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
              {apiData?.data?.records?.length===0?<>
              <tr className="d-flex align-items-center justify-content-center">
                No data
              </tr>
              </>:""}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerServiceIssueTable;
