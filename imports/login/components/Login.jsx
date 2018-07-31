import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Login extends TrackerReact(Component){

	userlogin(event){
		event.preventDefault();

		var username    = this.refs.loginusername.value;
		var passwordVar = this.refs.loginPassword.value;  


        Meteor.loginWithPassword(username, passwordVar, function(error) {
                if (error) {
                    return swal({
                        title: "Username or password Incorrect",
                        text: "Please try again",
                        timer: 1700,
                        showConfirmButton: false,
                        type: "error"
                    });
                }
            });

	}

	render() {
		$('.intro').css({'height': screen.height + "px"});
	    return (
	     <div className="intro col-lg-12 col-md-12 col-sm-12 col-xs-12">
	     	<div className="home col-lg-12 col-md-12 col-sm-12 col-xs-12">
	     		<a href="/"><i className="fa fa-home"></i></a>
	     	</div>
		        <div className="inner">
		            <div className="loginwrappercontent col-lg-6 col-lg-offset-3">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brandName">ECSystems LOGIN</div>
		                <div className="UMlogin col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                	<div className="break col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
					      	<form id="login" onSubmit={this.userlogin.bind(this)}>

							    <div className="form-group col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12 inputContent loginInput">
									<label className="loginLabel">Email</label>
									<div className="inputEffect col-xs-12 input-group">
							        	<span className="input-group-addon addons"><i className="fa fa-user-circle"></i></span>
							        	<input className="form-control loginLabel effectAddress UMname" type="text" ref="loginusername" name="loginusername"/>
							        </div>
							    </div>
							    <div className="form-group col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12 inputContent">
								    <label className="loginLabel">Password</label>
								    <div className="inputEffect col-xs-12 input-group passwordOuterBlock">
							        	<span className="input-group-addon addons"><i className="fa fa-key" aria-hidden="true"></i></span>
							        	<input className="form-control loginLabel effectAddress UMname" type="password" ref="loginPassword" name="loginPassword"/> 
		                     	        
							        </div>
							    </div>
							    
							    <div className="form-group col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12 outerLoginButton">
							    	<input type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 btn btn-primary loginLabel" value="Login"/>
							    </div>

							</form>
  
						</div>    

		                
		            	</div>
		        </div>
		    </div>
		    );
   		}
}