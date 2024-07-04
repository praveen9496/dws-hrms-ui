import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class TopSidebar extends Component{
 

  render(){
      return(
    <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white p-4 mb-4 card">

        <ul className="list-group list-group-horizontal-lg">
          <NavLink
            to="employees-all"
            className="list-group-item text-center button-5"
            activeClassName="active"
          >
            All
          </NavLink>
          <NavLink
            to="employee-team"
            className="list-group-item text-center button-6"
          >
            Teams
          </NavLink>
          <NavLink
            to="employee-office"
            className="list-group-item text-center button-6"
          >
            Offices
          </NavLink>
        </ul>
     
    </div>
        );

      }
  }
  
  export default TopSidebar;