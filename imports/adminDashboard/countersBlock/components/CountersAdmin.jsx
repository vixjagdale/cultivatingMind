import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import CountersTable from './CountersTable.jsx';
import { Counters } from '../api/CountersAdmin.js';

class CountersAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			counterIcon : '',
			title : '',
			count : 1,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post && nextProps.counterId){	
	            this.setState({
	                counterIcon : nextProps.post.icon,
	                title  : nextProps.post.title,
	                count : nextProps.post.count, 
	            });
	        }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	submit(event){
		event.preventDefault();
		var formValues = {
			title : this.state.title,
			counterIcon : this.state.counterIcon,
			count : this.state.count,
			id : this.props.counterId,			
		}

		// console.log('formValues:',formValues);

		Meteor.call('addUpdateCounter', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
					FlowRouter.go('/counters');
		            this.setState({
		                counterIcon : '',
		                title  : '',
		                count : '', 
		            });
				}else{
					swal('Data added successfully.');
				}
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
					<section className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
				        <div className="row">
				          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				            <div className="box box-primary">
				              <div className="box-header with-border">
				              <h2 className="formTitle">Counters</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">

										<form onSubmit={this.submit.bind(this)}>
											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
												<label>Icon</label>
												<div className="input-group">
										        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="counterIcon" name="counterIcon" value={this.state.counterIcon} onChange={this.handleInputChange}/>
					                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
												<label>Count</label>
												<div className="input-group">
										        	<input type="number" min="1" title="Please enter count integer." required className="form-control" ref="count" name="count" value={this.state.count} onChange={this.handleInputChange}/>
					                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
												<label>Title</label>
												<div className="input-group">
										        	<input type="text" title="Please enter title." required className="form-control" ref="title" name="title" value={this.state.title} onChange={this.handleInputChange} />
					                     			<span className="input-group-addon addons"><i className="fa fa-header adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>

										</form>

							 	 	</div>	

							 	 	<CountersTable />
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
  	var counterId = FlowRouter.getParam('counterId');
    const postHandle = Meteor.subscribe('singleCounter', counterId);
    const post       = Counters.findOne({"_id":counterId})||{};
    // console.log(post);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        'counterId' : counterId,
    };
})(CountersAdmin);