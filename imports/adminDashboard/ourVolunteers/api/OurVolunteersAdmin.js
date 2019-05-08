export const OurVolunteersData = new Mongo.Collection("ourVolunteers");
import {TempImage} from '/imports/s3/api/ClientImageCall.js';

if(Meteor.isServer){
	Meteor.publish("allVolunteers", function(){
	    return OurVolunteersData.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("volunteersMetaData", function(){
	    return OurVolunteersData.find({'id':101});
	});
}

Meteor.methods({

  'addUpdateVolunteerTopBlock' : function(formValues) {
  	var volDataExist     = OurVolunteersData.findOne({'id':101});
  	if( volDataExist){
	    OurVolunteersData.update({'id' : 101},
	    				  {$set:{
	    					'tagLine'      : formValues.tagLine,
	    					'title1'       : formValues.title1,
	    					'title2'       : formValues.title2,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!volDataExist){
	    OurVolunteersData.insert({
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

  'addUpdateVolunteers' : function(formValues) {
  	var newsExist     = OurVolunteersData.findOne({'_id':formValues.id});
  	var volunteersPhoto = TempImage.findOne({"userId":Meteor.userId()});
  	TempImage.remove({"userId":Meteor.userId()});
  	if( newsExist){
	    OurVolunteersData.update({'_id' : formValues.id},
	    				  {$set:{
	    					'volunteersName'          : formValues.volunteersName,
	    					'volunteersProfession'    : formValues.volunteersProfession,
	    					'volunteersMobile'        : formValues.volunteersMobile,
	    					'volunteersEmailId'       : formValues.volunteersEmailId,
	    					'aboutVolunteers'        : formValues.aboutVolunteers,

	    					// 'volunteersPhoto'         : volunteersPhoto.imagePath,
	    					'updatedAt'               : new Date(),
	    				}});
		return 'updated';
  	}else if(!newsExist){

	    OurVolunteersData.insert({
	    					'volunteersName'           : formValues.volunteersName,
	    					'volunteersProfession'     : formValues.volunteersProfession,
	    					'volunteersMobile'         : formValues.volunteersMobile,
	    					'volunteersEmailId'        : formValues.volunteersEmailId,
	    					'aboutVolunteers'          : formValues.aboutVolunteers,
	    					'volunteersPhoto'          : volunteersPhoto.imagePath,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteVolunteer' : function(id) {
  	OurVolunteersData.remove({'_id':id});
  },



});