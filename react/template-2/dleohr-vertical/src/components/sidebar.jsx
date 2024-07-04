import React from 'react';
import { Link } from 'react-router-dom';
import IMG01 from '../assets/images/img-13.jpg';

const Sidebar = (props) => {
	
	// console.log('path', props.data.location.pathname.split("/")[1]);
	const pathurl = props.data.location.pathname.split("/")[1];
  return (

	<aside className="sidebar sidebar-user">
{pathurl === 'dashboard' || pathurl === 'profile' || pathurl === '/' ? 
<>	<div className="user-card card shadow-sm bg-white text-center ctm-border-radius grow">
		<div className="user-info card-body">
			<div className="user-avatar mb-4">
				<img src={IMG01} alt="User Avatar" className="img-fluid rounded-circle" width="100" />
			</div>
			<div className="user-details">
				<h4><b>Welcome Admin</b></h4>
				<p>Sun, 29 Nov 2019</p>
			</div>
		</div>
	</div>

	<div className="sidebar-wrapper d-lg-block d-md-none d-none">
		<div className="card ctm-border-radius shadow-sm border-none grow">
		<div className="card-body">
				<div className="row no-gutters">
					<div className="col-6 align-items-center text-center">
					{/* <li className={`mr-1 ${'dashboard' === url || 'employee-dashboard' === url ? 'active' : ''} `}>
						<Link to="/dashboard" className="text-dark btn-ctm-space"><span className="lnr lnr-home pr-0 pr-lg-2"></span>
						<span className="d-none d-lg-inline">Dashboard</span></Link>
						</li> */}
						<Link to="dashboard" className={`${'/' === pathurl || 'dashboard' === pathurl || 'employee-dashboard' === pathurl ? 'active' : ''} text-dark p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top`}>
							<span className="lnr lnr-home pr-0 pb-lg-2 font-23"></span>
							<span className="">Dashboard</span>
							</Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="employees-all" className={`${'employees-all' === pathurl || 'employee-team' === pathurl || 'employee-office' === pathurl ? 'active' : ''} text-dark p-4 second-slider-btn ctm-border-right ctm-border-top`}><span className="lnr lnr-users pr-0 pb-lg-2 font-23"></span><span className="">Employees</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="company" className={`${'company' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right ctm-border-left`}><span className="lnr lnr-apartment pr-0 pb-lg-2 font-23"></span><span className="">Company</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="calendar" className={`${'calendar' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right`}><span className="lnr lnr-calendar-full pr-0 pb-lg-2 font-23"></span><span className="">Calendar</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="leave" className={`${'leave' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right ctm-border-left`}><span className="lnr lnr-briefcase pr-0 pb-lg-2 font-23"></span><span className="">Leave</span></Link>											
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="overview-reviews" className={`${'overview-reviews' === pathurl || 'review-type'  === pathurl || 'create-review' === pathurl || 'edit-reviews' === pathurl? 'active' : ''} text-dark p-4 last-slider-btn ctm-border-right`}><span className="lnr lnr-star pr-0 pb-lg-2 font-23"></span><span className="">Reviews</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="reports" className={`${'reports' === pathurl || 'leave-reports' === pathurl || 'payroll-reports' === pathurl || 'contact-reports' === pathurl || 'email-reports' === pathurl  || 'security-reports' === pathurl || 'work-from-home-reports' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right ctm-border-left`}><span className="lnr lnr-rocket pr-0 pb-lg-2 font-23"></span><span className="">Reports</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
					<Link to="manage" className={`${'manage' === pathurl || 'manage-leadership' === pathurl || 'line-manager' === pathurl || 'time-off-approver' === pathurl || 'super-admin' === pathurl || 'team-lead' === pathurl || 'admin' === pathurl || 'payroll-admin' === pathurl || 'team-members' === pathurl? 'active' : ''} text-dark p-4 ctm-border-right`}><span className="lnr lnr-sync pr-0 pb-lg-2 font-23"></span><span className="">Manage</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="settings" className={`${'settings' === pathurl || 'setting-timeoff' === pathurl? 'active' : ''} text-dark p-4 last-slider-btn1 ctm-border-right ctm-border-left`}><span className="lnr lnr-cog pr-0 pb-lg-2 font-23"></span><span className="">Settings</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="employment" className={`${'employment' === pathurl || 'details' === pathurl || 'document' === pathurl || 'payroll' === pathurl || 'profile-review' === pathurl || 'time-off'=== pathurl || 'profile-settings' === pathurl ? 'active' : ''} text-dark p-4 last-slider-btn ctm-border-right`}><span className="lnr lnr-user pr-0 pb-lg-2 font-23"></span><span className="">Profile</span></Link>												
					</div>
				</div>
			</div>
		</div>
	</div>
</> :
<>
<div className="sidebar-wrapper d-lg-block d-md-none d-none">
		<div className="card ctm-border-radius shadow-sm border-none grow">
			<div className="card-body">
				<div className="row no-gutters">
					<div className="col-6 align-items-center text-center">
					{/* <li className={`mr-1 ${'dashboard' === url || 'employee-dashboard' === url ? 'active' : ''} `}>
						<Link to="/dashboard" className="text-dark btn-ctm-space"><span className="lnr lnr-home pr-0 pr-lg-2"></span>
						<span className="d-none d-lg-inline">Dashboard</span></Link>
						</li> */}
						<Link to="dashboard" className={`${'/' === pathurl || 'dashboard' === pathurl || 'employee-dashboard' === pathurl ? 'active' : ''} text-dark p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top`}>
							<span className="lnr lnr-home pr-0 pb-lg-2 font-23"></span>
							<span className="">Dashboard</span>
							</Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="employees-all" className={`${'employees-all' === pathurl || 'employee-team' === pathurl || 'employee-office' === pathurl ? 'active' : ''} text-dark p-4 second-slider-btn ctm-border-right ctm-border-top`}><span className="lnr lnr-users pr-0 pb-lg-2 font-23"></span><span className="">Employees</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="company" className={`${'company' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right ctm-border-left`}><span className="lnr lnr-apartment pr-0 pb-lg-2 font-23"></span><span className="">Company</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="calendar" className={`${'calendar' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right`}><span className="lnr lnr-calendar-full pr-0 pb-lg-2 font-23"></span><span className="">Calendar</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="leave" className={`${'leave' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right ctm-border-left`}><span className="lnr lnr-briefcase pr-0 pb-lg-2 font-23"></span><span className="">Leave</span></Link>											
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="overview-reviews" className={`${'overview-reviews' === pathurl || 'review-type'  === pathurl || 'create-review'  === pathurl || 'edit-reviews' === pathurl ? 'active' : ''} text-dark p-4 last-slider-btn ctm-border-right`}><span className="lnr lnr-star pr-0 pb-lg-2 font-23"></span><span className="">Reviews</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="reports" className={`${'reports' === pathurl || 'leave-reports' === pathurl || 'payroll-reports' === pathurl || 'contact-reports' === pathurl || 'email-reports' === pathurl  || 'security-reports' === pathurl || 'work-from-home-reports' === pathurl ? 'active' : ''} text-dark p-4 ctm-border-right ctm-border-left`}><span className="lnr lnr-rocket pr-0 pb-lg-2 font-23"></span><span className="">Reports</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">												
						<Link to="manage" className={`${'manage' === pathurl || 'manage-leadership' === pathurl || 'line-manager' === pathurl || 'time-off-approver' === pathurl || 'super-admin' === pathurl || 'team-lead' === pathurl || 'admin' === pathurl || 'payroll-admin' === pathurl || 'team-members' === pathurl? 'active' : ''} text-dark p-4 ctm-border-right`}><span className="lnr lnr-sync pr-0 pb-lg-2 font-23"></span><span className="">Manage</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="settings" className={`${'settings' === pathurl || 'setting-timeoff' === pathurl? 'active' : ''} text-dark p-4 last-slider-btn1 ctm-border-right ctm-border-left`}><span className="lnr lnr-cog pr-0 pb-lg-2 font-23"></span><span className="">Settings</span></Link>												
					</div>
					<div className="col-6 align-items-center shadow-none text-center">											
						<Link to="employment" className={`${'employment' === pathurl || 'details' === pathurl || 'document' === pathurl || 'payroll' === pathurl || 'profile-review' === pathurl === 'time-off' || 'profile-settings' === pathurl ? 'active' : ''} text-dark p-4 last-slider-btn ctm-border-right`}><span className="lnr lnr-user pr-0 pb-lg-2 font-23"></span><span className="">Profile</span></Link>												
					</div>
				</div>
			</div>
		</div>
	</div>
</>
					}
</aside>
  );
};
 
export default Sidebar;