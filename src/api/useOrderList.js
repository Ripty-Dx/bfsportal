import { useEffect, useState } from "react";

export const useOrderList = () => {
  const [data,setData]=useState();
  const key = JSON.parse(localStorage.getItem("Api Data")).data.api
    .access_token;
  const Sales_Rep__c = JSON.parse(localStorage.getItem("Api Data")).data.user
    .Sales_Rep__c;
    useEffect(()=>{
      fetchOrderListData();
    },[])
  const fetchOrderListData = async() => {
    await fetch("https://dev.beautyfashionsales.com/beauty/KGqOIl3", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        Sales_Rep__c: Sales_Rep__c,
      }),
    })
      .then((response) => response.json())
      .then((result)=>setData(result))
      .catch((err) => console.log(err));
  };
  return data;
};
