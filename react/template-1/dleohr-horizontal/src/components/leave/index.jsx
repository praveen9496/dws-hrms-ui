import React, { Component } from "react";
import Sidebar from "./sidebar";
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

class Leave extends Component {
  constructor(props) {
    super(props);
    const storedEmployeeID = localStorage.getItem('EmployeeID');
    const leaveTypeFromState = props.location.state ? props.location.state.leaveType : null;

    this.state = {
      EmployeeID: storedEmployeeID || "",  
      leaveType: leaveTypeFromState ? { value: leaveTypeFromState, label: leaveTypeFromState } : null,  
      fromDate: "",  
      toDate: "",  
      reasonForLeave: "",  
      leaveDuration: null,
      showError: false,
      errorMessage: "",
      showSuccessMessage: false,
      successMessage: ""
    };
  }

  componentDidMount() {
    const storedEmployeeID = localStorage.getItem('EmployeeID');
    if (storedEmployeeID) {
      this.setState({ EmployeeID: storedEmployeeID });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.clearErrorMessage);
  };

  handleSelectChange = (name, selectedOption) => {
    this.setState({ [name]: selectedOption }, this.clearErrorMessage);
  };

  clearErrorMessage = () => {
    this.setState({ showError: false, errorMessage: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { EmployeeID, leaveType, fromDate, toDate, reasonForLeave, leaveDuration } = this.state;

    if (new Date(toDate) < new Date(fromDate)) {
      this.setState({ showError: true, errorMessage: "Please ensure To date is greater than or equal to From date." });
      return;
    }

    if (leaveDuration && leaveDuration.value === 'Half Day' && fromDate !== toDate) {
      this.setState({ showError: true, errorMessage: "For Half Day leave, the From and To dates must be the same." });
      return;
    }

    if (!EmployeeID || !leaveType || !fromDate || !toDate || !leaveDuration) {
      this.setState({ showError: true, errorMessage: "Please fill all the mandatory fields." });
      return;
    }

    fetch('http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/applyLeave', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'client_id': 'f166fc00447c4c358fd582d79f246f92',
        'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
      },
      body: JSON.stringify({
        EmployeeID,
        leaveType: leaveType ? leaveType.value : "",
        fromDate,
        toDate,
        reasonForLeave,
        leaveDuration: leaveDuration ? leaveDuration.value : ""
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      console.log(data);
      if (data.Status === "Leave Applied Successfully") {
        this.setState({
          showSuccessMessage: true,
          successMessage: "Leave applied successfully!",
          leaveType: null,
          fromDate: "",
          toDate: "",
          reasonForLeave: "",
          leaveDuration: null
        });
        setTimeout(() => {
          this.setState({ showSuccessMessage: false, successMessage: "" });
        }, 3000);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  render() {
    const leaveOptions = [
      { value: 'Personal Leave', label: 'Personal Leave' },
      { value: 'Sick Leave', label: 'Sick Leave' }
    ];

    const leaveDurationOptions = [
      { value: 'Half Day', label: 'Half Day' },
      { value: 'Full Day', label: 'Full Day' }
    ];

    const { EmployeeID, leaveType, fromDate, toDate, reasonForLeave, leaveDuration, showError, errorMessage, showSuccessMessage, successMessage } = this.state;

    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
              <Sidebar />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="card ctm-border-radius shadow-sm">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Apply Leaves</h4>
                    </div>
                    <div className="card-body">
                      {showError && <div className="alert alert-danger">{errorMessage}</div>}
                      {showSuccessMessage && <div className="alert alert-success popup-message">{successMessage}</div>}
                      <form onSubmit={this.handleSubmit}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                Leave Type
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={leaveOptions}
                                value={leaveType}
                                onChange={(selectedOption) => this.handleSelectChange("leaveType", selectedOption)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                Leave Duration
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={leaveDurationOptions}
                                value={leaveDuration}
                                onChange={(selectedOption) => this.handleSelectChange("leaveDuration", selectedOption)}
                              />
                            </div>
                          </div>
                          {/* <div className="col-sm-6">
                            <div className="form-group">
                              <label>Employee ID</label>
                              <span className="text-danger">*</span>
                              <input
                                type="text"
                                className="form-control"
                                value={EmployeeID}
                                onChange={this.handleInputChange}
                                name="EmployeeID"
                                readOnly // Make this field read-only since it's automatically populated
                              />
                            </div>
                          </div> */}
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>From</label>
                              <span className="text-danger">*</span>
                              <input
                                type="date"
                                className="form-control"
                                value={fromDate}
                                onChange={this.handleInputChange}
                                name="fromDate"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>To</label>
                              <span className="text-danger">*</span>
                              <input
                                type="date"
                                className="form-control"
                                value={toDate}
                                onChange={this.handleInputChange}
                                name="toDate"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Reason</label>
                              <textarea
                                className="form-control"
                                rows={4}
                                value={reasonForLeave}
                                onChange={this.handleInputChange}
                                name="reasonForLeave"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-theme button-1 text-white ctm-border-radius mt-4"
                          >
                            Apply
                          </button>
                          <a href="#0" className="btn btn-danger text-white ctm-border-radius mt-4">Cancel</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Leave);
