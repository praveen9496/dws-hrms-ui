import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import IMG01 from '../../assets/images/img-13.jpg';

const Sidebar = ({url}) => {
	
  return (

      	<aside className="sidebar sidebar-user">
								<div className="card ctm-border-radius shadow-sm">
									<div className="card-body py-4">
										<div className="row">
											<div className="col-md-12 mr-auto text-left">
												<div className="custom-search input-group">
													<div className="custom-breadcrumb">
														<ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
															<li className="breadcrumb-item d-inline-block"><Link to="dashboard" className="text-dark">Home</Link></li>
															<li className="breadcrumb-item d-inline-block active">Dashboard</li>
														</ol>
														<h4 className="text-dark">Admin Dashboard</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="user-card card shadow-sm bg-white text-center ctm-border-radius">
									<div className="user-info card-body">
										<div className="user-avatar mb-4">
                                            <img src={IMG01} alt="User Avatar" 
                                            className="img-fluid rounded-circle" width="100" />
										</div>
										<div className="user-details">
											<h4><b>Welcome Admin</b></h4>
											<p>Sun, 29 Nov 2019</p>
										</div>
									</div>
								</div>
								<div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
									<div className="card-body">
									
								
    <NavLink to="dashboard" className="list-group-item text-center button-6"  activeClassName="active">Appointments</NavLink>


    <NavLink to="employee-dashboard" className="list-group-item text-center button-6">Employees Dashboard</NavLink>

								
									</div>
								</div>
					
						{url === 'employee-dashboard' ?
						
								<><div className="card shadow-sm">
									<div className="card-header">
										<h4 className="card-title mb-0 d-inline-block">Permission</h4>
										<Link to="leave" className="d-inline-block float-right text-primary"><i className="fa fa-suitcase"></i></Link>
									</div>
									<div className="card-body text-center">
										<div className="time-list">
											<div className="dash-stats-list">
												<span className="btn btn-outline-primary">9.00 Hrs</span>
												<p className="mb-0">Approved</p>
											</div>
											<div className="dash-stats-list">
												<span className="btn btn-outline-primary">10.00 Hrs</span>
												<p className="mb-0">Remaining</p>
											</div>
										</div>
									</div>
								</div>
								<div className="card shadow-sm">
									<div className="card-header">
										<h4 className="card-title mb-0 d-inline-block">Leave</h4>
										<Link to="leave" className="d-inline-block float-right text-primary"><i className="fa fa-suitcase"></i></Link>
									</div>
									<div className="card-body text-center">
										<div className="time-list">
											<div className="dash-stats-list">
												<span className="btn btn-outline-primary">4.5 Days</span>
												<p className="mb-0">Taken</p>
											</div>
											<div className="dash-stats-list">
												<span className="btn btn-outline-primary">7.5 Days</span>
												<p className="mb-0">Remaining</p>
											</div>
										</div>
									</div>
								</div></> : ''}
							</aside>
  );
};
 
export default Sidebar;