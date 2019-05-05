export const UpcomingEventsData = new Mongo.Collection("upcomingEvents");
import {TempImage} from '/imports/s3/api/ClientImageCall.js';


if(Meteor.isServer){
	Meteor.publish("allUpcomingEvents", function(){
	    return UpcomingEventsData.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("upcomingEventsMetaData", function(){
	    return UpcomingEventsData.find({'id':101});
	});
}

Meteor.methods({

  'addUpdateUpcomingEventsData' : function(formValues) {
  	var dataExist     = UpcomingEventsData.findOne({'id':101});
  	if( dataExist){
	    UpcomingEventsData.update({'id' : 101},
	    				  {$set:{
	    					'tagLine'      : formValues.tagLine,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!dataExist){
	    UpcomingEventsData.insert({
	    					'id'         : 101,
	    					'tagLine'    : formValues.tagLine,
	    					'description': formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'addUpdateUpcomingEvents' : function(formValues) {
  	var newsExist     = UpcomingEventsData.findOne({'_id':formValues.id});
  	var upEventPhoto = TempImage.findOne({"userId":Meteor.userId()});
  	TempImage.remove({"userId":Meteor.userId()});

  	if( newsExist){
	    UpcomingEventsData.update({'_id' : formValues.id},
	    				  {$set:{
	    					'eventTitle'      : formValues.eventTitle,
	    					'eventDate'       : formValues.eventDate,
	    					'eventDescription': formValues.eventDescription,
	    					'eventVenue'      : formValues.eventVenue,
	    					'eventPhoto'      : upEventPhoto,
	    					'updatedAt'       : new Date(),
	    				}});
		return 'updated';
  	}else if(!newsExist){
	    UpcomingEventsData.insert({
	    					'eventTitle'       : formValues.eventTitle,
	    					'eventDate'        : formValues.eventDate,
	    					'eventDescription' : formValues.eventDescription,
	    					'eventVenue'       : formValues.eventVenue,
	    					'eventPhoto'       : upEventPhoto,
	    					'createdAt'        : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteUpcomingEvents' : function(id) {
  	UpcomingEventsData.remove({'_id':id});
  },



});