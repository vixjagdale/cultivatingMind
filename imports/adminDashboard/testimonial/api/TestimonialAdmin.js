export const Testimonials = new Mongo.Collection("testimonials");

if(Meteor.isServer){
	Meteor.publish("allTestimonials", function(){
	    return Testimonials.find({},{sort:{createdAt:-1}});
	});	

	Meteor.publish("singleTestimonial", function(id){
	    return Testimonials.find({'_id':id});
	});
}

Meteor.methods({

  'addUpdateTestimonial' : function(formValues) {
  	var counterExist     = Testimonials.findOne({'_id':formValues.testimonialId});

  	if( counterExist){
	    Testimonials.update({'_id' : formValues.testimonialId},
	    				  {$set:{
	    					'personName' : formValues.personName,
	    					'description': formValues.description,
	    					'updatedAt'  : new Date(),
	    				}});
		return 'updated';
  	}else if(!counterExist){
	    Testimonials.insert({
	    					'personName' : formValues.personName,
	    					'description': formValues.description,
	    					'createdAt'  : new Date(),
	    				});
	    return 'inserted';
  	}
  },

  'deleteTestimonial' : function(id) {
  	Testimonials.remove({'_id':id});
  },



});