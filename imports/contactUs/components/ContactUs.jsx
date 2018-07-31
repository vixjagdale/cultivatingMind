import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import MyMap from './MyMap.jsx';
import ContactUsForm from './ContactUsForm.jsx';

class ContactUs extends TrackeReact(Component){

	constructor(){
		super();
		this.state={

		}
	}

	render(){

			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						Contact Us
					</div>
					<MyMap />
					<ContactUsForm />
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    return {'hi':1}
})(ContactUs);