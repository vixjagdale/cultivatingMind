import {Email} from 'meteor/email';
export const GetInTouch = new Mongo.Collection("getInTouch");

if(Meteor.isServer){
	Meteor.publish("GetInTouch", function(){
	    return GetInTouch.find({},{sort:{createdAt:-1}});
	});	


	Meteor.methods({

	  'saveQueries' : function(formValues) {
	  		var body = 'Dear CultivatingMinds,'+'\n\n'+'Name :'+formValues.name+'\n'+'Mobile Number: '+formValues.phone+'\n'+'\n'+formValues.message;
		    var id = GetInTouch.insert({
		    					'name'    : formValues.name,
		    					'email'    : formValues.email,
		    					'subject'    : formValues.subject,
		    					'phone'    : formValues.phone,
		    					'message'    : formValues.message,
		    					'createdAt'  : new Date(),
		    				});
		    console.log("formValues ---> ",formValues);

		    Email.send({
				from    : formValues.email,
				to      : "mailtovikasjagdale@gmail.com",
				subject : formValues.subject,
				text    : body
				});	
		    return id;

	  },	  

	});



}