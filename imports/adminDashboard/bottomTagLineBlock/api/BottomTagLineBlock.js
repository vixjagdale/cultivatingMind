export const BottomTagLineBlockData = new Mongo.Collection("bottomTagLineBlock");

if(Meteor.isServer){
	Meteor.publish("bottomTagLineBlock", function(){
	    return BottomTagLineBlockData.find({'id' : 101});
	});	
}

Meteor.methods({

  'addUpdateBottomTagLine' : function(formValues) {
  	var bottomTagLineBlockExist     = BottomTagLineBlockData.findOne({'id':101});
  	if( bottomTagLineBlockExist){
	    BottomTagLineBlockData.update({'id' : 101},
	    				  {$set:{
	    					'headLine'      : formValues.headLine,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!bottomTagLineBlockExist){
	    BottomTagLineBlockData.insert({
	    					'id'         : 101,
	    					'headLine'    : formValues.headLine,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

});