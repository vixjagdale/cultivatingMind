import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';

export default class ResetPassword extends TrackerReact(Component) {

	resetPassword(event){
		event.preventDefault();
        
    	return 0;  	

	}

	 componentDidMount() {
	 	$("#resetPassword").validate();
	 	renderFunction();
	 	$("html,body").scrollTop(0); 
	 }

	 constructor(){
		super();
		this.state ={
			"subscription" : {
				"allEmails" : Meteor.subscribe("allEmails"),
			}
		}
	}

	buildRegExp(searchText) {
   // console.log('buildRegExp business');
	   var words = searchText.trim().split(/[ \-\:]+/);

	   var exps = _.map(words, function(word) {
	      return "(?=.*" + word + ")";
	   });

	   var fullExp = exps.join('') + ".+";
	   return new RegExp(fullExp, "i");
	}

	getTextValue(event){
		$('.searchList').css({
	        display:"block"
	    });
		var emailId= $('.signupEmail').val();
		var RegExpBuildValue = this.buildRegExp(emailId);
		var userData = Meteor.users.find({ 'emails.address': RegExpBuildValue }).fetch();
		if(userData){
			var userArray = [];
			for(var i=0; i<userData.length; i++){
			var _id        = userData[i]._id;
			var userMailId = userData[i].emails[0].address;
			var index      = i;
			userArray.push({_id, userMailId, index});
			}
			Session.set('userArray',userArray);
			return userArray;
		}

	}
	
	focusout() {
	    // $('.searchList').css({
	    //     display:"none"
	    // });
	}

	selectMailId(event){
		event.preventDefault();
	    $('.signupEmail').val($(event.target).text());
	    $('.searchList').css({
	        display:"none"
	    });

	}

	userData(){
		var userIdArray1 = [];

		var userArray = Session.get('userArray');
		if(userArray){
			var userArrayLength = userArray.length;
			for(var i=0; i<userArrayLength; i++){
				var Id = userArray[i]._id;
				userIdArray1.push(
						        <div key={userArray[i]._id}>
						        <ul className="searchUl">
									<li key={i} className="userMailVal" id={userArray[i].index} onClick={this.selectMailId.bind(this)} data-key={i}>
					            		{userArray[i].userMailId}
					           	 	</li>
						        </ul>
						        </div>
						        );
			}


			return userIdArray1;
		}		
	}

	resetPassword(event){
		event.preventDefault();
		var email   = $('.signupEmail').val();
		var password = $('.password').val();

		if(Meteor.users.findOne({ 'emails.address': email })){
			Meteor.call('updatePassword',email,password,function(error,result){
	            if(error){
	              console.log(error);
	            }else{
	              swal("Password Updated Successfully!");
	            }
	        });
		}else{
			swal("Please enter valid email Id");
		}
      	
		

	}


	render() {

       return (

       	<section className="NotificationContent">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <div className="box box-primary">
              <div className="box-header with-border">
              <h2 className="contentTitle">RESET PASSWORD</h2>
              </div>
           
	            <div className="box-body">
					<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					  <form id="resetPassword" onSubmit={this.resetPassword.bind(this)}>
						  <div className="signup col-lg-12 col-md-8 col-sm-12 col-xs-12">

					   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
					   			<span className="blocking-span">
								   <input type="email" className="form-control signupEmail inputText" ref="signupEmail" name="signupEmail" onKeyPress={this.getTextValue.bind(this)} onBlur={this.focusout.bind(this)} required />
						    	   <span className="floating-label">Email ID</span>
								</span>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 searchList">{this.userData()}</div>
						    </div>

					   		 <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
						   		<span className="blocking-span">
								   <input type="text" className="form-control password inputText" ref="password" name="password" required />
						    	   <span className="floating-label">Enter Password</span>
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