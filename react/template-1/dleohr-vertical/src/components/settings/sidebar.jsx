import React from "react";
import { NavLink} from 'react-router-dom';

const TopSidebar=() => {

    return(
       
    
        <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
            <div className="card-body">
                <ul className="list-group list-group-horizontal-lg">
                <NavLink to="/settings" className="list-group-item text-center button-5"  activeClassName="active">General</NavLink>
                <NavLink to="/setting-timeoff" className="list-group-item text-center button-6">Time Off</NavLink> 
                 
                </ul>
            </div>
        </div>

    );

}

export default TopSidebar;