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
  // console.log(originalApiData);
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
  let a = [];

  if (apiData?.headers?.length) {
    apiData?.headers?.map((item) => {
      // a.push({
      //   // label: `${item} Price`,
      //   // key: `${item}_price`,
      //   label: "ri",
      //   key: "op",
      // });
      return console.log("item", item);
    });
  }
  console.log("a", a);
  let csvData = [];
  if (apiData?.AccountList?.length) {
    apiData?.AccountList?.map((ele) =>
      apiData?.headers?.map((item) => {
        return csvData.push({
          Account_Name: ele.AccountName__c,
          Account_Owner_Name: ele.OwnerName,
          Account_Status: ele.Active_Closed__c,
          Sales_Rep: ele.Sales_Rep_Name__c,
          ManufacturerName__c: ele.ManufacturerName__c,
          // item_price: PriceDisplay(ele[item]?.price),
          // item_quantity: ele[item]["qty"],

          // EXTRA_LIP_TINT_price: PriceDisplay(ele["EXTRA LIP TINT"]?.price),
          // Long_Wear_Brow_Pencil_price: PriceDisplay(ele["Long Wear Brow Pencil"]["price"]),
          // VE_Pressed_Powder_price: PriceDisplay(ele["VE Pressed Powder"]["price"]),
          // VE_Skin_Tint_price: PriceDisplay(ele["VE Skin Tint"]["price"]),
          // Sheer_Powder_REPACK_price: PriceDisplay(ele["Sheer Powder REPACK"]["price"]),
          // HOLIDAY_2023_price: PriceDisplay(ele["HOLIDAY 2023"]["price"]),
          // Luxe_Matte_price: PriceDisplay(ele["Luxe Matte"]["price"]),
          // Perfect_Pairs_LWCSS_price: PriceDisplay(ele["Perfect Pairs LWCSS"]["price"]),
          // Extra_Lip_Tint_price: PriceDisplay(ele["Extra Lip Tint"]["price"]),
          // Pot_Rouge_Shade_Ext_price: PriceDisplay(ele["Pot Rouge Shade Ext"]["price"]),
          // null_price: PriceDisplay(ele["null"]["price"]),
          // null_quantity: ele["null"]["qty"],

          // EXTRA_LIP_TINT_quantity: ele["EXTRA LIP TINT"]["qty"],
          // Long_Wear_Brow_Pencil_quantity: ele["Long Wear Brow Pencil"]["qty"],
          // VE_Pressed_Powder_quantity: ele["VE Pressed Powder"]["qty"],
          // VE_Skin_Tint_quantity: ele["VE Skin Tint"]["qty"],
          // Sheer_Powder_REPACK_quantity: ele["Sheer Powder REPACK"]["qty"],
          // HOLIDAY_2023_quantity: ele["HOLIDAY 2023"]["qty"],
          // Luxe_Matte_quantity: ele["Luxe Matte"]["qty"],
          // Perfect_Pairs_LWCSS_quantity: ele["Perfect Pairs LWCSS"]["qty"],
          // Extra_Lip_Tint_quantity: ele["Extra Lip Tint"]["qty"],
          // Pot_Rouge_Shade_Ext_quantity: ele["Pot Rouge Shade Ext"]["qty"],
        });
      })
    );
  }
  let csvHeaders = [
    { label: "Account Name", key: "Account_Name" },
    { label: "Account Status", key: "Account_Status" },
    { label: "Manufacturer Name", key: "ManufacturerName__c" },
    { label: "Account Owner Name", key: "Account_Owner_Name" },
    { label: "Sales Rep", key: "Sales_Rep" },
    // apiData?.headers?.map((item) => {
    //   return {
    //     label: `${item} Price`,
    //     key: `${item}_price`,
    //   };
    // }),

    // { label: "EXTRA LIP TINT Price", key: "EXTRA_LIP_TINT_price" },

    // { label: "EXTRA LIP TINT Price", key: "EXTRA_LIP_TINT_price" },
    // { label: "EXTRA LIP TINT Quantity", key: "EXTRA_LIP_TINT_quantity" },
    // { label: "Long Wear Brow Pencil Price", key: "Long_Wear_Brow_Pencil_price" },
    // { label: "Long Wear Brow Pencil Quantity", key: "Long_Wear_Brow_Pencil_quantity" },
    // { label: "VE Pressed Powder Price", key: "VE_Pressed_Powder_price" },
    // { label: "VE Pressed Powder Quantity", key: "VE_Pressed_Powder_quantity" },
    // { label: "VE Skin Tint Price", key: "VE_Skin_Tint_price" },
    // { label: "VE Skin Tint Quantity", key: "VE_Skin_Tint_quantity" },
    // { label: "Sheer Powder REPACK Price", key: "Sheer_Powder_REPACK_price" },
    // { label: "Sheer Powder REPACK Quantity", key: "Sheer_Powder_REPACK_quantity" },
    // { label: "HOLIDAY 2023 Price", key: "HOLIDAY_2023_price" },
    // { label: "HOLIDAY 2023 Quantity", key: "HOLIDAY_2023_quantity" },
    // { label: "null Price", key: "null_price" },
    // { label: "null Quantity", key: "null_quantity" },
    // { label: "Luxe Matte Price", key: "Luxe_Matte_price" },
    // { label: "Luxe Matte Quantity", key: "Luxe_Matte_quantity" },
    // { label: "Perfect Pairs LWCSS Price", key: "Perfect_Pairs_LWCSS_price" },
    // { label: "Perfect Pairs LWCSS Quantity", key: "Perfect_Pairs_LWCSS_quantity" },
    // { label: "Extra Lip Tint Price", key: "Extra_Lip_Tint_price" },
    // { label: "Extra Lip Tint Quantity", key: "Extra_Lip_Tint_quantity" },
    // { label: "Pot Rouge Shade Ext Price", key: "Pot_Rouge_Shade_Ext_price" },
    // { label: "Pot Rouge Shade Ext Quantity", key: "Pot_Rouge_Shade_Ext_quantity" },
  ];
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
                        <CSVLink filename={`Newness Report ${new Date().toJSON()}.csv`} data={csvData} headers={csvHeaders}>
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
                            Loading....
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
