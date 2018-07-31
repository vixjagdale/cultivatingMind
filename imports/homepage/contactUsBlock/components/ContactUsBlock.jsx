import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Settings } from '/imports/adminDashboard/companySettings/api/companySettings.js';

class ContactUsBlock extends TrackeReact(Component){

	constructor(){
		super();
		this.state={

		}
	}

	render(){
		if(!this.props.loading){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
					<div className="col-lg-8 col-lg-offset-2
								    col-md-8 col-md-offset-2
								    col-sm-12
								    col-xs-12 homeConatctWrap">
							<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 contactInWrap">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactFooterWrap">
									<h5>{this.props.post.companyName}</h5>
									<div><i className="fa fa-map-marker titleInit"></i> {this.props.post.address}</div>
									<div><i className="fa fa-phone titleInit"></i> {this.props.post.phoneNumber}</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 contactInWrap ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactFooterWrap">
									<h5>Timings</h5>
									<div><i className="fa fa-clock-o titleInit"></i> {this.props.post.timing}</div>
									<div>WE work an all Holidays</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 contactInWrap">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactFooterWrap">
									<h5>About Us</h5>
									<div>Supply</div>
									<div>SERVICES</div>
								</div>
							</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR copyright-section">
						© 2018 ECSystems is Powered by avaComp
					</div>
				</div>
			);			
		}else{
			return(<span>loading...</span>);
		}

	}
}

export default ContactUsBlockContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('findSettings');
    const post         = Settings.findOne({"companyId":101})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(ContactUsBlock);