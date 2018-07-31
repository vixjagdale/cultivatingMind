import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Brands } from '../api/brands.js';


class AddNewBrands extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
		    "brandName" : '',
			"subscription" : {
				"allBrands" : Meteor.subscribe("allBrands"),
			}

		  };	   	
		    this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps){
			if(Object.keys(nextProps.post).length != 0){

		            this.setState({
		          		brandName : nextProps.post.brandName,
		            })

		            
	    	}
    	}
    	this.handleInputChange = this.handleInputChange.bind(this);
    }



	handleInputChange(event) {
	    const target = event.target;
	    const value  = target.value;
	    const name   = target.name;

	    this.setState({
	      [name]: value
	    });

	}

	allBrands(){
		return Brands.find({}).fetch()
	}


//get brand image from user
	
	imgBrowse(event){
	    event.preventDefault();

	    /*--------------Code form Logo Image-----------*/

	    var file = event.target.files[0];  //assuming you have only one file
	    var render = new FileReader(); //this works only in html5
	      render.onload =function(event){
	         var fileData = render.result;
	         var fileName = file.name;
	         Session.set("brandImg",fileData);
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

	updateBrandInfo(event){
		event.preventDefault();
		var brandId      = FlowRouter.getParam("brandId");
		var brandImg = Session.get('brandImg');
		var formvalues = {
							'brandName' : this.refs.brandName.value,
							// 'categoryImg'  : this.refs.categoryImg.value,
							'brandImg'  : brandImg,
							'brandId'   : brandId,
						}

		if(brandId){
		    Meteor.call('updateBrand', formvalues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
		    		this.state.brandName = '';
		    		FlowRouter.go('/addNewBrand');
		    		swal('Brand updated successfully!');
		    	}
		    });
		}else{
		    Meteor.call('addNewBrand', formvalues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
		    		this.state.brandName = '';
		    		swal('Brand added successfully!');
		    	}
		    });			
		}


	}

	deleteBrand(event){
		event.preventDefault();
		var dltId = event.target.id;
	    Meteor.call('deleteBrand', dltId, (error,result)=>{
	    	if(error){
	    		console.log("client error"+error);
	    		swal(error);
	    	}else{
	    		swal('Brand deleted successfully!');
	    	}
	    });		
	}


	render() {

		if(!this.props.loading){
		if(this.props.post){

	  	  var brandId = FlowRouter.getParam("brandId");
	  	  if(brandId){
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
			            <h4 className="contentTitle">Add NEW BRAND</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR">

								<form onSubmit={this.updateBrandInfo.bind(this)}>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Brand Name</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.brandName} onChange={this.handleInputChange.bind(this)} type="text" ref="brandName" name="brandName"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Brand Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" onChange={this.imgBrowse.bind(this)} type="file" ref="brandImg" name="brandImg"/>
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


						<div className="table-responsive col-lg-12 categoryTable">
							<table className="table table-striped table-hover myTable table-bordered" id="example">
								<thead>
									<tr className="tableHeader">
										<th> Sr. </th>
										<th> Brand Name </th>
										<th> Brand Image </th>
										<th> Action </th>
									</tr>
								</thead>
								<tbody>
									{ this.allBrands().map( (brandInfo,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{brandInfo.brandName}</td>
													<td><img src={brandInfo.brandImg} className="img-responsive slideTableImg"/></td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addBrand-'+index}></i>
														<a href={"/addNewBrand/"+brandInfo._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addBrand-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete Category</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete category '{brandInfo.brandName}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={brandInfo._id} onClick={this.deleteBrand.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
														        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
														      </div>
														    </div>
														  </div>
														</div>

													</td>
											   </tr>
									  }) 
									}									
								</tbody>
							</table>
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

export default AddNewBrandsContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var brandId      = FlowRouter.getParam("brandId");
    // console.log('brandId: '+brandId);

    const postHandle    = Meteor.subscribe('findBrand',brandId);
    const post          = Brands.findOne({'_id':brandId})||{};
    const loading       = !postHandle.ready();   	
     // console.log('post: ',post);
    return {
        loading,
        post,
    };
})(AddNewBrands);


