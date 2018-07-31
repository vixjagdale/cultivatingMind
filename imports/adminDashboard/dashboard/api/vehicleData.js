export const VehicleData = new Mongo.Collection("vehicleData");

if(Meteor.isServer){

  Meteor.publish("allVehicle", function(){
    return VehicleData.find({});
  });

}

Meteor.methods({

  'BulkVehicleCSVUpload': function(data){
    console.log(data);
    check( data, Array);
    for ( var i = 0; i < data.length; i++ ){
      var uploadVehicle = data[i];
      var Make         = uploadVehicle.Marque;
      var Model        = uploadVehicle.Modèle;
      var Year         = uploadVehicle.Année;

      console.log(Make,Model,Year);
      
      UserSession.set("allProgressbarSession",Meteor.userId()) ; 
      var vehicleId = VehicleData.insert({ 
              'make' : Make,
              'model': Model,
              'year' : Year                 
        });
      UserSession.set("progressbarSession",Meteor.userId());
    }//end of for
  },

});