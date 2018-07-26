import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { browserHistory } from 'react-router';
import InputMask from 'react-input-mask';

export default class VerifyMobileAOS extends React.Component{
  constructor(){
    super();
    this.state ={
      "subscription" : {
        user             : Meteor.subscribe("userfunction"), 
      }
    }
  }

  VerifyMobileAOS(event){
    event.preventDefault();
    var mobileVerifyAOS = this.refs.mobileVerifyAOS.value;
     Meteor.call('addVerifyOTP', mobileVerifyAOS, function(error,result){
        if(error){
          swal(error);
        }else{
          var result = result;
          if(result =="alreadyVerified"){
            swal("Your account already verified","","warning");
            browserHistory.replace("/");
          }else if(result != "MobNumNotExists"){
            if(result){
              var profileData = result.profile;
              var userId = result._id;
              var emailotp = Math.floor(100000 + Math.random() * 900000);
               Meteor.call('addOTP', userId , emailotp, function(error,result){
                      if(error){
                        console.log(error);
                      }else{
                        
                        browserHistory.replace('/otpFirstVarification/'+userId);
                      Meteor.call("sendSMSMsg",profileData.firstname,mobileVerifyAOS,emailotp); //Send otp through sms
                    }
              });
              }
            }else{
              swal("Wrong Mobile Number" ,"Enter mobile number that you used for creating Account","warning");
            }
        
        }
      });
  }


  inputEffect(event){
    event.preventDefault();
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
    }else{
      $(event.target).removeClass("has-content");
    }
  }

  render(){
    var winHeight = $(window).height();
    var divHeight = winHeight+'px';
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 signUpLeftWrap" style={{"height": divHeight}}>
          <img src="/images/signUpBanner.gif" className="signUpBanner col-lg-9 col-md-9"/>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signUpRighttWrap" style={{"height": divHeight}}>
        </div>
        <div className="col-lg-4 col-lg-offset-7 col-md-5 col-md-offset-6 col-xs-4 col-sm-5 col-sm-offset-6 forgetpassFormWrap emailVerifyPage">
          <div className="col-lg-4">

          </div>
          <div className="col-lg-12">
            <div className="col-lg-12 col-md-12 OEXLogoWrap">
              <img src="/images/maatslogo.png" className="oesLogoImg col-lg-offset-2 col-lg-8 col-md-8 col-md-offset-2"/>
            </div>
          </div>
          <div className="OESSubTitle2">Abacus Online Exam System</div>
          <h3 className="signInNameTitle"> Verify Account</h3>
            <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                <span>Enter Mobile Number that you used for creating Account </span>
            </div>
            <form id="OTPMobMail" onSubmit={this.VerifyMobileAOS.bind(this)}>
              <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="input-effect input-group">
                  
                  {/*<input type="email" className="effect-21 form-control loginInputs" ref="emailVerifyTMS" name="emailVerifyTMS" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter Email id!"  required/>*/}
                  <InputMask mask="9999-999-999" maskChar=" " name="mobileVerifyAOS" ref="mobileVerifyAOS" onChange={this.handleChange} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText"  pattern="^(0|[0-9-+]*)$" title="Enter Mobile Numbers!" autoComplete="off" required/>
                   <span className="input-group-addon glyphi-custommm"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button type="submit" className="btn btn-info submitBtn col-lg-12 col-md-12 col-sm-12 col-xs-12 UMloginbutton">Submit</button>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <Link to="/" className="UMGrey"><i className="fa fa-undo" aria-hidden="true"></i> Click here to Login</Link>  
              </div>
            </form>
        </div>
    </div>
    );
  }
}