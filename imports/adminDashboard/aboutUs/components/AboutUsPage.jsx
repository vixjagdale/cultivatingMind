import React,{Component} from 'react';
import { AboutUs } from '../api/aboutUs';
import { withTracker } from 'meteor/react-meteor-data';

class AboutUsPage extends Component{
	render(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aboutUsWrap">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aboutUsImg">
				</div>
				<div className="col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 aboutUsBody">
					<h1>{this.props.aboutUsInfo.aboutUsTitle}</h1>
					<p>
						{this.props.aboutUsInfo.aboutUsBody}
					</p>
				</div>
			</div>
			);
	}
}

export default withTracker(props=>{
	const postHandle = Meteor.subscribe("showAboutUs");
	const loading    = !postHandle.ready();
	const aboutUsInfo = AboutUs.findOne({})||{};
	return{
		aboutUsInfo,
	};
})(AboutUsPage);