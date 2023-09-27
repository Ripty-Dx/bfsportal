import React, { useEffect, useState } from 'react'

export const useSalesReport = () => {
    const [data,setData]=useState();
    const Sales_Rep__c = JSON.parse(localStorage.getItem("Api Data")).data.user.Sales_Rep__c;
      useEffect(()=>{
        fetchOrderListData();
      },[])
    const fetchOrderListData = async() => {
      await fetch("https://dev.beautyfashionsales.com/9kJs2I6Bn/i0IT68Q8&0", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          salesRepId: Sales_Rep__c,
        }),
      })
        .then((response) => response.json())
        .then((result)=>setData(result))
        .catch((err) => console.log(err));
    };
    // console.log(data);
    return data;
}
