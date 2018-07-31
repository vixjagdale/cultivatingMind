export const ContactUs = new Mongo.Collection("contactUs");

if(Meteor.isServer){

  Meteor.publish("allContactMsgs", function(){
    return ContactUs.find({},{ sort: { "createdAt": -1 }});
  });

}

Meteor.methods({

  'SendContactMessage' : function(name, email, subject, message) {
	var contactUsId = ContactUs.insert({
                    					'name'       : name,
										'email'      : email,
										'subject'    : subject,
										'message'    : message,
										"createdAt"  : new Date(),
							          }); 
	return contactUsId;						          	
  },

});
