import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Blogs} from '../api/blogs.js';


class Blog extends Component{

	constructor(props){
		super(props);
		this.state={
			blogTitle : '',
			blogBody  : '',
			blogDate  : '',
		}
		var handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event){
		var target = event.target;
		var value  = target.value;
		var name   = target.name;
		this.setState({
			[name] : value
		})
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.editBlog){
			this.setState({
				blogTitle : nextProps.editBlog.blogTitle,
				blogBody  : nextProps.editBlog.blogBody,
				blogDate  : moment(nextProps.editBlog.blogDate).format("DD-MM-YYYY"),
			});
		}
	}

	updateBlogInfo(e){
		e.preventDefault();

		var blogValues={
			blogTitle : this.refs.blogTitle.value,
			blogBody  : this.refs.blogBody.value,
			blogDate  : this.refs.blogDate.value,
			id        : FlowRouter.getParam('id'),
		}
		Meteor.call("blogInfo",blogValues,(err,res)=>{
			if(err){
				console.log(err);
			}else{
				if(FlowRouter.getParam('id')){
					this.setState({
					blogTitle : '',
					blogBody  : '',
					blogDate  : '',
				});
				swal('Blog Updated successfully!','','success');
				FlowRouter.go('/addBlog');
				}else{
					this.setState({
						blogTitle : '',
						blogBody  : '',
						blogDate  : '',
					});
					swal('Blog Added successfully!','','success');
				}
			}
		});
	}

	deleteBlog(e){
		var id = e.target.getAttribute('id');
		Meteor.call("deleteBlog",id,(err,res)=>{
			if(err){
				console.log(err);
			}else{
				swal('Blog deleted successfully!','','success');
			}
		})
	}

	uploadBlogImage(event){
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
		if(FlowRouter.getParam('id')){
			var submitText = 'Update';
		}else{
			var submitText = 'Submit';
		}
		return(
			<section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">Add NEW BLOG</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR">

								<form onSubmit={this.updateBlogInfo.bind(this)}>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Blog Title</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.blogTitle} onChange={this.handleInputChange.bind(this)} type="text" ref="blogTitle" name="blogTitle"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Blog Date</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.blogDate} onChange={this.handleInputChange.bind(this)} type="date" ref="blogDate" name="blogDate"/>
						                      <span className="input-group-addon addons"><i className="fa fa-calendar"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Blog Body</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<textArea className="effectAddress UMname form-control" value={this.state.blogBody} onChange={this.handleInputChange.bind(this)} type="text" ref="blogBody" name="blogBody" row='6'>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
								              {this.state.blogBody}
								            </textArea>
									    </div>
										</div>
									</div>

									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Blog Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" onChange={this.uploadBlogImage.bind(this)} type="file" ref="blogImg" name="blogImg"/>
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
										<th> Blog Title </th>
										<th> Blog Body </th>
										<th> Blog Date </th>
										<th> Blog Image </th>
										<th> Action </th>
									</tr>
								</thead>
								{ this.props.allBlogs.length > 0 ?
								<tbody>
									{ this.props.allBlogs.map( (blogs,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{blogs.blogTitle}</td>
													<td>{blogs.blogBody}</td>
													<td>{moment(blogs.blogDate).format('DD/MM/YYYY')}</td>
													<td><img src={blogs.blogImg} className="img-responsive slideTableImg"/></td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addSlide-'+index}></i>
														<a href={"/editBlog/"+blogs._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addSlide-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete Blog</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete Blog '{blogs.blogTitle}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={blogs._id} onClick={this.deleteBlog.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
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
								:
								<tbody>
									<tr>
										<td colSpan="6"> Nothing to display... </td>
									</tr>
								</tbody>
							}
							</table>
						</div>

						</div>
						</div>
					</div>	
				</div>
				</div>
			</section>
			);
	}
}

export default withTracker(props=>{
	const postHandle = Meteor.subscribe("showAllBlogs");
	const loading    = !postHandle.ready();
	const allBlogs = Blogs.find({}).fetch();
	const editBlog = Blogs.findOne({"_id":FlowRouter.getParam('id')})||{};
	return{
		allBlogs,
		editBlog,
	};
})(Blog);