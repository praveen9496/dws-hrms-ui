import React, { Component } from "react";
import Sidebar from '../sidebar';
import TopSidebar from './sidebar';
import { Link } from 'react-router-dom';

class Setting extends Component {
	
	constructor(props){
		super(props);
		this.state={
		  
		}
	  }
    render(){
        return(
            <div className="page-wrapper">
            < div className="container-fluid">
                <div className="row grow">
                    <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
					<aside className="sidebar sidebar-user">
								<div className="card ctm-border-radius shadow-sm">
									<div className="card-body py-4">
										<div className="row">
											<div className="col-md-12 mr-auto text-left">
												<div className="custom-search input-group">
													<div className="custom-breadcrumb">
														<ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
															<li className="breadcrumb-item d-inline-block"><Link to="dashboard" className="text-dark">Home</Link></li>
															<li className="breadcrumb-item d-inline-block active">settings</li>
														</ol>
														<h4 className="text-dark">Settings</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							
								<Sidebar data={this.props}/>
							</aside>
                        </div>
                        <div className="col-xl-9 col-lg-8  col-md-12">
						<TopSidebar />
                        <div className="row">
							
								<div className="col-md-6 d-flex">
							
									<div className="card ctm-border-radius shadow-sm company-logo flex-fill">
										<div className="card-header">
											<h4 className="card-title mb-0">Company Logo</h4>
										</div>
										<div className="card-body">
											<form>
												<div className="row">
													<div className="col-12">
														<div className="avatar-upload">
															<div className="avatar-edit">
																<input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
																<label htmlFor="imageUpload"></label>
															</div>
															<div className="avatar-preview">
																<div id="imagePreview">
																</div>
															</div>
														</div>
													</div>
													
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="col-md-6 d-flex">
									<div className="card ctm-border-radius shadow-sm flex-fill">
										<div className="card-header">
											<h4 className="card-title mb-0">
												Your Company
											</h4>
										</div>
										<div className="card-body">
											<form>
												<div className="form-group">
													<label>Company Name</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label>Company Url</label>
													<input type="text" className="form-control" />
												</div>
												<div className="text-center">
													<a href="#0" className="btn btn-theme button-1 ctm-border-radius text-white">Save Changes</a>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
                        </div>
                </div>
            </ div>
         </div>       
                        
        );
    }
}

export default Setting;