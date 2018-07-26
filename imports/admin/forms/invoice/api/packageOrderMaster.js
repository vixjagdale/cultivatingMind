import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import {PackageManagementMaster} from '/imports/admin/packageManagement/api/packageManagementMaster.js';
export const PackageOrderMaster = new Mongo.Collection("packageOrderMaster");

if(Meteor.isServer){
	Meteor.publish("allPackageOrder",function(){
		return PackageOrderMaster.find({});
	});
	Meteor.publish("singleOrder",function(id){
		return PackageOrderMaster.find({"_id":id});
	});

	Meteor.methods({


		paymentGateway:function(res){

			var params = {
				'MID' : 'MEAIHL56742157893524',
				'ORDER_ID' : '1234',
				'CUST_ID':'123',
				'TXN_AMOUNT':'1',
				'CHANNEL_ID':'WEB',
				'INDUSTRY_TYPE_ID':'Retail',
				'WEBSITE':'WEBSTAGING',
				'CHECKSUMHASH':res,
				'MOBILE_NO' : '8888433075',
				'EMAIL'     : 'vikasjagdale92@gmail.com',
				'CALLBACK_URL': 'https://staging-dashboard.paytm.com/',
				'PAYMENT_MODE_ONLY':'Yes',
			}

		    try {
		      if (Meteor.isServer) {
		        var result = HTTP.call("POST", "https://securegw.paytm.in/theia/processTransaction",
		                               {params: params});



	// var ORDER_ID = '1234';
	// var CUST_ID = '123';
	// var INDUSTRY_TYPE_ID = 'Retail';
	// var CHANNEL_ID = 'WEB';
	// var TXN_AMOUNT = '1';

	// // Create an array having all required parameters for creating checksum.
	// paramList["MID"] = 'MEAIHL56742157893524';
	// paramList["ORDER_ID"] = ORDER_ID;
	// paramList["CUST_ID"] = CUST_ID;
	// paramList["INDUSTRY_TYPE_ID"] = INDUSTRY_TYPE_ID;
	// paramList["CHANNEL_ID"] = CHANNEL_ID;
	// paramList["TXN_AMOUNT"] = TXN_AMOUNT;
	// paramList["WEBSITE"] = 'WEBSTAGING';
	// paramList["CALLBACK_URL"] = "http://localhost:3000/response";
	// paramList["MOBILE_NO"] = '8888433075';
	// paramList["EMAIL"] = 'vikasjagdale92@gmail.com';2C67CBC2F9F3D172B64EF4E00CCF5A685F824226A973E4D99AEC3C57D0E2FC43

		        // var result = HTTP.call("https://securegw.paytm.in/theia/processTransaction?MID=MEAIHL56742157893524&ORDER_ID=1234&CUST_ID=123&INDUSTRY_TYPE_ID=Retail&CHANNEL_ID=WEB&TXN_AMOUNT=1&WEBSITE=WEBSTAGING&CHECKSUMHASH=2C67CBC2F9F3D172B64EF4E00CCF5A685F824226A973E4D99AEC3C57D0E2FC43");
		        // parseResult = JSON.parse(result.content);
		        // console.log("parseResult.data.status = " + parseResult.data.status);
		        // console.log('result.data.status = ' + result.data.status);
console.log('result: ',result);
		        // if(result.statusCode == 200){
		        //   // var paymentUrl = "https://test.payumoney.com/payment/op/getPaymentResponse?";
		        //   // console.log('url: ' + paymentUrl);
		          return result;
		        // }else{
		        //   return false;
		        // }
		      }
		    } catch (err) {
		      console.log(err)
		      // Got a network error, time-out or HTTP error in the 400 or 500 range.
		      return false;
		    }

		},

		'addPackages':function(packageId,_id){
			if(!_id){
				var pOMasterData = PackageOrderMaster.find({}).count();
				if(pOMasterData>0){
					var invoiceNum = pOMasterData+1;	
				}else{
					var invoiceNum = 1;
				}
					var orderId = PackageOrderMaster.insert({
						'buyerId' : Meteor.userId(),
						'status'  : 'unPaid',
						'packages' : [],
						'invoiceId' : invoiceNum,
						'createdAt' : new Date(),
					},function(err,res){
						if(err){}else if(res){}
					});
				
				if(orderId){
					var packageData = PackageManagementMaster.findOne({"_id":packageId});
					if(packageData){
					   PackageOrderMaster.update({"_id":orderId},
						{
							$push:{
								packages :{
									'packageId'   : packageData._id, 
									'packageName' : packageData.packageName,
									'category'    : packageData.categoryName,
									'subCategory' : packageData.subCategory,
									'packagePrice': packageData.PackagePrice,
									'NoOfPracticeTest': packageData.NoOfPracticeTest,

								}
							}
						});
					}
				}
				return orderId;
			}else{
				var packageData = PackageManagementMaster.findOne({"_id":packageId});
				if(packageData){

					PackageOrderMaster.update({"_id":_id},
					{
						$push:{
							packages :{
								'packageId'   : packageData._id, 
								'packageName' : packageData.packageName,
								'category'    : packageData.categoryName,
								'subCategory' : packageData.subCategory,
								'packagePrice': packageData.PackagePrice,
								'NoOfPracticeTest': packageData.NoOfPracticeTest,				

							}
						}
					});
				}
			}
		},


	});
}