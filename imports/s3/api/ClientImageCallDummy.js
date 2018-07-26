import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {ProductImage} from './ProductImage.js';
export const TempImage = new Mongo.Collection('tempImage');

if(Meteor.isServer){
	
	Meteor.publish("TempImages",function(){
		return TempImage.find({});
	});

	import {ProductImage} from './ProductImage.js';


	Meteor.methods({
		
		"addProductImages": function(productId){

		    var link = ProductImage.findOne({_id:productId}).link();
		        // link = link.replace('tms.iassureit.com','tms.adrekusa.com'); 
		    // console.log("product link = ",link);  
		    TempImage.remove({'userId':Meteor.userId()});
		           TempImage.insert({ 
		                'userId'      : Meteor.userId(),
		                 // 'type'        : 'Product', 
		                 'imagePath'   : link,   
		            });   
		},
		
	});
}