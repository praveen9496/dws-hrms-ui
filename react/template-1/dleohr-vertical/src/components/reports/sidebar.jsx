import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class TopSidebar extends Component{
	render(){
    return(
    
									<div className="card-body">
										<ul className="list-group list-group-horizontal-lg">
										<NavLink to="reports" className="list-group-item text-center button-6"  activeClassName="active">Team Member Data</NavLink>
										<NavLink to="leave-reports" className="list-group-item text-center button-6">Leave Data</NavLink>
										<NavLink to="payroll-reports" className="list-group-item text-center button-6">Payroll Data</NavLink>
										<NavLink to="contact-reports" className="list-group-item text-center button-6">Contact reports</NavLink>
										<NavLink to="email-reports" className="list-group-item text-center button-6">Email Reports</NavLink>
										<NavLink to="security-reports" className="list-group-item text-center button-6">Security Reports</NavLink>
										<NavLink to="work-from-home-reports" className="list-group-item text-center button-6">Working From Home Reports</NavLink>
								
										</ul>
									</div>
	
						
      );
	}
}

export default TopSidebar;