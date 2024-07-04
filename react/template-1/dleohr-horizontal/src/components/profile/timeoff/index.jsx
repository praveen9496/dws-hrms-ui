import React, { Component } from "react";
import Select from 'react-select';
import Sidebar from '../sidebar';
import axios from 'axios';
import moment from 'moment';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import IMG01 from '../../../assets/images/plaster.svg';
import IMG02 from '../../../assets/images/desk-lamp.svg';

class TimeOff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: null,
            holidays: [],
            showModal: false,
            newHolidays: [{ date: null, name: '' }]
        };
    }
   
    handletab = (id) => {
        this.setState({
            tab: id
        });
    };

    componentDidMount() {
        this.setState({
            tab: 'history' // Swap the initial tab to 'history'
        });

        // Fetch the holidays data from the API
        axios.get('http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/holidays', {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
            .then(response => {
                this.setState({
                    holidays: response.data.filter(holiday => moment(holiday.h_date, 'DD-MM-YYYY').year() === moment().year()) // Filter only current year holidays
                });
            })
            .catch(error => {
                console.error('There was an error fetching the holidays data!', error);
            });
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, newHolidays: [{ date: null, name: '' }] });
    };

    handleSaveHolidays = () => {
        const { newHolidays } = this.state;
        const formattedHolidays = newHolidays.map(holiday => ({
            Date: moment(holiday.date).format('DD-MM-YYYY'),
            Holiday: holiday.name
        }));

        axios.post('http://dwinhrms-eapi.us-e2.cloudhub.io/api/Leave/holidays', formattedHolidays, {
            headers: {
                'client_id': 'f166fc00447c4c358fd582d79f246f92',
                'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
            }
        })
            .then(response => {
                this.setState(prevState => ({
                    holidays: [...prevState.holidays, ...response.data],
                    showModal: false,
                    newHolidays: [{ date: null, name: '' }]
                }));
                alert('Leaves added successfully');
            })
            .catch(error => {
                console.error('There was an error saving the holidays!', error);
            });
    };

    handleAddHoliday = () => {
        this.setState(prevState => ({
            newHolidays: [...prevState.newHolidays, { date: null, name: '' }]
        }));
    };

    handleDateChange = (date, index) => {
        const { newHolidays } = this.state;
        const updatedHolidays = [...newHolidays];
        updatedHolidays[index].date = date;
        this.setState({ newHolidays: updatedHolidays });
    };

    handleNameChange = (event, index) => {
        const { newHolidays } = this.state;
        const updatedHolidays = [...newHolidays];
        updatedHolidays[index].name = event.target.value;
        this.setState({ newHolidays: updatedHolidays });
    };

    render() {
        const options = [
            // Commented out the select dropdown option
            // { value: 'Apply Leave', label: 'Apply Leave' },
            // { value: 'Working from home', label: 'Working from home' },
            // { value: 'Annual Leave', label: 'Annual Leave' },
            // { value: 'Sick Leave', label: 'Sick Leave' },
            // { value: 'Personal Leave', label: 'Personal Leave' }
        ];
        const option = [
            { value: 'Choose Approver', label: 'Choose Approver' },
            { value: 'Admin', label: 'Admin' },
            { value: 'Richard', label: 'Richard' }
        ];

        const { holidays, tab, showModal, newHolidays } = this.state;
        const currentDate = moment();

        const upcomingHolidays = holidays.filter(holiday => moment(holiday.h_date, 'DD-MM-YYYY').isAfter(currentDate));
        const historyHolidays = holidays.filter(holiday => moment(holiday.h_date, 'DD-MM-YYYY').isBefore(currentDate));

        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
                            <Sidebar />
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-xl-6 col-lg-12 col-md-7 col-12 d-flex">
                                    <div className="card ctm-border-radius shadow-sm flex-fill">
                                        <div className="card-header">
                                            <h4 className="card-title mb-0">Holidays List</h4>
                                            <Button variant="primary" className="float-right" onClick={this.handleShowModal}>+</Button>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-7 col-sm-6">
                                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                                        <li className="nav-item">
                                                            <a href="#0" className={`nav-link history-btn ${tab === 'history' ? 'active' : ''}`} onClick={() => this.handletab('history')}>History</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a href="#0" className={`nav-link history-btn ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => this.handletab('upcoming')}>Upcoming</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-5 col-sm-6">
                                                    {/* Commented out the select dropdown */}
                                                    {/* <Select className="select" options={options} /> */}
                                                </div>
                                                <div className="col-12">
                                                    <div className="tab-content py-0" id="pills-tabContent">
                                                        <div className={`tab-pane py-0 ${tab === 'history' ? 'active' : 'hide'}`}>
                                                            <div className="table-responsive table-hover">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Date</th>
                                                                            <th>Holiday Details</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {historyHolidays.map((holiday, index) => (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{moment(holiday.h_date, 'DD-MM-YYYY').format('ddd, DD MMM YYYY')}</td>
                                                                                <td>{holiday.holiday}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane py-0 ${tab === 'upcoming' ? 'active' : 'hide'}`}>
														<div className="table-responsive table-hover">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Date</th>
                                                                            <th>Leave Reason</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {upcomingHolidays.map((holiday, index) => (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{moment(holiday.h_date, 'DD-MM-YYYY').format('ddd, DD MMM YYYY')}</td>
                                                                                <td>{holiday.holiday}</td>
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
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-5 col-12 d-flex">
                                    <div className="card flex-fill ctm-border-radius shadow-sm">
                                        <div className="card-header">
                                            <h4 className="card-title mb-0">Leave Off Details</h4>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Year</h5>
                                            <p className="mb-0">01 January – 31 December</p>
                                            <hr />
                                            <h5 className="card-title">Days Used</h5>
                                            <div className="progress">
                                                <div className="progress-bar bg-primary w-25"> 5 days</div>
                                            </div>
                                            <hr />
                                            <h5 className="card-title">Days</h5>
                                            <p>5 Used</p>
                                            <hr />
                                            <h5 className="card-title">Non Deductible Days</h5>
                                            <p className="text-theme btn btn-theme ctm-border-radius btn-sm text-white d-inline-block">5 Approved</p>
                                            <p className="text-theme btn btn-theme ctm-border-radius btn-sm text-white d-inline-block">7 Pending</p>
                                            <hr />
                                            <h5 className="card-title">Attendance</h5>
                                            <p className="mb-3"><img className="mr-2 leave-img img-fluid" src={IMG01} alt="Sick Leave" /> 3 Sick Days</p>
                                            <p className="mb-0"><img className="mr-2 leave-img img-fluid" src={IMG02} alt="Working from Home" />2 Working from Home</p>
                                            <hr />
                                            <h4 className="card-title d-inline-block">Time Off Approvers</h4>
                                            <div className="form-row form-group">
                                                <div className="col-sm-12">
                                                    <Select options={option} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Holidays</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {newHolidays.map((holiday, index) => (
                                <div key={index}>
                                    <Form.Group controlId={`formHolidayDate${index}`}>
                                        <Form.Label>Date:</Form.Label>
                                        <DatePicker
                                            selected={holiday.date}
                                            onChange={(date) => this.handleDateChange(date, index)}
                                            className="form-control"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`formHolidayName${index}`}>
                                        <Form.Label>Holiday Name:</Form.Label>
                                        <Form.Control type="text" value={holiday.name} onChange={(event) => this.handleNameChange(event, index)} />
                                    </Form.Group>
                                    {index === newHolidays.length - 1 && (
                                        <Button variant="secondary" onClick={this.handleAddHoliday}>Add another holiday</Button>
                                    )}
                                    <hr />
                                </div>
                            ))}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>Cancel</Button>
                        <Button variant="primary" onClick={this.handleSaveHolidays}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default TimeOff;

