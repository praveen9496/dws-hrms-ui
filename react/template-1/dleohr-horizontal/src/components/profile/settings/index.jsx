import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Sidebar from '../sidebar';

const IMG01 = 'path/to/default/image.jpg'; // Replace with your default image path

class ProfileSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: null,
			profileImage: localStorage.getItem('profileImage') || IMG01,
		};
	}

	handleClose = () => {
		this.setState({
			show: null,
		});
	};

	handleShow = (id) => {
		this.setState({
			show: id,
		});
	};

	handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append('image', file);

			const profileImage = this.state.profileImage;
			const url = profileImage === IMG01 
				? 'http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/profileImage'
				: 'http://dwinhrms-eapi.us-e2.cloudhub.io/api/user-profile/profileImage/${employeeId}';

			if (profileImage === IMG01) {
				formData.append('EmployeeID', 'employeeId'); // Append EmployeeID only if the profile image is the default image
			}

			const method = profileImage === IMG01 ? 'POST' : 'PATCH';

			// Include headers
			const headers = new Headers();
			headers.append('Content-Type', 'multipart/form-data');
			headers.append('client_id', 'f166fc00447c4c358fd582d79f246f92');
			headers.append('client_secret', '749f3d2b22d74A5f827c4BaB9FCb324F');

			fetch(url, {
				method: method,
				body: formData
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					const newProfileImage = URL.createObjectURL(file);
					this.setState({ profileImage: newProfileImage });
					localStorage.setItem('profileImage', newProfileImage);
					this.handleClose();
				} else {
					// handle error
					alert("Failed to upload image");
				}
			})
			.catch(error => {
				console.error('Error:', error);
				alert("Error uploading image");
			});
		}
	};

	render() {
		const { profileImage, show } = this.state;

		return (
			<div className="page-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
							<Sidebar />
						</div>
						<div className="col-xl-9 col-lg-8 col-md-12">
							<div className="row">
								<div className="col-lg-6 d-flex">
									<div className="card flex-fill ctm-border-radius shadow-sm">
										<div className="card-header">
											<h4 className="card-title mb-0">Profile Image</h4>
										</div>
										<div className="card-body text-center">
											<div className="user-avatar mb-4">
												<img src={profileImage} alt="User Avatar" className="img-fluid rounded-circle" width="120" height="120" />
											</div>
											<button className="btn btn-theme button-1 ctm-border-radius text-white" onClick={() => this.handleShow('editprofileimage')}>Change Profile Image</button>
										</div>
									</div>
								</div>
								<div className="col-lg-6 d-flex">
									<div className="card reminder flex-fill ctm-border-radius shadow-sm">
										<div className="card-header">
											<h4 className="card-title mb-0">Company Notification Settings</h4>
											<span className="ctm-text-sm">You will receive information across the whole company.</span>
										</div>
										<div className="card-body">
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="weekly-digest" defaultChecked />
												<label className="custom-control-label" htmlFor="weekly-digest"><span className="h6">Weekly Summarize</span><br /><span className="ctm-text-sm">Keeping you in the loop with a weekly email summarizing</span></label>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="weekly-payroll" defaultChecked />
												<label className="custom-control-label" htmlFor="weekly-payroll"><span className="h6">Weekly Payroll Summarize</span><br /><span className="ctm-text-sm">A weekly email containing all changes related to your payroll..</span></label>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="Key" defaultChecked />
												<label className="custom-control-label" htmlFor="Key"><span className="h6">Visa Dates</span><br /><span className="ctm-text-sm">Informs and notify the day before Visa dates for each team member.</span></label>
											</div>
											<div className="text-center">
												<button className="btn btn-theme button-1 ctm-border-radius text-white">Update Notification Settings</button>
											</div>
										</div>
									</div>
								</div>
							</div> {/* row */}
							<div className="row">
								<div className="col-md-12">
									<div className="card ctm-border-radius shadow-sm">
										<div className="card-header">
											<h4 className="card-title mb-0">Team Member Notification Settings</h4>
											<p className="ctm-text-sm">You will receive notifications only for Team Leads.</p>
										</div>
										<div className="card-body">
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="birthday" defaultChecked />
												<label className="custom-control-label" htmlFor="birthday"><span className="h6">Birthdays</span><br /><span className="ctm-text-sm">Reasons to party with reminders a week and a day before a team member’s birthday.</span></label>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="Work" defaultChecked />
												<label className="custom-control-label" htmlFor="Work"><span className="h6">Work Anniversaries</span><br /><span className="ctm-text-sm">Never miss work anniversaries with reminders the week and the day before.</span></label>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="Key1" defaultChecked />
												<label className="custom-control-label" htmlFor="Key1"><span className="h6">Key Dates</span><br /><span className="ctm-text-sm">Informs and notify the day before key dates for each team member.</span></label>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="Offboardings" defaultChecked />
												<label className="custom-control-label" htmlFor="Offboardings"><span className="h6">Off Boardings</span><br /><span className="ctm-text-sm">Informs you when a team member has a leaving date set and reminds you the day before.</span></label>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input type="checkbox" className="custom-control-input" id="Home" defaultChecked />
												<label className="custom-control-label" htmlFor="Home"><span className="h6">Work From Home Notifications</span><br /><span className="ctm-text-sm">Never miss a notification that someone will be working from home.</span></label>
											</div>
											<div className="text-center">
												<button className="btn btn-theme button-1 ctm-border-radius text-white">Update Notification Settings</button>
											</div>
										</div>
									</div>
								</div>
							</div> {/* row */}

						</div>
					</div> {/* row */}
					{/* Change profile image modal */}
					<Modal
						show={show === "editprofileimage"}
						onHide={this.handleClose}
						centered
					>
						<Modal.Header closeButton>
							<h4 className="modal-title mb-3">Change Profile Image</h4>
						</Modal.Header>
						<Modal.Body>
							<div className="form-group">
								<label>Upload a new profile image</label>
								<input type="file" className="form-control" onChange={this.handleImageChange} />
							</div>
							<button type="button" className="btn btn-danger text-white ctm-border-radius ml-3 float-right" onClick={this.handleClose}>Cancel</button>
							<button type="button" className="btn btn-theme button-1 text-white ctm-border-radius float-right" onClick={this.handleClose}>Save</button>
						</Modal.Body>
					</Modal>
					{/* add payroll */}
					<Modal
						show={show === "add"}
						onHide={this.handleClose}
						centered
					>
						<Modal.Header closeButton>
							<h4 className="modal-title mb-3">Add Payroll</h4>
						</Modal.Header>
						<Modal.Body>
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Add Bank Name" />
								<div className="input-group-append">
									<button className="btn btn-theme button-1 text-white ctm-border-radius" type="button">
										<i className="fa fa-pencil" aria-hidden="true"></i>
									</button>
								</div>
							</div>
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Add Bank Account Number" />
								<div className="input-group-append">
									<button className="btn btn-theme button-1 text-white ctm-border-radius" type="button"><i className="fa fa-pencil" aria-hidden="true"></i></button>
								</div>
							</div>
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Add Bank Sort Code" />
								<div className="input-group-append">
									<button className="btn btn-theme button-1 text-white ctm-border-radius" type="button">
										<i className="fa fa-pencil" aria-hidden="true"></i>
									</button>
								</div>
							</div>
							<button type="button" className="btn btn-danger text-white ctm-border-radius float-right ml-3" onClick={this.handleClose}>Cancel</button>
							<button type="button" className="btn btn-theme button-1 text-white ctm-border-radius float-right">Save</button>
						</Modal.Body>
					</Modal>
					{/* edit payroll */}
					<Modal
						show={show === "editpayroll"}
						onHide={this.handleClose}
						centered
					>
						<Modal.Header closeButton>
							<h4 className="modal-title mb-3">Edit Payroll</h4>
						</Modal.Header>
						<Modal.Body>
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Add Bank Name" defaultValue="Life Essence Banks, Inc." />
								<div className="input-group-append">
									<button className="btn btn-theme button-1 text-white ctm-border-radius" type="button"><i className="fa fa-pencil" aria-hidden="true"></i></button>
								</div>
							</div>
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Add Bank Account Number" defaultValue="112300987652" />
								<div className="input-group-append">
									<button className="btn btn-theme button-1 text-white ctm-border-radius" type="button"><i className="fa fa-pencil" aria-hidden="true"></i></button>
								</div>
							</div>
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Add Bank Sort Code" defaultValue="LE00652" />
								<div className="input-group-append">
									<button className="btn btn-theme button-1 text-white ctm-border-radius" type="button"><i className="fa fa-pencil" aria-hidden="true"></i></button>
								</div>
							</div>
							<button type="button" className="btn btn-danger text-white ctm-border-radius float-right ml-3" onClick={this.handleClose}>Cancel</button>
							<button type="button" className="btn btn-theme button-1 text-white ctm-border-radius float-right">Save</button>
						</Modal.Body>
					</Modal>
					{/* Edit P45 */}
					<Modal
						show={show === "editp45"}
						onHide={this.handleClose}
						centered
					>
						<Modal.Header closeButton>
							<h4 className="modal-title mb-3">Edit P45</h4>
						</Modal.Header>
						<Modal.Body>
							<div className="form-group">
								<div className="input-group mb-3">
									<input className="form-control date-enter" type="text" placeholder="P45" />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group mb-3">
									<input className="form-control date-enter" type="text" placeholder="Document Description ( optional )" />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group mb-3">
									<input className="form-control date-enter" type="file" />
								</div>
							</div>
							<button type="button" className="btn btn-danger text-white ctm-border-radius ml-3 float-right" onClick={this.handleClose}>Cancel</button>
							<button type="button" className="btn btn-theme button-1 text-white ctm-border-radius float-right">Save Document</button>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		);
	}
}

export default ProfileSettings;
