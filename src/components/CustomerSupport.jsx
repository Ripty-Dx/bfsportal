import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import "./CustomerSupport.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

const customerSupport = () => {
  const addInfo = () => {};
  return (
    <>
      <Header1 />
      <div
        className="container-fluid mb-2 "
        style={{ minHeight: "70vh", backgroundColor: "#fafafa" }}
      >
        <div className="row d-flex align-items-center justify-content-md-between pt-3">
          {/* Your account heading */}
          <div className="col-1"></div>
          <div className="col-8 p-0 d-flex flex-direction-column justify-content-start align-items-center">
            <h3 className="fw-bold fs-4  fw-md-normal ">
              <BiLeftArrowAlt
                className="back_icon me-2"
                onClick={(e) => (window.location.href = "/")}
              />{" "}
              CUSTOMER SUPPORT
            </h3>
            <h5 className="subCategory">
              &nbsp;-&nbsp;Customer Service Issues
            </h5>
          </div>
          <div className="col-2 ">
            <button
              className=" ms-2 Button d-flex align-items-center justify-content-center"
              onClick={addInfo}
            >
              Add New
              <AiOutlinePlusCircle className="mx-2" />
            </button>
          </div>
          <div className="col-1"></div>
        </div>
        {/* sub categories */}
        <div className="row d-flex align-items-center justify-content-md-between pt-3">
          <div className="col-1"></div>
          <div className="col-10 d-flex ">
            <div className="col-4">
              <div>
                <button className="subcategoryButton">
                  Customer Service Issues
                </button>
                <button className="subcategoryButton">Management Cases</button>
                <button className="subcategoryButton">
                  Marketing Support Issues
                </button>
                <button className="subcategoryButton">Order Status</button>
              </div>
            </div>
            <div className="col-8">
              <div className="d-none">
                <div
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
                    <tbody></tbody>
                  </table>
                </div>
              </div>

              <div className="basicInfo d-flex justify-content-evenly position-relative">
                <div className="basicInfoHeadingDiv ">Basic Information</div>
                <div className="col-5">
                  <div className="mb-3 mt-4">
                    <label className="form-label">
                      <span className="text-danger">*</span> Account Name
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <span className="text-danger">*</span> Manufacturer
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <span className="text-danger">*</span> Case Reason
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-5">
                  <div className="mb-3 mt-4">
                    <label className="form-label">
                      <span className="text-danger">*</span> Contact Name
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"> Opportunity</label>
                    <input type="text" className="form-control" />
                  </div>{" "}
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="mt-5 basicInfo d-flex justify-content-evenly position-relative">
                <div className="basicInfoHeadingDiv ">Case Information</div>
                <div className="col-12 d-flex justify-content-evenly">
                  <div className="col-5">
                    <div className="mb-3 mt-4">
                      <label className="form-label">
                        {" "}
                        Associated PO Number
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        <span className="text-danger">*</span> Associated
                        Invoice Number
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mb-3 mt-4">
                      <label className="form-label">
                        Associated Order Number
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        <span className="text-danger">*</span> Net Value of DIF
                        or CM Amount
                      </label>
                      <input type="text" className="form-control" />
                    </div>{" "}
                  </div>
                </div>
                <div className="mb-3 mt-4  ">
                  <label className="form-label"> Subject</label>
                  <input type="text" className="form-control" />
                </div>  
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="bottom mt-3">
        <Footer />
      </div>
    </>
  );
};

export default customerSupport;
