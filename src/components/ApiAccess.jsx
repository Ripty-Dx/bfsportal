import React, { useEffect, useState } from "react";

const ApiAccess = () => {
  const [apiData, setApiData] = useState([]);
  const fetchData = (email,password) => {
    fetch(" https://dev.beautyfashionsales.com/beauty/85mB&7viTC6P", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email:email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {
        console.log(apiData)

        // JSON.stringify(apiData["data"]["user"]["Name"])
      }
    </>
  );
};

export default ApiAccess;
