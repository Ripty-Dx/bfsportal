import { useEffect, useState } from "react";

export const useManufactureData = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    apiData();
  }, []);
  const key = JSON.parse(localStorage.getItem("Api Data")).data?.user
    ?.access_token;
  const apiData = async () => {
    await fetch("https://dev.beautyfashionsales.com/beauty/B0F9FC7237C", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        link: "https://beautyfashionsales.my.salesforce.com/services/data/v56.0/query?q=SELECT Id, Name, Manufacturer_Logo__c,IsActive__c FROM Manufacturer__c where IsActive__c= 'active'  order by name",
      }),
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  };
  return data;
};
