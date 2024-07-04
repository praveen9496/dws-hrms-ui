import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import Sidebar from '../sidebar';

class Document extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  show: null,
		}
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
        render(){

        return(
            
            <div className="page-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
							 <Sidebar />
							</div>                       
			           <div className="col-xl-9 col-lg-8  col-md-12">
					         
					   <div className="card ctm-border-radius shadow-sm">
								<div className="card-header">
									<h4 className="card-title doc d-inline-block mb-0">Documents</h4>
									<a href="#0" className="float-right doc-fold text-primary d-inline-block text-info" onClick={()=>this.handleShow('add')}>Add Document</a>
								</div>
								<div className="card-body doc-boby">
									<div className="card shadow-none">
										<div className="card-header">
											<h5 className="card-title text-primary mb-0">Passport</h5>
										</div>
										<div className="card-body">
											<div className="row">
												<div className="col-12">
													<div className="document-up">
														<a href="#0"><i className="mr-2 text-primary fa fa-file-pdf-o" aria-hidden="true"></i> Passport.pdf <span className="float-right text-primary" onClick={()=>this.handleShow('editpassport')}>Edit</span></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="card shadow-none">
										<div className="card-header">
											<h5 className="card-title text-primary mb-0">P45</h5>
										</div>
										<div className="card-body">
											<div className="row">
												<div className="col-12">
													<div className="document-up">
														<a href="#0">
															<i className="mr-2 text-primary fa fa-file-pdf-o" aria-hidden="true"></i>
															P45.pdf<span className="float-right text-primary" onClick={()=>this.handleShow('editp45')}>Edit</span></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="card shadow-none">
										<div className="card-header">
											<h5 className=" text-primary card-title mb-0">Visa</h5>
										</div>
										<div className="card-body">
											<div className="row">
												<div className="col-12">
													<div className="document-up">
														<a href="#0">
															<i className="mr-2 text-primary fa fa-file-pdf-o" aria-hidden="true"></i>
															 Visa.pdf<span onClick={()=>this.handleShow('editvisa')}  className="float-right text-primary">Edit</span></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="add-doc text-center">
										<a href="#0" className="btn btn-theme  button-1 ctm-border-radius text-white text-center" onClick={()=>this.handleShow('add')}>Add New Document</a>
									</div>
								</div>
							</div>
						 {/* row */}
                 </div>
              </div>
			</div>
			{/*row*/}
				  {/* Add Information*/}
				  <Modal
          show={this.state.show === "add"}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
		  <h4 className="modal-title mb-3">Add Document</h4>
          </Modal.Header>
          <Modal.Body>
		  <div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" placeholder="Document Description" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="file" />
							</div>
						</div>
						<button type="button" className="btn btn-danger ctm-border-radius float-right ml-3" data-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-theme  button-1 text-white ctm-border-radius float-right">Add Document</button>
          </Modal.Body>
        </Modal>
		  {/* Edit passport*/} 
		  <Modal
          show={this.state.show === "editpassport"}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
		  <h4 className="modal-title mb-3">Edit Passport</h4>
          </Modal.Header>
          <Modal.Body>
		  <div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" placeholder="Passport" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" 
								placeholder="Document Description ( optional )" value="Passport" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="file" />
							</div>
						</div>
						<button type="button" className="btn btn-danger ctm-border-radius float-right ml-3" data-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-theme  button-1 text-white ctm-border-radius float-right">Save Document</button>
          </Modal.Body>
        </Modal>
		  {/* Edit P45  */} 
		  <Modal
          show={this.state.show === "editp45"}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
		  <h4 className="modal-title mb-3">Edit P45</h4>
          </Modal.Header>
          <Modal.Body>
		  <div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" placeholder="P45" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" 
								placeholder="Document Description ( optional )" value="P45" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="file" />
							</div>
						</div>
						<button type="button" className="btn btn-danger text-white ctm-border-radius float-right ml-3" data-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-theme  button-1 text-white ctm-border-radius float-right">Save Document</button>
          </Modal.Body>
        </Modal>
		  {/* Edit Visa */} 
		  <Modal
          show={this.state.show === "editvisa"}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
		  <h4 className="modal-title mb-3">Edit visa</h4>
          </Modal.Header>
          <Modal.Body>
		  <div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" placeholder="Visa" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="text" 
								placeholder="Document Description ( optional )" value="Visa" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group mb-3">
								<input className="form-control date-enter" type="file" />
							</div>
						</div>
						<button type="button" className="btn btn-danger text-white ctm-border-radius float-right ml-3" data-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-theme  button-1 text-white ctm-border-radius float-right">Save Document</button>
          </Modal.Body>
        </Modal>
     </div>
                                               
            )
        }

    }
    
  export default Document;