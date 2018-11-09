export const PhotoAlbum = new Mongo.Collection("photoGallery");

if(Meteor.isServer){

	Meteor.publish("GalleryPhotos", function(){
	    return PhotoAlbum.find({'id':101});
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

  // 'deleteCode' : function(id) {
  // 	PhotoAlbum.remove({'_id':id});
  // },



});