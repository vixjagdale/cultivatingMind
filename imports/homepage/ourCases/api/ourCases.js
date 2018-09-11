export const OurCases = new Mongo.Collection("ourCases");

if(Meteor.isServer){
	Meteor.publish("showAllCases",function(){
		return OurCases.find({});
	});

	Meteor.methods({
		'addCases':function(formValues){
			if(formValues._id){
				OurCases.update({"_id":formValues._id},
					{ $set:
						{
							'casesShortDesc' : formValues.casesShortDesc,
							'casestitle'     : formValues.casestitle,
							'shortDescription' : formValues.shortDescription,
							'raised'           : formValues.raised,
							'goal'             : formValues.goal,
						}
					});
			}else{
				OurCases.insert({
					'casesShortDesc' : formValues.casesShortDesc,
					'casestitle'     : formValues.casestitle,
					'shortDescription' : formValues.shortDescription,
					'raised'           : formValues.raised,
					'goal'             : formValues.goal,
					'createdAt'      : new Date(),
				});
			}
		}
		
	})
}