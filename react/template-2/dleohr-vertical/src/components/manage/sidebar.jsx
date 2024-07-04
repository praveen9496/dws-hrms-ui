import React from "react";
import { NavLink} from 'react-router-dom';

const TopSidebar=() => {

    return(
     

        <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
            <div className="card-body">
                <ul className="list-group list-group-horizontal-lg">
                <NavLink to="/manage" className="list-group-item text-center button-5" activeClassName="active">Account Roles</NavLink> 
                <NavLink to="/manage-leadership" className="list-group-item text-center button-6">Leadership Roles</NavLink> 
                   
                </ul>
            </div>
        </div>
 
    );

}

export default TopSidebar;