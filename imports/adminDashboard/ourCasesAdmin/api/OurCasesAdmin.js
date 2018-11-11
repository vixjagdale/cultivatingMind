export const OurCasesAdminData = new Mongo.Collection("ourCases");

if(Meteor.isServer){
	Meteor.publish("allCases", function(){
	    return OurCasesAdminData.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("ourCasesMetaData", function(){
	    return OurCasesAdminData.find({'id':101});
	});
}

Meteor.methods({

  'addUpdateOurCasesData' : function(formValues) {
  	var dataExist     = OurCasesAdminData.findOne({'id':101});
  	if( dataExist){
	    OurCasesAdminData.update({'id' : 101},
	    				  {$set:{
	    					'tagLine'      : formValues.tagLine,
	    					'description'  : formValues.description,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!dataExist){
	    OurCasesAdminData.insert({
	    					'id'         : 101,
	    					'tagLine'    : formValues.tagLine,
	    					'description': formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'addUpdateOurCase' : function(formValues) {
  	var newsExist     = OurCasesAdminData.findOne({'_id':formValues.id});
  	if( newsExist){
	    OurCasesAdminData.update({'_id' : formValues.id},
	    				  {$set:{
	    					'title'      : formValues.title,
	    					'moneyRaised'       : parseInt(formValues.moneyRaised),
	    					'goal'       : parseInt(formValues.goal),
	    					'caseDescription'       : formValues.caseDescription,
	    					'updatedAt'    : new Date(),
	    				}});
		return 'updated';
  	}else if(!newsExist){
	    OurCasesAdminData.insert({
	    					'title'    : formValues.title,
	    					'moneyRaised'     : parseInt(formValues.moneyRaised),
	    					'goal'     : parseInt(formValues.goal),
	    					'caseDescription'     : formValues.caseDescription,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteOurCase' : function(id) {
  	OurCasesAdminData.remove({'_id':id});
  },



});