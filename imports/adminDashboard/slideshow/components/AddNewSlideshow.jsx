import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { SlideShow } from '../api/slideshow.js';
import { TempLogoImage } from '../api/tempLogoImage.js';
import {Session} from 'meteor/session';

class AddNewSlideshow extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
		    "tagLine1" : '',
		    "tagLine2" : '',
		    "tagLine3" : '',
			"subscription" : {
				"allSlideShow" : Meteor.subscribe("allSlideShow"),
				"tempLogoImage" : Meteor.subscribe("tempLogoImage"),
			}

		  };	   	
		    this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps){
			if(Object.keys(nextProps.post).length != 0){

		            this.setState({
		          		tagLine1 : nextProps.post.tagLine1,
		          		tagLine2 : nextProps.post.tagLine2,
		          		tagLine3 : nextProps.post.tagLine3,
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

	allSlides(){
		return SlideShow.find({}).fetch()
	}

//get image from user
	
	imgBrowse(event){
	    event.preventDefault();

	    /*--------------Code form Logo Image-----------*/

	    var file = event.target.files[0];  //assuming you have only one file
	    var render = new FileReader(); //this works only in html5
	      render.onload =function(event){
	         var fileData = render.result;
	         var fileName = file.name;
	         Session.set("img",fileData);
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


	updateCategoryInfo(event){
		// var image = TempLogoImage.findOne({});
	 // //    var logoFilename = image.logoFilename;
	    var companyLogo= Session.get('img');
		event.preventDefault();
		var slideId      = FlowRouter.getParam("slideId");
		var formvalues = {
							'tagLine1' : this.refs.tagLine1.value,
							'tagLine2' : this.refs.tagLine2.value,
							'tagLine3' : this.refs.tagLine3.value,
							// 'categoryImg'  : this.refs.categoryImg.value,
							'slideImg'  : companyLogo,
							'slideId'      : slideId,
						}

		if(slideId){
		    Meteor.call('updateSlide', formvalues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
		    		this.state.tagLine1 = '';
		    		this.state.tagLine2 = '';
		    		this.state.tagLine3 = '';
		    		FlowRouter.go('/addNewSlide');
		    		swal('Slide updated successfully!');
		    	}
		    });
		}else{
		    Meteor.call('addNewSlide', formvalues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
		    		this.state.tagLine1 = '';
		    		this.state.tagLine2 = '';
		    		this.state.tagLine3 = '';
		    		swal('Slide added successfully!');
		    	}
		    });			
		}


	}

	deleteSlide(event){
		event.preventDefault();
		var dltId = event.target.id;
		console.log('dltId: '+dltId);
	    Meteor.call('deleteSlide', dltId, (error,result)=>{
	    	if(error){
	    		console.log("client error"+error);
	    		swal(error);
	    	}else{
	    		swal('Slide deleted successfully!');
	    	}
	    });		
	}


	render() {

		if(!this.props.loading){
		if(this.props.post){

	  	  var slideId = FlowRouter.getParam("slideId");
	  	  if(slideId){
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
			            <h4 className="contentTitle">Add NEW SLIDE</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR">

								<form onSubmit={this.updateCategoryInfo.bind(this)}>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Tag Line 1</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.tagLine1} onChange={this.handleInputChange.bind(this)} type="text" ref="tagLine1" name="tagLine1"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Tag Line 2</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.tagLine2} onChange={this.handleInputChange.bind(this)} type="text" ref="tagLine2" name="tagLine2"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Tag Line 3</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.tagLine3} onChange={this.handleInputChange.bind(this)} type="text" ref="tagLine3" name="tagLine3"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Slide Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" onChange={this.imgBrowse.bind(this)} type="file" ref="slideImg" name="slideImg"/>
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
										<th> Tag Line 1 </th>
										<th> Tag Line 2 </th>
										<th> Tag Line 3 </th>
										<th> Image </th>
										<th> Action </th>
									</tr>
								</thead>
								<tbody>
									{ this.allSlides().map( (slideInfo,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{slideInfo.tagLine1}</td>
													<td>{slideInfo.tagLine2}</td>
													<td>{slideInfo.tagLine3}</td>
													<td><img src={slideInfo.slideImg} className="img-responsive slideTableImg"/></td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addSlide-'+index}></i>
														<a href={"/addNewSlide/"+slideInfo._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addSlide-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete Slide</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete slide '{slideInfo.tagLine1}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={slideInfo._id} onClick={this.deleteSlide.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
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

export default AddNewSlideshowContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var slideId      = FlowRouter.getParam("slideId");
    // console.log('categoryId: '+categoryId);

    const postHandle    = Meteor.subscribe('findSlideShow',slideId);
    const post          = SlideShow.findOne({'_id':slideId})||{};
          loading       = !postHandle.ready();   	
     // console.log('post: ',post);
    return {
        loading,
        post,
    };
})(AddNewSlideshow);


