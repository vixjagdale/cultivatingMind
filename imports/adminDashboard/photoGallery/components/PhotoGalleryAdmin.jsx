import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
// import PhotoGalleryImgsAdmin from './PhotoGalleryImgsAdmin.jsx';
import { PhotoAlbum } from '/imports/adminDashboard/photoGallery/api/PhotoAlbum.js';

class PhotoGalleryAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			description : '',
			self        : '',
			file        : '',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
    	if(!nextProps.loading){	
	    	if(nextProps.post){	
	            this.setState({
	                description : nextProps.post.description, 
	            });
	        }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	submit(event){
		event.preventDefault();
		var formValues = {
			description : this.state.description,			
		}

		// console.log('formValues:',formValues);

		Meteor.call('updatePhotoGallery', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
		            this.setState({
		                description : '', 
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

	addPhotoGalleryImg =(event)=>{
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
		        				// addEventImages(file,self);
			     			}else{           
			             			 swal("File not uploaded","Something went wrong","error");  
			                     }     
	                   	}else{ 
	                       swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","error");   
	                    } 
		    	}

	    }
	}

	addGalleryImages = (event)=>{
		addEventImages(this.state.file,this.state.self);
		Meteor.call("addPhotoGalleryIMGs",(err,res)=>{
			if(err){
				swal("Image not uploaded ","","success"); 
			}else{
				swal("Image uploaded successfull","","success");   
			}
		});
	}

	render(){
			return(
					<section className="content">
				        <div className="row">
				          <div className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				            <div className="box box-primary">
				              <div className="box-header with-border">
				              <h2 className="formTitle">Photo Gallery</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">

										<form onSubmit={this.submit.bind(this)}>
											
											<div className="col-lg-12 col-sm-4 col-xs-4 col-md-4">
												<label>Description</label>
												<div className="input-group">
										        	<textarea rows="4" cols="50" title="Please copy icon class from font awesome." required className="form-control" ref="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
					                     			<span className="input-group-addon addons"><i className="fa fa-quote-right adminFormAddonIcon"></i></span>
										        </div>
											</div>

											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>

										</form>

							 	 	</div>	

							 	 	{/*<PhotoGalleryImgsAdmin />*/}

							 	 	<div className="col-lg-12 col-sm-4 col-xs-4 col-md-4">
										<label>Photo Gallery Image</label>
										<input type="file" id="photoGalleryImg" className="col-lg-12 col-md-12 form-control" onChange={this.addPhotoGalleryImg}/>
									</div>

									<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="button" value='Add Image' className="btn btnSubmit form-control" onClick={this.addGalleryImages}/>								
											</div>
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
    const postHandle = Meteor.subscribe('GalleryPhotos');
    const post       = PhotoAlbum.findOne({"id":101})||{};

    // console.log(post);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
    };
})(PhotoGalleryAdmin);