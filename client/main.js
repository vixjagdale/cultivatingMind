Meteor.startup(() => {
      global.Buffer = function() {}
      global.Buffer.isBuffer = () => false
});
// import { Router, Route, browserHistory } from 'react-router';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

// import {ProductImage} from '/imports/adminDashboard/products/components/ProductImage.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  // onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  // ReactDOM.render(routes, document.getElementById('app-root'));

});


import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '/imports/homepage/slideShowBlock/css/slideShowBlock.css';
import '/imports/homepage/common/css/common.css';
import '/imports/adminDashboard/dashboard/css/dashboard.css';
import '/imports/adminDashboard/products/css/products.css';
import '/imports/adminDashboard/category/css/category.css';
import '/imports/login/css/login.css';
import '/imports/contactUs/css/mymap.css';
import '/imports/homepage/contactUsBlock/css/contactUsBlock.css';
import '/imports/homepage/countersBlock/css/counters.css';
import '/imports/homepage/photoGallery/css/photoGallery.css';
import '/imports/homepage/testimonial/css/Testimonial.css';
import '/imports/homepage/contactUs/css/ContactUs.css';
import '/imports/homepage/tagLineBottom/css/tagLineBottom.css';
import '/imports/homepage/copyright/css/copyright.css';
import '/imports/homepage/latestNews/css/latestNews.css';
import '/imports/homepage/donateTopBlock/css/donateTopBlock.css';
import '/imports/homepage/ourCases/css/ourCases.css';
import '/imports/homepage/ourVolunteers/css/ourVolunteers.css';

import '/imports/homepage/makeDonation/css/makeDonation.css';
import '/imports/homepage/ourMission/css/ourMission.css';
import '/imports/homepage/events/css/events.css';
import '/imports/homepage/footer/css/footer.css';
import '/imports/adminDashboard/countersBlock/css/CountersAdmin.css';
import '/imports/adminDashboard/enquiries/css/Enquiries.css';
import '/imports/adminDashboard/blog/css/blog.css';

import '/imports/homepage/upcomingEvents/css/upcomingEvents.css';


// /*--------------------- Image add to s3 ---------------------*/

// addEventImages = function(file,self) {
//     console.log(file);
//     console.log(self);
//     uploadInstance = ProductImage.insert({
//       file: file,
//       meta: {
//         // locator : self.props.fileLocator,
//         userId  : Meteor.userId() // Optional, used to check on server for file tampering
//       },
//       streams         : 'dynamic',
//       chunkSize       : 'dynamic',
//       allowWebWorkers : true // If you see issues with uploads, change this to false
//     }, false);

//     self.setState({
//         uploading  : uploadInstance, // Keep track of this instance to use below
//         inProgress : true // Show the progress bar now
//     });

//     // These are the event functions, don't need most of them, it shows where we are in the process
//     uploadInstance.on('start', function () {
//     });

//     uploadInstance.on('end', function (error, fileObj) {
//     });

//     uploadInstance.on('uploaded',  (error, fileObj) => {
//         if(fileObj){
//             // if(productType == "ShopMode"){
//             //     Meteor.call("addShopProductImages",fileObj._id, productId);
//             // }else {
//             //     Meteor.call("addProductImages",fileObj._id, productId);
//             // }
//             // console.log("fileObj._id: ",fileObj._id);
//             // console.log("fileObj._id link: ",(fileObj._id).link());

//             Meteor.call("addProductImages",fileObj._id,(error,result)=>{
//             	if(error){
//             		console.log(error);
//             	}else{
//             		console.log("my result=> " +result);
//             	}
//             });

//             // Session.set("addNewProductImage",)
//         }

//         self.setState({
//             uploading  : [],
//             progress   : 0,
//             inProgress : false
//         });
//     });

//     uploadInstance.on('error', function (error, fileObj) {
//     });

//     uploadInstance.on('progress', function (progress, fileObj) {
//         Session.set('imageprogress',progress);
//         self.setState({
//             progress : progress
//         })
//     });

//     uploadInstance.start(); // Must manually start the uploaded

// }