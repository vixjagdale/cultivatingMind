import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import {TempImage} from '/imports/s3/api/ClientImageCall.js';


if (Meteor.isServer) {
  // Meteor.publish('signUpConfig', function() {
  //     this.unblock();
  //     return CheckedField.find({});
  // });

  Meteor.publish('userfunction', function(){
      // this.unblock();
      return Meteor.users.find({});
  });

  Meteor.publish('currentUserfunction', function(){
      // this.unblock();
      return Meteor.users.find({"_id":this.userId});
  });

  Meteor.publish('userData', function(id){
      return Meteor.users.find({ '_id' : id });
  });

  Meteor.publish('spaceOwnerUserData', function(){
      return Meteor.users.find({"roles": "spaceOwner"});
  });

  Meteor.publish('clientUserData', function(){
      return Meteor.users.find({"roles": "user"});
  });

  Meteor.publish('rolefunction', function(){
      // this.unblock();
      return Meteor.roles.find({});
  });

  Meteor.publish("usersCount",function(){
    Counts.publish(this,"usersCount", Meteor.users.find({}));
  });

  Meteor.publish('userRole', function(id){
      return Meteor.roles.find({"_id":id});
  });

}

Meteor.methods({
  'uploadUserProfile' : function(imgId) {
     var profileObj = TempImage.findOne({'userId':Meteor.userId()});
      if(profileObj){
        var imgLink = profileObj.imagePath;
        // console.log("imgLink----> ",imgLink);
        TempImage.remove({'userId':Meteor.userId()});
        Meteor.users.update(
          { '_id': Meteor.userId() },
          {
            $set:{
                "profile.userProfile"   : imgLink,
          } //End of set
        });        
      }
  },


  'uploadUserProfileByAdmin' : function(imgId,userId) {
      var profileObj = TempImage.findOne({'userId':Meteor.userId()});
      if(profileObj){
        var imgLink = profileObj.imagePath;
        // console.log("imgLink----> ",imgLink);
        TempImage.remove({'userId':Meteor.userId()});
        Meteor.users.update(
          { '_id': userId },
          {
            $set:{
                "profile.userProfile"   : imgLink,
          } //End of set
        });        
      }
  },

  'editMyProfileData' : function(formValues,id) {

      var userFound = Meteor.users.findOne({'_id': id});
      if(userFound){

            Meteor.users.update(
              { '_id': id },
              {
                $set:{
                    "profile.firstname"     : formValues.firstname,
                    "profile.lastname"      : formValues.lastname,
                    "profile.mobNumber"     : formValues.mobNumber,
              } //End of set
            }
            );            

      }


  },
  'userCreateAccount' : function(formValues) {
    newUserId = Accounts.createUser({
                                username    : formValues.signupEmail,
                                email       : formValues.signupEmail,
                                password    : formValues.signupPassword,
                                profile     : {   
                                          firstname     : formValues.firstname,
                                          lastname      : formValues.lastname,
                                          fullName      : formValues.firstname+' '+formValues.lastname,
                                          emailId       : formValues.signupEmail,
                                          mobNumber     : formValues.mobNumber,
                                          status        : 'Active',
                                          company       : formValues.company,
                                          companyId     : formValues.companyId,
                                          createdOn     : new Date(),
                                          userCode      : formValues.signupPassword.split("").reverse().join(""),
                                        }
                                    });
    if(newUserId){
     Meteor.call("addRoles",newUserId,"Student");
    }
      //   Meteor.users.update(
      //   {'_id': newUserId },
      //   {
      //     $set:{
      //         "emails.0.verified" : true,
      //   } //End of set
      // }
      // ); //end of update

    return newUserId;
  },

  'userCreateAccountByAdmin' : function(formValues) {
    newUserId = Accounts.createUser({
                                username    : formValues.signupEmail,
                                email       : formValues.signupEmail,
                                password    : formValues.signupPassword,
                                profile     : {   
                                          firstname     : formValues.firstname,
                                          lastname      : formValues.lastname,
                                          fullName      : formValues.firstname+' '+formValues.lastname,
                                          emailId       : formValues.signupEmail,
                                          mobNumber     : formValues.mobNumber,
                                          status        : 'Active',
                                          company       : formValues.company,
                                          companyId     : formValues.companyId,
                                          createdOn     : new Date(),
                                          userCode      : formValues.signupPassword.split("").reverse().join(""),
                                        }
                                    });
    


        Meteor.users.update(
        {'_id': newUserId },
        {
          $set:{
              "emails.0.verified" : true,
        } //End of set
      }
      ); //end of update
    return newUserId;
  },

//add otp
  
  'addOTP' : function(newID,emailotp) {
    // console.log("emailotp-------",emailotp);
   var result=  Meteor.users.update(
      {'_id': newID },
      {
        $set:{
          "profile.sentEmailOTP"  :  emailotp,
        } //End of set
      },function(error,result){
        if(error){

        }else if(result){

        }
      }
    );
    return result;
  },

  //add otp when verify email from login page
  
  'addVerifyOTP' : function(mobileNum) {
    var id = Meteor.users.findOne({'profile.mobNumber': mobileNum });
    if(id){
      if(id.emails[0].verified== true){
        return 'alreadyVerified';
      }else{
        return id;
      }
    }else{
      return "MobNumNotExists";
    }

      
  },



// update otp

  'updateOTP' : function(newID,mailotp) {
    var newUserId = Meteor.users.update(
      {'_id': newID },
      {
        $set:{
          // "profile.sentMobileOTP"        :  0,
          "profile.sentEmailOTP"         :  0,
          // "profile.receivedMobileOTP"    :  mobotp,
          "profile.receivedEmailOTP"     :  mailotp,
          "profile.status"               : 'Active',
        } //End of set
      }
    );

    Meteor.users.update(
        {'_id': newUserId },
        {
          $set:{
              "emails.0.verified" : true,
        } //End of set
      }
      ); //end of update
    return newUserId;
  },


// Update Company name, New Company to Admin Actual Company name

  'UpdateComapnyName':function(id,companyId,companyName){
      Meteor.users.update({"_id":id},{
        $set:{
          'profile.company': companyName,
          'profile.companyId': companyId,
        }
      })
  },
  

  // 'sendVerificationLinkToUser' : function(newID) {
    
  //    this.unblock();
  //    // console.log('sendVerificationLink'+ newID);
  //    let userId = newID;
  //   // console.log('sendVerificationLink userId :' + userId);

  //   if ( userId ) {
  //     var user = Meteor.users.findOne({'_id' : userId});
  //     if(user){
  //       // console.log(user._id);
  //       return Accounts.sendVerificationEmail( userId ,user.emails[0].address);
  //     }   
  //   }else{
  //     throw new Meteor.Error(402, 'no user login');
  //   }
  // },


  'sendVerificationLinkToUser' : function(emailId) {
   
     this.unblock();
     // let userId = newID;
     let userId = emailId;
    if ( userId ) {
      var user = Meteor.users.findOne({'profile.emailId' : userId});
      if(user){
        var myUserId = user._id;
        // console.log("myUserId",myUserId);
        // console.log("Email send successfully");
        return Accounts.sendVerificationEmail( myUserId ,user.emails[0].address);
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


  updateUserByAdmin: function (urlUID, doc , passwordVar1) {
      Meteor.users.update(
        {'_id': urlUID },
        {
          $set:{
              "emails.0.address"     : doc.emailVar1,
              "profile.firstName"    : doc.firstNameVar1 ,
              "username"             : doc.userNameVar1,
              "profile.signGender"   : doc.signGenderVar1,
              "profile.homeAdd"      : doc.homeAddVar1,
              "profile.city"         : doc.cityVar1,
              "profile.state"        : doc.stateVar1,
              "profile.zip"          : doc.zipVar1,
              "profile.country"      : doc.countryVar1, 
              "profile.mobNumber"    : doc.mobNumberVar1,
              "profile.alterNumber"  : doc.alterNumberVar1,
              "profile.salutation"   : doc.salutationVar1,
              "profile.lastName"     : doc.lastNameVar1,
              "profile.displayPicture":  doc.displayPicture1,
              "profile.status"       :  'Active',
              "profile.createdOn"    :  new Date(),

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
              "profile.country": doc.countryVar1, 
              "profile.mobNumber": doc.mobNumberVar1,
              "profile.alterNumber": doc.alterNumberVar1,
              "profile.salutation": doc.salutationVar1,
              "profile.lastName": doc.lastNameVar1,
              "profile.displayPicture":  doc.displayPicture1,
              "profile.signupConfirmPassword":  userFormValues.signupConfirmPasswordVar1,
              "profile.status"      :  'Active',
              "profile.createdOn" :  new Date(),

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
    for (var i=0; i<checkedUsersList.length; i++) {
        // console.log('value: ' + array[i]);
      Meteor.users.remove({'_id': checkedUsersList[i]}); //end of update
    } //End of for loop

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
      text: body
    });
  }, //End of Send Email Function

  'sendEmailnNotification': function (to , from, subject ,body) {
      Email.send({
        to: to,
        from: from,
        subject: subject,
        html: body
      });
  }, //End of Send Email Function

  'resetPasswordUsingotp': function(id, password){
    Accounts.setPassword(id, password);
  },
   'changeUserPassword' : function(password) {
       Accounts.setPassword(Meteor.userId(), password);
    },

});

Meteor.startup(() => {
  
    if ( !Meteor.users.findOne({username : 'superAdmin'})) {
    
    superUserId = Accounts.createUser({
              username : 'superAdmin',
              email    : 'superAdmin@gmail.com',
              password : 'superAdmin',
              profile  : { 'status' : 'Active','vehicles':[] },
          });

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
    } // Create super admin
    
  // process.env.MAIL_URL = "smtp://iassureit:1$hriKrishna1@smtp.googlemail.com:587";

  // Accounts.emailTemplates.siteName = "Abacus Online Exam System";
  // Accounts.emailTemplates.from = 'Abacus Online Exam System Admin <Abacus@gmail.com>';

  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  }

  // Configures "verify email" email link
  Accounts.urls.verifyEmail = function(token){
      return Meteor.absoluteUrl("verify-email/" + token);
  };

  // Welcome and Email Verification

  // Accounts.emailTemplates.verifyEmail.subject = function(user) {
  //   return 'Verify Account with TMS';
  // };

  // Accounts.emailTemplates.verifyEmail.html = function(user, url) {
  //   return 'Hello,<br><br>Thank You for Signing up on TMS. Please verify your email address to continue the app use.<br><br>To verify your account email, simply click the link below:<br>'+'\n' + url + '<br><br>Regards,<br>Team TMS';
    
  // };

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Verify Account with Abacus Online Exam System';
  };

  Accounts.emailTemplates.verifyEmail.html = function(user, url) {
    return 'Hello,<br><br>Thank You for Signing up on Abacus Online Exam System. Please verify your email address to continue the site use.<br><br>To verify your account, enter the <b>verification code : '+ user.profile.sentEmailOTP + ' </b><br><br>Regards,<br>Team, <br> Online Exam System';
  };


  // Accounts.emailTemplates.verifyEmail.html = function (user, url) {
  //   // return html string
  //   return Handlebars.templates.verifyEmail_html({
  //     emailAddress: user.email(),
  //     url: url,
  //   });
  // };

});