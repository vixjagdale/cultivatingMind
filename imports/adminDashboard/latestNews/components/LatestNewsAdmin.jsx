import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import LatestNewsAdminTable from './LatestNewsAdminTable.jsx';
import { LatestNewsData } from '../api/LatestNewsAdmin.js';

class LatestNewsAdmin extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			tagLine : '',
			title1 : '',
			title2 : '',
			description : '',

			postTitle : '',
			postDate : '',
			postDescription : '',

			editPostId : FlowRouter.getParam('newsId'),
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

	                postTitle : nextProps.postData.postTitle, 
	                postDate  : nextProps.postData.postDate, 
	                postDescription : nextProps.postData.postDescription, 

	                editPostId : FlowRouter.getParam('newsId'),
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

		Meteor.call('addUpdateNews', formValues, (err, res)=>{
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

	submitPost(event){
		event.preventDefault();
		var formValues = {
			postTitle : this.state.postTitle,
			postDate  : this.state.postDate,
			postDescription  : this.state.postDescription,
			id      : this.state.editPostId,			
		}

		Meteor.call('addUpdatePost', formValues, (err, res)=>{
			if(err){
				swal('Error: ',err);
			}else{
				if(res == 'updated'){
					swal('Data updated successfully.');
				}else{
					swal('Data added successfully.');
				}
	            this.setState({
	                postTitle : '', 
	                postDate  : '', 
	                postDescription : '', 
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

	uploadLNImage=()=>{
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
				              <h2 className="formTitle">Latest News</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<form onSubmit={this.submit.bind(this)}>

											<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
													<label>News Tag-line</label>
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

										<form onSubmit={this.submitPost.bind(this)}>
											<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
												<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Add Image</label>
												<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
											    <div className="inputEffect col-xs-12 input-group">
										        	<input className="effectAddress UMname form-control" onChange={this.uploadLNImage} type="file" ref="blogImg" name="blogImg"/>
								                      <span className="input-group-addon addons"><i className="fa fa-picture-o"></i></span>
										              <span className="focusBorder">
										            	<i></i>
										              </span>
											    </div>
												</div>
											</div>
											<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">											
												<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 noPadLR">
													<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
														<label>Post Title</label>
														<div className="input-group">
												        	<input type="text" title="Please copy icon class from font awesome." required className="form-control" ref="postTitle" name="postTitle" value={this.state.postTitle} onChange={this.handleInputChange}/>
							                     			<span className="input-group-addon addons"><i className="fa fa-font-awesome adminFormAddonIcon"></i></span>
												        </div>
													</div>

													<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
														<label>Post Date</label>
														<div className="input-group">
												        	<input type="date" title="Please enter count integer." required className="form-control" ref="postDate" name="postDate" value={this.state.postDate} onChange={this.handleInputChange}/>
							                     			<span className="input-group-addon addons"><i className="fa fa-pause-circle-o adminFormAddonIcon"></i></span>
												        </div>
													</div>

												</div>

												<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
													<label>Post Description</label>
													<div className="input-group">
											        	<textarea rows="7" cols="50" title="Please enter title." required className="form-control" ref="postDescription" name="postDescription" value={this.state.postDescription} onChange={this.handleInputChange}></textarea>
						                     			<span className="input-group-addon addons"><i className="fa fa-quote-right adminFormAddonIcon"></i></span>
											        </div>
												</div>
											</div>
											<div className="col-lg-4 col-lg-offset-4 col-sm-12 col-xs-12 col-md-12 form-group adminSubmitBtn">									
												<input type="submit" value='Submit' className="btn btnSubmit form-control"/>								
											</div>
										</form>
							 	 	</div>

							 	 	<LatestNewsAdminTable postData={this.props.postData}/>
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
    const postHandle = Meteor.subscribe('allNews');
    const post       = LatestNewsData.findOne({"id":101})||{};
    const postData   = LatestNewsData.find({ "id" : { $exists: false } }).fetch()||[];
    console.log(post);
    console.log(postData);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
        postData,
    };
})(LatestNewsAdmin);