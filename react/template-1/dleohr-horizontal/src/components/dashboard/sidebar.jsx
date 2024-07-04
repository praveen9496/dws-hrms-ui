import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IMG01 from '../../assets/images/img-13.jpg'; // Ensure the path is correct

const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getDay()];
    const dateNumber = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${dateNumber} ${month} ${year}`;
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaveData: { booked: '', available: '' },
            name: '',
            email: '',
        };
    }

    componentDidMount() {
        const employeeId = localStorage.getItem('EmployeeID');
        const payrollUrl = `http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/payrollInformation/${employeeId}`;

        // Fetch payroll information with headers
        axios.get(payrollUrl, {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
        .then(response => {
            const payrollData = response.data[0];
            const { FirstName: name, EmailAddress: email } = payrollData;
            this.setState({ name, email });
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
        })
        .catch(error => {
            console.error("There was an error fetching the payroll data!", error);
        });

        // Fetch leave report with headers
        fetch('http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/leaveReport/DW005', {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            this.setState({ leaveData: data });
        })
        .catch(error => {
            console.error('Error fetching leave data:', error);
        });
    }

    render() {
        const { leaveData, name, email } = this.state;
        const currentDate = formatDate(new Date());
        const profileImage = localStorage.getItem('profileImage') || IMG01;

        return (
            <aside className="sidebar sidebar-user">
                <div className="card ctm-border-radius shadow-sm">
                    <div className="card-body py-4">
                        <div className="row">
                            <div className="col-md-12 mr-auto text-left">
                                <div className="custom-search input-group">
                                    <div className="custom-breadcrumb">
                                        <ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
                                            <li className="breadcrumb-item d-inline-block"><Link to="/dashboard" className="text-dark">Home</Link></li>
                                            <li className="breadcrumb-item d-inline-block active">Dashboard</li>
                                        </ol>
                                        <h4 className="text-dark">Employee Dashboard</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-card card shadow-sm bg-white text-center ctm-border-radius">
                    <div className="user-info card-body">
                        <div className="user-avatar mb-4">
                            <img src={profileImage} alt="User Avatar" className="img-fluid rounded-circle" width="100" />
                        </div>
                        <div className="user-details">
                            <p style={{ color: '' }}>{localStorage.getItem('EmployeeID')}</p>
                            <h4><b>{name}</b></h4>
                            <p>{currentDate}</p>
                        </div>
                    </div>
                </div>
                <div className="card shadow-sm">
                    <div className="card-header">
                        <h4 className="card-title mb-0 d-inline-block">Leave Report</h4>
                        <Link to="/leave" className="d-inline-block float-right text-primary"><i className="fa fa-suitcase"></i></Link>
                    </div>
                    <div className="card-body text-center">
                        <div className="time-list">
                            <div className="dash-stats-list">
                                <span className="btn btn-outline-primary">{leaveData.booked} Day(s)</span>
                                <p className="mb-0">Booked</p>
                            </div>
                            <div className="dash-stats-list">
                                <span className="btn btn-outline-primary">{leaveData.available} Day(s)</span>
                                <p className="mb-0">Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
