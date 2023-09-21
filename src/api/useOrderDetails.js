import { useEffect, useState } from "react";

export const useOrderDetails = (props) => {
  // console.log("id",props);
  const [data, setData] = useState();
  const key = JSON.parse(localStorage.getItem("Api Data")).data.api.access_token;
  const Sales_Rep__c = JSON.parse(localStorage.getItem("Api Data")).data.user.Sales_Rep__c;
  const Opportunity_id = props;
  // console.log(Opportunity_id);
  useEffect(() => {
    fetchOrderDetailData(Opportunity_id);
    GetOrderDetails(props)
      .then((resposne) => {
        console.log({ resposne });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  const fetchOrderDetailData = async (Opportunity_id) => {
    console.log(Opportunity_id, typeof id);
    await fetch("https://dev.beautyfashionsales.com/beauty/0DS68FOD7s", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        Sales_Rep__c: Sales_Rep__c,
        Opportunity_id: "006Rb000001EdfFIAS",
      }),
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  };
  console.log("data", data);
  return data;
};

export const GetOrderDetails = (props) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "connect.sid=s%3As20rwC2RWEBfOXXfoALciZo-xUPreE6y.TFtR4NxneNc3m09%2BpuaSBF%2FBdpD88XMmas6IW1lcjHI");

  var raw = JSON.stringify({
    key: JSON.parse(localStorage.getItem("Api Data")).data.api.access_token,
    Sales_Rep__c: JSON.parse(localStorage.getItem("Api Data")).data.user.Sales_Rep__c,
    Opportunity_id: props,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("https://dev.beautyfashionsales.com/beauty/KGqOIl3", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log( result );
      return result;
    })
    .catch((error) => {
      return error;
    });
};
