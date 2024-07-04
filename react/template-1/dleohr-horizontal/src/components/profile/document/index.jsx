import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import Sidebar from '../sidebar';

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      fileUrl: null,
      selectedFiles: {},
      savedFiles: {},
      fileUrls: {},
      documents: {
        
        
          SSLC_MarksheetCertificate: "SSLC_MarksheetCertificate",
          UG_DegreeCertificate: "UG_DegreeCertificate",
          Certificate1_Mulesoft: "Certificate1_Mulesoft",
          Certificate2_Mulesoft: "Certificate2_Mulesoft",
          Certificate3_Mulesoft: "Certificate3_Mulesoft",
          AadhaarCard: "AadhaarCard",
          BackgroundVerification1: "BackgroundVerification1",
          PreviousEmployerJoiningLetters: "PreviousEmployerJoiningLetters",
          PreviousEmployerAppointmentOrders: "PreviousEmployerAppointmentOrders",
          OtherTechCertifications: "OtherTechCertifications",
          PanCard: "PanCard",
          HSC_PUC_CertificateMarksheet: "HSC_PUC_CertificateMarksheet",
          PG_DegreeCertificate: "PG_DegreeCertificate",
          Last_3_Month_Payslips: "Last_3_Month_Payslips",
          PreviousEmployerRelievingLetter: "PreviousEmployerRelievingLetter",
          OfferLetter: "OfferLetter",
          Resume: "Resume"
      }
    };
  }

  handleClose = () => {
    this.setState({
      show: null,
      fileUrl: null
    });
  };

  handleShow = (id) => {
    this.setState({
      show: id,
      fileUrl: null
    });
  };

  handleFileSelect = (id, event) => {
    const file = event.target.files[0];
    const { selectedFiles, fileUrls } = this.state;
    selectedFiles[id] = file;
    fileUrls[id] = URL.createObjectURL(file);
    this.setState({ selectedFiles, fileUrls });
  };

  handleSaveChanges = () => {
    const { selectedFiles, show } = this.state;
    const employeeId = localStorage.getItem('EmployeeID');
  
    if (show) {
      const formData = new FormData();
      Object.keys(selectedFiles).forEach((key) => {
        if (show === 'add' || key === show) {
          formData.append(key, selectedFiles[key]);
        }
      });
  
      const url = show === 'add'
        ? 'http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/supportingDocuments'
        : `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/supportingDocuments/${employeeId}`;
  
      const method = show === 'add' ? 'POST' : 'PATCH';
  
      formData.append('EmployeeID', employeeId); // Add employeeId to formData

      const headers = {
        'Content-Type': 'multipart/form-data',
        'client_id': 'f166fc00447c4c358fd582d79f246f92',
        'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
      };
  
      axios({
        method,
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        // Update the state with saved files
        const { savedFiles } = this.state;
        if (show === 'add') {
          Object.keys(selectedFiles).forEach((key) => {
            savedFiles[key] = selectedFiles[key].name;
          });
        } else {
          savedFiles[show] = selectedFiles[show].name;
        }
        this.setState({ savedFiles, show: null });
      }).catch(error => {
        console.error('There was an error saving the document!', error);
      });
    }
  };
  

  handleDelete = () => {
    const { savedFiles, selectedFiles, fileUrls, show } = this.state;
    if (show && show !== 'add') {
      delete savedFiles[show];
      delete selectedFiles[show];
      delete fileUrls[show];
    }
    this.setState({ savedFiles, selectedFiles, fileUrls, show: null });
  };

  handleFileClick = (fileUrl) => {
    this.setState({ fileUrl, show: null });
  };

  render() {
    const { documents, selectedFiles, savedFiles, fileUrls, show, fileUrl } = this.state;

    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
              <Sidebar />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="card ctm-border-radius shadow-sm">
                <div className="card-header">
                  <h4 className="card-title doc d-inline-block mb-0">Documents</h4>
                  <a href="#0" className="float-right doc-fold text-primary d-inline-block text-info" onClick={() => this.handleShow('add')}>
                    <i className="fa fa-pencil mr-1" aria-hidden="true"></i>Add document
                  </a>
                </div>
                <div className="card-body doc-body">
                  {Object.entries(documents).map(([key, value]) => (
                    <div className="card shadow-none" key={key}>
                      <div className="card-header">
                        <h5 className="card-title text-primary mb-0">{value}</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <div className="document-up">
                              {savedFiles[key] || selectedFiles[key] ? (
                                <div className="input-group">
                                  <a href="#0" onClick={() => this.handleFileClick(fileUrls[key])}>
                                    <i className="mr-2 text-primary fa fa-file-pdf-o" aria-hidden="true"></i>
                                    <span style={{ fontSize: '14px' }} className="text-truncate">{savedFiles[key] || selectedFiles[key].name}</span>
                                  </a>
                                  <span className="text-primary fa fa-pencil" style={{ position: 'absolute', bottom: '5px', right: '5px' }} onClick={() => this.handleShow(key)}></span>
                                </div>
                              ) : (
                                <>
                                  <div className="input-group">
                                    <i className="mr-2 text-primary fa fa-file-pdf-o" aria-hidden="true"></i>
                                    <input type="text" className="form-control form-control-sm" placeholder="Choose file" style={{ fontSize: '14px' }} />
                                    <span className="text-primary fa fa-pencil" style={{ position: 'absolute', bottom: '5px', right: '5px' }} onClick={() => this.handleShow(key)}></span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Document Modal */}
        <Modal show={show !== null && fileUrl === null} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <h4 className="modal-title mb-3">Add Document</h4>
          </Modal.Header>
          <Modal.Body>
            {show === 'add' ? (
              <>
                {Object.entries(documents).map(([key, value]) => (
                  <div className="form-group" key={key}>
                    <div className="input-group mb-3">
                      <input
                        className="form-control date-enter"
                        type="text"
                        placeholder={selectedFiles[key] ? selectedFiles[key].name : ''}
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        readOnly
                      />
                      <input
                        className="form-control date-enter"
                        type="file"
                        onChange={(e) => this.handleFileSelect(key, e)}
                      />
                    </div>
                    <small className="form-text text-muted">{value}</small>
                  </div>
                ))}
                <div>
                  <button
                    type="button"
                    className="btn btn-danger ctm-border-radius float-right ml-1"
                    onClick={this.handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-theme button-1 text-white ctm-border-radius float-right"
                    onClick={this.handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              show && (
                <div className="form-group">
                  <div className="input-group mb-3">
                    <input
                      className="form-control date-enter"
                      type="text"
                      placeholder={selectedFiles[show] ? selectedFiles[show].name : ''}
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      readOnly
                    />
                    <input
                      className="form-control date-enter"
                      type="file"
                      onChange={(e) => this.handleFileSelect(show, e)}
                    />
                  </div>
                  <small className="form-text text-muted">{documents[show]}</small>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger ctm-border-radius float-right ml-1"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ctm-border-radius float-right ml-1"
                      onClick={this.handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-theme button-1 text-white ctm-border-radius float-right"
                      onClick={this.handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )
            )}
          </Modal.Body>
        </Modal>

        {/* File View/Download Modal */}
        <Modal show={fileUrl !== null} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <h4 className="modal-title mb-3">File Options</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <a href={fileUrl} download className="btn btn-primary mr-2">Download</a>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View</a>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Document;
