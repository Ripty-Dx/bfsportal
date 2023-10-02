import React, { useEffect, useState } from "react";
import Loading from "../../utils/Loading";
import "./NewnessReport.css";
import { CSVLink } from "react-csv";
const NewnessReport = () => {
  const [filter, setFilter] = useState({
    ManufacturerId__c: "a0O3b00000p7zqKEAQ",
    month: 6,
    year: 2023,
  });
  const originalApiData = {};
  const [apiData, setApiData] = useState(originalApiData || {});
  console.log(apiData);
  const handleManufacturerFilter = (e) => {
    setFilter((prev) => ({
      ...prev,
      ManufacturerId__c: e.target.value,
    }));
  };

  const handleMonthReport = (e) => {
    setFilter((prev) => ({
      ...prev,
      month: e.target.value,
    }));
  };
  const handleSearchFilter = () => {};
  //csv Data
  let csvData = [];
  if (apiData?.data?.length) {
    apiData?.data?.map((ele) => {
      return csvData.push({
        Account_Name: ele.AccountName,
        Account_Owner_Name: ele.Estee_Lauder_Number__c,
        Account_Status: ele.Sales_Rep__c,
        Sales_Rep: `$${Number(ele.retail_revenue__c).toFixed(2)}`,
        Display_or_Assortment: `$${Number(ele.Whole_Sales_Amount).toFixed(2)}`,
        EXTRA_LIP_TINT: "",
        Long_Wear_Brow_Pencil: "",
        VE_Pressed_Powder: "",
        VE_Skin_Tint: "",
        Sheer_Powder_REPACK: "",
        HOLIDAY_2023: "",
        Luxe_Matte: "",
        Perfect_Pairs_LWCSS: "",
        Extra_Lip_Tint: "",
        Pot_Rouge_Shade_Ext: "",
      });
    });
  }
  let csvHeaders = [
    { label: "Account Name", key: "Account_Name" },
    { label: "Account Owner Name", key: "Account_Owner_Name" },
    { label: "Account Status", key: "Account_Status" },
    { label: "Sales Rep", key: "Sales_Rep" },
    { label: "Display or Assortment", key: "Display_or_Assortment" },
    { label: "EXTRA LIP TINT", key: "EXTRA_LIP_TINT" },
    { label: "Long Wear Brow Pencil", key: "Long_Wear_Brow_Pencil" },
    { label: "VE Pressed Powder", key: "VE_Pressed_Powder" },
    { label: "VE Skin Tint", key: "VE_Skin_Tint" },
    { label: "Sheer Powder REPACK", key: "Sheer_Powder_REPACK" },
    { label: "HOLIDAY 2023", key: "HOLIDAY_2023" },
    { label: "", key: "" },
    { label: "Luxe Matte", key: "Luxe_Matte" },
    { label: "Perfect Pairs LWCSS", key: "Perfect_Pairs_LWCSS" },
    { label: "Extra Lip Tint", key: "Extra_Lip_Tint" },
    { label: "Pot Rouge Shade Ext", key: "Pot_Rouge_Shade_Ext" },
  ];
  const handleClearFilter = () => {
    setFilter((prev) => ({
      ManufacturerId__c: "a0O3b00000p7zqKEAQ",
      month: 6,
      year: 2023,
    }));
  };
  useEffect(() => {
    setApiData(originalApiData);
  }, [originalApiData, filter]);
  return (
    <>
      <div>
        {/* {originalApiData?.status === 200 ? ( */}
        <>
          <div className="bg-white shadow-sm pt-3 p-1">
            {/* <div className="container"> */}
            <div className="">
              {/* heading and filters */}
              <div className="row p-2">
                <div className="d-flex justify-content-between ">
                  <div className="fs-4 fw-bolder col-auto">Newness Report</div>
                  {/* Filters */}
                  <div className="d-flex justify-content-between gap-2 col-auto">
                    {/* Manufacturer Filter */}
                    <div className="col-auto">
                      <select className="form-select mb-3" onChange={handleManufacturerFilter} value={filter.ManufacturerId__c}>
                        <option value="">Bobbi Brown</option>;
                        {originalApiData?.date?.brandsList?.map((ele) => {
                          return <option value={ele.Id}>{ele.Name}</option>;
                        })}
                      </select>
                    </div>
                    {/* First Calender Filter */}
                    <div className="col-auto">
                      <input type="date" className="form-control" value="2023-01-01" style={{ width: "130px" }} />
                    </div>
                    {/* Second Calender Filter */}
                    <div className="col-auto">
                      <input type="date" className="form-control" style={{ width: "130px" }} />
                    </div>

                    {/* Price/Quantity Filter  */}
                    <div className="col-auto">
                      <select className="form-select mb-3" onChange={handleMonthReport} value={filter.month}>
                        <option value="">Price</option>;
                        {originalApiData?.date?.monthList?.map((ele) => {
                          return <option value={ele.value}>{ele.name}</option>;
                        })}
                      </select>
                    </div>

                    {/* Search Filter  */}
                    <div className="col-auto">
                      <button className="Button p-2" onClick={handleSearchFilter}>
                        Search
                      </button>
                    </div>
                    {/* Clear Filter  */}
                    <div className="col-auto">
                      <button className="Button p-2" onClick={handleClearFilter}>
                        Clear
                      </button>
                    </div>
                    {/* Download CSV Report */}
                    <div className="col-auto" style={{ width: "135px" }}>
                      <CSVLink filename={`Comparison Report ${new Date()}.csv`} data={csvData} headers={csvHeaders}>
                        <button className="Button p-2 ">Download Report</button>
                      </CSVLink>
                    </div>
                  </div>
                </div>
              </div>
              {/* table display report */}

              <div className={`border table-responsive rounded-3 w-100 m-0 ${apiData?.data?.length ? "overflow-scroll" : ""}`} style={{ height: "100vh" }}>
                <table id="newnessReportTable" className="position-relative table table-responsive table-striped">
                  <thead>
                    <tr>
                      <th className="thNewnessReport">Account Name</th>
                      <th className="thNewnessReport">Account Owner Name</th>
                      <th className="thNewnessReport">Account Status</th>
                      <th className="thNewnessReport">Sales Rep</th>
                      <th className="thNewnessReport">Display or Assortment</th>
                      <th className="thNewnessReport">EXTRA LIP TINT</th>
                      <th className="thNewnessReport">Long Wear Brow Pencil</th>
                      <th className="thNewnessReport">VE Pressed Powder</th>
                      <th className="thNewnessReport">VE Skin Tint</th>
                      <th className="thNewnessReport">Sheer Powder REPACK</th>
                      <th className="thNewnessReport">HOLIDAY 2023</th>
                      <th className="thNewnessReport"></th>
                      <th className="thNewnessReport">Luxe Matte</th>
                      <th className="thNewnessReport">Perfect Pairs LWCSS</th>
                      <th className="thNewnessReport">Extra Lip Tint</th>
                      <th className="thNewnessReport">Pot Rouge Shade Ext</th>
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
        {/* ) : (
          <Loading />
        )} */}
      </div>
    </>
  );
};

export default NewnessReport;
