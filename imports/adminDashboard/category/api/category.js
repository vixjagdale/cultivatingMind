export const Categories = new Mongo.Collection("categories");

if(Meteor.isServer){

  Meteor.publish("allCategories", function(){
    return Categories.find({});
  });

  Meteor.publish("findCategory", function(categoryId){
    return Categories.find({"_id":categoryId});
  });

}


Meteor.methods({

  'addNewCategory' : function(formvalues) {
	var categoryId = Categories.insert({
								          "categoryName" : formvalues.categoryName,
								          "categoryImg"  : formvalues.categoryImg,
								          "createdAt"    : new Date(),
							          }); 	
    return categoryId;
  },

  'deleteCategory' : function(dltId) {
	Categories.remove({"_id" : dltId}); 	
  },

  'updateCategory' : function(formvalues) {
    Categories.update(
      { '_id': formvalues.categoryId },
      {
        $set:{
	          "categoryName" : formvalues.categoryName,
	          "categoryImg"  : formvalues.categoryImg,
	          "updatedAt"    : new Date(),
      } //End of set
    });  	
  },

});
