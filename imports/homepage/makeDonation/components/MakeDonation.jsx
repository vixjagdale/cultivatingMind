import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { Brands } from '/imports/adminDashboard/brands/api/brands.js';

export default class MakeDonation extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			'subscription':{
			}
		}
	}


	updateProductDetails(event){
		event.preventDefault();
		var formValues = {
							'paymentType'      : this.refs.paymentType.value,
							'donateFor'        : this.refs.donateFor.value,
							'currency'         : this.refs.currency.value,
							'donateAmt'        : this.refs.donateAmt.value,
						}
		Meteor.call("paymentGatewayCultivatingMind",formValues,(err,res)=>{
			if(err){}else{
				swal("Thank you very much your contribution","","success");
			}
		});
	}
	
	render(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 makeDonationWrap noPadLR" id="DonateNow11">
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mkDonationTrans">
				<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 mkDonationInner">

					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mkDonationHeader noPadLR">
							<i className="fa fa-cc-mastercard themeColor" aria-hidden="true"></i>&nbsp;
							Make a donation <span className="themeColor">now!</span>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<hr className="customHr"/>
						</div>

						<form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">

							<label>Payment Type</label>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR form-group">
								<input type="radio" name="paymentType" ref="paymentType" value="One Time" checked/> One Time&nbsp;&nbsp;
								<input type="radio" name="paymentType" ref="paymentType" value="Recurring"/> Recurring
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadL form-group">
								<label>I want to donate for</label>
								<select className="form-control" name="donateFor" ref="donateFor">
								  <option value="Educate Children">Educate Children</option>
								  <option value="Food">Food</option>
								  <option value="Clothes">Clothes</option>
								</select>
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadR form-group">
								<label>Currency</label>
								<select className="form-control" name="currency" ref="currency">
								  <option value="USD">USD - U.S. Dollars</option>
								  <option value="RUPEES">RUPEES</option>
								  <option value="EUROS">EUROS</option>
								</select>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR form-group">
								<label>How much do you want to donate?</label>
								<input type="number" name="donateAmt" ref="donateAmt" className="form-control"/>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR form-group">
								<input type="submit" className="btn submitDonate" value="Donate Now"/>
							</div>
						</form>
					</div>

					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mkDonationHeader noPadLR">
							<i className="fa fa-comments-o themeColor" aria-hidden="true"></i> &nbsp;
							OUR <span className="themeColor">OPENING CEREMONY</span>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<hr className="customHr"/>
						</div>
						<video controls src="../video/videoplayback.mp4" autoPlay className="noPadLR col-lg-12 col-md-12 col-sm-12 col-xs-12"></video>
					</div>

				</div>
			</div>
			</div>
		);
	}
}
