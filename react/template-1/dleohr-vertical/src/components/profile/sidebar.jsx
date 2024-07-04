import React, { Component} from "react";
import { NavLink } from 'react-router-dom';


class TopSidebar extends Component{
 

    render(){
        return(
       
            <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white p-4 mb-4 card">
                <ul className="list-group list-group-horizontal-lg">
                <NavLink to="/employment" className="list-group-item text-center button-5" activeClassName="active">Employement</NavLink> 
                <NavLink to="/details" className="list-group-item text-center button-6">Detail</NavLink> 
                <NavLink to="/document" className="list-group-item text-center button-6">Document</NavLink> 
                <NavLink to="/payroll" className="list-group-item text-center button-6">Payroll</NavLink> 
                <NavLink to="/time-off" className="list-group-item text-center button-6">Timeoff</NavLink> 
                <NavLink to="/profile-review" className="list-group-item text-center button-6">Reviews</NavLink> 
                <NavLink to="/profile-settings" className="list-group-item text-center button-6">Settings</NavLink> 
            
                </ul>
            </div>
      
        );

    }
}

export default TopSidebar;