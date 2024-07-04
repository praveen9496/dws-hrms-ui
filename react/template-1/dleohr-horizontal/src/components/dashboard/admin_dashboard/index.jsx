import React, { Component } from "react";
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';

class AdminDashboard extends Component {
    state = {
        startTime: null,
        accumulatedTime: 0,
        elapsedTime: 0,
        timerRunning: false,
        loading: false,
        birthdaysToday: null, // State to hold birthday information
        upcomingBirthdays: null, // State to hold upcoming birthday information
        showConfetti: false, // State to control confetti visibility
    };

    componentDidMount() {
        this.timer = null;
        this.fetchBirthdays(); // Fetch birthdays on component mount
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    fetchBirthdays = () => {
        const today = new Date();
        const todayDayMonth = `${today.getMonth() + 1}-${today.getDate()}`;

        fetch('http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/payrollInformation', {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
        .then(response => response.json())
        .then(data => {
            const birthdaysToday = [];
            const upcomingBirthdays = [];

            data.forEach(user => {
                const dob = new Date(user.DateOfBirth);
                const dobDayMonth = `${dob.getMonth() + 1}-${dob.getDate()}`;

                // Check if the birthday is today
                if (dobDayMonth === todayDayMonth) {
                    birthdaysToday.push(user);
                } else {
                    // Set the year to the current year for comparison
                    const dobThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
                    
                    // Calculate the difference in days from today
                    const timeDiff = dobThisYear - today;
                    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    if (daysDiff > 0 && daysDiff <= 5) {
                        upcomingBirthdays.push({ ...user, formattedDate: dobThisYear.toDateString() });
                    }
                }
            });

            this.setState({ birthdaysToday, upcomingBirthdays }, () => {
                if (birthdaysToday.length > 0) {
                    this.triggerConfetti();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching birthdays:', error);
        });
    };

    handleCheckIn = () => {
        const { timerRunning, startTime, accumulatedTime, loading } = this.state;

        if (loading) {
            return; // Prevent any action if a request is in progress
        }

        this.setState({ loading: true });

        // Determine the action type
        const actionType = timerRunning ? 'check-out' : 'check-in';

        fetch('http://dwinhrms-eapi.us-e2.cloudhub.io/api/attendance/entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            },
            body: JSON.stringify({ EmployeeID: 'n', action: actionType })
        })
        .then(response => {
            if (response.ok) {
                if (!timerRunning) {
                    const currentTime = new Date();
                    this.setState({
                        startTime: currentTime,
                        timerRunning: true,
                        loading: false
                    });

                    this.timer = setInterval(() => {
                        this.setState({
                            elapsedTime: new Date() - currentTime + accumulatedTime
                        });
                    }, 1000);
                } else {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }

                    this.setState((prevState) => ({
                        accumulatedTime: prevState.elapsedTime,
                        timerRunning: false,
                        startTime: null,
                        loading: false
                    }));
                }
            } else {
                console.error('API request failed');
                this.setState({ loading: false });
            }
        })
        .catch(error => {
            console.error('Error occurred while making the API request:', error);
            this.setState({ loading: false });
        });
    };

    formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` + " Hrs";

        return formattedTime;
    };

    triggerConfetti = () => {
        this.setState({ showConfetti: true }, () => {
            setTimeout(() => {
                this.setState({ showConfetti: false });
            }, 3000); // Confetti will be visible for 3 seconds
        });
    };

    render() {
        const { elapsedTime, timerRunning, loading, birthdaysToday, upcomingBirthdays, showConfetti } = this.state;
        const data = this.props.location.pathname;
        const buttonClass = timerRunning ? 'button-101' : 'button-100';
        // Image path for the Attendance button
        const attendanceImagePath = require('../../../assets/images/img-16.jpg').default;

        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
                            <Sidebar />
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="card dash-widget ctm-border-radius shadow-sm">
                                        <div className="card-body">
                                            <div className="card-icon bg-primary">
                                                <i className="fa fa-users" aria-hidden="true"></i>
                                            </div>
                                            <div className="card-right">
                                                <h4 className="card-title">Employees</h4>
                                                <p className="card-text">700</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                    <div className="card dash-widget ctm-border-radius shadow-sm">
                                        <div className="card-body">
                                            <div className="card-icon bg-warning">
                                                <i className="fa fa-building-o"></i>
                                            </div>
                                            <div className="card-right">
                                                <h4 className="card-title">Companies</h4>
                                                <p className="card-text">30</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                    <div className="card dash-widget ctm-border-radius shadow-sm">
                                        <div className="card-body">
                                            <div className="card-icon bg-danger">
                                                <i className="fa fa-suitcase" aria-hidden="true"></i>
                                            </div>
                                            <div className="card-right">
                                                <h4 className="card-title">Leaves</h4>
                                                <p className="card-text">3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                    <div className="card dash-widget ctm-border-radius shadow-sm">
                                        <div className="card-body">
                                            <div className="card-icon bg-success">
                                                <i className="fa fa-money" aria-hidden="true"></i>
                                            </div>
                                            <div className="card-right">
                                                <h4 className="card-title">Salary</h4>
                                                <p className="card-text">$5.8M</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* row */}
                            <div className="col-xl-9 col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-12 d-flex">
                                        <div className="card shadow-sm flex-fill">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-12 allowance text-center">
                                                        <button
                                                            onClick={this.handleCheckIn}
                                                            className={`mb-2 btn btn-theme ${buttonClass} text-white ctm-border-radius fa fa-clock-o `}
                                                            disabled={loading}
                                                        >
                                                            {timerRunning ? ' Check-out' : ' Check-in'}
                                                        </button>
                                                        <p>{this.formatTime(elapsedTime)}</p>
                                                    </div>
                                                    {/* Center the image */}
                                                    <div className="col-md-6 col-sm-6 col-12 text-center">
                                                    <Link to="/dashboard/attendance/index">
                                                            <img
                                                                src={attendanceImagePath} 
                                                                alt="Attendance"
                                                                className="img-fluid attendance-image"
                                                                style={{ maxHeight: '100px' }}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 d-flex">
                                        <div className="card shadow-sm flex-fill">
                                            <div className="card-body">
                                                <h4 className="card-title">Today's Birthdays</h4>
                                                {birthdaysToday && birthdaysToday.length > 0 ? (
                                                    <div style={{ position: 'relative' }}>
                                                        {birthdaysToday.map((user, index) => (
                                                            <div
                                                                key={index}
                                                                className="birthday-message mb-3 p-3 rounded shadow-sm"
                                                                style={{
                                                                    backgroundColor: '#e7f3fe',
                                                                    borderLeft: '5px solid #2196f3',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={this.triggerConfetti}
                                                            >
                                                                <span
                                                                    style={{
                                                                        fontSize: '16px',
                                                                        fontWeight: 'bold',
                                                                        color: '#333',
                                                                    }}
                                                                >
                                                                    {user.FirstName}'s birthday today
                                                                </span>
                                                                <i
                                                                    className="fa fa-birthday-cake text-primary ml-2"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </div>
                                                        ))}
                                                        {showConfetti && (
                                                            <Confetti
                                                                numberOfPieces={400}
                                                                width={220}
                                                                height={150}
                                                                recycle={false}
                                                                colors={[
                                                                    '#ff0a54', '#ff477e','#ff7096', '#ff85a1','#fbb1bd','#f9bec7','#ffc4d1','#ffccd5','#ffdeeb',
                                                                    '#3e007c', '#4b75bd', '#a0a0a0', '#f1bd06', '#898f96','#212529', '#26830fef', '#007bff'
                                                                ]}
                                                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                                            />
                                                        )}
                                                    </div>
                                                ) : (
                                                    <h6 className="mb-3">No Birthdays Today</h6>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 d-flex">
                                        <div className="card shadow-sm flex-fill">
                                            <div className="card-body">
                                                <h4 className="card-title">Upcoming Birthdays</h4>
                                                {upcomingBirthdays && upcomingBirthdays.length > 0 ? (
                                                    upcomingBirthdays.map((user, index) => (
                                                        <div
                                                            key={index}
                                                            className="birthday-message mb-3 p-3 rounded shadow-sm"
                                                            style={{
                                                                backgroundColor: '#fff3e0',
                                                                borderLeft: '5px solid #ff9800',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    fontSize: '16px',
                                                                    fontWeight: 'bold',
                                                                    color: '#333',
                                                                }}
                                                            >
                                                                {user.FirstName}'s birthday is on {user.formattedDate}
                                                            </span>
                                                            <i
                                                                className="fa fa-birthday-cake text-primary ml-2"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <h6 className="mb-3">No Upcoming Birthdays</h6>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* row */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
