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

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR contactMain">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactTitle">
						CONTACT US
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 contactDesc">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					</div>
					<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
							<input type="text" className="form-control contactInput" placeholder="Enter Name"/>
						</div>
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
							<input type="text" className="form-control contactInput" placeholder="Enter Email"/>
						</div>
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
							<input type="text" className="form-control contactInput" placeholder="Enter Subject"/>
						</div>
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group">
							<input type="text" className="form-control contactInput" placeholder="Enter Phone"/>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
							<textarea rows="4" className="form-control contactInput" placeholder="Enter Message"></textarea>
						</div>
						<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 form-group">
							<input type="submit" className="form-control btn btnContactSubmit" value="SEND YOUR MESSAGE"/>
						</div>		
						<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 form-group">
							<input type="button" className="form-control btn btnContactSubmit" value="RESET"/>
						</div>					
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