
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { ManageContacts } from '../../common/api/ManageContacts.js';

export default class ViewEnquiries extends TrackerReact(Component) {

	
	 componentDidMount() {
	 	renderFunction();
	 	$("html,body").scrollTop(0); 
	 }

	 constructor(){
		super();
		this.state ={
			"subscription" : {
				"manageContacts" : Meteor.subscribe("manageContacts"),
			}
		}
	}

	Reply(event){
		event.preventDefault()
		var id = $(event.target).attr('id');
		var email = $('#'+id+'-email').val();
		var splitEmail = email.split(': ');
		var emailId = splitEmail[1];
		var subject = $('#'+id+'-subject').val();
		var content = $('#'+id+'-content').val();
		Meteor.call('readMail',id,function(err,result){
			if(err){
				console.log(err);
			}else{
				Meteor.call('sendEmail1',emailId,'service@spotyl.com',subject,content,function(err,result){
					if(err){
						console.log(err);
					}else{
						console.log('Sent');
						$('#'+id+'-reply').modal('hide');
					}
				})
			}
		})
		
	}


	allenquiries(){
		var contactData =  ManageContacts.find({}, {sort: {createdAt: -1}}).fetch();
	    var contactArray = [];
		if(contactData){
			for(i=0;i<contactData.length;i++){
				if(contactData[i].status == 'Read'){
					contactData[i].statusColor = 'statusColorRead';
				}else{
					contactData[i].statusColor = 'statusColorUnRead';
				}
				var createdAt = contactData[i].createdAt;
				var date = moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
				contactArray.push(
					<div className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 showEnqiry "+contactData[i].statusColor} key={contactData[i]._id}>
						<span>Subject: {contactData[i].manageContactSubject}<i className="fa fa-arrow-right btn pull-right" data-toggle="modal" data-target={`#${contactData[i]._id}-reply`} aria-hidden="true"></i></span>
						<hr/>
						<span>
							<p className="showEmailDetails">{contactData[i].manageContactEmail}({contactData[i].manageContactName}-{contactData[i].manageContactPhone})</p>
							<p className="emailDate">{date}</p>
						</span>
						<hr/>
						<span>{contactData[i].manageContactMessage}</span>

						<div id={`${contactData[i]._id}-reply`} className="modal fade" role="dialog">
					  <div className="modal-dialog">

					    <div className="modal-content">
					      <div className="modal-header">
					        <button type="button" className="close" data-dismiss="modal">&times;</button>
					      </div>
					      <form onSubmit={this.Reply.bind(this)} id={contactData[i]._id}> 
					      <div className="modal-body">

					      	<div className="form-group">
							  <input type="text" id={contactData[i]._id+'-email'} className="form-control email" ref="email" value={'To: '+contactData[i].manageContactEmail} disabled/>
							</div>
							<div className="form-group">
							  <input type="text" id={contactData[i]._id+'-subject'} className="form-control subject" ref="subject" value={'Re: '+contactData[i].manageContactSubject} disabled/>
							</div>
							<div className="form-group">
					      		<textarea rows="10" ref="content" id={contactData[i]._id+'-content'} className={"form-control content "+contactData[i]._id}/>
					      	</div>
					      </div>
					      <div className="modal-footer">
					        <input type="submit" className="btn btn-default replyBtn"  id={contactData[i]._id}  value="Reply"/>
					      </div>
					      </form>
					    </div>

					  </div>
					</div>
					</div>
				);
			}//i
		}//contactData
		return contactArray;
	}

	
	
	render() {

       return (

       	<section className="NotificationContent">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <div className="box box-primary">
              <div className="box-header with-border">
              <h2 className="contentTitle">ALL ENQUIRIES</h2>
              </div>
           
	            <div className="box-body">
					<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					  {this.allenquiries()}
			 	 	</div>	
			 	</div>
		 	</div>
		 </div>
		 </div>
		 </section>
	    );

	} 

}