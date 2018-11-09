export const WantToBeVolunteerData = new Mongo.Collection("wantToBeVolunteer");

if(Meteor.isServer){
	Meteor.publish("wantToBeVolunteer", function(){
	    return WantToBeVolunteerData.find({'id' : 101});
	});	
}

Meteor.methods({

  'addUpdateWantToBeVolunteer' : function(formValues) {
  	var wantToBeVolunteerExist     = WantToBeVolunteerData.findOne({'id':101});
  	if( wantToBeVolunteerExist){
	    WantToBeVolunteerData.update({'id' : 101},
	    				  {$set:{
	    					'tagLine'      : formValues.tagLine,
	    					'title1'       : formValues.title1,
	    					'title2'       : formValues.title2,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!wantToBeVolunteerExist){
	    WantToBeVolunteerData.insert({
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

});