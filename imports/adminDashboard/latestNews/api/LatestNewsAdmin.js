export const LatestNewsData = new Mongo.Collection("latestNews");

if(Meteor.isServer){
	Meteor.publish("allNews", function(){
	    return LatestNewsData.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("newsMetaData", function(){
	    return LatestNewsData.find({'id':101});
	});
}

Meteor.methods({

  'addUpdateNews' : function(formValues) {
  	var newsExist     = LatestNewsData.findOne({'id':101});
  	if( newsExist){
	    LatestNewsData.update({'id' : 101},
	    				  {$set:{
	    					'tagLine'      : formValues.tagLine,
	    					'title1'       : formValues.title1,
	    					'title2'       : formValues.title2,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!newsExist){
	    LatestNewsData.insert({
	    					'id'         : 101,
	    					'tagLine'    : formValues.tagLine,
	    					'title1'     : formValues.title1,
	    					'title2'     : formValues.title2,
	    					'description': formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'addUpdatePost' : function(formValues) {
  	var newsExist     = LatestNewsData.findOne({'_id':formValues.id});
  	if( newsExist){
	    LatestNewsData.update({'_id' : formValues.id},
	    				  {$set:{
	    					'postTitle'      : formValues.postTitle,
	    					'postDate'       : formValues.postDate,
	    					'postDescription'  : formValues.postDescription,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!newsExist){
	    LatestNewsData.insert({
	    					'postTitle'    : formValues.postTitle,
	    					'postDate'     : formValues.postDate,
	    					'postDescription': formValues.postDescription,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deletePost' : function(id) {
  	LatestNewsData.remove({'_id':id});
  },



});