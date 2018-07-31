export const Services = new Mongo.Collection("services");

if(Meteor.isServer){

  Meteor.publish("allServices", function(){
    return Services.find({});
  });

  Meteor.publish("findService", function(productsId){
    return Services.find({"_id":productsId});
  });

  Meteor.publish("featuredServices", function(){
    return Services.find({"topService" : true});
  });

}

Meteor.methods({

  'addNewService' : function(formvalues) {
	var productsId = Services.insert({
                    'serviceImg'       : formvalues.serviceImg,
										'serviceName'      : formvalues.serviceName,
										'shortDescription' : formvalues.shortDescription,
										'description'      : formvalues.description,
										'price'            : parseFloat(formvalues.price),
										'discount'         : parseFloat(formvalues.discount),
										'topService'       : false,
										"createdAt"        : new Date(),
							          }); 
	return productsId;						          	
  },

  'deleteService' : function(dltId) {
	 Services.remove({'_id': dltId}); 				          	
  },

  'updateService' : function(formvalues) {
    Services.update(
      { '_id': formvalues.serviceId },
      {
        $set:{
        'serviceImg'       : formvalues.serviceImg,
				'serviceName'      : formvalues.serviceName,
				'shortDescription' : formvalues.shortDescription,
				'description'      : formvalues.description,
				'price'            : parseFloat(formvalues.price),
				'discount'         : parseFloat(formvalues.discount),
	      "updatedAt"        : new Date(),
      } //End of set
    });  	
  },

  'featuredService' : function(serviceId, value) {
    Services.update(
      { '_id': serviceId },
      {
        $set:{
				'topService' : value,
      } //End of set
    });  	
  },

  'BulkServicesCSVUpload': function(data){

    console.log(data.length);
    check( data, Array);

    for ( var i = 0; i < data.length-1; i++ ){
      var uploadService    = data[i];
      var serviceName      = uploadService.serviceName;
      var shortDescription = uploadService.shortDescription;
      var description      = uploadService.description;
      var price            = uploadService.price;
      var discount         = uploadService.discount;

      // console.log(Make,Model,Year);
      
      UserSession.set("allProgressbarSession",Meteor.userId()) ; 
      var serviceId = Services.insert({ 
              'serviceName'      : serviceName,
              'shortDescription' : shortDescription,                
              'description'      : description,                 
              'price'            : price,                 
              'discount'         : discount,                 
              'topProduct'       : false,  
              "createdAt"        : new Date(),               
        });
      UserSession.set("progressbarSession",Meteor.userId());

    }//end of for
  },

});