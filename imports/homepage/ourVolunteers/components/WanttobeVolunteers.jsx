import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { WantToBeVolunteerData } from '/imports/adminDashboard/wantToBeVolunteer/api/WantToBeVolunteer.js';

class WanttobeVolunteers extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	componentDidMount(){
	
	}
	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 WTBVolunteers" id="Joinus11">
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 newTopHeader">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 WTBVolTit">
							{this.props.post.tagLine}
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 BVolTit">
							{this.props.post.title1} <span>{this.props.post.title2}</span>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 WTBVTxtPara">
							<span>
								{this.props.post.description}
							</span>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 WTBVolBtn">
							<button className="btn btn-primary">Join Now</button>
						</div>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('wantToBeVolunteer');
    const post         = WantToBeVolunteerData.findOne({"id":101})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(WanttobeVolunteers);