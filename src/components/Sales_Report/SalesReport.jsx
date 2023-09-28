import React, { useEffect, useState } from "react";
import Header1 from "../Header1";
import Footer from "../Footer";
import "./SalesReport.css";
import { useSalesReport } from "../../api/useSalesReport";
import Loading from "../../utils/Loading";
import { CSVLink } from "react-csv";

const SalesReport = () => {
  const originalApiData = useSalesReport();
  let totalOrder = 0,
    totalOrderPrice = 0;
  let monthTotalAmount = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  const [apiData, setApiData] = useState(originalApiData || {});
  console.log(apiData);
  const handleManufacturerFilter = (e) => {
    if (e.target.value === "All Manufacturer") {
      setApiData(originalApiData);
    } else {
      const filteredData = originalApiData?.data?.filter((ele) => !ele.ManufacturerName__c.localeCompare(e.target.value));
      setApiData((prev) => ({ ...prev, data: filteredData }));
      console.log(filteredData);
    }
  };
  let csvData = [];
  apiData?.data?.map((ele) =>
    ele.Orders.map((item) =>
      csvData.push({
        ManufacturerName__c: ele.ManufacturerName__c,
        AccountName: item.AccountName,
        AccountRepo: JSON.parse(localStorage.getItem("Api Data")).data.user.Name,
        JanOrders: item.Jan.items?.length,
        JanAmount: item.Jan.amount,
        FebOrders: item.Feb.items?.length,
        FebAmount: item.Feb.amount,
        MarOrders: item.Mar.items?.length,
        MarAmount: item.Mar.amount,
        AprOrders: item.Apr.items?.length,
        AprAmount: item.Apr.amount,
        MayOrders: item.May.items?.length,
        MayAmount: item.May.amount,
        JunOrders: item.Jun.items?.length,
        JunAmount: item.Jun.amount,
        JulOrders: item.Jul.items?.length,
        JulAmount: item.Jul.amount,
        AugOrders: item.Aug.items?.length,
        AugAmount: item.Aug.amount,
        SepOrders: item.Sep.items?.length,
        SepAmount: item.Sep.amount,
        OctOrders: item.Oct.items?.length,
        OctAmount: item.Oct.amount,
        NovOrders: item.Nov.items?.length,
        NovAmount: item.Nov.amount,
        DecOrders: item.Dec.items?.length,
        DecAmount: item.Dec.amount,
        TotalOrders: item.totalOrders,
        totalAmount: item.totalorderPrice,
      })
    )
  );
  const headers = [
    { label: "Manufacturer Name", key: "ManufacturerName__c" },
    { label: "Account Name", key: "AccountName" },
    { label: "Account Repo", key: "AccountRepo" },
    { label: "Jan Orders", key: "JanOrders" },
    { label: "Jan Amount", key: "JanAmount" },
    { label: "Feb Orders", key: "FebOrders" },
    { label: "Feb Amount", key: "FebAmount" },
    { label: "Mar Orders", key: "MarOrders" },
    { label: "Mar Amount", key: "MarAmount" },
    { label: "Apr Orders", key: "AprOrders" },
    { label: "Apr Amount", key: "AprAmount" },
    { label: "May Orders", key: "MayOrders" },
    { label: "May Amount", key: "MayAmount" },
    { label: "Jun Orders", key: "JunOrders" },
    { label: "Jun Amount", key: "JunAmount" },
    { label: "Jul Orders", key: "JulOrders" },
    { label: "Jul Amount", key: "JulAmount" },
    { label: "Aug Orders", key: "AugOrders" },
    { label: "Aug Amount", key: "AugAmount" },
    { label: "Sep Orders", key: "SepOrders" },
    { label: "Sep Amount", key: "SepAmount" },
    { label: "Oct Orders", key: "OctOrders" },
    { label: "Oct Amount", key: "OctAmount" },
    { label: "Nov Orders", key: "NovOrders" },
    { label: "Nov Amount", key: "NovAmount" },
    { label: "Dec Orders", key: "DecOrders" },
    { label: "Dec Amount", key: "DecAmount" },
    { label: "Total Orders", key: "TotalOrders" },
    { label: "Total Amount", key: "totalAmount" },
  ];
  const csvLink = {
    headers: headers,
    data: csvData,
    filename: `Sales Report ${new Date()}.csv`,
  };
  useEffect(() => {
    setApiData(originalApiData);
  }, [originalApiData]);
  return (
    <>
      <Header1 />

      <div style={{ minHeight: "70vh" }}>
        {apiData?.data?.length ? (
          <>
            <div className="bg-white shadow-sm m-3 rounded-3 pb-3" style={{ minHeight: "73vh" }}>
              <div className="container">
                {/* heading and filters */}
                <div className="row p-2">
                  <div className="d-flex justify-content-between">
                    <div className="fs-4 fw-bolder col-auto">Report</div>
                    {/* ManufacturerFilter */}
                    <div className="d-flex justify-content-between gap-3 col-auto">
                      <select className="form-select mb-3" onChange={handleManufacturerFilter}>
                        <option selected>All Manufacturer</option>
                        {originalApiData.data.map((ele) => {
                          return (
                            <option name="filter" value={ele.ManufacturerName__c}>
                              {ele.ManufacturerName__c}
                            </option>
                          );
                        })}
                      </select>
                      {/* onClick={handleDownloadReport} */}
                      <CSVLink {...csvLink}>
                        <button className="Button col-auto changesInButton">Download Report</button>
                      </CSVLink>
                    </div>
                  </div>
                </div>
                {/* table display report */}

                <div className="row table-responsive overflow-scroll table1" style={{ maxHeight: "73vh", minHeight: "20vh" }}>
                  <table id="salesReportTable" className="table table-responsive table-stripped">
                    <thead>
                      <tr>
                        <th className="thSalesReport">Manufacturer</th>
                        <th className="thSalesReport" style={{ minWidth: "150px" }}>
                          Account
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "120px" }}>
                          Sales Rep
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Jan
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Feb
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Mar
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Apr
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          May
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Jun
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Jul
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Aug
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Sep
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Oct
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Nov
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "100px" }}>
                          Dec
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "120px" }}>
                          Total Order
                        </th>
                        <th className="thSalesReport" style={{ minWidth: "120px" }}>
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData?.data?.map((ele, index) => {
                        return (
                          <>
                            {ele.Orders.map((item) => {
                              totalOrder += Number(item.totalOrders);
                              totalOrderPrice += Number(item.totalorderPrice);
                              monthTotalAmount.Jan += Number(item.Jan.amount);
                              monthTotalAmount.Feb += Number(item.Feb.amount);
                              monthTotalAmount.Mar += Number(item.Mar.amount);
                              monthTotalAmount.Apr += Number(item.Apr.amount);
                              monthTotalAmount.May += Number(item.May.amount);
                              monthTotalAmount.Jun += Number(item.Jun.amount);
                              monthTotalAmount.Jul += Number(item.Jul.amount);
                              monthTotalAmount.Aug += Number(item.Aug.amount);
                              monthTotalAmount.Sep += Number(item.Sep.amount);
                              monthTotalAmount.Oct += Number(item.Oct.amount);
                              monthTotalAmount.Nov += Number(item.Nov.amount);
                              monthTotalAmount.Dec += Number(item.Dec.amount);

                              return (
                                <>
                                  <tr>
                                    <td className="tdStyle">{ele.ManufacturerName__c}</td>
                                    <td className="tdStyle">{item.AccountName} </td>
                                    <td className="tdStyle">{JSON.parse(localStorage.getItem("Api Data")).data.user.Name} </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Jan.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Jan.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Feb.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Feb.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Mar.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Mar.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Apr.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Apr.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.May.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.May.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Jun.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Jun.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Jul.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Jul.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Aug.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Aug.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Sep.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Sep.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Oct.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Oct.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Nov.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Nov.amount).toFixed(2)}</button>
                                      </div>
                                    </td>
                                    <td className="tdStyle">
                                      <div className="d-flex gap-1">
                                        <span className="monthFirstData">{item.Dec.items?.length}</span>
                                        <button className="monthSecondData">${Number(item.Dec.amount).toFixed(2)}</button>
                                      </div>
                                    </td>

                                    <td className="tdStyle">{item.totalOrders}</td>
                                    <td className="tdStyle">${Number(item.totalorderPrice).toFixed(2)}</td>
                                  </tr>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                      <tr>
                        <td className="thSalesReport"></td>
                        <td className="thSalesReport"> </td>
                        <td className="thSalesReport"> </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Jan).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Feb).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Mar).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Apr).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.May).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Jun).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Jul).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Aug).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Sep).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Oct).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Nov).toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="thSalesReport">
                          <div className="d-flex gap-3">
                            <span className="monthFirstData"></span>
                            <span className="ps-1 thSalesReport">${Number(monthTotalAmount.Dec).toFixed(2)}</span>
                          </div>
                        </td>

                        <td className="thSalesReport">{totalOrder}</td>
                        <td className="thSalesReport">${Number(totalOrderPrice).toFixed(2)}</td>
                      </tr>
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

export default SalesReport;
