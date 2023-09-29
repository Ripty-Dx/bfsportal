import React, { useEffect, useState } from "react";

export const useComparisonReport = (props) => {
  const [data, setData] = useState({});
  console.log(props);
  useEffect(() => {
    fetchComparisonReportAPI(props.ManufacturerId__c, props.month, props.year);
  }, [props]);
  const fetchComparisonReportAPI = async (ManufacturerID, month, year) => {
    await fetch("https://dev.beautyfashionsales.com/9kJs2I6Bn/FyBoxRrjdc", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ManufacturerId__c: ManufacturerID,
        month: month,
        year: year,
      }),
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  };
  console.log("data", data);
  return data;
};
