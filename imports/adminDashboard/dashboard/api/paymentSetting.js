export const PaymentSetting = new Mongo.Collection("paymentSetting");

if(Meteor.isServer){

  Meteor.publish("paymentConfiguration", function(){
    return PaymentSetting.find({});
  });

}

Meteor.methods({
  'insertPaymentConfig' : function(commission) {
  	  var PaymentConfigurationData = PaymentSetting.findOne({});
  	  if(PaymentConfigurationData){
		      PaymentSetting.update(
		        { 'configId' : 101 },
		        {
		          $set:{
		              "commission"  : parseFloat(commission),
		              "updatedAt"   : new Date(),
		        } //End of set
		      }
		      ); //end of update
  	  }else{
        PaymentSetting.insert(
                              {
                              	'configId'      : 101,
                                "commission"    : parseFloat(commission),
                                "createdAt"     : new Date(),
                              }, function(error,result){
                                        if(error) {
                                            return error;
                                        }else{ 
                                             }
                                    }                                                            
                           );  	  	
  	  }


  },
});