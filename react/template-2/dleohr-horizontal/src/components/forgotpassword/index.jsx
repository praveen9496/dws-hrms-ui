import React, { Component } from "react";
import IMG01 from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
  
    render(){
        return(
            <div className="inner-wrapper login-body">
			<div className="login-wrapper">
				<div className="container">
					<div className="loginbox shadow-sm">
						<div className="login-left">
							<img className="img-fluid" src={IMG01} alt="Logo" />
						</div>
						<div className="login-right">
							<div className="login-right-wrap">
								<h1>Forgot Password?</h1>
								<p className="account-subtitle">Enter your email to get a reset link</p>
								
							
								<form>
									<div className="form-group">
										<input className="form-control" type="text" placeholder="Email" />
									</div>
									<div className="form-group mb-0">
										<button className="btn btn-theme button-1 ctm-border-radius text-white btn-block" type="submit">Reset Password</button>
									</div>
								</form>
								
								
								<div className="text-center dont-have">Remember your password? <Link to="login">Login</Link></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
             
        );
    }
}

export default ForgotPassword;