import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';


if (Meteor.isServer) {

  Meteor.publish('userfunction', function(){
      // this.unblock();
      return Meteor.users.find({});
  });

  Meteor.publish('allActiveUsers', function(){
      // this.unblock();
      return Meteor.users.find({"profile.status" : "Active"});
  });

  Meteor.publish('currentUserfunction', function(){
      // this.unblock();
      return Meteor.users.find({"_id":this.userId});
  });

  Meteor.publish('userData', function(id){
      return Meteor.users.find({ '_id' : id });
  });

  Meteor.publish('clientUserData', function(){
      return Meteor.users.find({"roles": "user"});
  });

  Meteor.publish('rolefunction', function(){
      // this.unblock();
      return Meteor.roles.find({"name":{ $nin: ["superAdmin"] } });
  });

  Meteor.publish("users-count",function(){
    Counts.publish(this,"users-count",Meteor.users.find({}));
  });

  Meteor.publish('userRole', function(id){
      // this.unblock();
      return Meteor.roles.find({"_id":id});
  });

  Meteor.publish("adminData",function(){
    // console.log(Meteor.users.findOne({'roles':'admin'}));
    return Meteor.users.find({'roles':'admin'});
  });

  Meteor.publish('allEmails',function(){
  // you should restrict this publication to only be available to admin users
  return Meteor.users.find({},{fields: { emails: 1 }});
  });

}


if (Meteor.isServer) {
Meteor.methods({

  'UpdateCurrentLocation' : function(address, latitude, longitude){
    Meteor.users.update({'_id':Meteor.userId()},{$set:{"profile.location": address,'profile.lat': latitude, 'profile.lng': longitude}});
    var recordPresent = UserCurrentLocation.findOne({'userId':Meteor.userId()});
    if(recordPresent){
      UserCurrentLocation.update({'userId':Meteor.userId()},{$set:{"location": address,'lat': latitude, 'lng': longitude}});
    }else{
      UserCurrentLocation.insert({ 'userId'   : Meteor.userId(), 
                                   "location" : address,
                                   'lat'      : latitude, 
                                   'lng'      : longitude
                                 });
    }
    
  },

  'userCreateAccount' : function(formValues) {
    var URL   = Meteor.absoluteUrl();
    newUserId = Accounts.createUser({
                                username    : formValues.signupEmail,
                                email       : formValues.signupEmail,
                                password    : formValues.signupPassword,
                                profile     : {   
                                          firstname     : formValues.firstname,
                                          lastname      : formValues.lastname,
                                          mobNumber     : formValues.mobNumber,
                                          sentOTP       : "",
                                          receivedOTP   : "",
                                          userProfile   : URL+'../images/userIcon.png',
                                          vehicles      : [],
                                          status        : 'Blocked',
                                          profileInsert : true,
                                          dwollaLocation : '',
                                          dwollaBankLocation : '',
                                          bankVerifiedStatus : 'Unverified',
                                          userRole      : formValues.signupPassword.split('').reverse().join(''),
                                          createdOn     : new Date(),
                                          "trackUser" : false,
                                        }
                                    });
    return newUserId;
  },

  'startTrackUser' : function(userId) {
    Meteor.users.update(
        {'_id': userId },
        {
          $set:{
            "profile.trackUser" :  true,
        } //End of set
      });
  },

  'stopTrackUser' : function(userId) {
    Meteor.users.update(
        {'_id': userId },
        {
          $set:{
            "profile.trackUser" :  false,
        } //End of set
      });
  },

  'userStatusCheck' : function(email){
    var userFound = Meteor.users.findOne({username : email});
    if(userFound){
      var verificationStatus = userFound.emails[0].verified;
      console.log('verificationStatus: ',verificationStatus);
      if(verificationStatus != true){
        Meteor.users.remove({username : email});
      }
      return verificationStatus;
    }
  },

  'addOTP' : function(newID,otp) {
    Meteor.users.update(
        {'_id': newID },
        {
          $set:{
            "profile.sentOTP" :  otp,
        } //End of set
      }
      );
  },

  'flushUserRole' : function() {
    Meteor.users.update(
        {'_id': Meteor.userId() },
        {
          $set:{
            "profile.userRole" :  "",
        } //End of set
      }
      );
  },

  'updateOTP' : function(newID,otp) {
    Meteor.users.update(
        {'_id': newID },
        {
          $set:{
            "profile.receivedOTP" :  otp,
            "profile.status"      : 'Active',
        } //End of set
      }
      );
  },


  'userMobileNumberExist' : function(mobNumber) {
    // console.log('userMobileNumberExist mobNumber:',mobNumber);
    var userFound = Meteor.users.findOne({ 'profile.mobNumber' : mobNumber });
    // console.log("userFound: ",userFound);
    if(userFound && userFound.emails[0].verified === true){
      return true;
    }else if(userFound && userFound.emails[0].verified === false){
      Meteor.users.remove({ 'profile.mobNumber' : mobNumber });
      return false;
    }else{
      return false;
    }
  },

  'sendVerificationLinkToUser' : function(newID) {
    
     this.unblock();
     // console.log('sendVerificationLink'+ newID);
     let userId = newID;
    // console.log('sendVerificationLink userId :' + userId);

    if ( userId ) {
      var user = Meteor.users.findOne({'_id' : userId});
      if(user){
        // console.log(user._id);
        return Accounts.sendVerificationEmail( userId ,user.emails[0].address);
      }   
    }else{
      throw new Meteor.Error(402, 'no user login');
    }
  },


  'createUserByAdminSetEmailToTrue' : function(newID) {
      Meteor.users.update(
        {'_id': newID },
        {
          $set:{
              "emails.0.verified" : true,
              "profile.status"    : 'Active',
        } //End of set
      }
      ); //end of update
  },

  'createUserByAdmin' : function(formValues) {
    // console.log(formValues.email);
    var users = Meteor.users.findOne({'emails.0.address' : formValues.email});
    // console.log(users);
    if(users){
      // console.log( "Email Address already taken");
      return 'emailIdExist';
    }else{
      // console.log('in else');
      var newUser = Accounts.createUser(formValues);
      return newUser;
    }
     
  },

  checkEmailVerification: function(email) {
    found_user = Meteor.users.findOne({ 'emails.address' : email })
    if(found_user){
        if(found_user.emails[0].verified == true){
            return "verified";
        }else{
            return "unverified";
        }
    }else{
        return "notfound";
    }
  },

  checkBlockedUser: function(email) {
    found_user = Meteor.users.findOne({ 'emails.address' : email })
    if(found_user){
        if(found_user.profile.status == "Active"){
            return "Active";
        }else{
            return "Blocked";
        }
    }else{
        return "notfound";
    }
  },

  checkcurrentPassword: function(digest, urlUID) {
    check(digest, String);

    if (urlUID) {
      var user = Meteor.user();
      var password = {digest: digest, algorithm: 'sha-256'};
      var result = Accounts._checkPassword(user, password);
      return result.error == null;
    } else {
      return false;
    }
  },

  currentPassword: function(digest) {
    check(digest, String);
      var user = Meteor.user();
      var password = {digest: digest, algorithm: 'sha-256'};
      var result = Accounts._checkPassword(user, password);
      return result.error == null;
  },


  updateUserByAdmin: function (urlUID, doc , passwordVar1) {
      Meteor.users.update(
        {'_id': urlUID },
        {
          $set:{
              "emails.0.address"            : doc.emailVar1,
              "profile.firstName"           : doc.firstNameVar1 ,
              "username"                    : doc.userNameVar1,
              "profile.signGender"          : doc.signGenderVar1,
              "profile.homeAdd"             : doc.homeAddVar1,
              "profile.city"                : doc.cityVar1,
              "profile.state"               : doc.stateVar1,
              "profile.zip"                 : doc.zipVar1,
              "profile.country"             : doc.countryVar1, 
              "profile.mobNumber"           : doc.mobNumberVar1,
              "profile.alterNumber"         : doc.alterNumberVar1,
              "profile.salutation"          : doc.salutationVar1,
              "profile.lastName"            : doc.lastNameVar1,
              "profile.displayPicture"      :  doc.displayPicture1,
              "profile.status"              :  'Active',
              "profile.createdOn"           :  new Date(),
              "driverAddressOne"            : "",
              "driverAddressTwo"            : "",
              "driverAddressCity"           : "",
              "driverAddressState"          : "",
              "driverAddressZip"            : "",
              "driverLicenseNumber"         : "",
              "driverLicenseState"          : "",
              "driverLicenseNumberExpiryMM" : "",
              "driverLicenseNumberExpiryYY" : "",
              "driverAutoInsuranceIssueBy"  : "",
              "driverAutoInsurancePolicy"   : "",
              "driverAutoInsuranceExpiryMM" : "",
              "driverAutoInsuranceExpiryYY" : "",

        } //End of set
      }
      );

    Accounts.setPassword(urlUID, passwordVar1);
  },

  updateUserByUser: function (urlUID, doc , userFormValues) {
      Meteor.users.update(
        {'_id': urlUID },
        {
          $set:{
              "emails.0.address" : doc.emailVar1,
              "profile.firstName": doc.firstNameVar1 ,
              "profile.userName": doc.userNameVar1,
              "profile.signGender": doc.signGenderVar1,
              "profile.homeAdd": doc.homeAddVar1,
              "profile.city": doc.cityVar1,
              "profile.state": doc.stateVar1,
              "profile.zip": doc.zipVar1,
              "profile.country"               : doc.countryVar1, 
              "profile.mobNumber"             : doc.mobNumberVar1,
              "profile.alterNumber"           : doc.alterNumberVar1,
              "profile.salutation"            : doc.salutationVar1,
              "profile.lastName"              : doc.lastNameVar1,
              "profile.displayPicture"        :  doc.displayPicture1,
              "profile.signupConfirmPassword" :  userFormValues.signupConfirmPasswordVar1,
                      "profile.status"        :  'Active',
                      "profile.createdOn"     :  new Date(),

        } //End of set
      }
      );

    Accounts.setPassword(urlUID, userFormValues.passwordVar1);
  },

  updaterole: function (roleId, roleName) {
    // console.log(roleId);
    // console.log(roleName);
      Meteor.roles.update({'_id': roleId },
                          {
                            $set:{
                                    "name": roleName,
                          } //End of set
                        });
  },

  addrole: function (roleName) {
      Roles.createRole(roleName);
  },

  deleteUser: function(userId){
        Meteor.users.remove({'_id': userId});
  },

  changeStatus: function(userId, status){
    // console.log('status:',status);
    if(status == 'Blocked'){
      Meteor.users.update({'_id':userId}, {$set : { "services.resume.loginTokens" : [] }});
    }
    Meteor.users.update({'_id': userId},{$set:{'profile.status':status}});
  },

  deleteRole: function(roleID){
    // Roles.deleteRole('super-admin');
    Meteor.roles.remove({'_id': roleID});
  },

    addRoles: function(newID , defaultRoleconfig){
    // console.log('addRoles'+ newID);
    Roles.addUsersToRoles(newID, defaultRoleconfig);

  },

    'addRoleToUser': function(role, checkedUsersList){
    // console.log('role : ' + role);
    var addRoles = [role];
    // console.log(checkedUsersList.length);
    for (var i=0; i<checkedUsersList.length; i++) {
      // console.log(checkedUsersList[i]);
      var userId = checkedUsersList[i];
      if(role == 'admin'){
          Roles.removeUsersFromRoles(userId, 'user');
      }
      if(checkedUsersList[i] != null){
        Roles.addUsersToRoles(userId, addRoles);
      }
      
    }
  },

    removeRoleFromUser: function(role, checkedUsersList){
    var rmRoles = [role];
    for (var i=0; i<checkedUsersList.length; i++) {
      Roles.removeUsersFromRoles(checkedUsersList[i], rmRoles);
    }

  },

    blockSelectedUser: function(checkedUsersList){
    // console.log('Serverside-Checked checkboxes:'+ array);
    for (var i=0; i<checkedUsersList.length; i++) {
        // console.log('value: ' + checkedUsersList[i]);

      Meteor.users.update(
        {'_id': checkedUsersList[i] },
        {
          $set:{
              "profile.status": 'Blocked' ,
        } //End of set
      }
      ); //end of update

      Meteor.users.update({'_id': checkedUsersList[i]}, {$set: {"services.resume.loginTokens": []}});

    } //End of for loop

  }, //end of blockuser function

    activeSelectedUser: function(checkedUsersList){
    // console.log('Serverside-Checked checkboxes:'+ array);
    for (var i=0; i<checkedUsersList.length; i++) {
        // console.log('value: ' + checkedUsersList[i]);

      Meteor.users.update(
        {'_id': checkedUsersList[i] },
        {
          $set:{
              "profile.status": 'Active' ,
        } //End of set
      }
      ); //end of update
    } //End of for loop

  }, //end of Active function

    deleteSelectedUser: function(checkedUsersList){
    // console.log('Serverside-Checked checkboxes:'+ array);
    var blockedUserList = '';
    for (var i=0; i<checkedUsersList.length; i++) {
        // console.log('value: ' + array[i]);
      var feedBackCount = FeedBackRating.find({userId: checkedUsersList[i] }).count();
      var spaceCount    = SpaceDetails.find({owner: checkedUsersList[i] }).count();
      var ordersCount   = PaymentOrders.find({ $or: [ { clientId: checkedUsersList[i] }, { ownerId: checkedUsersList[i] } ] }).count();
      // console.log('ordersCount: ',ordersCount);
      // console.log('spaceCount: ',spaceCount);
      // console.log('feedBackCount: ',feedBackCount);
      // console.log('------------');
      var allCount = parseInt(ordersCount) + parseInt(spaceCount) + parseInt(feedBackCount);
      var user = Meteor.users.findOne({'_id': checkedUsersList[i]});
      if( allCount > 0 && user){

          blockedUserList += user.profile.firstname+' '+user.profile.lastname+'\n';
          Meteor.users.update({'_id': checkedUsersList[i]},{ $set: {'profile.status' : 'Blocked'}  });
          Meteor.users.update({'_id': checkedUsersList[i]}, {$set: {"services.resume.loginTokens": []}});

      }else{
        Meteor.users.remove({'_id': checkedUsersList[i]}); //end of update
      }
    } //End of for loop

    return blockedUserList;
  }, //end of Deleteuser function


  sendEmail1: function (to , from, subject ,body) {

    check([to, from, subject, body], [String]);
    // console.log('to : '+ to);
    // console.log('from : ' + from);
    // console.log('subject : ' + subject);
    // console.log('body : ' + body);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: body
    });
  }, //End of Send Email Function

  // sendtestemail: function () {
  //   this.unblock();
  //   Email.send({
  //     to: 'rashmimhatre100@gmail.com',
  //     from: 'no-reply@spotyl.com',
  //     subject: 'test',
  //     html: 'hi there.'
  //   });
  // }, //End of Send Email Function

  'sendEmailnNotification': function (to , frm, subject ,body) {
    this.unblock();
    console.log('sendEmailnNotification');
    Email.send({
      to: to,
      from: frm,
      subject: subject,
      html: body
    });
  }, //End of Send Email Function

  'resetPasswordUsingotp': function(id, password){
    Accounts.setPassword(id, password);
  }


});

  Meteor.startup(() => {
      // console.log(Meteor.users.findOne({username : 'superAdmin'}));
      if ( !Meteor.users.findOne({username : 'superAdmin'})) {
      
        let superUserId = Accounts.createUser({
                  username : 'superAdmin',
                  email    : 'superAdmin@cultivatingmind.com',
                  password : 'superAdmin',
                  profile  : { 'status' : 'Active'},
              });

        if(superUserId){
          Roles.addUsersToRoles(superUserId, "superAdmin");

          Meteor.call('createUserByAdminSetEmailToTrue', superUserId,
                      function(error, result) { 
                          if (error) {
                              console.log ( error ); 
                          } //info about what went wrong 
                          else {
                              console.log ( "Admin email verified by default");
                          }//the _id of new object if successful
                      });      
        }

      } // Create super admin
      
    process.env.MAIL_URL = "smtp://rashmimhatre1000@gmail.com:rashmimhatre1000@smtp.googlemail.com:587";

    Accounts.emailTemplates.siteName = "Cultivating Mind";
    Accounts.emailTemplates.from = 'Cultivating Mind Admin <services@cultivatingmind.com>';

    Accounts.urls.resetPassword = function(token) {
      return Meteor.absoluteUrl('reset-password/' + token);
    }

    // Configures "verify email" email link
    Accounts.urls.verifyEmail = function(token){
        return Meteor.absoluteUrl("verify-email/" + token);
    };

    // Welcome and Email Verification

    Accounts.emailTemplates.verifyEmail.subject = function(user) {
      return 'Verify Account with Cultivating Mind';
    };

    Accounts.emailTemplates.verifyEmail.html = function(user, url) {
      return 'Hello,<br><br>Thank You for Signing up on Cultivating Mind. Please verify your email address to continue the app use.<br><br>To verify your account email, simply click the link below:<br>'+'\n' + url + '<br><br>Regards,<br>Team Cultivating Mind';
    };

  });
}