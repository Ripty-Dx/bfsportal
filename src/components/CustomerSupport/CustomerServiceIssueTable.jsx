import React, { useState } from "react";
import CustomerServiceDetailPage from "./CustomerServiceDetailPage";

const CustomerServiceIssueTable = ({apiData}) => {
  // console.log(apiData);
  const [detailState, setDetailState] = useState(false);
  const [detailPageData,setDetailPageData]=useState("");
  // console.log(apiData);
  const handleDetails = (ele) => {
    setDetailState(true);
    setDetailPageData(ele)
    // console.log(ele);
  };
  return (
    <>
    <div className="">
       {detailState?<><CustomerServiceDetailPage details={detailPageData} apiData={apiData}/></>:<><div
         className="table-responsive overflow-scroll table1"
         style={{ minHeight: "49vh" }}
       >
         <table
           className="table  table-striped overflow-scroll"
           //   style={{ width: "60vw" }}
         >
           <thead>
             {/* table heading */}
             <tr className="sticky-top">
               <th
                 style={{
                   width: "100px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Case
               </th>
               <th
                 style={{
                   width: "100px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Manufacture
               </th>
               <th
                 style={{
                   width: "100px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Account
               </th>
               <th
                 style={{
                   width: "100px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Contact
               </th>
               <th
                 style={{
                   width: "400px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Case Reason
               </th>
               <th
                 style={{
                   width: "100px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Status
               </th>
               <th
                 style={{
                   width: "100px",
                   backgroundColor: "#828283",
                   color: "white",
                   fontSize: "20px",
                   fontWeight: "normal",
                 }}
               >
                 Date
               </th>
             </tr>
           </thead>
           <tbody>
             {apiData?.data?.records?.length === 0 ? (
               <>
                 <tr className="d-flex align-items-center justify-content-center">
                   No data
                 </tr>
               </>
             ) : (
               <>
                 {apiData?.data?.records?.map((ele, index) => {
                   return (
                     <>
                       <tr key={index}>
                         <td className="align-middle">
                           <button className="caseNumber" onClick={()=>handleDetails(ele)}>
                             {" "}
                             {ele.CaseNumber}
                           </button>
                         </td>
                         <td className="align-middle text-center">
                           {ele.ManufacturerName}
                         </td>
                         <td className="align-middle text-center">
                           {ele.AccountName}
                         </td>
                         <td className="align-middle text-center">
                           {ele.ContactName}
                         </td>
                         <td className="align-middle text-center">
                           {ele.Reason}
                         </td>
                         <td className="align-middle text-center">
                           {ele.Status}
                         </td>
                         <td className="align-middle text-center">
                           {ele.Date_Opened__c}
                         </td>
                       </tr>
                     </>
                   );
                 })}
               </>
             )}
           </tbody>
         </table>
       </div></>}
     </div>
   </>
  );
};

export default CustomerServiceIssueTable;
