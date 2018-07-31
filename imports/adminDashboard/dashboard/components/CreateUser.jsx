import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CreateUser extends TrackerReact(Component) {

	createUser(event){
		event.preventDefault();

        var formValues = {
                          'firstname'        : this.refs.firstname.value,
                          'lastname'         : this.refs.lastname.value,
                          'signupEmail'      : this.refs.signupEmail.value,
                          'mobNumber'        : this.refs.mobNumber.value,
                          'signupPassword'   : "user123",
                        }   


        Meteor.call('userCreateAccount', formValues ,(error,result) => {
          if(error){
            swal(error.reason);
          }else{      

          	// CLEAR ALL FIELDS
            this.refs.firstname.value      = '';
            this.refs.lastname.value       = '';
            this.refs.signupEmail.value    = '';
            this.refs.mobNumber.value      = '';


            // ADD USER ROLE 
            var newID = result;
            Meteor.call('addRoles', newID , "user", function(error,result){
              if(error){
                swal(error);
              }else{              	
				swal('Congratulations!! Account Created...');
              }
            }); // add role
		            
          } //end else
        });

    return 0;  	

	}

	 componentDidMount() {
	 	$("#signUpUser").validate();
	 	renderFunction();
	 	$("html,body").scrollTop(0); 
	 }


	render() {

       return (

       	<section className="NotificationContent">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <div className="box box-primary">
              <div className="box-header with-border">
              <h2 className="contentTitle">CREATE USER</h2>
              </div>
           
	            <div className="box-body">
					<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					  <form id="signUpUser" onSubmit={this.createUser.bind(this)}>
						  <div className="signup col-lg-12 col-md-8 col-sm-12 col-xs-12">

						   <div className="form-group col-lg-6 col-md-4 col-xs-6 col-sm-6 inputContent">
						   		<span className="blocking-span">
								   	<input type="text" title="Only alphabets are allowed!" className="form-control UMname inputText" ref="firstname" name="firstname" pattern="[a-zA-Z][a-zA-Z ]+" required />
						   			<span className="floating-label">First Name</span>
								</span>
						    </div>

						   <div className="form-group col-lg-6 col-md-4 col-xs-6 col-sm-6 inputContent">
						   		<span className="blocking-span">
								   <input type="text" title="Please enter alphabets only!" className="form-control UMname inputText" ref="lastname" name="lastname" pattern="[A-Za-z]+" required />
						    	   <span className="floating-label">Last Name</span>
								</span>
						    </div>

					   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
					   			<span className="blocking-span">
								   <input type="email" title="Please match email format!" className="form-control signupsetting UMname inputText" ref="signupEmail" name="signupEmail" required />
						    	   <span className="floating-label">Email ID</span>
								</span>
						    </div>

					   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
					   			<span className="blocking-span">
								   <input type="text" pattern="^(0|[1-9][0-9]*)$" title="Please enter numbers only!" className="form-control UMname inputText" ref="mobNumber" name="mobNumber" required />
								   <span className="floating-label">Phone Number</span>
								</span>
						    </div>

							<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
						    	<input className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="REGISTER"/>
						   </div>	

						  </div> 
					  </form>
			 	 	</div>	
			 	</div>
		 	</div>
		 </div>
		 </div>
		 </section>
	    );

	} 

}