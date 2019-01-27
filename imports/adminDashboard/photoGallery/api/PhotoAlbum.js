import {TempImage} from '/imports/s3/api/ClientImageCall.js';

export const PhotoAlbum = new Mongo.Collection("photoGallery");

if(Meteor.isServer){

	Meteor.publish("GalleryPhotos", function(){
	    return PhotoAlbum.find({'id':101});
	});
	Meteor.publish("GalleryPhotosAll", function(){
	    return PhotoAlbum.find({});
	});
}

Meteor.methods({

  'updatePhotoGallery' : function(formValues) {
  	var photoAlbumExist     = PhotoAlbum.findOne({'id':101});

  	if( photoAlbumExist){
	    PhotoAlbum.update({'id' : 101},
	    				  {$set:{
	    					'description' : formValues.description,
	    					'updatedAt'  : new Date(),
	    				}});
		return 'updated';
  	}else if(!photoAlbumExist){
	    PhotoAlbum.insert({
	    					'id' : 101,
	    					'description' : formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'addPhotoGalleryIMGs':function () {
 //  	f();
	// async function f(){
	// 	let newPromise = new Promise((resolve,reject)=>{
	// 		resolve (TempImage.findOne({"userId":Meteor.userId()}));
	// 	});
	// 	let result = await newPromise;
	// 	console.log("result ----> ",result);
	// 	if(result){
 //   			PhotoAlbum.insert({
	//   		image : img.imagePath,
	//   		userId : img.userId,
	//   		createdAt : new Date(),
	//   	});
 //    	}
	// }
  	var img = TempImage.findOne({"userId":Meteor.userId()});
  	if(img){
	  	PhotoAlbum.insert({
	  		image : img.imagePath,
	  		userId : img.userId,
	  		createdAt : new Date(),
	  	});
	}
  }



  // 'deleteCode' : function(id) {
  // 	PhotoAlbum.remove({'_id':id});
  // },



});