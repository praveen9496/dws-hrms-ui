import React, { Component } from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            profileImage: localStorage.getItem('profileImage') || ''
        };
    }

    render() {
        const { name, email, profileImage } = this.state;

        return (
            <aside className="sidebar sidebar-user">
                <div className="card ctm-border-radius shadow-sm">
                    <div className="card-body py-4">
                        <div className="row">
                            <div className="col-md-12 mr-auto text-left">
                                <div className="custom-search input-group">
                                    <div className="custom-breadcrumb">
                                        <ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
                                            <li className="breadcrumb-item d-inline-block">
                                                <Link to="/admin" className="text-dark">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item d-inline-block active">Profile</li>
                                        </ol>
                                        <h4 className="text-dark">Profile</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-card shadow-sm bg-white p-4 text-center ctm-border-radius card">
                    <div className="user-info">
                        <div className="user-avatar mb-4">
                            <img
                                src={profileImage}
                                alt="User Avatar"
                                className="img-fluid rounded-circle"
                            />
                        </div>
                        <div className="user-details">
                            <h4><b> {name}</b></h4>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white p-4 mb-4 card">
                    <ul className="list-group">
                        <CustomNavLink to="/employment">Employment</CustomNavLink>
                        <CustomNavLink to="/details">Detail</CustomNavLink>
                        <CustomNavLink to="/document">Document</CustomNavLink>
                        <CustomNavLink to="/payroll">Payroll</CustomNavLink>
                        <CustomNavLink to="/time-off">Timeoff</CustomNavLink>
                        {/* <CustomNavLink to="/profile-review">Reviews</CustomNavLink> */}
                        <CustomNavLink to="/profile-settings">Settings</CustomNavLink>
                    </ul>
                </div>
            </aside>
        );
    }
}

// Custom NavLink component to handle dynamic 'active' class
const CustomNavLink = ({ to, children }) => {
    const { pathname } = useLocation();
    const isActive = pathname === to;

    return (
        <NavLink to={to} className={`list-group-item text-center button-6 ${isActive ? 'active' : ''}`}>
            {children}
        </NavLink>
    );
};

export default Sidebar;
