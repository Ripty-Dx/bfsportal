import React from "react";

const MarketingSupportAddNew = () => {
  return (
    <>
      <div className="mt-1">
        {/* basic info */}
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
              <label className="form-label">Priority</label>
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
              <label className="form-label">
                <span className="text-danger">*</span> Case Reason
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        {/* Case info */}
        <div className="mt-5 basicInfo d-flex justify-content-evenly position-relative">
          <div className="basicInfoHeadingDiv ">Case Information</div>
          <div className="row ">
            <div className="col-12 d-flex justify-content-around">
              <div className="col-5">
                <div className="mb-3 mt-4">
                  <label className="form-label">
                    <span className="text-danger">*</span> Associated Invoice
                    Number
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    GWP Sample Qty and Sku Needed
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-5">
                <div className="mb-3 mt-4">
                  <label className="form-label">Where to Ship Items</label>
                  <input type="text" className="form-control" />
                </div>{" "}
              </div>
            </div>
            <div className="col-12 d-flex justify-content-evenly">
              <div className="mb-3 col-11 d-flex flex-column justify-content-evenly ">
                <label className="form-label"> Subject</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-12  d-flex justify-content-evenly">
              <div className="mb-3 col-11 d-flex flex-column justify-content-evenly ">
                <label className="form-label"> Description</label>
                <textarea className="form-control" />
              </div>
            </div>
          </div>
        </div>
        {/* save button */}
        <div className="d-flex justify-content-center">
          <button className="Button mt-3 px-5">Save</button>
        </div>
      </div>
    </>
  );
};

export default MarketingSupportAddNew;
