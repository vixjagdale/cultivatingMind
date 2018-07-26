import React, { Component } from 'react';
import { render } from 'react-dom';
import ConfirmOtpModal from './ConfirmOtpModal.jsx';
import {Session} from 'meteor/session';
import InputMask from 'react-input-mask';
export default class SignUp extends Component {
	constructor(props){
		super(props);
		this.state={
			subscription      : {
				"allUserData" : Meteor.subscribe("allUserData"),
			}
		}
	}
	usersignup(event){
		event.preventDefault();
		// if ($('input.checkbox_check').is(':checked')) {
        var formValues = {
                          'firstname'        : this.refs.firstname.value,
                          'lastname'         : this.refs.lastname.value,
                          'signupEmail'      : this.refs.signupEmail.value,
                          'mobNumber'        : this.refs.mobNumber.value,
                          'signupPassword'   : this.refs.signupPassword.value,
                        }   

        var firstname                = this.refs.firstname.value;
        var passwordVar              = this.refs.signupPassword.value;
        var signupConfirmPasswordVar = this.refs.signupConfirmPassword.value;
        var mobile                   = this.refs.mobNumber.value;
        var email                    = this.refs.signupEmail.value;


         //Check password is at least 6 chars long
          var isValidPassword = function(passwordVar, signupConfirmPasswordVar) {
             if (passwordVar === signupConfirmPasswordVar) {
               return passwordVar.length >= 6 ? true : swal({
                                                                title : "Password should be at least 6 Characters Long",
                                                                text  : "Please try again or create an Account",
                                                                // timer: 1700,
                                                                showConfirmButton: true,
                                                                // type  : "error"
                                                            });
             } else {
               return swal({
                  title  : 'Passwords dont Match',
                  text   : 'Please Try Again',
                  showConfirmButton: true,
                  type   : 'error'
               }); //End of error swal
             } //End of else
           }

        if (isValidPassword(passwordVar, signupConfirmPasswordVar)) {
        		var curMobileNum = $('#mobNumber').val();
        		var MobileNoExist = Meteor.users.findOne({'profile.mobNumber':curMobileNum});
        		if(MobileNoExist){
        			return swal({
	                  title  : 'Contact Number Already Exist',
	                  text   : 'Please Try Another Number',
	                  showConfirmButton: true,
              		});
        		}else{

		   	 	Meteor.call('userCreateAccount', formValues ,(error,result) => {
				          if(error){
				            swal(error.reason);
				          }else{


			          	// CLEAR ALL FIELDS
			            this.refs.firstname.value      = '';
			            this.refs.lastname.value       = '';
			            this.refs.signupEmail.value    = '';
			            this.refs.mobNumber.value      = '';
			            this.refs.signupPassword.value = '';   

			            // Meteor.logout();

				        var emailotp = Math.floor(100000 + Math.random() * 900000);
				        // Session.set('mobotp',mobileotp);
				        // Session.set('mailotp',emailotp);

			            // ADD USER ROLE 
			            var newID = result;
			            // Meteor.call("addRoles",newID,"Student");
			            Meteor.call('addOTP', newID , emailotp, function(error,result){
			              if(error){
			                console.log(error);
			              }else{
			              	Flowrouter.go('/otpFirstVarification/'+newID);

			              	//SEND SMS for Verification

			              	Meteor.call("sendSMSMsg",firstname,mobile,emailotp);

			              	// SEND EMAIL VERIFICATION LINK
				            
				            // Meteor.call('sendVerificationLinkToUser', email, function(error,result){
				            //   if(error){
				            //     (error);
				            //   }else{ 
				    
				            //   } //end else
				            
				            // }); // send verification mail ends
			              
			              }
			            });

			            // // var Role  = 'User';
			            // Meteor.call('addRoles', newID , Role, function(error,result){
			            //   if(error){
			            //     console.log(error);
			            //   }else{
			            //   }
			            // }); // add role

			          } //end else
			      	
			        });
		
		  }
    	}

    	// }else{
    
    	// }

    return 0;  	

	}


	showSignPass(){
	 	$('.rrnShowPass').toggleClass('rrnShowPass1');
	 	$('.rrnHidePass').toggleClass('rrnHidePass1');
	 	return $('.oesSignUpFormPass').attr('type', 'text');
	 }
	 hideSignPass(){
	 	$('.rrnShowPass').toggleClass('rrnShowPass1');
	 	$('.rrnHidePass').toggleClass('rrnHidePass1');
	 	return $('.oesSignUpFormPass').attr('type', 'password');
	 }

	componentDidMount(){
	 	
  	}
	render(){
		Meteor.logout();
		var winHeight = $(window).height();
		var divHeight = winHeight+'px';
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
				<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 signUpLeftWrap"  style={{"height": divHeight}}>
					<img src="/images/signUpBanner.gif" className="signUpBanner col-lg-9 col-md-9"/>
				</div>
				<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signUpRighttWrap"  style={{"height": divHeight}}>
				</div>
				<div className="col-lg-4 col-lg-offset-7 col-md-5 col-md-offset-6 col-xs-4 col-sm-5 col-sm-offset-6 signUpFormWrap">
					<div className="col-lg-4">

					</div>
					<div className="col-lg-12">
						<div className="col-lg-12 col-md-12 OEXLogoWrap">
							<img src="/images/maatslogo.png" className="oesLogoImg col-lg-offset-2 col-lg-8 col-md-8 col-md-offset-2"/>
						</div>
					</div>
					<div className="OESSubTitle2">Cultivating Mind</div>
					<h3 className="signUpNameTitle"> Sign Up</h3>
					<form id="signUpUser" onSubmit={this.usersignup.bind(this)}>
					<div className="col-lg-12 col-md-12 signUpInnerWrapperOES">
	
						<div className="form-group col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
						   		<span className="blocking-span">
								   <input type="text" title="Only alphabets are allowed!" className="form-control spotylTextbox oesSignUpForm" ref="firstname" name="firstname" pattern="[a-zA-Z][a-zA-Z ]+"  required/>
						    		<span className="floating-label">
						    		<i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
						    		First Name
						    		</span>					   			
								</span>
						</div>

					   <div className="form-group col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
							<span className="blocking-span">   
							   <input type="text" title="Please enter alphabets only!" className="form-control spotylTextbox oesSignUpForm" ref="lastname" name="lastname" required/>
					    	<span className="floating-label">
					    		<i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
					    		Last Name
					    	</span>					   			
						</span>
					    </div>
					    <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
							<span className="blocking-span">   
							   <InputMask mask="9999-999-999" maskChar=" " pattern="^(0|[0-9-+\s]*)$" title="Please enter numbers!" className="form-control  spotylTextbox oesSignUpForm" ref="mobNumber" name="mobNumber" id="mobNumber" required/>
							<span className="floating-label">
							<i className="fa fa-mobile signupIconFont" aria-hidden="true"></i>Mobile Number</span>					   			
						</span>
					    
					    </div>
				   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
							<span className="blocking-span">   
							  <input type="email" title="Please match email format!" className="form-control signupsetting  spotylTextbox oesSignUpForm" ref="signupEmail" name="signupEmail" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$" required/>
					    		<span className="floating-label"><i className="fa fa-envelope-o signupIconFont" aria-hidden="true"></i>Email ID</span>					   			
							</span>
					    </div>
				   		<div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent">
				   			<span className="blocking-span">
							   <input type="password" className="form-control Pass  spotylTextbox oesSignUpForm" ref="signupPassword" name="signupPassword" required/>
							<span className="floating-label"><i className="fa fa-lock" aria-hidden="true"></i> Password (min 6 char)</span>					   			
						</span>
					    </div>

				   		<div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent">
				   			<span className="blocking-span">
							   <input type="password" className="form-control Pass  spotylTextbox oesSignUpForm" ref="signupConfirmPassword" name="signupConfirmPassword" required/>
							<span className="floating-label"><i className="fa fa-lock" aria-hidden="true"></i> Confirm Password</span>					   			
						</span>
					    </div>  
				   		{/*<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
						   	<span className="termsNConditions UMIHaveRead "> I have read 
						   	</span>
					   		<Link href='#'>
					   			<span className="btn-link termsClass">Terms and Conditions.</span>
					   		</Link>
						   	<input type="checkbox" name="terms" ref="terms" className="checkbox_check checkbox option-input option-input2 pull-left"/>
						   	<br/>
					    </div>*/}


						<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 rrnRegisterBtn">
					    	<input className="col-lg-12 col-md-12 col-xs-12 col-sm-12 col-xs-12 UMloginbutton hvr-sweep-to-right" type="submit" value="Sign Up"/>
					   </div>		   

				    	<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
					    	<Link to="/" className="UMGrey"><i className="fa fa-undo" aria-hidden="true"></i> Click here to Login</Link> 	
				    	</div>

					  </div> 
				  	</form>
					</div>
				</div>
			);
	}
}