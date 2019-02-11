import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { TopCarousalData } from '../api/TopCarousal.js';
import TopCarousalTable from './TopCarousalTable.jsx';

class TopCarousal extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			header1 : '',
			header2 : '',
			header3 : '',
			slideId : FlowRouter.getParam('slideId'),
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post && nextProps.slideId){	
	            this.setState({
	                header1 : nextProps.post.header1,
	                header2 : nextProps.post.header2,
	                header3 : nextProps.post.header3, 
	            });
	        }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	submit(event){
		event.preventDefault();
		var formValues = {
			header1 : this.state.header1,
			header2 : this.state.header2,
			header3 : this.state.header3,
			slideId : this.props.slideId,			
		}

		// console.log('formValues:',formValues);

		Meteor.call('addUpdateSlide', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
				}else{
					swal('Data added successfully.');
				}
				this.refs.header1.value='';
				this.refs.header2.value='';
				this.refs.header3.value='';
				FlowRouter.go('/slideShow');
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

	uploadSlideShowImage(event){
		// event.preventDefault();
	    let self = this;
	    if (event.currentTarget.files && event.currentTarget.files[0]) {
		    var file = event.currentTarget.files[0];
		      	if (file) {
		      	   var fileName  = file.name; 
		      	    var ext       = fileName.split('.').pop();  
                  	if(ext=="jpg" || ext=="png" || ext=="jpeg"){    
                        if (file) {   
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
				              <h2 className="formTitle">Slide Show</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">

										<form onSubmit={this.submit.bind(this)}>
											<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
												<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Add Image</label>
												<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
											    <div className="inputEffect col-xs-12 input-group">
										        	<input className="effectAddress UMname form-control" onChange={this.uploadSlideShowImage.bind(this)} type="file" ref="blogImg" name="blogImg"/>
								                      <span className="input-group-addon addons"><i className="fa fa-picture-o"></i></span>
										              <span className="focusBorder">
										            	<i></i>
										              </span>
											    </div>
												</div>
											</div>
											<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
												<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
													<label>Header-1</label>
													<div className="input-group">
											        	<input type="text" title="Please enter alphanumeric values" required className="form-control" ref="header1" name="header1" value={this.state.header1} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-6 col-sm-6 col-xs-4 col-md-6">
													<label>Header-2</label>
													<div className="input-group">
											        	<input type="text" title="Please enter alphanumeric values" required className="form-control" ref="header2" name="header2" value={this.state.header2} onChange={this.handleInputChange}/>
						                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
											        </div>
												</div>

												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>Header-3</label>
													<div className="input-group">
											        	<input type="text" title="Please enter alphanumeric values" required className="form-control" ref="header3" name="header3" value={this.state.header3} onChange={this.handleInputChange} />
						                     			<span className="input-group-addon addons"><i className="fa fa-header adminFormAddonIcon"></i></span>
											        </div>
												</div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>

										</form>

							 	 	</div>	

							 	 	<TopCarousalTable />
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
  	var slideId = FlowRouter.getParam('slideId');
    const postHandle = Meteor.subscribe('singleCaraousalSlide', slideId);
    const post       = TopCarousalData.findOne({"_id":slideId})||{};
    // console.log('post: ',post);
    // console.log('slideId: ',slideId);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        'slideId' : slideId,
    };
})(TopCarousal);