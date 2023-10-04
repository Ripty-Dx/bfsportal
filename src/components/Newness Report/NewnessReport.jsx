import React, { useEffect, useRef, useState } from "react";
import Loading from "../../utils/Loading";
import "./NewnessReport.css";
import { CSVLink } from "react-csv";
import { useNewnessReport } from "../../api/useNewnessReport";
import { useManufactureData } from "../../api/useManufactureData";
const NewnessReport = () => {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [filter, setFilter] = useState({
    ManufacturerId__c: "a0O3b00000p7zqKEAQ",
    toDate: currentDate,
    fromDate: "2023-01-01",
    dataDisplay: "qty",
  });
  const originalApiData = useNewnessReport(filter);
  const [apiData, setApiData] = useState(originalApiData || {});
  console.log(apiData);
  // To get list of manufacturers
  const ManufacturerData = useManufactureData();
  const handleManufacturerFilter = (e) => {
    // console.log(e.target.value);
    setFilter((prev) => ({
      ...prev,
      ManufacturerId__c: e.target.value,
    }));
  };
  const PriceDisplay = (value) => {
    return `$${Number(value).toFixed(2)}`;
  };
  const handleDataDisplay = (e) => {
    setFilter((prev) => ({
      ...prev,
      dataDisplay: e.target.value,
    }));
  };
  //csv Data
  const csvData = () => {
    let Data = [];
    let finalData = [];
    if (apiData?.AccountList?.length) {
      apiData?.AccountList?.map((ele) => {
        return Data.push(
          apiData?.header?.map((item) => {
            return {
              [item + " Price"]: PriceDisplay(ele[item]?.price),
              [item + " Quantity"]: ele[item]["qty"],
            };
          })
        );
      });
    }
    console.log(Data);
    if (apiData?.AccountList?.length) {
      apiData?.AccountList?.map((ele, index) => {
        return finalData.push({
          Account_Name: ele.AccountName__c,
          Account_Owner_Name: ele.OwnerName,
          Account_Status: ele.Active_Closed__c,
          Sales_Rep: ele.Sales_Rep_Name__c,
          ManufacturerName__c: ele.ManufacturerName__c,
          ...Data[index],
        });
      });
    }
    return finalData;
  };
  console.log(csvData());

  const csvHeader = () => {
    let dynamicCSVHeaders = [];
    if (apiData?.header?.length) {
      apiData?.header?.map((ele) => {
        return dynamicCSVHeaders.push(
          {
            label: `${ele} Price`,
            key: `${ele} Price`,
          },
          {
            label: `${ele} Quantity`,
            key: `${ele} Quantity`,
          }
        );
      });
    }
    let csvHeaders = [
      { label: "Account Name", key: "Account_Name" },
      { label: "Account Status", key: "Account_Status" },
      { label: "Manufacturer Name", key: "ManufacturerName__c" },
      { label: "Account Owner Name", key: "Account_Owner_Name" },
      { label: "Sales Rep", key: "Sales_Rep" },
      ...dynamicCSVHeaders,
    ];
    return csvHeaders;
  };
  // console.log(csvHeader());
  const handleClearFilter = () => {
    setFilter((prev) => ({
      ManufacturerId__c: "a0O3b00000p7zqKEAQ",
      toDate: currentDate,
      fromDate: "2023-01-01",
      dataDisplay: "qty",
    }));
  };

  const handleTableDataDisplay = (value) => {
    if (filter.dataDisplay === "price") return `$${Number(value).toFixed(2)}`;
    else return value;
  };
  const handleFromDate = (e) => {
    setFilter((prev) => ({
      ...prev,
      fromDate: e.target.value,
    }));
  };
  const handleToDate = (e) => {
    // console.log(e.target.value);
    setFilter((prev) => ({
      ...prev,
      toDate: e.target.value,
    }));
  };
  useEffect(() => {
    setApiData(originalApiData);
  }, [originalApiData, filter]);
  return (
    <>
      <div>
        {originalApiData?.status === 200 ? (
          <>
            <div className="bg-white shadow-sm pt-2 p-1 overflow-hidden" style={{ height: "100vh" }}>
              {/* <div className="container"> */}
              <div className="">
                {/* heading and filters */}
                <div className="row p-2">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="fs-4 fw-bolder col-auto">Newness Report</div>
                    {/* Filters */}
                    <div className="d-flex justify-content-between gap-2 col-auto">
                      {/* Manufacturer Filter */}
                      <div className="col-auto">
                        <select className="form-select mb-3" onChange={handleManufacturerFilter} value={filter.ManufacturerId__c}>
                          {ManufacturerData?.data?.records?.map((ele) => {
                            return <option value={ele.Id}>{ele.Name}</option>;
                          })}
                        </select>
                      </div>
                      {/* First Calender Filter */}
                      <div className="col-auto">
                        <input type="date" className="form-control" value={filter.fromDate} onChange={handleFromDate} style={{ width: "130px" }} />
                      </div>
                      {/* Second Calender Filter */}
                      <div className="col-auto">
                        <input type="date" className="form-control" style={{ width: "130px" }} onChange={handleToDate} value={filter.toDate} />
                      </div>

                      {/* Price/Quantity Filter  */}
                      <div className="col-auto">
                        <select className="form-select mb-3" onChange={handleDataDisplay} value={filter.dataDisplay}>
                          <option value="qty">Quantity</option>;<option value="price">Price</option>
                        </select>
                      </div>

                      {/* Clear Filter  */}
                      <div className="col-auto">
                        <button className="Button p-2" onClick={handleClearFilter}>
                          Clear
                        </button>
                      </div>
                      {/* Download CSV Report */}
                      <div className="col-auto" style={{ width: "135px" }}>
                        <CSVLink filename={`Newness Report ${new Date().toJSON()}.csv`} data={csvData()} headers={csvHeader()}>
                          <button className="Button p-2 ">Download Report</button>
                        </CSVLink>
                      </div>
                    </div>
                  </div>
                </div>
                {/* table display report */}

                <div className={`border table-responsive rounded-3 w-100 m-0 ${apiData?.data?.length ? "overflow-scroll" : ""}`} style={{ height: "85vh" }}>
                  <table id="newnessReportTable" className="position-relative table table-responsive table-striped">
                    <thead>
                      <tr>
                        <th className="thNewnessReport">Account Name</th>
                        <th className="thNewnessReport">Account Owner Name</th>
                        <th className="thNewnessReport">Account Status</th>
                        <th className="thNewnessReport">Sales Rep</th>
                        <th className="thNewnessReport">Display or Assortment</th>
                        {apiData?.header?.map((ele, index) => {
                          return (
                            <>
                              <th className="thNewnessReport">{ele}</th>
                            </>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {apiData?.AccountList?.length ? (
                          <>
                            {apiData?.AccountList?.[0].ManufacturerId__c == filter.ManufacturerId__c ? (
                              <>
                                {apiData?.AccountList?.map((ele, index) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{ele.AccountName__c}</td>
                                        <td>{ele.OwnerName} </td>
                                        <td>{ele.Active_Closed__c}</td>
                                        <td>{ele.Sales_Rep_Name__c}</td>
                                        <td>---</td>
                                        {apiData?.header?.map((item, index) => {
                                          return (
                                            <>
                                              <td>{handleTableDataDisplay(ele[item][filter.dataDisplay])}</td>
                                            </>
                                          );
                                        })}
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <div className="position-absolute start-50" style={{ top: "300%" }}>
                                <Loading />
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="position-absolute start-50" style={{ top: "300%" }}>
                            No data found
                          </div>
                        )}
                      </>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default NewnessReport;
