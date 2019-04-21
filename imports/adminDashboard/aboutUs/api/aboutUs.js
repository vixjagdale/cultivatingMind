import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const AboutUs = new Mongo.Collection('aboutUs');

if(Meteor.isServer){
	Meteor.publish("showAboutUs",function(){
		return AboutUs.find({});
	});
	
}

Meteor.methods({
	'aboutUsInfo':function(aboutUsValues){
		var ifExist = AboutUs.findOne({});
		if(ifExist){}else{
			if(aboutUsValues.id){
				AboutUs.update({"_id":aboutUsValues.id},
					{
						$set:{
							aboutUsTitle : aboutUsValues.aboutUsTitle,
							aboutUsBody  : aboutUsValues.aboutUsBody
						}	
					}	
				);
			}else{
				AboutUs.insert({
					aboutUsTitle : aboutUsValues.aboutUsTitle,
					aboutUsBody  : aboutUsValues.aboutUsBody
				});
			}	
		}
		
	}
});

