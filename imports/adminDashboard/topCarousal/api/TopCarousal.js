export const TopCarousalData = new Mongo.Collection("topCarousalData");

if(Meteor.isServer){
	Meteor.publish("allCarousalSlides", function(){
	    return TopCarousalData.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("singleCaraousalSlide", function(id){
	    return TopCarousalData.find({'_id':id});
	});
}

Meteor.methods({

  'addUpdateSlide' : function(formValues) {
  	var slideExist     = TopCarousalData.findOne({'_id':formValues.slideId});

  	if( slideExist){
	    TopCarousalData.update({'_id' : formValues.slideId},
	    				  {$set:{
	    					'header1'      : formValues.header1,
	    					'header2'       : formValues.header2,
	    					'header3'      : formValues.header3,
	    					'updatedAt'  : new Date(),
	    				}});
		return 'updated';
  	}else if(!slideExist){
	    TopCarousalData.insert({
	    					'header1'      : formValues.header1,
	    					'header2'       : formValues.header2,
	    					'header3'      : formValues.header3,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteCarousalSlide' : function(id) {
  	TopCarousalData.remove({'_id':id});
  },



});