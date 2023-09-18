import React, { useEffect, useState } from "react";
// import { usePagination } from "./usePagination";

export const Pagination = ({apiData,currentPage,buttonArray}) => {
  const [currentPage1,setCurrentPage1]=useState(currentPage);
  // console.log(apiData);
    // const {data,buttonArray}=  usePagination(apiData?.length, 5, currentPage1, apiData);
  console.log(buttonArray);
  return (
    <>
    hi
      {buttonArray?.map((ele, index) => {
        return <button key={index} onClick={()=>setCurrentPage1(ele)}>{ele}</button>;
      })}
    </>
  );
};
