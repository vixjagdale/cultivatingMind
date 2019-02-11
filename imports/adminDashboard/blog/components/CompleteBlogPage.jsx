import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Blogs} from '../api/blogs.js';

class CompleteBlogPage extends Component{
	render(){
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogWrapper">
				<div className="col-lg-12 completeBlogImg">
					<img src={this.props.blogs.blogImg} align="left"/>
				</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-8 col-md-8 blogSec-Wrap">
							<div className="row blog-row-L col-lg-12 ">
								<div className="col-lg-12 col-md-12">
									<label className="col-lg-12 completeBlogTit">{this.props.blogs.blogTitle}</label>
									<div className="col-lg-6 completeBlogDate">{moment(this.props.blogs.blogDate).format("Do-MMMM-YYYY","h:mm:ss a")}</div>
									<div className="col-lg-12 completeblogBody">{this.props.blogs.blogBody }</div>
								</div>
								
							</div>
						</div>
					</div>
			</div>
			);
	}
}

export default withTracker(props=>{
	const postHandle = Meteor.subscribe("showSingleBlogs",FlowRouter.getParam('id'));
	const loading    = !postHandle.ready();
	const blogs = Blogs.findOne({"_id":FlowRouter.getParam('id')})||{};
	console.log(blogs);
	return{
		blogs,
	};
})(CompleteBlogPage);