export const Brands = new Mongo.Collection("brands");

if(Meteor.isServer){

  Meteor.publish("allBrands", function(){
    return Brands.find({});
  });

  Meteor.publish("findBrand", function(brandsId){
    return Brands.find({"_id":brandsId});
  });

}


Meteor.methods({

  'addNewBrand' : function(formvalues) {
	var brandId = Brands.insert({
								          "brandName" : formvalues.brandName,
								          "brandImg"  : formvalues.brandImg,
								          "createdAt" : new Date(),
							          }); 	
    return brandId;
  },

  'deleteBrand' : function(dltId) {
	Brands.remove({"_id" : dltId}); 	
  },

  'updateBrand' : function(formvalues) {
    Brands.update(
      { '_id': formvalues.brandId },
      {
        $set:{
	          "brandName" : formvalues.brandName,
	          "brandImg"  : formvalues.brandImg,
	          "updatedAt" : new Date(),
      } //End of set
    });  	
  },

});
