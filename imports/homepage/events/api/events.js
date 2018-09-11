export const UpcomingEvent = new Mongo.Collection("upcomingEvent");

Meteor.method({
	'addMission':function(ourMissionValues){
		if(ourMissionValues._id){
			OurMission.update({"_id":ourMissionValues._id},
				{ $set:
					{
						'titile'         : ourMissionValues.title,
						'ourMissionDesc' : ourMissionValues.ourMissionDesc,
						'missionImg'     : ourMissionValues.missionImg,
						'missionTitle'   : ourMissionValues.missionTitle,
						'missionText'    : ourMissionValues.missionText,
					}
				}
			});
		}else{
			OurMission.insert({
				'titile'         : ourMissionValues.title,
				'ourMissionDesc' : ourMissionValues.ourMissionDesc,
				'missionImg'     : ourMissionValues.missionImg,
				'missionTitle'   : ourMissionValues.missionTitle,
				'missionText'    : ourMissionValues.missionText,
				'createdAt'      : new Date(),
			});
		}
	}
})