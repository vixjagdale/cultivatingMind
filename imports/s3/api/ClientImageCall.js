import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ProductImage} from './ProductImage.js';
export const TempImage = new Mongo.Collection('TempImage');

if(Meteor.isServer){
	
	Meteor.publish("TempImages",function(){
		return TempImage.find({});
	});

	import {ProductImage} from './ProductImage.js';


	Meteor.methods({
		
		"addProductImages": function(productId){

		    var link = ProductImage.findOne({_id:productId}).link();
		    TempImage.remove({'userId':Meteor.userId()});

		           TempImage.insert({ 
		                'userId'      : Meteor.userId(),
		                 'imagePath'   : link,   
		            });   
		},
		
	});
}