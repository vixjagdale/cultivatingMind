import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class ContactUs extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	submit(event){
		event.preventDefault();
		var formValues = {
							'name' : this.refs.name.value,
							'email' : this.refs.email.value,
							'subject' : this.refs.subject.value,
							'phone' : this.refs.phone.value,
							'message' : this.refs.message.value,
						};
		Meteor.call('saveQueries', formValues, (error,result)=>{
			if(error){
				console.log(error);
			}else{
				// console.log(result);
				swal('Thank for contacting us.')
				this.refs.name.value = '';
				this.refs.email.value = '';
				this.refs.subject.value = '';
				this.refs.phone.value = '';
				this.refs.message.value = '';
			}
		})
	}

	resetFields(event){
		event.preventDefault();
		this.refs.name.value = '';
		this.refs.email.value = '';
		this.refs.subject.value = '';
		this.refs.phone.value = '';
		this.refs.message.value = '';
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR contactMain">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactTitle">
						CONTACT US
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 contactDesc">
						Feel free to contact us.
					</div>
					<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
						<form onSubmit={this.submit.bind(this)}>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
								<input type="text" ref="name" className="form-control contactInput" placeholder="Enter Name" required/>
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
								<input type="email"  ref="email" className="form-control contactInput" placeholder="Enter Email" required/>
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
								<input type="text" ref="subject"  className="form-control contactInput" placeholder="Enter Subject" required/>
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
								<input type="text"  ref="phone" className="form-control contactInput" placeholder="Enter Phone" required/>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
								<textarea rows="4"  ref="message" className="form-control contactInput" placeholder="Enter Message" required></textarea>
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 form-group">
								<input type="submit" className="form-control btn btnContactSubmit" value="SEND YOUR MESSAGE" />
							</div>		
							<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 form-group">
								<input type="button" className="form-control btn btnContactSubmit" value="RESET" onClick={this.resetFields.bind(this)}/>
							</div>	
						</form>				
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    // const postHandle   = Meteor.subscribe('findSettings');
    // const post         = Settings.findOne({"companyId":101})||{};
    // const loading      = !postHandle.ready();

    return {
        // loading,
        // post,
        'x' : 1,
    };
})(ContactUs);