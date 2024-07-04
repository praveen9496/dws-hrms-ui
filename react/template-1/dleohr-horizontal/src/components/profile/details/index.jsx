import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import Sidebar from "../sidebar";
import { Redirect } from "react-router-dom"; // Assuming you're using react-router for routing

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      currentCategory: "",
      currentAction: "",
      inputData: {},
      detailsCategories: [
        { category: "hierarchyInformation", fields: { ReportingManager: "" } },
        { category: "identityInformation", fields: { Aadhaar:"", PassportNumber: "", PassportValidUntil: "" } },
        { category: "emergencyDetails", fields: { Name: "", PhoneNumber: "" , EmailID: "", Relationship: "" } },
        { category: "payrollInformation", fields: { FirstName: "", LastName: "", Department: "", Designation: "", Competency: "", DateOfBirth: "", Gender: "", PersonalEmailAddress: "", FathersName: "", Pincode: "", MiddleName: "", EmailAddress: "", Location: "", DateOfJoining: "", PAN: "", AddressLine1: "", AddressLine2: "", City: "", AccountHoldersName: "", AccountNumber: "", PaymentMode: "", IFSCCode: "", PersonalMobileNumber: "" } },
        { category: "personalDetails", fields: { MaritalStatus: "", AboutMe: "", Citizenship: "", BloodGroup: "" } },
        { category: "workInformation", fields: { Age: "", WorkPhoneNumber: "", NickName: "", Role: "", EmploymentType: "", EmployeeStatus: "", SourceOfHire: "" } },
        { category: "professionalReferences", fields: { Name: "", EmailID: "", PhoneNumber: "", CurrentCompany: "" } }
      ],
      employeeId: localStorage.getItem('EmployeeID'),
      isLoggedIn: !!localStorage.getItem('EmployeeID'),
    };
  }

  componentDidMount() {
    const { employeeId } = this.state;

    if (employeeId) {
      this.fetchAllCategoryData(employeeId);
    }
  }

  fetchAllCategoryData = (employeeId) => {
    const urls = {
      hierarchyInformation: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/hierarchyInformation/${employeeId}`,
      identityInformation: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/identityInformation/${employeeId}`,
      emergencyDetails: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/emergencyDetails/${employeeId}`,
      payrollInformation: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/payrollInformation/${employeeId}`,
      personalDetails: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/personalDetails/${employeeId}`,
      workInformation: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/workInformation/${employeeId}`,
      professionalReferences: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/professionalReferences/${employeeId}`
    };

    Object.entries(urls).forEach(([category, url]) => {
      this.fetchCategoryData(category, url, employeeId);
    });
  };

  fetchCategoryData = async (category, url, employeeId) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'client_id': 'f166fc00447c4c358fd582d79f246f92',
          'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
        }
      });
      console.log(`Fetched data for ${category}:`, response.data);

      const responseData = response.data[0]; // Assuming the API response is an array and we need the first item

      const mappedFields = { EmployeeID: employeeId }; // Include EmployeeID
      Object.keys(this.state.detailsCategories.find(item => item.category === category).fields).forEach(field => {
        mappedFields[field] = responseData[field] || "";
      });

      this.setState(prevState => ({
        detailsCategories: prevState.detailsCategories.map(item =>
          item.category === category ? { ...item, fields: mappedFields } : item
        )
      }));
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  };

  handleLogin = (employeeId) => {
    localStorage.setItem('EmployeeID', employeeId);
    this.setState({ employeeId, isLoggedIn: true }, () => {
      this.fetchAllCategoryData(employeeId);
    });
  };

  handleClose = () => {
    this.setState({
      show: null,
      currentCategory: "",
      currentAction: "",
      inputData: {}
    });
  };

  handleShow = (category, action) => {
    this.setState({
      show: `${action}${category}`,
      currentCategory: category,
      currentAction: action,
      inputData: { ...this.state.detailsCategories.find(item => item.category === category).fields }
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      inputData: {
        ...prevState.inputData,
        [name]: value
      }
    }));
  };

  handleAPICall = async (url, method, body, headers) => {
    try {
      const config = { headers: { ...headers, 'client_id': 'f166fc00447c4c358fd582d79f246f92', 'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F' } };
      const response = await axios({ method, url, data: body, ...config });
      return response.data;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  handleSave = async () => {
    const { currentCategory, currentAction, inputData, employeeId } = this.state;

    if (!employeeId) {
      console.error('EmployeeID not found in localStorage');
      return;
    }

    const dataToSend = { ...inputData, EmployeeID: employeeId };

    const apiConfig = {
      POST: {
        hierarchyInformation: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/hierarchyInformation", method: 'POST' },
        identityInformation: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/identityInformation", method: 'POST' },
        emergencyDetails: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/emergencyDetails", method: 'POST' },
        payrollInformation: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/payrollInformation", method: 'POST' },
        personalDetails: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/personalDetails", method: 'POST' },
        workInformation: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/workInformation", method: 'POST' },
        professionalReferences: { url: "http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/professionalReferences", method: 'POST' },
      },
      PATCH: {
        hierarchyInformation: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/hierarchyInformation/${employeeId}`, method: 'PATCH' },
        identityInformation: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/identityInformation/${employeeId}`, method: 'PATCH' },
        emergencyDetails: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/emergencyDetails/${employeeId}`, method: 'PATCH' },
        payrollInformation: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/payrollInformation/${employeeId}`, method: 'PATCH' },
        personalDetails: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/personalDetails/${employeeId}`, method: 'PATCH' },
        workInformation: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/workInformation/${employeeId}`, method: 'PATCH' },
        professionalReferences: { url: `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/professionalReferences/${employeeId}`, method: 'PATCH' },
      }
    };

    const apiMethodConfig = currentAction === 'add' ? apiConfig.POST : apiConfig.PATCH;
    const { url, method } = apiMethodConfig[currentCategory];
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      await this.handleAPICall(url, method, JSON.stringify(dataToSend), headers);
      this.setState(prevState => ({
        detailsCategories: prevState.detailsCategories.map(category =>
          category.category === currentCategory ? { ...category, fields: dataToSend } : category
        ),
        show: null,
        currentCategory: "",
        currentAction: "",
        inputData: {}
      }));
    } catch (error) {
      console.error('Error while saving data:', error);
    }
  };

  renderSection = (category, fields) => {
    const categoryData = this.state.detailsCategories.find(item => item.category === category);
    const hasData = Object.values(categoryData.fields).some(value => value !== "");

    return (
      <div className="col-lg-6 d-flex" key={category}>
        <div className="card flex-fill">
          <div className="card-header">
            <h4 className="card-title mb-0">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
          </div>
          <div className="card-body">
            {Object.keys(fields).filter(field => field !== "EmployeeID").map((field, index) => (
              <p className="card-text mb-3" key={index}>
                <span className="text-primary">{field.replace(/([A-Z])/g, ' $1').trim()} :</span> {categoryData.fields[field] !== "" ? categoryData.fields[field] : "null"}
              </p>
            ))}
            {hasData ? (
              <a
                href="#0"
                className="btn btn-theme ctm-border-radius text-white btn-sm"
                onClick={() => this.handleShow(category, "edit")}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </a>
            ) : (
              <a
                href="#0"
                className="btn btn-theme ctm-border-radius text-white btn-sm"
                onClick={() => this.handleShow(category, "add")}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  renderModal = (category, fields, action) => {
    const modalId = action === "add" ? `add${category}` : `edit${category}`;
    return (
      <Modal
        show={this.state.show === modalId}
        onHide={this.handleClose}
        centered
        key={modalId}
      >
        <Modal.Header closeButton className="modal-header">
          <h4 className="modal-title mb-3">{action.charAt(0).toUpperCase() + action.slice(1)} {category.replace(/([A-Z])/g, ' $1').trim()}</h4>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {Object.keys(fields).filter(field => field !== "EmployeeID").map((field, index) => (
            <div className="input-group mb-3" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder={`Add ${field.replace(/([A-Z])/g, ' $1').trim()}`}
                name={field}
                value={this.state.inputData[field] || ""}
                onChange={this.handleInputChange}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-danger text-white ctm-border-radius float-right ml-3"
            onClick={this.handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-theme button-1 text-white ctm-border-radius float-right"
            onClick={this.handleSave}
          >
            Save
          </button>
        </Modal.Body>
      </Modal>
    );
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
              <Sidebar />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="row">
                {this.state.detailsCategories.map((category, index) =>
                  this.renderSection(category.category, category.fields)
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Modals */}
        {this.state.detailsCategories.map((category, index) => (
          <React.Fragment key={index}>
            {this.renderModal(category.category, category.fields, "add")}
            {this.renderModal(category.category, category.fields, "edit")}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Details;
