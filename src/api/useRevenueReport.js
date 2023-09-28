import { useEffect, useState } from "react";

export const useRevenueReport = (props) => {
  const [data, setData] = useState();
  const key = JSON.parse(localStorage.getItem("Api Data")).data.api.access_token;
  useEffect(() => {
    fetchOrderListData();
  }, []);
  const fetchOrderListData = async () => {
    await fetch("https://dev.beautyfashionsales.com/report/4i1cKeDt9", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        calender:props == "2022" ? "%3D%20LAST_YEAR" : "=THIS_YEAR"
      }),
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  };
  // console.log(data);
  return data;
};
