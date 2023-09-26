import React from "react";
import logo from "../images/BeautyFashionLogo.png";
import { useLocation } from "react-router-dom";

const InvoicePDF = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
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
              <p>Issue Date: {location.state.issueDate}</p>
              <p>PO Number: {location.state.elementData.PO_Number__c}</p>
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
              {location.state.elementData.OpportunityLineItems.map((ele, index) => {
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
              <div className="tdStyle">$ {location.state.elementData?.Amount.toFixed(2)}</div>
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
              <h5 className="billing total">$ {location.state.elementData?.Amount.toFixed(2)}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePDF;
