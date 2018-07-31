export const Settings = new Mongo.Collection("companySettings");

if(Meteor.isServer){

  Meteor.publish("allSettings", function(){
    return Settings.find({});
  });

  Meteor.publish("findSettings", function(){
    return Settings.find({"companyId":101});
  });

}

Meteor.methods({

  'addCompanySettings' : function(formvalues) {
  	var settingsFound = Settings.findOne({"companyId":101});
  	if(settingsFound){
	    Settings.update(
	      { "companyId":101 },
	      {
	        $set:{
		          "companyName" : formvalues.companyName,
		          "address"     : formvalues.address,
		          "phoneNumber" : formvalues.phoneNumber,
		          "timing"      : formvalues.timing,
		          "updatedAt"   : new Date(),
	      } //End of set
	    });
  	}else{
		var settingsId = Settings.insert({
											  "companyId"   : 101,
									          "companyName" : formvalues.companyName,
									          "address"     : formvalues.address,
									          "phoneNumber" : formvalues.phoneNumber,
									          "timing"      : formvalues.timing,
									          "createdAt"   : new Date(),
								          }); 	
	    return settingsId;
  	}
  },

});