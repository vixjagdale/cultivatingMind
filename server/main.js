import '/imports/adminDashboard/category/api/category.js';
import '/imports/adminDashboard/photoGallery/api/PhotoAlbum.js';
import '/imports/adminDashboard/products/api/products.js';
import '/imports/adminDashboard/testimonial/api/TestimonialAdmin.js';
import '/imports/adminDashboard/services/api/services.js';
import '/imports/adminDashboard/companySettings/api/companySettings.js';
import '/imports/adminDashboard/brands/api/brands.js';
import '/imports/adminDashboard/slideshow/api/slideshow.js';
import '/imports/adminDashboard/slideshow/api/tempLogoImage.js';
import '/imports/contactUs/api/contactUs.js';
import '/imports/homepage/ourMission/api/ourMission.js';
import '/imports/homepage/contactUs/api/GetInTouch.js';
import '/imports/login/api/userAccounts.js';
import '/imports/adminDashboard/blog/api/blogs.js';
import '/imports/adminDashboard/aboutUs/api/aboutUs.js';

// import '/imports/adminDashboard/products/api/AddInformation.js';




import './slingshot.js';
	
// import '/imports/adminDashboard/products/api/ClientImageCall.js';
// import {ProjectSettings} from '/imports/adminDashboard/products/api/projectSettings.js';

//========== s3 ============
import '/imports/s3/api/ClientImageCall.js';
import {ProjectSettings} from '/imports/s3/api/projectSettings.js';
import {ProductImage} from '/imports/s3/api/ProductImage.js';

Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://mailtovikasjagdale:25041992@smtp.sendgrid.net:587';
});

