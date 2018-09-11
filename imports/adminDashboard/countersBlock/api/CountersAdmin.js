export const Counters = new Mongo.Collection("counters");

if(Meteor.isServer){
	Meteor.publish("allCounters", function(){
	    return Counters.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("singleCounter", function(id){
	    return Counters.find({'_id':id});
	});
}

Meteor.methods({

  'addUpdateCounter' : function(formValues) {
  	var counterExist     = Counters.findOne({'_id':formValues.id});

  	if( counterExist){
	    Counters.update({'_id' : formValues.id},
	    				  {$set:{
	    					'title'      : formValues.title,
	    					'icon'       : formValues.counterIcon,
	    					'count'      : parseInt(formValues.count),
	    					'updatedAt'  : new Date(),
	    				}});
		return 'updated';
  	}else if(!counterExist){
	    Counters.insert({
	    					'title'      : formValues.title,
	    					'icon'       : formValues.counterIcon,
	    					'count'      : parseInt(formValues.count),
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteCode' : function(id) {
  	Counters.remove({'_id':id});
  },



});