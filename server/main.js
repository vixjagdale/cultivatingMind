import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {WebApp} from 'meteor/webapp';
import { HTTP } from 'meteor/http';
import { Email } from 'meteor/email';
import {Session} from 'meteor/session';

import '/imports/systemSecurity/api/userAccounts.js';

//========== s3 ============
import '/imports/s3/api/ClientImageCall.js';
import {ProjectSettings} from '/imports/s3/api/projectSettings.js';
import {ProductImage} from '/imports/s3/api/ProductImage.js';

Meteor.startup(() => {
  // code to run on server at startup examabacus@gmail.com   abacus123
  // process.env.MAIL_URL = "smtp://examabacus:abacus123@smtp.googlemail.com:587";
  process.env.MAIL_URL='smtp://support%40maats.in:' + encodeURIComponent("maats@098") + '@smtp.gmail.com:587';
  Accounts.emailTemplates.siteName = "Abacus";
  Accounts.emailTemplates.from = 'Abacus Online Exam <support@maats.in>';
  
  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

});

Meteor.methods({
  
  'sendSMSMsg':function(firstname,toNumber,otp){

      var plivo = Plivo.RestAPI({
          authId: 'MAMZU2MWNHNGYWY2I2MZ',
            authToken: 'MWM1MDc4NzVkYzA0ZmE0NzRjMzU2ZTRkNTRjOTcz'
        });

      var params = {
        'src'  : '9923393733', // Sender's phone number with country code
        'dst'  : toNum.toString(), // Receiver's phone Number with country code
        'text' : "Dear "+firstname+','+'\n'+"To verify your account on Abacus Online System, Enter the verification code : "+otp, // Your SMS Text Message - English
        'type' : "sms",
      };
     
    },

  'userExistEmailUsername': function(username,email){
    console.log('username :',username);
    console.log('userExists : ',Meteor.users.find({'username':username}).fetch().length != 0);
    console.log('userExists : ',Meteor.users.find({'emails.0.address':email}).fetch().length != 0);
    console.log('userExists : ',Meteor.users.find({username}).fetch().length != 0 || Meteor.users.find({'emails.0.address':email}).fetch().length != 0);
    if(Meteor.users.find({username}).fetch().length != 0 || Meteor.users.find({'emails.0.address':email}).fetch().length != 0)
      return true;
      return false;
  },

  RegistrationEmail(to, from, subject, text) {
    // this.unblock();
    Email.send({to,
                from,
                subject,
                text,
                 });
  },
});  


