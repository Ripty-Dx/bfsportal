import React, { useEffect } from "react";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Header1 from "./Header1";
import { HiOutlineDownload } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderDetails } from "../api/useOrderDetails";
import beautyProduct from "../images/BFS Portal Site.png";
import Loading from "../utils/Loading";
import "./OrderList.css";
import "./Product.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const OrderDetail = (props) => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetailData = useOrderDetails(location.state.Opportunity_id);
  // console.log("orderDetailData", orderDetailData);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateFormat = (elementDate) => {
    const month = months[elementDate?.substring(5, 7) - 1];
    return `${month} ${elementDate?.substring(8, 10)}, ${elementDate?.substring(0, 4)}`;
  };
  const handleInvoicePDF = () => {
    const elementData = orderDetailData.OpportunityLineItems.map((ele, index) => ele);
    navigate("/invoice", {
      state: {
        elementData:orderDetailData,
        issueDate:dateFormat(orderDetailData?.CloseDate),
      },
    });
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
    </>
  );
};

export default OrderDetail;
