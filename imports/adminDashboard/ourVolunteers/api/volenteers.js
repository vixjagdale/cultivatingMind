import {Mongo} from 'meteor/mongo';

export const Volenteers = new Mongo.Collection('volenteers');

if(Meteor.isServer){
	
	Meteor.publish("showAllVolenteers",function(){
		return Volenteers.find({});
	});

	Meteor.methods({
		"addVolunteer":function(formValues){
			var ifExist = Volenteers.findOne({"mobileNumber": formValues.mobileNumber});
			if(ifExist){
				throw new Meteor.Error('pants-not-found', "Can't find my pants");
			}else{
				Volenteers.insert({
					firstName     : formValues.firstName,
					lastName      : formValues.lastName,
					fullName      : formValues.firstName+" "+formValues.lastName,
					mobileNumber  : formValues.mobileNumber,
					emailId       : formValues.emailId,
					aboutYourSelf : formValues.aboutYourSelf,
					userPhoto     : "",
				});
			}
		}
	});
}