import React from "react";
import Header1 from "./Header1";
import { BiLeftArrowAlt } from "react-icons/bi";
import "./OrderPreview.css";
import beautyProduct from "../images/BFS Portal Site.png";
import Footer from "./Footer";
const OrderPreview = () => {
  const data = localStorage.getItem("Ordered Items");
  const discount = localStorage.getItem("discount");
  const orderedItemsName = Object.keys(JSON.parse(data));
  let salePrice = 0;
  let totalPriceOfProduct = 0;
  let subTotal=0;
  const currentDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = `${months[(currentDate.getMonth())]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;


  // console.log();
  // console.log(orderedItemsName.length,typeof(orderedItemsName));
  // console.log(Object.values(Object.values(JSON.parse(data))[2][0])[0].Category__c);
  //   const salePrice = Object.values(Object.values(JSON.parse(data))[2][0])[0]
  //     .usdRetail__c;
  //   console.log(salePrice);

  //  console.log( salePrice.includes("$")
  //  ? (+salePrice.substring(1) - (discount / 100) * +salePrice.substring(1)).toFixed(2)
  //  : (+salePrice - (discount / 100) * +salePrice).toFixed(2));

  return (
    <>
      <Header1 />
      <div className="container-fluid" style={{ minHeight: "60vh" }}>
        <div className="row d-flex align-items-center justify-content-md-center">
          {/* Your account heading */}
          <div className="col-lg-5  p-lg-2 col-md-auto py-md-1 ps-md-3 mx-md-auto m-sm-2">
            <h2 className="fw-bold fw-md-normal ">
              <BiLeftArrowAlt
                className="back_icon me-2"
                onClick={() => (window.location.href = "/product")}
              />{" "}
              {localStorage.getItem("brand")}
            </h2>
          </div>
          <div className="col-lg-5 d-flex justify-content-center align-items-center">
            <h5 className="fw-bolder">Account&nbsp;: &nbsp;</h5>
            {/* <h5>{location.state.acc_name}</h5> */}
            <h5>{localStorage.getItem("Account")}</h5>
          </div>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="previewOrderMainDiv">
            <div className="col-9 ">
              {/* Preview Order DIV */}
              <div className="mb-2 d-flex  justify-content-between align-items-center">
                <div className=" col-6 previewOrderDiv">
                  <h3 className="previewOrder">Preview Order</h3>
                </div>
                <div className="col-6 PONumberDiv">
                  <h4 className="fw-bold PONumber">PO Number </h4>{" "}
                  <span className="PONumberValue">AB082923EL001</span>
                </div>
              </div>
              <hr className="line"></hr>
              <div>
                <h5 className="m-0 ps-1">PRODUCTS</h5>
              </div>
              <hr className="line"></hr>
              {/* Ordered Items */}
              <div
                className="table-responsive overflow-auto"
                style={{ height: "40vh" }}
              >
                <table
                  className="table table-striped overflow-auto"
                  //   style={{ width: "60vw" }}
                >
                  <thead>
                    {/* table heading */}
                    <tr className="sticky-top">
                      <th
                        scope="col"
                        style={{
                          width: "100px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: "200px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: "130px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: "100px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: "130px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Product Price
                      </th>{" "}
                      <th
                        scope="col"
                        style={{
                          width: "130px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Discount (%)
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: "130px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Sale Price
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: "200px",
                          color: "#9fabb9",
                          fontWeight: "500",
                        }}
                        className="tableHeading"
                      >
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedItemsName?.map((ele, index) => {
                      salePrice = Object.values(
                        Object.values(JSON.parse(data))[index][0]
                      )[0].usdRetail__c;
                      totalPriceOfProduct = (+Object.values(
                        Object.values(JSON.parse(data))[index][1]
                      )[0])*(salePrice.includes("$")
                      ? (
                          +salePrice.substring(1) -
                          (discount / 100) * +salePrice.substring(1)
                        ).toFixed(2)
                      : (
                          +salePrice -
                          (discount / 100) * +salePrice
                        ).toFixed(2));
                        subTotal+=totalPriceOfProduct
                      // console.log(salePrice.substring(1)*5);
                      // console.log(+totalPriceOfProduct);
                      return (
                        <>
                          <tr key={index}>
                            {/* image */}
                            <td
                              style={{
                                width: "100px",
                              }}
                              className="p-0 ps-2"
                            >
                              <img
                                src={beautyProduct}
                                height={"30px"}
                                width={"30px"}
                                alt="img"
                                className="rounded-5 border-2 mt-2"
                              ></img>
                            </td>
                            {/* product name */}
                            <td
                              style={{
                                width: "100px",
                              }}
                            >
                              {ele}
                            </td>
                            {/* category */}
                            <td>
                              {
                                Object.values(
                                  Object.values(JSON.parse(data))[index][0]
                                )[0].Category__c
                              }
                            </td>
                            {/* quantity */}
                            <td>
                              {
                                Object.values(
                                  Object.values(JSON.parse(data))[index][1]
                                )[0]
                              }
                            </td>
                            {/* product price */}
                            <td>
                              {salePrice.includes("$")
                                ? `$${(+salePrice.substring(1)).toFixed(2)}`
                                : `$${salePrice}.00`}
                            </td>
                            {/* discount */}
                            <td>{discount}</td>
                            {/*  salePrice */}
                            <td>
                              $
                              {salePrice.includes("$")
                                ? (
                                    +salePrice.substring(1) -
                                    (discount / 100) * +salePrice.substring(1)
                                  ).toFixed(2)
                                : (
                                    +salePrice -
                                    (discount / 100) * +salePrice
                                  ).toFixed(2)}
                            </td>
                            {/* total price */}
                            <td>${totalPriceOfProduct.toFixed(2)}</td>
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
                <p className="fs-small lightFontColor">
                  Order Date: {date}
                </p>
                <p className="fs-small lightFontColor">Order Total: ${subTotal.toFixed(2)}</p>
                <h6 className="fs-6 fw-bold">Add Notes</h6>
              </div>
              {/* shipping address div */}
              <div className="summaryDiv">
                <h3 className=" fw-bold heading">Shipping Address</h3>
                <p className="fs-small lightFontColor">Gerg Harvell</p>
                <p className="fs-small lightFontColor">568, Suite Ave.</p>
                <p className="fs-small lightFontColor">Australia, 23513</p>
                <p className="fs-small lightFontColor">
                  Contact No. 1234567890
                </p>
              </div>
              {/* Payment div */}
              <div className="summaryDiv">
                <h3 className=" fw-bold heading"> Payment Method</h3>
                <p className="fs-small lightFontColor">
                  Pay on Delivery(Cash/Card).
                </p>
                <p className="fs-small lightFontColor">
                  Cash on Delivery(COD) avialable.
                </p>
                <p className="fs-small lightFontColor">
                  Card/Net banking acceptance subject to device availability.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-around mt-3">
          <button className="Button mb-1">Submit</button>
        </div>
      </div>
      {/* Footer */}
      <div className="bottom mt-3">
        <Footer />
      </div>
    </>
  );
};

export default OrderPreview;
