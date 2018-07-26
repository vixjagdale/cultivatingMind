import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';

export default class Emailverification extends TrackerReact(Component) {

	
	constructor() {
	  super();
	  this.state = {
	    subscription: {
	      "userfunction": Meteor.subscribe("userfunction")
	    }
	  }
	}

	'changepassword'(event) {
	    event.preventDefault();

	    var mobile = Session.get("getMobileNumber");
	    // console.log(mobile);
	    var userData = Meteor.users.find({}).fetch();
	    if(userData){
	    	for(var i=0 ; i<userData.length;i++){
	    		var mobileNo = userData[i].profile.mobNumber;
		    	if(mobileNo == mobile){
		    		var userid = userData[i]._id;
		    		// console.log(userid);
		    	}	
	    	}//i
	    
		    var password        = this.refs.resetPasswordPassword.value;
		    var passwordConfirm = this.refs.resetPasswordPasswordConfirm.value;

		    //Check password is at least 6 chars long
		    var isValidPassword = function(password, passwordConfirm) {
		       if (password === passwordConfirm) {
		         return password.length >= 6 ? true : swal({
													            title: "Password should be at least 6 Characters Long",
													            text: "Please try again",
													            timer: 1700,
													            showConfirmButton: false,
													            type: "error"
													        });
		       }else{
		         return swal({
		            title: 'Passwords dont Match',
		            text: 'Please try again',
		            showConfirmButton: true,
		            type: 'error'
		         }); //End of error swal
		       } //End of else
		     }

		   if (isValidPassword(password, passwordConfirm)) { 
		      Meteor.call("resetPasswordUsingotp",userid, password, function(err) {
		        if (err) {
		          console.log('We are sorry but something went Wrong.');
		        } else {
		          Meteor.logout();
		          FlowRouter.go('/userlogin');
		          
		        }
		      });

		    }

	    }//userData

	    return false;
	  }

   
	render() {
       return (

       		<section className="NotificationContent">
		        <div className="row">
		          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
		            <div className="box-body">
						<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
						    <form  id="resetPassword" method="post" className="resetpassword col-lg-6 col-lg-offset-3 col-md-12 col-xs-12 col-sm-12">
						 	   	<div className="resetTitle">
				              		<h3 className="box-title">Reset Your Password</h3>
				                </div>
						        <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
								   <div className="input-group">
									   <input type="password" className="form-control UMname" ref="resetPasswordPassword" name="password" id="resetPasswordPassword" placeholder="Password" required/>
									   <span className="input-group-addon glyphi-custom glyphi-custommm"><i className="fa fa-unlock" aria-hidden="true"></i></span>
								   </div>
							    </div>

							    <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
								   <div className="input-group">
									   <input type="password" className="form-control UMname" ref="resetPasswordPasswordConfirm" name="password" id="resetPasswordPasswordConfirm" placeholder="Confirm password" required/>
									   <span className="input-group-addon glyphi-custom glyphi-custommm"><i className="fa fa-unlock" aria-hidden="true"></i></span>
								   </div>
							    </div>

						       <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
							    	<button onClick={this.changepassword.bind(this)} className="col-lg-12 col-md-4 col-xs-12 col-sm-12  col-xs-12 btn-submit resetpassBtn UMloginbutton hvr-sweep-to-right" type="submit" value="Reset Password"> Reset Password &nbsp; 
							    	<span><i className="fa fa-rocket" aria-hidden="true"></i></span> 
							    	</button>
					   			</div>	
						    </form>	
						</div>
					</div>
				  </div>
				</div>
			</section>
	    );

	} 

}