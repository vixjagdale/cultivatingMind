import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import OurVolunteersAdminTable from './OurVolunteersAdminTable.jsx';
import { OurVolunteersData } from '../api/OurVolunteersAdmin.js';

class OurVolunteersAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			tagLine : '',
			title1 : '',
			title2 : '',
			description : '',

			volunteersName : '',
			volunteersProfession : '',

			editVolunteerId : FlowRouter.getParam('volunteerId'),
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post){	
	            this.setState({
	                tagLine : nextProps.post.tagLine,
	                title1  : nextProps.post.title1,
	                title2  : nextProps.post.title2, 
	                description : nextProps.post.description, 

	                volunteersName : nextProps.postEdit.volunteersName, 
	                volunteersProfession  : nextProps.postEdit.volunteersProfession,  

	                editVolunteerId : FlowRouter.getParam('volunteerId'),
	            });
	        }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	submit(event){
		event.preventDefault();
		var formValues = {
			tagLine : this.state.tagLine,
			title1  : this.state.title1,
			title2  : this.state.title2,
			description : this.state.description,			
		}

		Meteor.call('addUpdateVolunteerTopBlock', formValues, (err, res)=>{
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

	submitVolunteer(event){
		event.preventDefault();
		var formValues = {
			volunteersName : this.state.volunteersName,
			volunteersProfession  : this.state.volunteersProfession,
			id      : this.state.editVolunteerId,			
		}

		Meteor.call('addUpdateVolunteers', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
				}else{
					swal('Data added successfully.');
				}
	            this.setState({
	                volunteersName : '', 
	                volunteersProfession  : '', 
	            },()=>{
	            	this.refs.volunteersName.value = '';
	            	this.refs.volunteersProfession.value = '';
	            });
	            FlowRouter.go('/volunteersForm');
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
				              <h2 className="formTitle">Volunteers</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<form onSubmit={this.submit.bind(this)}>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Volunteers Tag-line</label>
													<div className="input-group">
											        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="tagLine" name="tagLine" value={this.state.tagLine} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Title Black</label>
													<div className="input-group">
											        	<input type="text" title="Please enter count integer." required className="form-control" ref="title1" name="title1" value={this.state.title1} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Title Blue</label>
													<div className="input-group">
											        	<input type="text" title="Please enter count integer." required className="form-control" ref="title2" name="title2" value={this.state.title2} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
											        </div>
												</div>
											</div>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
												<label>Description</label>
												<div className="input-group">
										        	<textarea rows="7" cols="50" title="Please enter title." required className="form-control" ref="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
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

										<form onSubmit={this.submitVolunteer.bind(this)}>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Volunteer Name</label>
													<div className="input-group">
											        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="volunteersName" name="volunteersName" value={this.state.volunteersName} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>
											</div>
											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Volunteer Profession</label>
													<div className="input-group">
											        	<input type="text" title="Please alphabets." required className="form-control" ref="volunteersProfession" name="volunteersProfession" value={this.state.volunteersProfession} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
											        </div>
												</div>

											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>
										</form>
							 	 	</div>

							 	 	<OurVolunteersAdminTable postData={this.props.postData}/>
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
  	var volunteerId = FlowRouter.getParam('volunteerId');
    const postHandle = Meteor.subscribe('allVolunteers');
    const post       = OurVolunteersData.findOne({"id":101})||{};
    const postEdit   = OurVolunteersData.findOne({"_id":volunteerId})||{};
    const postData   = OurVolunteersData.find({ "id" : { $exists: false } }).fetch()||[];
    // console.log('post : ',post);
    // console.log('postData : ',postData);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        postEdit,
        postData,
    };
})(OurVolunteersAdmin);