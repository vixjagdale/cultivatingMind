import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { browserHistory } from 'react-router';
import {Session} from 'meteor/session';

export default class ConfirmOtpModal extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      "subscription" : {
        user             : Meteor.subscribe("userfunction"), 
      }
    }
  }
  showWelcome(event){
    event.preventDefault();
    $('#OtpBlock').hide();
    $('#DoHaveProfile').show();
  }
  confirmOTP(event){
    event.preventDefault();
    var checkUserExist = this.props.params.mailId;
    var userData = Meteor.users.findOne({"_id":checkUserExist});
    if(userData){
      var userProfile = userData.profile;    
      if(userProfile){
        var sessionValue2 = userProfile.sentEmailOTP;

      }
    }

    if(sessionValue2){
      var mailotp = sessionValue2;
      var newID = userData._id;
      var userData = Meteor.users.findOne({"_id":newID});
      if(userData){
        var userEmail = userData.username;
        var profile = userData.profile;
        if(profile){
          if(profile.userCode){
          var password = profile.userCode.split("").reverse().join(""); 
          }
        }
      }
    }else{
      var username = $('input[name="loginusername"]').val();
      var userOtp = Meteor.users.findOne({"username":username});
      if(userOtp){
        var mailotp = userOtp.profile.sentEmailOTP;
        if(userOtp.profile.userCode){
          var usercode = userOtp.profile.userCode.split("").reverse().join("");
          var newID = userOtp._id;
        }
      }
    }
    var emailotp = this.refs.emailotp.value;
    if(mailotp == emailotp){
      Meteor.call('createUserByAdminSetEmailToTrue',newID,
      function(error,result){
        if(error){
          console.log(error.reason,"danger","growl-top-right");
        }else{
          if($('#OTPMobMail').hasClass('newPassword')){
           
          }else{
           
            if(userEmail && password){
              var email = userEmail;
              var passwordVar = password;
            }else{
              var email = username;
              var passwordVar = usercode;
            }
          }  
        }
      });

      Meteor.call('updateOTP', newID , mailotp , function(error,result){
        if(error){
          swal("error");
        }else{
          var curUrl = location.pathname;
          var urlArray = curUrl.split('/');
          var isFirstOTPurl = urlArray[1];
          if(isFirstOTPurl != 'otpFirstVarification'){
          browserHistory.replace('/resetPassword/'+newID);
          }else{
           Meteor.logout();
           swal("Account Verified Successfully",
                'Please complete your registration process by completing your profile after login. You will be not allowed for the exam with incomplete profile. ',
              'success');
           browserHistory.replace('/');
          }
        }
      });
    }else{
      swal('Email OTP is Incorrect',
            '',
            'warning');
    }
  // $('#assureIDModal').show();
  }



  inputEffect(event){
    event.preventDefault();
    // alert('hi');
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
    }else{
      $(event.target).removeClass("has-content");
    }
  }

  resendOtp(event){
    event.preventDefault();
    var checkUserExist = this.props.params.mailId;
    var userData = Meteor.users.findOne({"_id":checkUserExist});
    if(userData){
      var userProfile = userData.profile;    
      if(userProfile){
        var sessionValue2 = userProfile.sentEmailOTP;
        var mobNumber = userProfile.mobNumber;
        var firstName  = userProfile.firstname;

      }
       var emailotp = Math.floor(100000 + Math.random() * 900000);

      Meteor.call('addOTP', userData._id, emailotp, function(error,result){
        if(error){
          console.log(error);
        }else{

          Meteor.call("sendSMSMsg",firstName,mobNumber,emailotp,(error,result)=>{
            if(error){

            }else{
              swal("We have sent otp to your registered mobile number","","success");
            }
          });
        }
      });
    }else{
      swal("You are not registered","","warning");
    }

  }

  render(){
    if(location.pathname=='/forgotOTPVarification/'+this.props.params.mailId){
       var mobileEmail = 'Email Id';
       var resendOtp ='';
    }else{
       var mobileEmail = 'Mobile Number';
       var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;
    }
    var winHeight = $(window).height();
    var divHeight = winHeight+'px';
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 signUpLeftWrap" style={{"height": divHeight}}>
          <img src="/images/signUpBanner.gif" className="signUpBanner col-lg-9 col-md-9"/>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signUpRighttWrap" style={{"height": divHeight}}>
        </div>
        <div className="col-lg-4 col-lg-offset-7 col-md-5 col-md-offset-6 col-xs-4 col-sm-5 col-sm-offset-6 confirmModalFormWrap">
          <div className="col-lg-4">

          </div>
          <div className="col-lg-12">
            <div className="col-lg-12 col-md-12 OEXLogoWrap">
              <img src="/images/maatslogo.png" className="signUpBanner col-lg-offset-2 col-lg-8 col-md-8 col-md-offset-2"/>
            </div>
          </div>
          <div className="OESSubTitle2 OESSubTitleee">Abacus Online Exam System</div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                  <span>We have sent you a Verification Code to your registered <b>{mobileEmail}</b>.<br/>
                  Enter six digit verification code below.</span>
                </div>
                <form id="OTPMobMail" onSubmit={this.confirmOTP.bind(this)}>
                  <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <div className="input-effect input-group">
                  
                      <input type="text" className="effect-21 form-control loginInputs" ref="emailotp" name="emailotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="^[0-9]*$" required/>
                       <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                      <span className="focus-border">
                        <i></i>
                      </span>
                    </div>
                  </div>
                  <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button type="submit" className="btn btn-info submitBtn col-lg-12 col-md-12 col-sm-12 col-xs-12 UMloginbutton">Submit</button>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8">
                    <Link to="/" className="UMGrey"><i className="fa fa-undo" aria-hidden="true"></i> Click here to Login</Link>  
                  </div>
                   <div className="col-lg-5 col-md-5 col-sm-8 col-xs-8 resendOtpWrap">
                    {resendOtp}
                   </div>
                </form>
              </div>
          </div>
      </div>
    );
  }
}