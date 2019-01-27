import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ProductImage} from './ProductImage.js';
export const TempImage = new Mongo.Collection('TempImage');
// export const TempDocumentsImage = new Mongo.Collection('TempDocumentsImage');
// export const TempImagee = new Mongo.Collection('tempImagee');

if(Meteor.isServer){
	
	Meteor.publish("TempImages",function(){
		return TempImage.find({});
	});

	Meteor.publish("loginImgTempImages",function(){
		return TempImage.find({"userId":Meteor.userId()});
	});
	Meteor.publish("TempDocumentsImages",function(){
		return TempDocumentsImage.find({});
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
		}


	});
}