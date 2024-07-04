import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';
import Tableoverview from "./tableoverview";

class Reviewsoverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log();
    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row grow">
            <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
			<div className="card ctm-border-radius shadow-sm grow">
									<div className="card-body py-4">
										<div className="row">
											<div className="col-md-12 mr-auto text-left">
												<div className="custom-search input-group">
													<div className="custom-breadcrumb">
														<ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
															<li className="breadcrumb-item d-inline-block"><Link to="dashboard" className="text-dark">Home</Link></li>
															<li className="breadcrumb-item d-inline-block active">Reviews</li>
														</ol>
														<h4 className="text-dark">Reviews</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
			<Sidebar data={this.props}/>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12">
			<div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
									<div className="card-body">
										<div className="flex-row list-group list-group-horizontal-lg" id="v-pills-tab" role="tablist" aria-orientation="vertical">
											<Link to="/overview-reviews" className=" active list-group-item">Overview</Link>
											<Link to="/review-type" className="list-group-item">Review Types</Link>
										</div>
									</div>
								</div>
						<div className="card shadow-sm ctm-border-radius">
						<div className="card-header d-flex align-items-center justify-content-between">
									<h4 className="card-title mb-0 d-inline-block">Reviews</h4>
									<Link to="/create-review" className="btn btn-theme button-1 ctm-border-radius text-white float-right"><span></span> Create Review</Link>
								</div>
							<div className="card-body align-center">
							<div className="tab-content" id="v-pills-tabContent">
								<div
								className="tab-pane fade show active"
								id="v-pills-home"
								role="tabpanel"
								aria-labelledby="v-pills-home-tab"
								></div>
								<div className="employee-office-table">
								<div className="table-responsive">
									<Tableoverview />
								</div>
								</div>
								{/* tab1 */}
							</div>
							</div>
						</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviewsoverview;
