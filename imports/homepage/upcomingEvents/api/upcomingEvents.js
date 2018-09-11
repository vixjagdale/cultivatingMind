export const UpcomingEvents = new Mongo.Collection("upComingEvents");

if(Meteor.isServer){
	Meteor.publish("showAllEvents",function(){
		return upComingEvents.find({});
	});

	Meteor.methods({
		'addEvent':function(formValues){
			if(formValues.uEid){
				UpcomingEvents.update({"_id":formValues.uEid},
					{ $set:
						{
							'upComingEventShortDesc' : formValues.upComingEventShortDesc,
							'eventTitle'             : formValues.eventTitle,
							'eventDate'              : formValues.eventDate,
							'eventLocation'          : formValues.eventLocation,
							'shortDescription'       : formValues.shortDescription,
						}
					});
			}else{
				UpcomingEvents.insert({
					'upComingEventShortDesc' : formValues.upComingEventShortDesc,
					'eventTitle'             : formValues.eventTitle,
					'eventDate'              : formValues.eventDate,
					'eventLocation'          : formValues.eventLocation,
					'shortDescription'       : formValues.shortDescription,
					'createdAt'      : new Date(),
				});
			}
		}
});
}