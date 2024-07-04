import React, { Component } from "react";
import Sidebar from '../sidebar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const hoverClass = {
    backgroundColor: '#e0e0e0',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};

class Leavereports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: null,
            sickLeave: {
                available: 0,
                booked: 0
            },
            personalLeave: {
                available: 0,
                booked: 0
            },
            totalSickLeaves: 0,
            totalPersonalLeaves: 0,
            isSickLeaveHovered: false,
            isPersonalLeaveHovered: false,
            holidays: [],
            filteredHolidays: [],
            showUpcoming: true,
            upcomingButtonActive: true,
            historyButtonActive: false
        };
    }

    componentDidMount() {
        const employeeId = localStorage.getItem('EmployeeID');
        if (employeeId) {
            this.setState({ employeeId }, () => {
                this.fetchLeaveData();
                this.fetchHolidaysData();
                this.fetchTotalLeaveData(); // Fetch total leaves data
            });
        } else {
            console.error('EmployeeID not found in localStorage');
        }
    }

    fetchLeaveData = () => {
        const { employeeId } = this.state;
    
        axios.get(`http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/leaveReport/${employeeId}`, {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
        .then(response => {
            if (response.data && response.data.length > 0) {
                let sickLeaveAvailable = 0;
                let sickLeaveBooked = 0;
                let personalLeaveAvailable = 0;
                let personalLeaveBooked = 0;
    
                response.data.forEach(item => {
                    if (item.LeaveType === 'Sick Leave') {
                        sickLeaveAvailable = parseFloat(item.Available) || 0;
                        sickLeaveBooked = parseFloat(item.Booked) || 0;
                    } else if (item.LeaveType === 'Personal Leave') {
                        personalLeaveAvailable = parseFloat(item.Available) || 0;
                        personalLeaveBooked = parseFloat(item.Booked) || 0;
                    }
                });
    
                const totalSickLeaves = sickLeaveAvailable + sickLeaveBooked;
                const totalPersonalLeaves = personalLeaveAvailable + personalLeaveBooked;
    
                this.setState({
                    sickLeave: {
                        available: sickLeaveAvailable,
                        booked: sickLeaveBooked
                    },
                    personalLeave: {
                        available: personalLeaveAvailable,
                        booked: personalLeaveBooked
                    },
                    totalSickLeaves: totalSickLeaves,
                    totalPersonalLeaves: totalPersonalLeaves
                });
            } else {
                console.error('Empty response or invalid data format received');
            }
        })
        .catch(error => {
            console.error('Error fetching leave data:', error);
        });
    }

    fetchHolidaysData = () => {
        axios.get('http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/holidays', {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
        .then(response => {
            this.setState({ holidays: response.data }, this.filterHolidays);
        })
        .catch(error => {
            console.error('Error fetching holidays data:', error);
        });
    }

    fetchTotalLeaveData = () => {
        axios.get('http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/totalLeave', {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
        .then(response => {
            if (response.data && response.data.length > 0) {
                const totalSickLeaves = parseFloat(response.data[0].sickLeave) || 0;
                const totalPersonalLeaves = parseFloat(response.data[0].personalLeave) || 0;
    
                this.setState({
                    totalSickLeaves,
                    totalPersonalLeaves
                });
            } else {
                console.error('Empty response or invalid data format received');
            }
        })
        .catch(error => {
            console.error('Error fetching total leave data:', error);
        });
    }

    filterHolidays = () => {
        const { holidays, showUpcoming } = this.state;
        const today = new Date();
        const filtered = holidays.filter(holiday => {
            const holidayDate = new Date(holiday.h_date.split('-').reverse().join('-'));
            return showUpcoming ? holidayDate >= today : holidayDate < today;
        });
        this.setState({ filteredHolidays: filtered });
    }

    handleUpcomingClick = () => {
        this.setState({ showUpcoming: true, upcomingButtonActive: true, historyButtonActive: false }, this.filterHolidays);
    }

    handleHistoryClick = () => {
        this.setState({ showUpcoming: false, upcomingButtonActive: false, historyButtonActive: true }, this.filterHolidays);
    }

    handleLeaveTypeClick = (leaveType) => {
        const { employeeId } = this.state;
        this.props.history.push({
            pathname: "/leave",
            state: {
                employeeId: employeeId,
                leaveType: leaveType
            }
        });
    }

    handleSickLeaveMouseEnter = () => {
        this.setState({ isSickLeaveHovered: true });
    };

    handleSickLeaveMouseLeave = () => {
        this.setState({ isSickLeaveHovered: false });
    };

    handlePersonalLeaveMouseEnter = () => {
        this.setState({ isPersonalLeaveHovered: true });
    };

    handlePersonalLeaveMouseLeave = () => {
        this.setState({ isPersonalLeaveHovered: false });
    };

    formatDay = (dateString) => {
        const date = new Date(dateString.split('-').reverse().join('-')); // Convert 'DD-MM-YYYY' to 'YYYY-MM-DD'
        const options = { weekday: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    render() {
        const { sickLeave, personalLeave, totalSickLeaves, totalPersonalLeaves, isSickLeaveHovered, isPersonalLeaveHovered, filteredHolidays, upcomingButtonActive, historyButtonActive } = this.state;

        const boxStyle = {
            width: 'calc(30% - 20px)', // Slightly reduced the width
            height: '4.5cm', // Slightly reduced the height
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid transparent',
            transition: 'all 0.3s',
            cursor: 'pointer',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white', // Ensures the box is white by default
        };

        const sickLeaveBoxStyle = isSickLeaveHovered ? { ...boxStyle, ...hoverClass } : boxStyle;
        const personalLeaveBoxStyle = isPersonalLeaveHovered ? { ...boxStyle, ...hoverClass } : boxStyle;

        const tableStyle = {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px'
        };

        const thStyle = {
            backgroundColor: '#f2f2f2',
            padding: '10px',
            border: '1px solid #ddd',
            textAlign: 'left'
        };

        const tdStyle = {
            padding: '10px',
            border: '1px solid #ddd'
        };

        const holidaysHeaderStyle = {
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'black',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        };

        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
                            <Sidebar onLeaveClick={this.fetchLeaveData} />
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <div className="mb-3 d-flex">
                                <div
                                    className="card shadow-sm ctm-border-radius d-flex flex-column justify-content-center align-items-center mr-3"                                    style={sickLeaveBoxStyle}
                                    onClick={() => this.handleLeaveTypeClick('Sick Leave')}
                                    onMouseEnter={this.handleSickLeaveMouseEnter}
                                    onMouseLeave={this.handleSickLeaveMouseLeave}
                                >
                                    <div className="card-body text-center">
                                        <p style={{ fontWeight: 'bold' }}>Sick Leave</p>
                                        <div className="box-content">
                                            <p>Available: {sickLeave.available} days</p>
                                            <p>Booked: {sickLeave.booked} days</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card shadow-sm ctm-border-radius d-flex flex-column justify-content-center align-items-center mr-3"
                                    style={personalLeaveBoxStyle}
                                    onClick={() => this.handleLeaveTypeClick('Personal Leave')}
                                    onMouseEnter={this.handlePersonalLeaveMouseEnter}
                                    onMouseLeave={this.handlePersonalLeaveMouseLeave}
                                >
                                    <div className="card-body text-center">
                                        <p style={{ fontWeight: 'bold' }}>Personal Leave</p>
                                        <div className="box-content">
                                            <p>Available: {personalLeave.available} days</p>
                                            <p>Booked: {personalLeave.booked} days</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card shadow-sm ctm-border-radius d-flex flex-column justify-content-center align-items-center"
                                    style={boxStyle}
                                >
                                    <div className="card-body text-center">
                                        <p style={{ fontWeight: 'bold' }}>Total Leaves</p>
                                        <div className="box-content">
                                            <p style={{ fontSize: '15px', fontWeight: 'initial' }}>
                                                Sick Leave: {totalSickLeaves} days
                                            </p>
                                            <p style={{ fontSize: '15px', fontWeight: 'initial' }}>
                                                Personal Leave: {totalPersonalLeaves} days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div style={{ width: '100%' }}>
                                    <div style={holidaysHeaderStyle}>
                                        <span>All Leaves and Holidays</span>
                                        <div>
                                            <button
                                                onClick={this.handleUpcomingClick}
                                                className={`btn btn-primary mr-2 ${upcomingButtonActive ? 'active' : ''}`}
                                            >
                                                Upcoming
                                            </button>
                                            <button
                                                onClick={this.handleHistoryClick}
                                                className={`btn btn-secondary ${historyButtonActive ? 'active' : ''}`}
                                            >
                                                History
                                            </button>
                                        </div>
                                    </div>
                                    <table style={tableStyle}>
                                        <thead>
                                            <tr>
                                                <th style={thStyle}>Date</th>
                                                <th style={thStyle}>Day</th>
                                                <th style={thStyle}>Holiday</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHolidays.map((holiday, index) => (
                                                <tr key={index}>
                                                    <td style={tdStyle}>{holiday.h_date}</td>
                                                    <td style={tdStyle}>{this.formatDay(holiday.h_date)}</td>
                                                    <td style={tdStyle}>{holiday.holiday}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Leavereports);

