import React, { useEffect, useState } from "react";

const ApiAccess = () => {
  const [apiData, setApiData] = useState([]);
  const fetchData = () => {
    fetch(" https://dev.beautyfashionsales.com/beauty/85mB&7viTC6P", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: "sangeetaa@designersx.com ",
        password: "Dxdev@575c",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const setData = () => {
    localStorage.setItem("BFS Portal", JSON.stringify({
      email: "sangeetaa@designersx.com",
      password: "Dxdev@575c",
    }));
    console.log("data saved");
  };
  useEffect(() => {
    fetchData();
    setData();
  }, []);

  return (
    <>
      {
        // JSON.stringify(apiData["data"]["user"]["Name"])
      }
    </>
  );
};

export default ApiAccess;
