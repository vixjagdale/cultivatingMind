import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';

export default class ContactUsForm extends TrackeReact(Component){

	contactUsSubmit(event){
		event.preventDefault();
		var name    = this.refs.name.value;
		var email   = this.refs.email.value;
		var subject = this.refs.subject.value;
		var message = this.refs.message.value;

		Meteor.call('SendContactMessage', name, email, subject, message, (error,result)=>{
			if(error){
				console.log(error);
			}else{
				console.log(result);
				this.refs.name.value = '';
				this.refs.email.value = '';
				this.refs.subject.value = '';
				this.refs.message.value = '';
				swal('Thank you for contacting us!');
			}
		});
	}

	render(){

			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
					<div className="conactUsTitle col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<span className="titleInit">H</span>OW TO REACH US
					</div>
					<hr className="col-lg-2 col-lg-offset-5 titleHr"/>
					<form onSubmit={this.contactUsSubmit.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<input type="text" ref="name" placeholder="Name*" className="form-control" required/>
							</div>
							<div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<input type="email" ref="email" placeholder="Email*" className="form-control" required/>
							</div>
							<div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<input type="text" ref="subject" placeholder="Subject*" className="form-control" required/>
							</div>
							<div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<textarea ref="message" placeholder="Message*" rows="5" className="form-control" required/>
							</div>
							<div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<input type="submit" value="SEND MESSAGE" className="btn form-control sendMsg"/>
							</div>		
						</div>
					</form>
				</div>
			);			

	}
}
