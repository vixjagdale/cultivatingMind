import React,{Component}  from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import {PackageOrderMaster} from '/imports/admin/forms/invoice/api/packageOrderMaster.js';
// import '/imports/paymentGateway/paytm/checksum.js';
var paytm_checksum = require('/imports/paymentGateway/paytm/checksum.js');
var server = require('/imports/paymentGateway/server');
var router = require('/imports/paymentGateway/router');
// import { Invoice } from './api/Invoice.js';
// import { Order } from './api/Order.js';
// import {Services} from '../../dashboard/reactCMS/api/Services.js';
// import { UserProfile } from '../forms/api/userProfile.js';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

//create pdf 
function createPDF(){
  var outerInvoiceBlock = $('#outerInvoiceBlock'),
  cache_width = outerInvoiceBlock.width(),
  a4  =[850,  2000];  // for a4 size paper width and height
  getCanvas().then(function(canvas){
  var img = canvas.toDataURL("image/png"),
  doc = new jsPDF({
          unit:'px', 
          format:'a4'
        }); 
        var width = doc.internal.pageSize.width;  
        var height = doc.internal.pageSize.height - 300;
        doc.addImage(img, 'JPEG',0,0,width,height);
        doc.save('Invoice.pdf');
        outerInvoiceBlock.width(cache_width);
 });
}
 
// create canvas object
function getCanvas(){
  var outerInvoiceBlock = $('#outerInvoiceBlock'),
  cache_width = outerInvoiceBlock.width(),
  a4  =[850,  2000];  // for a4 size paper width and height
 // outerInvoiceBlock.width(cache_width).css('max-width','none');
 return html2canvas(outerInvoiceBlock,{
     imageTimeout:2000,
     removeContainer:true
    }); 
}
class MyInvoice extends Component{
  constructor(){
    super();
    this.state ={
      invoiceNo       : '',
      serviceId       : '',
      serviceName     : '',
      serviceRate     : '',
      serviceDuration : '',
      userName        : '',
      userId          : '',
      companyName     : '',
      companyAddress  : '',
      companyCity     : '',
      companyState    : '',
      companyCountry  : '',
      companyPincode  : '',
      id              : '', 
      date            : '',
      rate            : '', 
      invoice         : [],
      tax             : [],
      serviceArray    : [{'serviceName': 'packageData','serviceRate':200,'totalQty':222}],
      "subscription" : {
        "singleinvoice" : Meteor.subscribe("singleinvoice"),   
        "allOrders"     : Meteor.subscribe("allOrders"),
        "tempSingleinvoice" : Meteor.subscribe("tempSingleinvoice"),
        "allUserProfileData" : Meteor.subscribe("allUserProfileData"),
      }
    };
  }

  componentDidMount(){ 
      $('html, body').scrollTop(0);
  }
  cancdlinvoice(event){
    event.preventDefault();
    var path = "/ServiceRequiredData/"+this.props.invoice.serviceId+"-"+this.props.invoice.serviceName+"-"+this.props.order._id;
    // 
    browserHistory.replace(path);
  }
  confirm(event){ 
    event.preventDefault();
    // var path = "/generate_checksum";
    // browserHistory.replace(path);
// server.start(router.route);

// Meteor.call('paymentGateway',(error,result)=>{
// 	if(error){
// 		console.log('error');
// 	}else{
// 		console.log('success');
// 	}
// });


	var checkSum = "";
	var paramList = [];

	var ORDER_ID = '1234';
	var CUST_ID = '123';
	var INDUSTRY_TYPE_ID = 'Retail';
	var CHANNEL_ID = 'WEB';
	var TXN_AMOUNT = '1';

	// Create an array having all required parameters for creating checksum.
	paramList["MID"] = 'MEAIHL56742157893524';
	paramList["ORDER_ID"] = ORDER_ID;
	paramList["CUST_ID"] = CUST_ID;
	paramList["INDUSTRY_TYPE_ID"] = INDUSTRY_TYPE_ID;
	paramList["CHANNEL_ID"] = CHANNEL_ID;
	paramList["TXN_AMOUNT"] = TXN_AMOUNT;
	paramList["WEBSITE"] = 'WEBSTAGING';
	paramList["CALLBACK_URL"] = "https://securegw.paytm.in/theia/processTransaction";
	paramList["MOBILE_NO"] = '8888433075';
	paramList["EMAIL"] = 'vikasjagdale92@gmail.com';

	var checkSum = paytm_checksum.genchecksum(paramList,'IwaCFG2bhzSNT@tV', function (err, res) {
						// response.writeHead(200, {'Content-type' : 'text/json','Cache-Control': 'no-cache'});
						console.log(JSON.stringify(res));
						Meteor.call('paymentGateway',res,(error,result)=>{
							if(error){
								console.log('error');
							}else{
								console.log('result-----> ',result);
								if(result.statusCode ==200){
									swal("you are redirect to payment page");
									// browserHistory.replace('https://staging-dashboard.paytm.com/');
								}

							}
						});
						// response.end();
					});
	console.log('checkSum: ',checkSum);

  }

  formatRupees(num){
    console.log("num :"+num);
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

  totalAmount(){ 
     var totalTax = 0;
     if (this.props.invoice.data) {
      if (this.props.invoice.data.length > 0) {
        var dataLength = this.props.invoice.data.length;
      }else{
        var dataLength = 1;
      }
     }else{
        var dataLength = 1;
     }
   if (this.props.invoice.tax) {
    if (this.props.invoice.tax.length > 0) {
      var taxPrice              = parseFloat(this.props.invoice.tax[0].applicableTax);
     }else{
      var taxPrice              = 1;
     }
   }else{
      var taxPrice              = 1;
     }
    var rate                  = parseFloat(this.props.invoice.serviceRate) * parseFloat(dataLength);
    var taxAmt                = (parseFloat(taxPrice) / 100) *  parseFloat(rate);
    var totalAmount           = parseFloat(taxAmt) + parseFloat(rate);
    var totalAmt              = this.formatRupees(totalAmount);
    return totalAmt;
  }
  printDocument(event){
    event.preventDefault();
       createPDF();
  }
  taxAmt(applicableTax){
    var taxPrice = parseFloat(applicableTax);
    // var rate     = parseFloat(this.props.invoice.serviceRate) * parseFloat(this.props.invoice.data.length);
    var taxAmt   = (parseFloat(taxPrice) / 100);
    // var taxAmt   = (parseFloat(taxPrice) / 100) *  parseFloat(rate);
    return taxAmt;
  } 

  rate(){
    //  var rate = parseFloat(this.props.invoice.serviceRate) * parseFloat(this.props.invoice.data.length);
    //  return rate;
  }
  
  render(){
    if(!this.props.loading){
      if(this.props.orderMasterData){ 
      return(
      	<div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>My Invoice</h1>
          </section>
          {/* Main content */}
          <section className="content viewContent">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="box">
                  <div className="box-header with-border boxMinHeight">
		        <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-1" >
		          <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12" id="outerInvoiceBlock">
		            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
		              <div>
		                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerinvoice">
		                    <span className="col-lg-5 col-lg-offset-1 invoicetitle">INVOICE</span>
		                    <span className="col-lg-1 mailtitle"></span>
		                    <span className="col-lg-4 addresstitle"> <br /></span>
		                    <span className="col-lg-1 mailtitle downloadPdf"><i className="fa fa-file-pdf-o pull-right" title="Download as pdf" onClick={this.printDocument.bind(this)}></i></span>
		                  </div>
		                  
		                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoicebill">
		                    <div className="col-lg-3 col-lg-offset-1 col-md-2 col-md-offset-1 clientbilled">
		                      <div className="billedto date">Billed To</div>
		                      <div className="clientdetails">
		                      </div>
		                    </div>
		                    <div className="col-lg-7 col-lg-offset-1 col-md-7 col-md-offset-1 clientaddress">
		                    	<div className="col-lg-6 col-md-6 textCenterInvoice">
			                      <div className="invoicenumber date">Invoice Number <br /></div>
			                      <div className="">{this.props.orderMasterData.invoiceId}</div>
		                        </div>
		                        <div className="col-lg-6 col-md-6 textCenterInvoice">            
			                      <div className="dateofissue date">Date of Issue <br /></div>
			                      <div className="">{moment(this.props.orderMasterData.createdAt).format("DD/MM/YYYY")}</div>
		                      </div>
		                    </div>
		                    {/*<div className="col-lg-3 col-lg-offset-1 col-md-4 col-md-offset-2 invoicecount">
		                      <div className="invoicetotle">Invoice Total<br /></div>
		                      <div className=" money"><i className="fa fa-rupee"></i>{this.formatRupees(100)}</div>
		        
		                    </div>*/}

		                  </div>


		                  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 dash dashFirst"></div>

		                  <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 table1">
		                    <table>
		                      <thead className="">
		                        <tr className="tablehead1">
		                          <th className="col-lg-8 col-md-8 serviceNm">Package Name </th>
		                          <th className="col-lg-2 col-md-2 amtcount">Unit Cost </th>
		                          <th className="col-lg-2 col-md-2 invoiceQuantity">Qty </th>
		                          <th className="col-lg-3 col-md-3 amtcount">Amount </th>
		                        </tr>
		                      </thead>
		                      <tbody>
		                        {
		                          this.props.orderMasterData.packages.length > 0 ?
		                           this.props.orderMasterData.packages.map((packageData,index)=>{
		                            return(
		                              <tr key ={index} className="firstrow">
		                                <td className="col-lg-8 col-md-8">{packageData.packageName} <br />
		                                <span className="textCSN">Category: {packageData.category}, sub-Category: {packageData.subCategory} , Number of Paper: {packageData.NoOfPracticeTest}</span> 
		                              </td>
		                                <td className="col-lg-2 col-md-2 amtcount"><i className="fa fa-rupee"></i>{packageData.packagePrice}</td>
		                                <td className="col-lg-2 col-md-2 invoiceQuantity">1 </td>
		                            <td className="col-lg-2 col-md-2 invoiceQuantity">{packageData.packagePrice * 1} </td>
		                                {/* <td className="col-lg-3 col-md-3 amtcount"><i className="fa fa-rupee"></i>{this.rate()} </td> */}
		                              </tr>
		                            )
		                           })
		                         
		                          :
		                          null
		                        }
		                      </tbody>
		                    </table>
		                    {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
		                      <div className="pull-right total  text-right noPadLeftRight col-lg-6 ">
		                        <span className="subtotal text-right col-lg-7 noPadLeftRight ">Subtotal </span>
		                        
		                        <span className="subtotlecount text-right col-lg-4 noPadLeftRight "><i className="fa fa-rupee"></i>{this.formatRupees(this.props.invoice.actualTotal)}</span>
		                      </div>
		                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
		                            <div className="pull-right text-right noPadLeftRight col-lg-6">
		                              <span className="subtotal text-right col-lg-7 noPadLeftRight">Discount ({this.props.invoice.packageDetails.packageDiscount}%)</span>
		                              <span className="subtotlecount text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>{(this.props.invoice.packageDiscountValue)}</span>
		                            </div>  
		                      </div>

		                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
		                            <div className="pull-right text-right noPadLeftRight col-lg-6">
		                              <span className="subtotal text-right col-lg-7 noPadLeftRight">After Discount Value</span>
		                              <span className="subtotlecount text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>{(this.props.invoice.reducedActualAmount)}</span>
		                            </div>  
		                      </div>
		                    </div>*/}
		                    <hr className="hrhide"></hr>
		                    {/*
		                  { this.props.invoice.taxAmount.length > 0 ?
		                    this.props.invoice.taxAmount.map((tax,index) =>{
		                        return( 
		                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight" key={index}>
		                            <div className="pull-right text-right noPadLeftRight col-lg-6">
		                              <span className="subtotal text-right col-lg-7 noPadLeftRight">{tax.taxName} ({tax.taxRate}%)</span>
		                              <span className="subtotlecount text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>{(tax.calculatedAmount)}</span>
		                            </div>  
		                          </div>
		                        );
		                      })
		                     :
		                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
		                      <div className="pull-right text-right noPadLeftRight col-lg-6">
		                        <span className="subtotal  text-right col-lg-7 noPadLeftRight">Tax(0%) </span>
		                        <span className="subtotlecount  text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>0.00</span>
		                      </div>  
		                    </div>
		                  } */}
		                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
		                    <div className="pull-right text-right noPadLeftRight col-lg-6">
		                      <span className="subtotal  text-right col-lg-7 noPadLeftRight">Invoice Total </span>
		                      <span className="subtotlecount  text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>{this.props.packageTotal}</span>
		                      {/* <span className="subtotlecount  text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>{this.formatRupees(this.props.invoice.totalAmount)}</span> */}
		                    </div>  
		                  </div>
		                 </div>
		                 
		                 
		                  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 outerButtonDiv">
		                    <button type="submit" className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-left" onClick={this.cancdlinvoice.bind(this)}>Cancel</button>
		                    <button type="submit" className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-right" onClick={this.confirm.bind(this)}>Make Payment</button>
		                   </div>
		                
		                 
		              </div>
		           </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
        </div>
        </section>
        </div>

        </div>

      );
     }else{
      return(<span>Data not available</span>);
     }
    }else{
      return(<span>Loading... Please Wait</span>);
    }
  } 
}
 
export default  MyInvoiceContainer = withTracker(({params}) => {
	var orderId = params.id;
	const postHandle  = Meteor.subscribe('singleOrder',orderId);
	const loading = !postHandle.ready();
	var orderMasterData = PackageOrderMaster.findOne({"_id":orderId})||{}; 
	if(orderMasterData.packages){
			var packageTotal = orderMasterData.packages.reduce((addprice,elem)=>{
				return  addprice + elem.packagePrice;
			},0);
	}
	return{
		loading,
		orderMasterData,
		packageTotal,
	}
})(MyInvoice);
//     var id = params.id;
    
    
//     var serviceArray=[];
//     // 
//     // const postHandle  = Meteor.subscribe('singleinvoice',_id);
//     // var editServices   = this.props.params.id; 
//     const postHandle  = Meteor.subscribe('singleInvoice',id);

//     var invoice = Invoice.findOne({"_id":id});
  
//     if(invoice){
//       var serviceDetails  =  invoice.serviceDetails;
//       if(serviceDetails !=undefined){
//         serviceArray.push(serviceDetails);      
//       }else{
//         var packageServiceDetails = invoice.packageDetails.serviceDetails;
//         serviceArray=packageServiceDetails;
//       }
//     }
//     // 
//     var address = {};
//     if (invoice) {
//       var order = Order.findOne({"invoiceDetails.invoiceId": invoice._id}) || {}; 
//       // 
//       var userProfile = UserProfile.findOne({"userId" : invoice.userId}) || {};
//       // 
//       if (userProfile) {
//         if (userProfile.currentAddress) {
//           if (userProfile.currentAddress.length > 0) {
//             address = userProfile.currentAddress[userProfile.currentAddress.length - 1];
//           }else{
//             if (userProfile.permanentAddress) {
//                if (userProfile.permanentAddress.length > 0) {
//                address = userProfile.permanentAddress[userProfile.permanentAddress.length - 1];
//               }
//             }
//           }
//         }else{
//           if (userProfile.permanentAddress) {
//              if (userProfile.permanentAddress.length > 0) {
//              address = userProfile.permanentAddress[userProfile.permanentAddress.length - 1];
//             }
//           }
//         }
//       }
//     }
    
//     const loading  = !postHandle.ready();
//     console.log("invoice");
//     console.log(invoice);    
//     console.log("serviceArray");
//     console.log(serviceArray);
    
//     // if(_id){
//       return {
//           loading,
//           invoice,
//           order,
//           address,
//           serviceArray
//       };
//     // }
// })(Serviceinvoice);
// export default ServiceInvoiceContainer;