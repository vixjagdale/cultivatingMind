import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import TestimonialAdminTable from './TestimonialAdminTable.jsx';
import { Testimonials } from '../api/TestimonialAdmin.js';

class TestimonialAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			personName : '',
			description : '',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post && nextProps.testimonialId){	
	            this.setState({
	                personName : nextProps.post.personName,
	                description  : nextProps.post.description,
	            });
	        }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	submit(event){
		event.preventDefault();
		var formValues = {
			personName    : this.state.personName,
			description   : this.state.description,
			testimonialId : this.props.testimonialId,			
		}

		// console.log('formValues:',formValues);

		Meteor.call('addUpdateTestimonial', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
					FlowRouter.go('/testimonials');
				}else{
					swal('Data added successfully.');
				}
	            this.setState({
	                personName : '',
	                description  : '',
	            });
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

	AddTestimonialsPhoto=(event)=>{
			let self = this;
		    if (event.currentTarget.files && event.currentTarget.files[0]) {
			    var file = event.currentTarget.files[0];
			      	if (file) {
			      	   var fileName  = file.name; 
			      	 
			      	     var ext       = fileName.split('.').pop();  
		                  	if(ext=="jpg" || ext=="png" || ext=="jpeg"){    
		                        if (file) {   
		                        	self.setState({
		                        		self : self,
		                        		file : file,
		                        	})
			        				addEventImages(file,self);
				     			}else{           
				             			 swal("File not uploaded","Something went wrong","error");  
				                     }     
		                   	}else{ 
		                       swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","error");   
		                    } 
			    	}

		    }
	}

	render(){
			return(
					<section className="content">
				        <div className="row">
				          <div className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				            <div className="box box-primary">
				              <div className="box-header with-border">
				              <h2 className="formTitle">Testimonials</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">

										<form onSubmit={this.submit.bind(this)}>
											<div className="col-lg-6 col-sm-4 col-xs-4 col-md-4">
												<label>Name of the Person</label>
												<div className="input-group">
										        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="personName" name="personName" value={this.state.personName} onChange={this.handleInputChange}/>
					                     			<span className="input-group-addon addons"><i className="fa fa-address-card-o adminFormAddonIcon"></i></span>
										        </div>
											</div>
											<div className="col-lg-6 col-sm-6 col-xs-12 col-md-12 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Testimonial Person Poto</label>
													
											        	<input type="file"  required className="form-control" ref="volunteersPhoto" name="volunteersPhoto" onChange={this.AddTestimonialsPhoto}/>
						                     			
												</div>

											</div>

											<div className="col-lg-12 col-sm-4 col-xs-4 col-md-4">
												<label>Description</label>
												<div className="input-group">
										        	<textarea rows="4" cols="50" title="Please enter count integer." required className="form-control" ref="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
					                     			<span className="input-group-addon addons"><i className="fa fa-quote-right adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>

										</form>

							 	 	</div>	

							 	 	<TestimonialAdminTable />
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
  	var testimonialId = FlowRouter.getParam('testimonialId');
    const postHandle = Meteor.subscribe('singleTestimonial', testimonialId);
    const post       = Testimonials.findOne({"_id":testimonialId})||{};
    // console.log(post);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        'testimonialId' : testimonialId,
    };
})(TestimonialAdmin);