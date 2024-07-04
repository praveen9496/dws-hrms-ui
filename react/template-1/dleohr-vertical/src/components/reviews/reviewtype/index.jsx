import React, { Component } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Sidebar from "../../sidebar";

import IMG01 from "../../../assets/images/img-2.jpg";
import IMG02 from "../../../assets/images/img-8.jpg";
import IMG04 from "../../../assets/images/img-6.jpg";

class ReviewType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: null,
      data: [
        {
          id: 1,
          image: IMG01,
          Name: "Monthly Review",
          Created: "Richard Wilson",
          Scheduled: "15 Dec 2019",
        },
        {
          id: 2,
          image: IMG02,
          Name: "Employees Review",
          Created: "Richard Wilson",
          Scheduled: "17 Dec 2019",
        },
        {
          id: 3,
          image: IMG04,
          Name: "Employees Review",
          Created: "Richard Wilson",
          Scheduled: "20 Dec 2019",
        },
      ],
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = (id) => {
    this.setState({
      show: id,
    });
  };
  render() {
    const { data } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "Name",
      },
      {
        title: "Name",
        dataIndex: "Created",
        render: (text, record) => (
          <>
            {" "}
            <a href="#0" className="avatar avatar-sm mr-2">
              <img alt="" src={record.image} />
            </a>
            <h2 className="table-avatar">
              <a href="#0">{text}</a>
            </h2>
          </>
        ),
      },
      {
        title: "Scheduled For",
        dataIndex: "Scheduled",
      },

      {
        title: "Actions",
        dataIndex: "Actions",
        render: (text, record) => (
          <>
            <div className="table-action">
              <Link
                to="/edit-reviews"
                className="btn btn-sm btn-outline-success"
              >
                <span className="lnr lnr-pencil"></span> Edit
              </Link>
              <a
                href="#0"
                className="btn btn-sm btn-outline-danger"
                onClick={() => this.handleShow("delete")}
              >
                <span className="lnr lnr-trash"></span> Delete
              </a>
            </div>
          </>
        ),
      },
    ];

    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row grow">
            <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
            <div className="card ctm-border-radius shadow-sm grow">
									<div className="card-body py-4">
										<div className="row">
											<div className="col-md-12 mr-auto text-left">
												<div className="custom-search input-group">
													<div className="custom-breadcrumb">
														<ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
															<li className="breadcrumb-item d-inline-block"><Link to="dashboard" className="text-dark">Home</Link></li>
															<li className="breadcrumb-item d-inline-block active">Reviews</li>
														</ol>
														<h4 className="text-dark">Reviews</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							
              <Sidebar data={this.props}/>
            </div>
            <div className="col-xl-9 col-lg-8  col-md-12">
              <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
                <div className="card-body">
                  <div
                    className="flex-row list-group list-group-horizontal-lg"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <Link
                      to="/overview-reviews"
                      className="list-group-item"
                    >
                      Overview
                    </Link>
                    <Link
                      to="/review-type"
                      className="active list-group-item"
                    >
                      Review Types
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card shadow-sm ctm-border-radius">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-title mb-0 d-inline-block">Reviews</h4>
                  <Link
                    to="/create-review"
                    className="btn btn-theme button-1 ctm-border-radius text-white float-right"
                  >
                    <span></span> Create Review
                  </Link>
                </div>
              
                  <div className="card-body align-center">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="v-pills-home"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                      ></div>
                      <div className="employee-office-table">
                        <div className="table-responsive">
                          <Table
                            className="table-striped"
                            style={{ overflowX: "auto" }}
                            columns={columns}
                            // bordered
                            dataSource={data}
                            rowKey={(record) => record.id}
                            pagination={false}
                          />
                        </div>
                      </div>
                      {/* tab1 */}
                    </div>
                  </div>
             
              </div>
            </div>
          </div>

          <Modal
            show={this.state.show === "delete"}
            onHide={this.handleClose}
            centered
          >
            <Modal.Header closeButton>
              <h4 className="modal-title mb-4">Are You Sure Want to Delete?</h4>
            </Modal.Header>
            <Modal.Body>
              <button
                type="button"
                className="btn btn-danger text-white text-center ctm-border-radius mb-2 mr-3"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-theme text-white text-center ctm-border-radius mb-2 button-1 button-1"
                data-dismiss="modal"
              >
                Delete
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ReviewType;
