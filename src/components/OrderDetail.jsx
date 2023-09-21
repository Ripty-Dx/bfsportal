import React from "react";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Header1 from "./Header1";
import { HiOutlineDownload } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useOrderDetails } from "../api/useOrderDetails";
import "./Product.css"

const OrderDetail = (props) => {
  const location=useLocation();
  // console.log(location.state.Opportunity_id);
  const orderDetailData=useOrderDetails(location.state.Opportunity_id);
  console.log(orderDetailData);
  let subTotal = 0;
  const currentDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  return (
    <>
      <Header1 />
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
            <h5>{localStorage.getItem("Account")}</h5>
          </div>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="previewOrderMainDiv pb-3">
            <div className="col-9 pt-2">
              {/* Preview Order DIV */}
              <div className="mb-2 d-flex  justify-content-between align-items-center">
                <div className=" col-10 previewOrderDiv">
                  <h3 className="previewOrder">PO Number : AB082923EL001 </h3>
                </div>
                <div className="col-2" style={{ textAlign: "end" }}>
                  <button className="Button">
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
              <div className="table-responsive overflow-auto" style={{ height: "40vh" }}>
                <table className="table table-striped overflow-auto">
                  <thead>
                    {/* table heading */}
                    <tr className="sticky-top">
                      <th style={{ width: "100px" }} className="tableHeading">
                        Image
                      </th>
                      <th style={{ width: "200px" }} className="tableHeading">
                        Product Name
                      </th>
                      <th style={{ width: "100px" }} className="tableHeading">
                        Quantity
                      </th>
                      <th style={{ width: "130px" }} className="tableHeading">
                        Product Price
                      </th>
                      <th style={{ width: "130px" }} className="tableHeading">
                        Discount (%)
                      </th>
                      <th style={{ width: "130px" }} className="tableHeading">
                        Sale Price
                      </th>
                      <th style={{ width: "200px" }} className="tableHeading">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>

              <hr className="line"></hr>
              {/* Billing DIv */}
              <div>
                <div className=" m-0 ps-2 pe-3 col-12 d-flex  justify-content-between align-items-center">
                  <h5 className="billing">Sub Total :</h5>
                  <h5 className="billing">${subTotal.toFixed(2)}</h5>
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
                <h5 className="billing total">${subTotal.toFixed(2)}</h5>
              </div>
              <hr className="p-0 m-1" />
            </div>
            <div className="col-3 p-2">
              {/* summary div */}
              <div className="summaryDiv">
                <h3 className="fw-bold heading">Summary</h3>
                <p className="fs-small lightFontColor">PO Number: XXXXXX</p>
                <p className="fs-small lightFontColor">Order Date: {date}</p>
                <p className="fs-small lightFontColor">Order Total: ${subTotal.toFixed(2)}</p>
              </div>
              {/* shipping address div */}
              <div className="summaryDiv">
                <h3 className=" fw-bold heading">Shipping Address</h3>
                <p className="fs-small lightFontColor">&nbsp;</p>
                <p className="fs-small lightFontColor">&nbsp;</p>
                <p className="fs-small lightFontColor">&nbsp;</p>
                <p className="fs-small lightFontColor">&nbsp;</p>
                <p className="fs-small lightFontColor">&nbsp;</p>
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
      {/* Footer */}
      <div className="bottom mt-3">
        <Footer />
      </div>
    </>
  );
};

export default OrderDetail;
