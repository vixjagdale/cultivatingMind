export const TopTagLineBlockData = new Mongo.Collection("topTagLineBlock");

if(Meteor.isServer){
	Meteor.publish("topTagLineBlock", function(){
	    return TopTagLineBlockData.find({'id' : 101});
	});	
}

Meteor.methods({

  'addUpdateTopTagLine' : function(formValues) {
  	var topTagLineBlockDataExist     = TopTagLineBlockData.findOne({'id':101});
  	if( topTagLineBlockDataExist){
	    TopTagLineBlockData.update({'id' : 101},
	    				  {$set:{
	    					'headLine'      : formValues.headLine,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!topTagLineBlockDataExist){
	    TopTagLineBlockData.insert({
	    					'id'         : 101,
	    					'headLine'    : formValues.headLine,
	    					'description': formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

});