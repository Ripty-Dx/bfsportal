import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Header1 from "./Header1";
import { HiOutlineDownload } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderDetails } from "../api/useOrderDetails";
import beautyProduct from "../images/BFS Portal Site.png";
import Loading from "../utils/Loading";
import logo from "../images/BeautyFashionLogo.png";

import "./OrderList.css";
import "./Product.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const o={
  "status": 200,
  "data": {
      "attributes": {
          "type": "Opportunity",
          "url": "/services/data/v56.0/sobjects/Opportunity/006Rb000001SVUwIAO"
      },
      "Id": "006Rb000001SVUwIAO",
      "IsDeleted": false,
      "AccountId": "0013b0000249nSbAAI",
      "IsPrivate": false,
      "Name": "DesignersX Test Account",
      "Description": null,
      "StageName": "Closed Won",
      "Amount": 187.5,
      "Probability": 100,
      "ExpectedRevenue": 187.5,
      "TotalOpportunityQuantity": 3,
      "CloseDate": "2023-09-26",
      "Type": "Wholesale Numbers",
      "NextStep": null,
      "LeadSource": null,
      "IsClosed": true,
      "IsWon": true,
      "ForecastCategory": "Closed",
      "ForecastCategoryName": "Closed",
      "CampaignId": null,
      "HasOpportunityLineItem": true,
      "Pricebook2Id": "01s14000000hu28AAA",
      "OwnerId": "0053b00000CwOnLAAV",
      "CreatedDate": "2023-09-26T06:16:06.000+0000",
      "CreatedById": "0053b00000DgEVEAA3",
      "LastModifiedDate": "2023-09-26T06:16:07.000+0000",
      "LastModifiedById": "0053b00000DgEVEAA3",
      "SystemModstamp": "2023-09-26T06:16:07.000+0000",
      "LastActivityDate": null,
      "PushCount": 0,
      "LastStageChangeDate": null,
      "FiscalQuarter": 3,
      "FiscalYear": 2023,
      "Fiscal": "2023 3",
      "ContactId": null,
      "LastViewedDate": "2023-09-26T09:38:55.000+0000",
      "LastReferencedDate": "2023-09-26T09:38:55.000+0000",
      "SyncedQuoteId": null,
      "ContractId": null,
      "HasOpenActivity": false,
      "HasOverdueTask": false,
      "LastAmountChangedHistoryId": "008Rb000001UrCqIAK",
      "LastCloseDateChangedHistoryId": null,
      "Season__c": "Wholesale Order",
      "Order_Number__c": null,
      "Out_of_Stock_Items__c": null,
      "Out_of_Stock_Amount__c": null,
      "Account_ID__c": "0013b0000249nSb",
      "Ordered__c": 1,
      "PO_Number__c": "DT092623RE001",
      "Tracking__c": null,
      "Status__c": null,
      "Match_Mismatch__c": 1,
      "Out_of_Stock_Roll_Amount__c": 0,
      "Free_tester_for_6_of_each__c": false,
      "Pre_order_name__c": null,
      "Contact_Email__c": null,
      "Target_Goal__c": "a0uRb000000NCBlIAO",
      "Shipping_Street__c": null,
      "Collateral_request__c": null,
      "Shipping_City__c": null,
      "Shipping_Country__c": null,
      "Shipping_State__c": null,
      "Shipping_Zip__c": null,
      "Account_Owner_FirstName__c": "Harsh",
      "ManufacturerId__c": "a0O3b00000pY2vqEAC",
      "ManufacturerName__c": "ReVive",
      "Is_Active_Manufacturer__c": true,
      "isShowOnDashoards__c": true,
      "Shipping_Account_Number__c": null,
      "Shipping_method__c": null,
      "Gratis_Date__c": null,
      "Account_Number__c": null,
      "Wholesale_Invoice__c": false,
      "Tester_Invoice__c": false,
      "Actual_Ship_Amount__c": null,
      "DB_Competitor__c": null,
      "Close_Date2__c": "2023-09-26",
      "Payment_Type__c": null,
      "PBL_Status__c": null,
      "Synced_Status__c": "1",
      "OpportunityLineItems": [
          {
              "attributes": {
                  "type": "OpportunityLineItem",
                  "url": "/services/data/v56.0/sobjects/OpportunityLineItem/00kRb000000tbLVIAY"
              },
              "Id": "00kRb000000tbLVIAY",
              "OpportunityId": "006Rb000001SVUwIAO",
              "SortOrder": null,
              "PricebookEntryId": "01u3b00000VqdVAAAZ",
              "Product2Id": "01t3b000006BKYyAAO",
              "ProductCode": "12609916",
              "Name": "DesignersX Test Account ACNE REPARATIF",
              "Quantity": 3,
              "Discount": null,
              "Subtotal": 187.5,
              "TotalPrice": 187.5,
              "UnitPrice": 62.5,
              "ListPrice": 125,
              "ServiceDate": null,
              "Description": null,
              "CreatedDate": "2023-09-26T06:16:07.000+0000",
              "CreatedById": "0053b00000DgEVEAA3",
              "LastModifiedDate": "2023-09-26T06:16:07.000+0000",
              "LastModifiedById": "0053b00000DgEVEAA3",
              "SystemModstamp": "2023-09-26T06:16:07.000+0000",
              "IsDeleted": false,
              "LastViewedDate": null,
              "LastReferencedDate": null
          }
      ]
  }
}
const OrderDetail = (props) => {
  const pdfRef=useRef();
  const location = useLocation();
  const navigate = useNavigate();
  // const orderDetailData = useOrderDetails(location.state.Opportunity_id);
  const orderDetailData=o.data;
  // console.log("orderDetailData", orderDetailData);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateFormat = (elementDate) => {
    const month = months[elementDate?.substring(5, 7) - 1];
    return `${month} ${elementDate?.substring(8, 10)}, ${elementDate?.substring(0, 4)}`;
  };
  const handleInvoicePDF = () => {
    // const elementData = orderDetailData.OpportunityLineItems.map((ele, index) => ele);
    navigate("/invoice", {
      state: {
        elementData:orderDetailData,
        issueDate:dateFormat(orderDetailData?.CloseDate),
      },
    });
    const input=pdfRef.current;
    html2canvas(input).then((canvas)=>{
      console.log(canvas);
      const imgData=canvas.toDataURL("image/png");
      const pdf=new jsPDF('p','mm','a4',true);
      const pdfWidth=pdf.internal.pageSize.getWidth();
      const pdfHeight=pdf.internal.pageSize.getHeight();
      const imgWidth=canvas.width;
      const imgHeight=canvas.height;
      const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
      const imgX=(pdfWidth-imgWidth*ratio)/2;
      const imgY=30;
      console.log(pdfWidth,imgWidth,ratio,canvas);
      console.log(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
      pdf.save("invoice.pdf"); 
    })
  };
  return (
    <>
      <Header1 />

      <div>
        {orderDetailData ? (
          <div className="container-fluid" style={{ minHeight: "60vh" }}>
            <div className="row d-flex align-items-center justify-content-md-center">
              {/* Your account heading */}
              <div className="col-lg-6  p-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2">
                <h2 className="fw-bold fw-md-normal ">
                  <BiLeftArrowAlt className="back_icon me-2" onClick={() => (window.location.href = "/orderList")} /> Order Detail
                </h2>
              </div>
              <div className="col-lg-5 d-flex justify-content-center align-items-center">
                <h5 className="fw-bolder">Account&nbsp;: &nbsp;</h5>
                {/* <h5>{location.state.acc_name}</h5> */}
                <h5>{orderDetailData.Name}</h5>
              </div>
            </div>
            <div className="row d-flex justify-content-around">
              <div className="previewOrderMainDiv pb-3">
                <div className="col-9 pt-2">
                  {/* Preview Order DIV */}
                  <div className="mb-2 d-flex  justify-content-between align-items-center">
                    <div className=" col-10 previewOrderDiv">
                      <h3 className="previewOrder">PO Number : {orderDetailData?.PO_Number__c} </h3>
                    </div>
                    <div className="col-2" style={{ textAlign: "end" }}>
                      <button className="Button" onClick={handleInvoicePDF}>
                        Invoice <HiOutlineDownload />
                      </button>
                    </div>
                  </div>
                  <hr className="line"></hr>
                  <div>
                    <h5 className="m-0 ps-1">PRODUCTS</h5>
                  </div>
                  <hr className="line"></hr>
                  {/* Ordered Items */}
                  <div className="table-responsive overflow-auto" style={{ minHeight: "40vh" }}>
                    <table className="table overflow-auto">
                      <thead>
                        {/* table heading */}
                        <tr className="sticky-top">
                          <th style={{ width: "100px" }} className="tableHeading tdStyle">
                            Image
                          </th>
                          <th style={{ width: "260px" }} className="tableHeading tdStyle">
                            Product Name
                          </th>
                          <th style={{ width: "100px" }} className="tableHeading tdStyle">
                            Quantity
                          </th>
                          <th style={{ width: "130px" }} className="tableHeading tdStyle">
                            Product Price
                          </th>
                          <th style={{ width: "100px" }} className="tableHeading tdStyle">
                            Discount (%)
                          </th>
                          <th style={{ width: "100px" }} className="tableHeading tdStyle">
                            Sale Price
                          </th>
                          <th style={{ width: "130px" }} className="tableHeading tdStyle">
                            Total Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetailData.OpportunityLineItems.map((ele, index) => {
                          const Discount = ((ele.ListPrice - ele.UnitPrice) / ele.ListPrice) * 100;
                          return (
                            <>
                              <tr>
                                <td className="tdStyle">
                                  <img src={beautyProduct} height={"50px"} width={"50px"} alt="img" className="rounded-5 border-2 mt-2"></img>
                                </td>
                                <td className="tdStyle">{ele.Name}</td>
                                <td className="tdStyle">{ele.Quantity}</td>
                                <td className="tdStyle">{Number(ele.ListPrice).toFixed(2)}</td>
                                <td className="tdStyle">{Discount}</td>
                                <td className="tdStyle">{Number(ele.UnitPrice).toFixed(2)}</td>
                                <td className="tdStyle">{Number(ele.TotalPrice).toFixed(2)}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <hr className="line"></hr>
                  {/* Billing DIv */}
                  <div>
                    <div className=" m-0 ps-2 pe-3 col-12 d-flex  justify-content-between align-items-center">
                      <h5 className="billing">Sub Total :</h5>
                      <h5 className="billing">$ {orderDetailData?.Amount.toFixed(2)}</h5>
                    </div>
                    <div className="m-0 ps-2 pe-3 col-12 d-flex  justify-content-between align-items-center">
                      <h5 className="billing">Shipping :</h5>
                      <h5 className="billing">$0.00</h5>
                    </div>
                    <div className=" ps-2 pe-3 col-12 d-flex  justify-content-between align-items-center">
                      <h5 className="billing">Tax (GST) :</h5>
                      <h5 className="billing">$0.00</h5>
                    </div>
                  </div>
                  <hr className="p-0 m-1" />
                  {/* Total Amount */}
                  <div className=" m-0 pe-3 ps-2 col-12 d-flex  justify-content-between align-items-center">
                    <h5 className="billing total">Total Price</h5>
                    <h5 className="billing total">$ {orderDetailData?.Amount.toFixed(2)}</h5>
                  </div>
                  <hr className="p-0 m-1" />
                </div>
                <div className="col-3 p-2">
                  {/* summary div */}
                  <div className="summaryDiv">
                    <h3 className="fw-bold heading">Summary</h3>
                    <p className="fs-small lightFontColor">PO Number: {orderDetailData?.PO_Number__c}</p>
                    <p className="fs-small lightFontColor">Order Date: {dateFormat(orderDetailData?.CloseDate)}</p>
                    <p className="fs-small lightFontColor">Order Total: ${orderDetailData?.Amount.toFixed(2)}</p>
                  </div>
                  {/* shipping address div */}
                  <div className="summaryDiv">
                    <h3 className=" fw-bold heading">Shipping Address</h3>
                    <p className="fs-small lightFontColor">abcde abcde abcde abcde</p>
                    <p className="fs-small lightFontColor">abcde abcde abcde abcde</p>
                    <p className="fs-small lightFontColor">abcde abcde abcde abcde</p>
                    <p className="fs-small lightFontColor">abcde abcde abcde abcde</p>
                    <p className="fs-small lightFontColor">abcde abcde abcde abcde</p>
                  </div>
                  {/* Payment div */}
                  <div className="summaryDiv">
                    <h3 className=" fw-bold heading"> Payment Method</h3>
                    <p className="fs-small lightFontColor">Pay on Delivery(Cash/Card).</p>
                    <p className="fs-small lightFontColor">Cash on Delivery(COD) avialable.</p>
                    <p className="fs-small lightFontColor">Card/Net banking acceptance subject to device availability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      
      {/* Footer */}
      <div className="bottom mt-3">
        <Footer />
      </div>
      {/* PDF DOcument */}
      <div className="invisible" ref={pdfRef}>
      <div className="bg-white p-5" style={{ minHeight: "100vh" }}>
        <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
          <div className="row">
            {/* logo */}
            <div className="d-flex justify-content-between gap-5">
              <div>
                <img className="mt-3" src={logo} alt="logo" height={"50%"} width={"60%"} />
              </div>
              <div className="pe-5">
                <div style={{ backgroundColor: "#e3e3e3", height: "5em", width: "5em" }}></div>
                <p style={{ fontSize: "1.2em", fontWeight: "500" }}>INVOICE</p>
              </div>
            </div>
            <div className="d-flex justify-content-between gap-5">
              <div>
                <p className="m-0 p-0">Beautyfashion sales groups ltd -22658</p>
                <p className="m-0 p-0">Support@Beautyfashion.com</p>
              </div>
              <div>
                <p className="m-0 p-0">Beautyfashion sales groups ltd -22658</p>
                <p className="m-0 p-0">Support@Beautyfashion.com</p>
              </div>
            </div>
            <hr className="mt-4" style={{ border: "1px solid #c1c9d2" }}></hr>
            <div className="d-flex justify-content-between px-3 gap-5">
              <p>Issue Date: {dateFormat(orderDetailData?.CloseDate)}</p>
              <p>PO Number: {orderDetailData?.PO_Number__c}</p>
              <p>user@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th className="tdStyle">#</th>
                <th className="tdStyle">Description</th>
                <th className="tdStyle">Price</th>
                <th className="tdStyle">Quantity</th>
                <th className="tdStyle">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetailData?.OpportunityLineItems.map((ele, index) => {
                const Discount = ((ele.ListPrice - ele.UnitPrice) / ele.ListPrice) * 100;
                return (
                  <>
                    <tr>
                      <td className="tdStyle">{index + 1}</td>
                      <td className="tdStyle" style={{ width: "300px" }}>
                        {ele.Name}
                      </td>
                      <td className="tdStyle">{Number(ele.UnitPrice).toFixed(2)}</td>
                      <td className="tdStyle">{ele.Quantity}</td>
                      <td className="tdStyle">{Number(ele.TotalPrice).toFixed(2)}</td>
                    </tr>
                  </>
                );
                })}
            </tbody>
          </table>
        </div>
        <hr className="mt-4" style={{ border: "1.25px solid #c1c9d2" }}></hr>
        <div className="d-flex justify-content-between gap-5 p-4">
          <div className="col-auto">
            <div style={{height:"4em"}}></div>
            <hr style={{ border: "1.25px solid #9fa6ae" }}></hr>
            <div className="billing total">Authorized Sign</div>
          </div>
          <div className="col-3">
            <div className=" m-0  col-12 d-flex  justify-content-between align-items-center">
              <div className="tdStyle">Sub Total </div>
              <div className="tdStyle">:</div>
              <div className="tdStyle">$ {orderDetailData?.Amount.toFixed(2)}</div>
            </div>
            <div className="m-0  col-12 d-flex  justify-content-between align-items-center">
              <div className="tdStyle">Shipping </div>
              <div className="tdStyle">:</div>
              <div className="tdStyle">$0.00</div>
            </div>
            <div className="  col-12 d-flex  justify-content-between align-items-center">
              <div className="tdStyle">Discount (%)</div>
              <div className="tdStyle">:</div>
              <div className="tdStyle">{Number(localStorage.getItem("discount")).toFixed(2)}</div>
            </div>
            <div className="  col-12 d-flex  justify-content-between align-items-center">
              <div className="tdStyle">Tax (GST)</div>
              <div className="tdStyle">:</div>
              <div className="tdStyle">$0.00</div>
            </div>
            <div className=" m-0  col-12 d-flex  justify-content-between align-items-center">
              <h5 className="billing total">Total Price</h5>
              <h5 className="billing total">:</h5>
              <h5 className="billing total">$ {orderDetailData?.Amount.toFixed(2)}</h5>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default OrderDetail;
