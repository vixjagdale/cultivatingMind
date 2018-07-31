export const Products = new Mongo.Collection("products");

if(Meteor.isServer){

  Meteor.publish("allProducts", function(){
    return Products.find({});
  });

  Meteor.publish("findProducts", function(productsId){
    return Products.find({"_id":productsId});
  });

  Meteor.publish("featuredProducts", function(){
    return Products.find({"topProduct" : true});
  });

}

Meteor.methods({

  'addNewProduct' : function(formvalues) {
	var productsId = Products.insert({
                    'productImg'       : formvalues.productImg,
										'productName'      : formvalues.productName,
										'brand'            : formvalues.brand,
										'shortDescription' : formvalues.shortDescription,
										'materialCare'     : formvalues.materialCare,
										'description'      : formvalues.description,
										'price'            : parseFloat(formvalues.price),
										'discount'         : parseFloat(formvalues.discount),
										'category'         : formvalues.category,
										'topProduct'       : false,
										"createdAt"        : new Date(),
							          }); 
	return productsId;						          	
  },

  'deleteProducts' : function(dltId) {
	Products.remove({'_id': dltId}); 				          	
  },

  'updateProduct' : function(formvalues) {
    Products.update(
      { '_id': formvalues.productid },
      {
        $set:{
        'productImg'       : formvalues.productImg,
				'productName'      : formvalues.productName,
				'brand'            : formvalues.brand,
				'shortDescription' : formvalues.shortDescription,
				'materialCare'     : formvalues.materialCare,
				'description'      : formvalues.description,
				'price'            : parseFloat(formvalues.price),
				'discount'         : parseFloat(formvalues.discount),
				'category'         : formvalues.category,
	       "updatedAt"        : new Date(),
      } //End of set
    });  	
  },

  'featuredProduct' : function(productId, value) {
    Products.update(
      { '_id': productId },
      {
        $set:{
				'topProduct' : value,
      } //End of set
    });  	
  },

  'BulkProductsCSVUpload': function(data){

    console.log(data.length);
    check( data, Array);

    for ( var i = 0; i < data.length-1; i++ ){
      var uploadProduct    = data[i];
      var productName      = uploadProduct.productName;
      var brand            = uploadProduct.brand;
      var shortDescription = uploadProduct.shortDescription;
      var materialCare     = uploadProduct.materialCare;
      var description      = uploadProduct.description;
      var price            = uploadProduct.price;
      var discount         = uploadProduct.discount;
      var category         = uploadProduct.category;

      // console.log(Make,Model,Year);
      
      UserSession.set("allProgressbarSession",Meteor.userId()) ; 
      var productsId = Products.insert({ 
              'productName'      : productName,
              'brand'            : brand,
              'shortDescription' : shortDescription,                
              'materialCare'     : materialCare,                 
              'description'      : description,                 
              'price'            : price,                 
              'discount'         : discount,                 
              'category'         : category,                 
              'topProduct'       : false,  
              "createdAt"        : new Date(),               
        });
      UserSession.set("progressbarSession",Meteor.userId());

    }//end of for
  },

});