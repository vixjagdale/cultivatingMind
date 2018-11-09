export const MissionData = new Mongo.Collection("mission");

if(Meteor.isServer){
	Meteor.publish("allMissions", function(){
	    return MissionData.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("missionMetaData", function(){
	    return MissionData.find({'id':101});
	});
}

Meteor.methods({

  'addUpdateMissionData' : function(formValues) {
  	var dataExist     = MissionData.findOne({'id':101});
  	if( dataExist){
	    MissionData.update({'id' : 101},
	    				  {$set:{
	    					'tagLine'      : formValues.tagLine,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!dataExist){
	    MissionData.insert({
	    					'id'         : 101,
	    					'tagLine'    : formValues.tagLine,
	    					'description': formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'addUpdateMission' : function(formValues) {
  	var newsExist     = MissionData.findOne({'_id':formValues.id});
  	if( newsExist){
	    MissionData.update({'_id' : formValues.id},
	    				  {$set:{
	    					'title'      : formValues.title,
	    					'missionDesc'       : formValues.missionDesc,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!newsExist){
	    MissionData.insert({
	    					'title'    : formValues.title,
	    					'missionDesc'     : formValues.missionDesc,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteMission' : function(id) {
  	MissionData.remove({'_id':id});
  },



});