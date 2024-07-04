import React, { Component } from "react";
import Sidebar from "./sidebar";
import Leavedetails from './leavedetails';
import Todayleaves from './todayleaves';

import Select from 'react-select'


class Leave extends Component {
  


  render() {
    const leave = [
      { value: 'Working from home', label: 'Personal Leave' },
      { value: 'Sick Leave', label: 'Compensatory Leave' },
      //{ value: 'Parental Leave', label: 'Sick Leave' },
      // { value: 'Annual Leave', label: 'Annual Leave' }
    ];
    const half = [
      { value: 'Select', label: 'Select' },
      { value: 'First half', label: 'First half' },
      { value: 'Seconf Half', label: 'Secoond Half' },
  
    ];
    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
              <Sidebar />
            </div>
            <div className="col-xl-9 col-lg-8  col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="card ctm-border-radius shadow-sm">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Apply Leaves</h4>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                Leave Type
                                <span className="text-danger">*</span>
                              </label>
                               <Select options={leave} />
                            </div>
                          </div>
                          {/* <div className="col-sm-6 leave-col">
                            <div className="form-group">
                              <label>Remaining Leaves</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="10"
                                disabled
                              />
                            </div>
                          </div> */}
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                            <label>
                                From
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="Date"
                                className="form-control datetimepicker"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 leave-col">
                            <div className="form-group">
                            <label>
                                To
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="Date"
                                className="form-control datetimepicker"
                              />
                            </div>
                          </div>
                        </div>
                        
                          <div className="col-sm-6">
                            <div className="form-group">
                            <label>
                                Employee ID
                              </label>
                              <input
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </div>
                        <div className="row">
                          <div className="col-sm-6">
                            {/* <div className="form-group">
                              <label>
                                Half Day
                                <span className="text-danger">*</span>
                              </label>
                              <Select options={half} />
                            </div> */}
                          </div>
                          <div className="col-sm-6 leave-col">
                            {/* <div className="form-group">
                              <label>Number of Days Leave</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="2"
                                disabled
                              />
                            </div> */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group mb-0">
                              <label>Reason</label>
                              <textarea
                                className="form-control"
                                rows={4}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <a
                            href="#0"
                            className="btn btn-theme button-1 text-white ctm-border-radius mt-4"
                          >
                            Apply
                          </a>
                          <a
                            href="#0"
                            className="btn btn-danger text-white ctm-border-radius mt-4"
                          >
                            Cancel
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* col */}
                <div className="col-md-12">
									<div className="card ctm-border-radius shadow-sm">
										<div className="card-header">
											<h4 className="card-title mb-0">Today Leaves</h4>
										</div>
										<div className="card-body">
											<div className="employee-office-table">
												<div className="table-responsive">
                               <Leavedetails />
                          </div>
                      </div>
                    </div> 
                    </div>
                 </div>    
                   {/* col */}
                   <div className="col-md-12">
									<div className="card ctm-border-radius shadow-sm">
										<div className="card-header">
											<h4 className="card-title mb-0">Today Leaves</h4>
										</div>
										<div className="card-body">
											<div className="employee-office-table">
												<div className="table-responsive">
                              <Todayleaves />
                          </div>
                      </div>
                    </div> 
                    </div>
                 </div>    
                   {/* col */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leave;
