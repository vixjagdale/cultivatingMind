import React, { Component } from 'react';
import { render } from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';
import ConfirmOtpModal from './ConfirmOtpModal.jsx';
import NewForgotPassword from './NewForgotPassword.jsx';
import NewResetPassword from './NewResetPassword.jsx';

export default class UMLogin extends Component{
	constructor(props){
		super(props);
		this.state={
			'showLoginBrn' : true,
			'defaultLoginBtnTime': '02:00',
			'subscription':{
				 
			}
		}
	}
	userlogin(event){
		event.preventDefault();
		// alert("working");
		this.setState({
			showLoginBrn : false,
		});
		var email       = this.refs.loginusername.value;
		var passwordVar = this.refs.loginPassword.value;  

	    Meteor.call('checkEmailVerification', email, function(error,data){
	      if (data == "verified"){
	      	// alert('verified');
	        Meteor.call('checkBlockedUser', email, function(error,data){
	          if (data == "Active"){
	          	// alert('active');
	            Meteor.loginWithPassword(email, passwordVar, function(error) {
	            	// alert('in login loginWithPassword');
	                    if (error) {
	                        // return 
	                        	swal("Either Email or Password is Incorrect");
	                        // swal({
	                        //     title: "Email or password Incorrect",
	                        //     text: "Please try again or create an account",
	                        //     timer: 1700,
	                        //     showConfirmButton: false,
	                        //     type: "error"
	                        // });
	                    } else {
	                    	
	                    	if(Roles.userIsInRole(Meteor.userId(), ['admin','superAdmin'])) {
	                    		Flowrouter.go('/admin/dashboard');
	                    	}else{
	                    		var NewUser = Meteor.users.findOne({"_id":Meteor.userId()});
	                    		if(NewUser){
	                    			var profile = NewUser.profile;
	                    			var company = profile.company;
	                    		}
	                    		if((Roles.userIsInRole(Meteor.userId(), ['Admin'])) && (company =="New Company")){
	                    			Flowrouter.go('/addCompanyInfo');
	                    		}else{
		                    		 Flowrouter.go('/admin/dashboard');
	                    		}

	                    	}
	                    }
	                });

	            }else if(data == "Blocked"){
	                swal("You're profile is Blocked. Please Contact Admin.");
	            }else{
	            	// alert('incorrect password one');
	                swal("Either Email or Password is Incorrect");
	            }
	          });
	      
	      }else if(data == "unverified"){
	      	// alert('unverified');
	          swal({title:"Check your Email for a Verification a",
	          		// text: "Please check your Email and Enter OTP to Varify your Account",
	        
	      			});
	      			 
	      }else{
	      		// alert('incorrect password');
	          	swal("Either Email or Password is Incorrect");
	      }
	    });


    return false;	    	


	}

	 // componentDidMount() {
	 // 	$("#login").validate();
	 // }
	 sendForgotPasswordOTP(event){
	 	event.preventDefault();
	 	var mobile = $('.mobile').val();
	 	Session.set("getMobileNumber",mobile);
		var otp = Math.floor(1000 + Math.random() * 9000);
		Session.set('FPotp',otp);
	 	if(mobile != ""){
			Meteor.call('sendOtp',mobile,otp,
			function(error,result){
				if(error){
					console.log(error.reason,"danger","growl-top-right");
				}else{
					
					$('#forgotpass').hide();
					$('.modal-backdrop').hide();

					$('#otpForgotPasswordModal').modal({
						show:true
					});
				}
			});
			
		}else{
			swal('Your Mobile Number is not Found. Please Enter Valid Mobile Number.');
		}
	 }
	 confirmOTP(event){
	 	event.preventDefault();
		var userId = Meteor.userId();
		var sessionValue = Session.get('FPotp');
		var otp = this.refs.otp.value;
		if(sessionValue == otp){
			$('.modal-backdrop').hide();
      		Flowrouter.go('/forgotPassword');
		}else{
			swal('Please Check your Mobile for Valid OTP');
		}

	 }
	 showPass(){
	 	$('.rrnShowPass').toggleClass('rrnShowPass1');
	 	$('.rrnHidePass').toggleClass('rrnHidePass1');
	 	return $('.oesSignUpFormPass').attr('type', 'text');
	 }
	 hidePass(){
	 	$('.rrnShowPass').toggleClass('rrnShowPass1');
	 	$('.rrnHidePass').toggleClass('rrnHidePass1');
	 	return $('.oesSignUpFormPass').attr('type', 'password');
	 }
  componentDidMount(){
		if ($('body').hasClass('adminLte')) {
		  $("script[src='/js/adminLte.js']").remove();
    	  $("a[href='/css/dashboard.css']").remove();
    	  $('body').removeClass('adminLte');
		}
  }

	render() {
		// if(!Meteor.userId()){
		  var winHeight = $(window).height();
		  var divHeight = winHeight+'px';
		  var MyDivHeight = $('#divHeghtIN').height();	   
	       return (	
	       			<div>
	       			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
						<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 signUpLeftWrap" style={{"height": divHeight}}>
							<img src="/images/signUpBanner.gif" className="signUpBanner col-lg-9 col-md-9"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signUpRighttWrap" style={{"height": divHeight}}>
						</div>
						<div className="col-lg-4 col-lg-offset-7 col-md-5 col-md-offset-6 col-xs-4 col-sm-5 col-sm-offset-6 signUpFormWrap loginOesWrap" id="divHeghtIN">
						  <div className="divLoginInWrap">
							<div className="col-lg-4">

							</div>
							<div className="col-lg-12">
								<div className="col-lg-12 col-md-12 OEXLogoWrap">
									<img src="/images/maatslogo.png" className="oesLogoImg col-lg-offset-2 col-lg-8 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2"/>
								</div>
							</div>
							<div className="OESSubTitle2">Cultivating Mind</div>
							<h3 className="signInNameTitle"> LOGIN</h3>
							<form id="login" onSubmit={this.userlogin.bind(this)}>
						    	<div className="col-lg-12 col-md-12 col-sm-12 ">	
						    		<div className="inputContent">
								    <span className="blocking-span">
									   <input type="email"  className="col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox" ref="loginusername" name="loginusername" placeholder="" required/>
									<span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email</span>					   			
									</span>
								    </div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12">	
								   <div className="inputContent ">
									   	<span className="blocking-span">
										   	<input type="password" className="col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox" ref="loginPassword" name="loginPassword" required/>
										 <span className="floating-label"><i className="fa fa-lock signupIconFont" aria-hidden="true"/> Password</span>					   			
									</span>

									<div className="rrnShowHideDiv">
									    
								    </div>
								    </div>
						    	</div>
						    	 <div className="col-lg-12 col-md-12 col-sm-12">
						    	 	<input type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 UMloginbutton hvr-sweep-to-right" value="Login"/>

							   </div>
				   				{/* <div className="col-lg-6 col-md-6 col-sm-6 UMcreateacc">
				   				 	<a href="/signUp" className="UMGreyy"> Sign Up</a>
				   				 </div>
								
								<div className="col-lg-6 col-md-6 col-sm-6 forgotpass">
									<a href="/forgotPassword">
									 	Forgot Password?
									</a>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 forgotpass emailverify">
									<a href="/verifyAccount">
									 	OTP Verification
									</a>
								</div>*/}
							</form>		
						</div>
					  </div>
					 {/*<img src="/images/underMaintenance.gif" className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 maintenanceClass"/>
					 <h2 className="col-lg-12 col-md-12 col-sm-12 pVText">Please visit <a href="http://exam.maats.in"> exam.maats.in</a></h2>*/}
					</div>
				</div>
					
			);
	       // {this.tryLoadingAgainforBtn()}
	
	} 

}
