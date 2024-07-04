import React from 'react';
import {NavLink } from 'react-router-dom';



const TopSidebar = ({data}) => {
	const path = data.location.pathname;
	console.log('path', path);
  return (
<div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
									<div className="card-body">
										<ul className="list-group list-group-horizontal-lg">
										<NavLink to="dashboard" className={`list-group-item button-5`}>Admin Dashboard</NavLink>
										<NavLink className="list-group-item button-6" to="employee-dashboard">Employees Dashboard</NavLink>
										</ul>
									</div>
								</div>
  );
};
 
export default TopSidebar;