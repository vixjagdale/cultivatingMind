import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Categories } from '../../category/api/category.js';
import { Products } from '../api/products.js';

class AddNewProduts extends TrackerReact(Component){

	constructor(props) {
	  super(props);

		  this.state = {
		  	"productName"       : '',
		  	"brand"             : '',
		  	"shortDescription"  : '',
		  	"materialCare"      : '',
		  	"description"       : '',
		  	"price"             : '',
		  	"discount"          : '',
		  	"category"          : '',
			"subscription" : {
				"allCategories" : Meteor.subscribe("allCategories"),
			}
		  };	   	
		    this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps){
			if(nextProps.post){

		            this.setState({
		          				  	"productName"       : nextProps.post.productName,
								  	"brand"             : nextProps.post.brand,
								  	"shortDescription"  : nextProps.post.shortDescription,
								  	"materialCare"      : nextProps.post.materialCare,
								  	"description"       : nextProps.post.description,
								  	"price"             : nextProps.post.price,
								  	"discount"          : nextProps.post.discount,
								  	"category"          : nextProps.post.category,
		            })

		            
	    	}
    	}
    	this.handleInputChange = this.handleInputChange.bind(this);
    }


	  handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });

	  }

	updateProductDetails(event){
		event.preventDefault();
		var productid      = FlowRouter.getParam("productId");
		var productImg = Session.get('productImg');
		var formValues = {
							'productName'      : this.refs.productName.value,
							'brand'            : this.refs.brand.value,
							'shortDescription' : this.refs.shortDescription.value,
							'materialCare'     : this.refs.materialCare.value,
							'description'      : this.refs.description.value,
							'price'            : this.refs.price.value,
							'discount'         : this.refs.discount.value,
							'category'         : this.refs.category.value,
							'productid'        : productid,
							'productImg'       : productImg,
						}

		// console.log('formValues: ',formValues);
		if(productid){
		    Meteor.call('updateProduct', formValues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
					this.refs.productName.value = '';
					this.refs.brand.value = '';
					this.refs.shortDescription.value = '';
					this.refs.materialCare.value = '';
					this.refs.description.value = '';
					this.refs.price.value = '';
					this.refs.discount.value = '';
					this.refs.category.value = '';
					FlowRouter.go('/viewAllProducts');
		    		swal('Product updated successfully!');
		    	}
		    });
		}else{
		    Meteor.call('addNewProduct', formValues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
					this.refs.productName.value = '';
					this.refs.brand.value = '';
					this.refs.shortDescription.value = '';
					this.refs.materialCare.value = '';
					this.refs.description.value = '';
					this.refs.price.value = '';
					this.refs.discount.value = '';
					this.refs.category.value = '';
		    		swal('Product added successfully!');
		    	}
		    });			
		}
	

	}

	allCategories(){
		return Categories.find({}).fetch()
	}

	//get image from user
	
	productImgBrowse(event){
	    event.preventDefault();

	    /*--------------Code form Logo Image-----------*/

	    var file = event.target.files[0];  //assuming you have only one file
	    var render = new FileReader(); //this works only in html5
	      render.onload =function(event){
	         var fileData = render.result;
	         var fileName = file.name;
	         Session.set("productImg",fileData);
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

  //image upload


uploadProductImage(event){
    event.preventDefault();
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
    var file = event.currentTarget.files[0];

      if (file) {
        addProductImgsToS3Function(file,self);
      }
    }
  }



	render() {

		if(!this.props.loading){
		if(this.props.post){

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">ADD NEW PRODUCT</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR meetingOuterWrap">

								<form onSubmit={this.updateProductDetails.bind(this)}>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Product Name</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.productName} ref="productName" name="productName" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Brand</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.brand} ref="brand" name="brand" required/>
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
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Material & Care</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<textarea className="effectAddress UMname form-control" type="text" rows="5" onChange={this.handleInputChange.bind(this)} value={this.state.materialCare} ref="materialCare" name="materialCare" required></textarea>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
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


									<div className="col-lg-4 col-sm-12 col-xs-12 col-md-12">
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

									<div className="col-lg-4 col-sm-12 col-xs-12 col-md-12">
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

									<div className="col-lg-4 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Category</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
										 { this.allCategories().length != 0 ?
										    <select className="form-control" ref="category" name="category" onChange={this.handleInputChange.bind(this)} value={this.state.category} required>
										    <option value="">--Select Category--</option>
										    { this.allCategories().map( (categoryInfo,index)=>{
											  return (<option  key={index} value={categoryInfo.categoryName}>{categoryInfo.categoryName}</option>);
											  }) 
											}
											</select>

											:

											<a href="/addNewProductCategory">Add categories</a>

										}
										</div>
									</div>
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Product Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" accept="file/*" onChange={this.uploadProductImage.bind(this)} type="file" ref="productImg" name="slideImg"/>
						                      <span className="input-group-addon addons"><i className="fa fa-picture-o"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<input type="submit" className="btn btn-primary col-lg-4 col-lg-offset-4 col-md-3 col-sm-12 col-xs-12 btn-Btn1" value="UPDATE"/>
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

export default AddNewProdutsContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var productid      = FlowRouter.getParam("productId");
    const postHandle   = Meteor.subscribe('findProducts',productid);
    const post         = Products.findOne({'_id':productid})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(AddNewProduts);


