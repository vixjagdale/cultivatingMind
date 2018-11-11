import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import OurCasesAdminTable from './OurCasesAdminTable.jsx';
import { OurCasesAdminData } from '../api/OurCasesAdmin.js';

class OurCasesAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			tagLine : '',
			description : '',

			title : '',
			moneyRaised : '',
			goal : '',
			caseDescription : '',

			caseId : FlowRouter.getParam('caseId'),
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post){	
	            this.setState({
	                tagLine : nextProps.post.tagLine, 
	                description : nextProps.post.description, 

	                title : nextProps.postEdit.title, 
	                moneyRaised  : nextProps.postEdit.moneyRaised,  
	                goal  : nextProps.postEdit.goal,  
	                caseDescription  : nextProps.postEdit.caseDescription,  

	                caseId : FlowRouter.getParam('caseId'),
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

		Meteor.call('addUpdateOurCasesData', formValues, (err, res)=>{
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

	submitCases(event){
		event.preventDefault();
		var formValues = {
			title : this.state.title,
			moneyRaised  : this.state.moneyRaised,
			goal  : this.state.goal,
			caseDescription  : this.state.caseDescription,
			id      : this.state.caseId,			
		}

		Meteor.call('addUpdateOurCase', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
				}else{
					swal('Data added successfully.');
				}
	            this.setState({
	                title : '', 
	                moneyRaised  : '', 
	                goal  : '', 
	                caseDescription  : '', 
	            },()=>{
	            	this.refs.title.value = '';
	            	this.refs.moneyRaised.value = '';
	            	this.refs.goal.value = '';
	            	this.refs.caseDescription.value = '';
	            });
	            FlowRouter.go('/ourCases');
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
				              <h2 className="formTitle">Our Cases</h2>
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

										<form onSubmit={this.submitCases.bind(this)}>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Title</label>
													<div className="input-group">
											        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="title" name="title" value={this.state.title} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Money Raised($)</label>
													<div className="input-group">
											        	<input type="number" title="Please copy icon class from font awesome." required className="form-control" ref="moneyRaised" name="moneyRaised" value={this.state.moneyRaised} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Goal($)</label>
													<div className="input-group">
											        	<input type="number" title="Please enter count integer." required className="form-control" ref="goal" name="goal" value={this.state.goal} onChange={this.handleInputChange} required/>
						                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
											        </div>
												</div>

											</div>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
												<label>Description</label>
												<div className="input-group">
										        	<textarea rows="7" cols="50" title="Please enter title." required className="form-control" ref="caseDescription" name="caseDescription" value={this.state.caseDescription} onChange={this.handleInputChange} required></textarea>
					                     			<span className="input-group-addon addons"><i className="fa fa-quote-right adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>
										</form>
							 	 	</div>

							 	 	<OurCasesAdminTable postData={this.props.postData}/>
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
  	var caseId      = FlowRouter.getParam('caseId');
    const postHandle = Meteor.subscribe('allCases');
    const post       = OurCasesAdminData.findOne({"id":101})||{};
    const postEdit   = OurCasesAdminData.findOne({"_id":caseId})||{};
    const postData   = OurCasesAdminData.find({ "id" : { $exists: false } }).fetch()||[];
    console.log('post : ',post);
    console.log('postData : ',postData);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        postEdit,
        postData,
    };
})(OurCasesAdmin);