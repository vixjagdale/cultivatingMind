import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import NotFound from '../../common/NotFound.jsx'; 

export default class ChangePassword extends TrackerReact(Component) {

	'changePassword'(event) {
	    event.preventDefault();
	    var password        = this.refs.password.value;
	    var confirmPassword = this.refs.confirmPassword.value;

         //Check password is at least 6 chars long
          var isValidPassword = function(passwordVar, signupConfirmPasswordVar) {
             if (passwordVar === signupConfirmPasswordVar) {
               return passwordVar.length >= 6 ? true : swal({
                                                                title : "password should be at least 6 characters long",
                                                                text  : "Please try again or create an account",
                                                                // timer: 1700,
                                                                showConfirmButton: true,
                                                                type  : "error"
                                                            });
             } else {
               return swal({
                  title  : 'Passwords dont match',
                  text   : 'Please try again',
                  showConfirmButton: true,
                  type   : 'error'
               }); //End of error swal
             } //End of else
           }

        if (isValidPassword(password, confirmPassword)) {
		    Meteor.call('changeUserPassword',password, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    	}else{
	        		swal({
					  title       : 'Password!!',
					  text        : 'Password changed successfully.Please login again!',
					  imageUrl    : '/images/spotyl.png',
					  imageWidth  : 400,
					  imageHeight : 200,
					  animation   : false,
					  customClass : 'animated wobble',
					});
					FlowRouter.go('/userlogin');
		    	}
		    });
		}
	 }

	constructor() {
	    super();
	    this.state = {
	    	password : '',
	    };

	    this.handleChange = this.handleChange.bind(this);
  	}

	handleChange(event){
	  const target = event.target;
	  const name   = target.name;
	  this.setState({
	  	[name]: event.target.value,
	  });
	}

	render() {
		// if(Meteor.isCordova) {
  //      var lg = "col-lg-9";
  //      // console.log("lg",lg);

  //   }else if(Meteor.isClient) {
  //      var lg = "hidden-lg";
  //      // console.log("lg",lg);
  //   }

     return(
     	  <div>
          <div className="col-lg-12
                col-md-12
                col-sm-12
                col-xs-12 indwiseRRNHeading">
                  Change Password 
          </div>
     			<div className="hidden-lg hidden-md col-sm-12 col-xs-12 changePassWrap"> 
     				<form onSubmit={this.changePassword.bind(this)}>
     					{/*<div className="form-group col-lg-12 col-md-4 col-xs-12 col-sm-12">
     						<label>Password:</label>
       					<input type="password" title="Please enter between 6-20 characters" className="form-control changedPassInput" onChange={this.handleChange} ref="password" name="password" pattern="^.{6,20}$" required/>
       				</div>*/}
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContent">
                <span className="blocking-span">
                  <input type="password" title="Please enter between 6-20 characters" className="col-sm-12 col-xs-12 changedPassInput rrnInput inputText" onChange={this.handleChange} ref="password" name="password" pattern="^.{6,20}$" required/>
                  <span className="floating-label">Password</span> 
                </span>  
              </div>
     					{/*<div className="form-group col-lg-12 col-md-4 col-xs-12 col-sm-12">
     						<label>Confirm Password:</label>
       					<input type="password" title="Please enter between 6-20 characters" className="form-control changedPassInput" onChange={this.handleChange} ref="confirmPassword" name="confirmPassword" pattern="^.{6,20}$" required/>
       				</div>*/}
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContent">
                <span className="blocking-span">
                  <input type="password" title="Please enter between 6-20 characters" className="col-sm-12 col-xs-12 changedPassInput rrnInput inputText" onChange={this.handleChange} ref="confirmPassword" name="confirmPassword" pattern="^.{6,20}$" required/>
                  <span className="floating-label">Confirm Password</span> 
                </span>  
              </div>
       				<div className="form-group col-lg-12 col-md-4 col-xs-12 col-sm-12 changeInAppPass">
       					<input type="submit" value="Change Password" className="btn hvr-sweep-to-right btn btn-primary changeInAppPassBtn"/>
       				</div>
     				</form>
		   	  </div>
          <div className="col-lg-12 col-md-12 hidden-sm hidden-xs">
            {/* <NotFound />*/}
          </div>
		   </div>
    );

	} 

}