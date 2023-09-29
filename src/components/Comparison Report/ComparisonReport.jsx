import React, { useEffect, useState } from "react";
import Header1 from "../Header1";
import Footer from "../Footer";
import Loading from "../../utils/Loading";
import "./comparisonReport.css";
import { useComparisonReport } from "../../api/useComparisonReport";
const ComparisonReport = () => {
  const [filter, setFilter] = useState({
    ManufacturerId__c: "a0O3b00000p7zqKEAQ",
    month: 6,
    year: 2023,
  });
  const originalApiData = useComparisonReport(filter);
  const [apiData, setApiData] = useState(originalApiData || {});
  console.log(apiData);
  const handleManufacturerFilter = (e) => {
    setFilter((prev) => ({
      ...prev,
      ManufacturerId__c: e.target.value,
    }));
  };

  const handleYearReport = (e) => {
    setFilter((prev) => ({
      ...prev,
      year: e.target.value,
    }));
  };
  const handleMonthReport = (e) => {
    setFilter((prev) => ({
      ...prev,
      month: e.target.value,
    }));
  };
  console.log(JSON.stringify(originalApiData?.date?.selected) === JSON.stringify(filter)); //false

  useEffect(() => {
    setApiData(originalApiData);
  }, [originalApiData,filter]);
  return (
    <>
      <Header1 />

      <div style={{ minHeight: "70vh" }}>
        {originalApiData?.status === 200 ? (
          <>
            <div className="bg-white shadow-sm m-3 rounded-3 pb-3" style={{ minHeight: "73vh" }}>
              <div className="container">
                {/* heading and filters */}
                <div className="row p-2">
                  <div className="d-flex justify-content-between">
                    <div className="fs-4 fw-bolder col-auto">Comparison Report</div>
                    {/* Filters */}
                    <div className="d-flex justify-content-between gap-3 col-auto">
                      {/* Manufacturer Filter */}
                      <div className="col-auto">
                        <select className="form-select mb-3" onChange={handleManufacturerFilter} value={filter.ManufacturerId__c}>
                          {originalApiData?.date?.brandsList?.map((ele) => {
                            return <option value={ele.Id}>{ele.Name}</option>;
                          })}
                        </select>
                      </div>
                      {/* Month Filter Report */}
                      <div className="col-auto">
                        <select className="form-select mb-3" onChange={handleMonthReport} value={filter.month}>
                          {originalApiData?.date?.monthList?.map((ele) => {
                            return <option value={ele.value}>{ele.name}</option>;
                          })}
                        </select>
                      </div>
                      {/* Year Filter Report */}
                      <div className="col-auto">
                        <select className="form-select mb-3" onChange={handleYearReport} value={filter.year}>
                          {originalApiData?.date?.yearList?.map((ele) => {
                            return <option value={ele.value}>{ele.name}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* table display report */}

                <div className={`border row table-responsive table1 ${apiData?.data?.length ? "overflow-scroll" : ""}`} style={{ height: "73vh" }}>
                  <table id="comparisonReportTable" className="position-relative table table-responsive table-striped">
                    <thead>
                      <tr>
                        <th className="thComparisonReport">Retail Store </th>
                        <th className="thComparisonReport" style={{ minWidth: "150px" }}>
                          Estee Lauder Number
                        </th>
                        <th className="thComparisonReport" style={{ minWidth: "120px" }}>
                          Sales Rep
                        </th>
                        <th className="thComparisonReport" style={{ minWidth: "100px" }}>
                          Retail Number
                        </th>
                        <th className="thComparisonReport" style={{ minWidth: "100px" }}>
                          Wholesale Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.stringify(originalApiData?.date?.selected) === JSON.stringify(filter) ? (
                        <>
                          {apiData?.data?.length ? (
                            <>
                              {apiData?.data?.map((ele, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{ele.AccountName}</td>
                                      <td>{ele.Estee_Lauder_Number__c} </td>
                                      <td>{ele.Sales_Rep__c}</td>
                                      <td>${Number(ele.retail_revenue__c).toFixed(2)}</td>
                                      <td>${Number(ele.Whole_Sales_Amount).toFixed(2)}</td>
                                    </tr>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            <div className="position-absolute top-50 start-50">No data found</div>
                          )}
                        </>
                      ) : (
                        <Loading />
                      )}
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
      <Footer />
    </>
  );
};

export default ComparisonReport;
