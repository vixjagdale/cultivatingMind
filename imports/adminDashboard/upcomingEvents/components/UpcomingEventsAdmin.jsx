import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import UpcomingEventsAdminTable from './UpcomingEventsAdminTable.jsx';
import { UpcomingEventsData } from '../api/UpcomingEvents.js';

class UpcomingEventsAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			tagLine : '',
			description : '',

			eventTitle : '',
			eventDate : '',
			eventDescription : '',
			eventVenue : '',

			eventId : FlowRouter.getParam('eventId'),
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post){	
	            this.setState({
	                tagLine : nextProps.post.tagLine, 
	                description : nextProps.post.description, 

	                eventTitle : nextProps.postEdit.eventTitle, 
	                eventDescription  : nextProps.postEdit.eventDescription,  
	                eventDate  : nextProps.postEdit.eventDate,  
	                eventVenue  : nextProps.postEdit.eventVenue,  

	                eventId : FlowRouter.getParam('eventId'),
	            });
	        }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	submit(event){
		event.preventDefault();
		var formValues = {
			tagLine : this.state.tagLine,
			description : this.state.description,			
		}

		Meteor.call('addUpdateUpcomingEventsData', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
				}else{
					swal('Data added successfully.');
				}
			}
		});
	}

	submitEvent(event){
		event.preventDefault();
		var formValues = {
			eventTitle : this.state.eventTitle,
			eventDescription  : this.state.eventDescription,
			eventDate  : this.state.eventDate,
			eventVenue  : this.state.eventVenue,
			id      : this.state.eventId,			
		}

		Meteor.call('addUpdateUpcomingEvents', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
				}else{
					swal('Data added successfully.');
				}
	            this.setState({
	                eventTitle : '', 
	                eventDescription  : '', 
	                eventDate  : '', 
	                eventVenue  : '', 
	            },()=>{
	            	this.refs.eventTitle.value = '';
	            	this.refs.eventDescription.value = '';
	            	this.refs.eventDate.value = '';
	            	this.refs.eventVenue.value = '';
	            });
	            FlowRouter.go('/upcomingEvents');
			}
		});
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value  = target.value;
	    const name   = target.name;

		    this.setState({
		      [name]: value,
		    },()=>{});
	}

	render(){
			return(
					<section className="content">
				        <div className="row">
				          <div className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				            <div className="box box-primary">
				              <div className="box-header with-border">
				              <h2 className="formTitle">Upcoming Events</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<form onSubmit={this.submit.bind(this)}>

											<div className="col-lg-12 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Tag-line</label>
													<div className="input-group">
											        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="tagLine" name="tagLine" value={this.state.tagLine} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>
											</div>

											<div className="col-lg-12 col-sm-6 col-xs-6 col-md-6">
												<label>Description</label>
												<div className="input-group">
										        	<textarea rows="7" cols="50" title="Please enter title." required className="form-control" ref="description" name="description" value={this.state.description} onChange={this.handleInputChange} required></textarea>
					                     			<span className="input-group-addon addons"><i className="fa fa-quote-right adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>
										</form>
							 	 	</div>	
							 	 	<hr className="col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12 col-md-12" />

									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">

										<form onSubmit={this.submitEvent.bind(this)}>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Title</label>
													<div className="input-group">
											        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="eventTitle" name="eventTitle" value={this.state.eventTitle} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Venue</label>
													<div className="input-group">
											        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="eventVenue" name="eventVenue" value={this.state.eventVenue} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Date</label>
													<div className="input-group">
											        	<input type="date" title="Please enter count integer." required className="form-control" ref="eventDate" name="eventDate" value={this.state.eventDate} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
											        </div>
												</div>

											</div>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
												<label>Description</label>
												<div className="input-group">
										        	<textarea rows="7" cols="50" title="Please enter title." required className="form-control" ref="eventDescription" name="eventDescription" value={this.state.eventDescription} onChange={this.handleInputChange}></textarea>
					                     			<span className="input-group-addon addons"><i className="fa fa-quote-right adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>
										</form>
							 	 	</div>

							 	 	<UpcomingEventsAdminTable postData={this.props.postData}/>
							 	</div>
						 	</div>
						 </div>
						 </div>
					 </section>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  	var eventId      = FlowRouter.getParam('eventId');
    const postHandle = Meteor.subscribe('allUpcomingEvents');
    const post       = UpcomingEventsData.findOne({"id":101})||{};
    const postEdit   = UpcomingEventsData.findOne({"_id":eventId})||{};
    const postData   = UpcomingEventsData.find({ "id" : { $exists: false } }).fetch()||[];
    // console.log('post : ',post);
    // console.log('postData : ',postData);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        postEdit,
        postData,
    };
})(UpcomingEventsAdmin);