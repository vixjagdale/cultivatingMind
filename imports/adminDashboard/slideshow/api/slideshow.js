export const SlideShow = new Mongo.Collection("slideShow");

if(Meteor.isServer){

  Meteor.publish("allSlideShow", function(){
    return SlideShow.find({});
  });

  Meteor.publish("findSlideShow", function(slideId){
    return SlideShow.find({"_id":slideId});
  });

}


Meteor.methods({

  'addNewSlide' : function(formvalues) {
	var slideShowId = SlideShow.insert({
								          "tagLine1"  : formvalues.tagLine1,
                          "tagLine2"  : formvalues.tagLine2,
								          "tagLine3"  : formvalues.tagLine3,
                          "slideImg"  : formvalues.slideImg,
								          "createdAt" : new Date(),
							          }); 	
    return slideShowId;
  },

  'deleteSlide' : function(dltId) {
	SlideShow.remove({"_id" : dltId}); 	
  },

  'updateSlide' : function(formvalues) {
    SlideShow.update(
      { '_id': formvalues.slideId },
      {
        $set:{
            "tagLine1"  : formvalues.tagLine1,
            "tagLine2"  : formvalues.tagLine2,
            "tagLine3"  : formvalues.tagLine3,
            "slideImg"  : formvalues.slideImg,
	          "updatedAt"    : new Date(),
      } //End of set
    });  	
  },

});
