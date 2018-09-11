// import {QuickWalletMaster} from '/import/quikwalletMaster/quikwalletMaster.js';
export const Donations = new Mongo.Collection('donation');

Meteor.methods({

	paymentGatewayCultivatingMind: function (formValues) {
			var id = Donations.insert({
				'paymentType'      : formValues.paymentType,
				'donateFor'        : formValues.donateFor,
				'currency'         : formValues.currency,
				'donateAmt'        : formValues.donateAmt,
			});
			if(id){
		    var userId       = Meteor.userId();
		    var userObj      = Meteor.users.findOne({"_id":userId});
		    var mobileNumber = userObj.profile.mobNumber;
		    var QWCredential = QuickWalletMaster.findOne({});
		    if(QWCredential){
			    if(QWCredential.environment=="production"){
			    	var API = QWCredential.prodAPI;
			    	var partnerid = QWCredential.prodKey;
			    	var secret    = QWCredential.prodSecret;
			    }else{
			    	var API       = QWCredential.sandboxAPI;
			    	var partnerid = QWCredential.sandboxKey;
			    	var secret    = QWCredential.sandboxSecret;
			    }
			    var quickWalletInput = {
			    		   "partnerid" : partnerid,
			               "mobile"    : mobileNumber,
			               "secret"    : secret,
			               "amount"    : formValues.donateAmt,
			               "redirecturl" : Meteor.absoluteUrl()+'payment-response/'+userId+'/'+id,             
			    };
			    try {
			      if (Meteor.isServer) {
			        var result = HTTP.call("POST", API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
			                               {params: quickWalletInput});
			        if(result.data.status == 'success'){
			          var paymentUrl = result.data.data.url;
			          return paymentUrl;
			        }else{
			          return false;
			        }
			      }
			    } catch (err) {
			      console.log(err)
			      // Got a network error, time-out or HTTP error in the 400 or 500 range.
			      return false;
			    }
			}
		  },
		}// id if

});