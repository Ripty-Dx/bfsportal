import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

export const useOrderDetails = (props) => {
  // console.log(props);
  const [data, setData] = useState();
  const key = JSON.parse(localStorage.getItem("Api Data")).data.api.access_token;
  const opportunity_id = props;
  useEffect(() => {
    fetchOrderListData(opportunity_id);
  }, []);
  const fetchOrderListData = async (opportunity_id) => {
    // await fetch("https://dev.beautyfashionsales.com/beauty/0DS68FOD7s", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     key: key,
    //     opportunity_id: opportunity_id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result)=>setData(result))
    //   .catch((err) => console.log(err));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3A4_RA-3xIyfnZhqUheje2b-DwyQUKlLsr.k%2FknSQLdV%2FmGle2OLNi%2BdAt5%2BDdoQQMtuYsxOign1Mw");

    var raw = JSON.stringify({
      key: key,
      opportunity_id: opportunity_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://dev.beautyfashionsales.com/beauty/0DS68FOD7s", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result.data))
      .catch((error) => console.log("error", error));
  

  };
  // console.log(Object.keys(data));
  return data;
};
