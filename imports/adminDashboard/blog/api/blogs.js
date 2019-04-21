import {Meteor} from 'meteor/meteor';
import {Mongo}  from 'meteor/mongo';
import {TempImage} from '/imports/s3/api/ClientImageCall.js';


export const Blogs = new Mongo.Collection('blogs');
if(Meteor.isServer){
	Meteor.publish("showAllBlogs",function(){
		return Blogs.find({});
	});
	
	Meteor.publish("showSingleBlogs",function(id){
		return Blogs.find({"_id":id});
	});
}

Meteor.methods({
	blogInfo:function(blogValues){
		var blogImg = TempImage.findOne({"userId":Meteor.userId()});
  		TempImage.remove({"userId":Meteor.userId()});
		if(blogValues.id){
			if(!blogImg){
				var existBlog    = Blogs.findOne({"_id":blogValues.id});
				var existBlogImg = existBlog.blogImg;
			}
			Blogs.update({"_id":blogValues.id},
				{
					$set:{
						blogTitle : blogValues.blogTitle,
						blogBody  : blogValues.blogBody,
						blogDate  : new Date(blogValues.blogDate),
						blogImg   : existBlogImg,
					}
				}
			);
		}else{
			Blogs.insert({
				blogTitle : blogValues.blogTitle,
				blogBody  : blogValues.blogBody,
				blogDate  : new Date(blogValues.blogDate),
				blogImg   : blogImg.imagePath,
				createdAt : new Date(),
			});
		}
	},

	deleteBlog:function(id){
		Blogs.remove({"_id":id});
	}
})