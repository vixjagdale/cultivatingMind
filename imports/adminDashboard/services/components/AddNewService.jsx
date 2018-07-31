import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Services } from '../api/services.js';

class AddNewService extends TrackerReact(Component){

	constructor(props) {
	  super(props);

		  this.state = {
		  	"serviceName"       : '',
		  	"shortDescription"  : '',
		  	"description"       : '',
		  	"price"             : '',
		  	"discount"          : '',
		  };	   	
		    this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps){
			if(Object.keys(nextProps.post).length != 0){
	            this.setState({
	          				  	"serviceName"       : nextProps.post.serviceName,
							  	"shortDescription"  : nextProps.post.shortDescription,
							  	"description"       : nextProps.post.description,
							  	"price"             : nextProps.post.price,
							  	"discount"          : nextProps.post.discount,
	           				 });

		            
	    	}
    	}
    	this.handleInputChange = this.handleInputChange.bind(this);
    }


	  handleInputChange(event) {
	  	event.preventDefault();
	    const target = event.target;
	    const value  = target.value;
	    const name   = target.name;

	    this.setState({
	      [name]: value
	    });

	  }

	updateServiceDetails(event){
		event.preventDefault();
		var serviceId      = FlowRouter.getParam("serviceId");
		var serviceImg = Session.get('serviceImg');
		var formValues = {
							'serviceName'      : this.refs.serviceName.value,
							'shortDescription' : this.refs.shortDescription.value,
							'description'      : this.refs.description.value,
							'price'            : this.refs.price.value,
							'discount'         : this.refs.discount.value,
							'serviceId'        : serviceId,
							'serviceImg'       : serviceImg,
						}

		// console.log('formValues: ',formValues);
		if(serviceId){
		    Meteor.call('updateService', formValues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
					this.refs.serviceName.value = '';
					this.refs.shortDescription.value = '';
					this.refs.description.value = '';
					this.refs.price.value = '';
					this.refs.discount.value = '';
					FlowRouter.go('/viewAllServices');
		    		swal('Service updated successfully!');
		    	}
		    });
		}else{
		    Meteor.call('addNewService', formValues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
					this.refs.serviceName.value = '';
					this.refs.shortDescription.value = '';
					this.refs.description.value = '';
					this.refs.price.value = '';
					this.refs.discount.value = '';
		    		swal('Service added successfully!');
		    	}
		    });			
		}
	

	}

	//get image from user
	
	serviceImgBrowse(event){
	    event.preventDefault();

	    /*--------------Code form Logo Image-----------*/

	    var file = event.target.files[0];  //assuming you have only one file
	    var render = new FileReader(); //this works only in html5
	      render.onload =function(event){
	         var fileData = render.result;
	         var fileName = file.name;
	         Session.set("serviceImg",fileData);
	         // Meteor.call('tempLogoImageUpload', fileName, fileData,function(err,result){
	         //  if(err){
	         //    console.log(err);
	         //  }else{
	         //    console.log('Image Uploaded!');
	         //  }
	         // });
	      };

	      render.readAsDataURL(file);
  }



	render() {

		if(!this.props.loading){
		if(this.props.post){

	  	  var serviceId = FlowRouter.getParam("serviceId");
	  	  if(serviceId){
	  	  	var submitText = 'UPDATE';
	  	  }else{
	  	  	var submitText = 'SAVE';
	  	  }

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">ADD NEW SERVICE</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR meetingOuterWrap">

								<form onSubmit={this.updateServiceDetails.bind(this)}>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Service Name</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.serviceName} ref="serviceName" name="serviceName" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>


									<div className="col-lg-3 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Price</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="number" step="0.01" onChange={this.handleInputChange.bind(this)} value={this.state.price} ref="price" name="price" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-3 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Discount</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="number" step="0.01" onChange={this.handleInputChange.bind(this)} value={this.state.discount} ref="discount" name="discount" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Short Description</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<textarea className="effectAddress UMname form-control" type="text" rows="5" onChange={this.handleInputChange.bind(this)} value={this.state.shortDescription} ref="shortDescription" name="shortDescription" required></textarea>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Description</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<textarea className="effectAddress UMname form-control" rows="5" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.description} ref="description" name="description" required></textarea>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Service Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" onChange={this.serviceImgBrowse.bind(this)} type="file" ref="serviceImg" name="slideImg"/>
						                      <span className="input-group-addon addons"><i className="fa fa-picture-o"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>


								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<input type="submit" className="btn btn-primary col-lg-4 col-lg-offset-4 col-md-3 col-sm-12 col-xs-12 btn-Btn1" value={submitText}/>
								</div>
							</form>
							</div>
						</div>
						</div>
					</div>	
				</div>
				</div>
			</section>
		    );

	   		}else{
	    		return (
	    			<div className="col-sm-12 col-xs-12 loadingImg"><img src="images/loading.gif" alt="loading"/></div>
	    		);
	    	}
	    }else{
	    	return (
            <div className="col-sm-12 col-xs-12 loadingImg"><img src="images/loading.gif" alt="loading"/></div>
	    	);
	    }


	} 

}

export default AddNewServiceContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var serviceid      = FlowRouter.getParam("serviceId");
    const postHandle   = Meteor.subscribe('findService',serviceid);
    const post         = Services.findOne({'_id':serviceid})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(AddNewService);


