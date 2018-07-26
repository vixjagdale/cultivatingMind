import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { browserHistory } from 'react-router';

export default class NewResetPassword extends React.Component{
  constructor(){
    super();
    this.state ={
      "subscription" : {
        user             : Meteor.subscribe("userfunction"), 
      }
    }
  }
  'changepassword'(event) {
    event.preventDefault();
    var password        = this.refs.resetPassword.value;
    var passwordConfirm = this.refs.resetPasswordConfirm.value;
    // var newID = Session.get('newID');
    var newID = this.props.params.id;
    if(newID){
      var resetPassword = newID;
    }else{
      var username = $('input[name="forgotEmail"]').val();
      var userOtp = Meteor.users.findOne({"username":username});
      if(userOtp){
        var resetPassword = userOtp._id;
      }
    }
    // console.log(resetPassword + password + passwordConfirm);

    //Check password is at least 6 chars long
    var isValidPassword = function(password, passwordConfirm) {
      if (password === passwordConfirm) {
        return password.length >= 6 ? true : swal({
          title: "Password should be at least 6 Characters Long",
          text: "Please try again",
          timer: 1700,
          showConfirmButton: false,
          type: "error"
        });
      }else{
        return swal({
          title: "Password doesn't Match",
          text: 'Please try Again',
          showConfirmButton: true,
          type: 'error'
        }); //End of error swal
      } //End of else
    }

    if (isValidPassword(password, passwordConfirm)) {
      Meteor.call("resetPasswordUsingotp", resetPassword, password, function(err) {
        if (err) {
          console.log('We are sorry but something went Wrong.');
        }else {
          Meteor.logout();
          // FlowRouter.go('/userlogin');
          // $('.resetModalClose').click();
          // $('#ResetBlock').hide();
          // $('#outerLoginWrapper').show();
          Meteor.logout();
          browserHistory.replace('/');
          swal("Password has been Changed Successfully!!");
        }
      });
    }
    return false;
  }

  render(){
     var winHeight = $(window).height();
    var divHeight = winHeight+'px';
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 signUpLeftWrap"  style={{"height": divHeight}}>
          <img src="/images/signUpBanner.gif" className="signUpBanner col-lg-9 col-md-9"/>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signUpRighttWrap"  style={{"height": divHeight}}>
        </div>
        <div className="col-lg-4 col-lg-offset-7 col-md-5 col-md-offset-6 col-xs-4 col-sm-5 col-sm-offset-6  signUpFormWrap resetPassWrap">
          <div className="col-lg-4">

          </div>
          <div className="col-lg-12">
            <div className="col-lg-12 col-md-12 OEXLogoWrap">
              <img src="/images/maatslogo.png" className="signUpBanner col-lg-offset-2 col-lg-8 col-md-8 col-md-offset-2"/>
            </div>
          </div>
          <div className="OESSubTitle2">Abacus Online Exam System</div>
          <h3 className="signUpNameTitle"> Reset Password</h3>
          <div className="FormWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="resetPassword" onSubmit={this.changepassword.bind(this)}>
              <div className="form-group loginFormGroup col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="input-group">
                  
                  <input type="password" className="form-control loginInputs" ref="resetPassword" name="resetPassword" placeholder="New Password" aria-label="Password" aria-describedby="basic-addon1" title="Password should be at least 6 characters long!" pattern=".{6,}" required/>
                  <span className="input-group-addon addons glyphi-custommm" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                </div>
              </div>
              <div className="form-group loginFormGroup col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="input-group">
                  
                  <input type="password" className="form-control loginInputs" ref="resetPasswordConfirm" name="resetPasswordConfirm" placeholder="Confirm New Password" aria-label="Confirm Password" aria-describedby="basic-addon1" title="Password should be at least 6 characters long!" pattern=".{6,}" required/>
                  <span className="input-group-addon addons glyphi-custommm" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                </div>
              </div>
              <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button type="submit" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 submitBtn UMloginbutton">Reset Password</button>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <Link to="/" className="UMGrey"><i className="fa fa-undo" aria-hidden="true"></i> Click here to Login</Link>  
              </div>
            </form>
          </div>
        </div>
      </div>
      
    );
  }
}