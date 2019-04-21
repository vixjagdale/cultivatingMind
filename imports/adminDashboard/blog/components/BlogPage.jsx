import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Blogs} from '../api/blogs.js';

class blogPage extends Component{
	render(){
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogWrapper">
				<div className="col-lg-12 col-md-12 blogImg-Wrap">
				</div>
				{this.props.allBlogs.map((blogs,index)=>{
					
					return <div key={index} className="col-lg-8 col-lg-offset-2 col-md-12 blogSec-Wrap">
					{index%2==0 ?
						<div className="row blog-row-L col-lg-12 ">
							<div className="col-lg-8 col-md-8 blogTextContents-L">
								<label className="col-lg-12">{blogs.blogTitle}</label>
								<div className="col-lg-12">{blogs.blogBody.length>500 ? blogs.blogBody.slice(0,500)+'...' : blogs.blogBody }</div>
									<div className="col-lg-6">{moment(blogs.blogDate).format("Do-MMMM-YYYY")}</div>
									<div className="col-lg-6"><a href={`/completeBlogPage/${blogs._id}`}>Read more...</a></div>
							</div>

							<div className="col-lg-4">
								<img src={blogs.blogImg}/>
							</div>
						</div>
					:
					    <div className="row blog-row-R col-lg-12">
							<div className="col-lg-4">
								<img src={blogs.blogImg}/>
							</div>
							<div className="col-lg-8 col-md-8 blogTextContents-R">
								<label className="col-lg-12">{blogs.blogTitle}</label>
								<div className="col-lg-12 blogBodyText">{blogs.blogBody.length>500 ? blogs.blogBody.slice(0,500)+'...' : blogs.blogBody }</div>
									<div className="col-lg-6">{moment(blogs.blogDate).format("Do-MMMM-YYYY")}</div>
									<div className="col-lg-6"><a href={`/completeBlogPage/${blogs._id}`}>Read more...</a></div>
							</div>
						</div>
					}
					</div>
				})}
			</div>
			);
	}
}

export default withTracker(props=>{
	const postHandle = Meteor.subscribe("showAllBlogs");
	const loading    = !postHandle.ready();
	const allBlogs = Blogs.find({});
	// console.log("allBlogs ------>",allBlogs);
	return{
		allBlogs,
	};
})(blogPage);