import {Email} from 'meteor/email';
export const GetInTouch = new Mongo.Collection("getInTouch");

if(Meteor.isServer){
	Meteor.publish("GetInTouch", function(){
	    return GetInTouch.find({},{sort:{createdAt:-1}});
	});	


	Meteor.methods({

	  'saveQueries' : function(formValues) {

		    var id = GetInTouch.insert({
		    					'name'    : formValues.name,
		    					'email'    : formValues.email,
		    					'subject'    : formValues.subject,
		    					'phone'    : formValues.phone,
		    					'message'    : formValues.message,
		    					'createdAt'  : new Date(),
		    				});

		    Email.send({
				from: formValues.email,
				to: "vikasjagdale92@gmail.com",
				subject: formValues.subject,
				text: formValues.message
				});	
		    return id;

	  },	  

	});



}