import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { MissionData } from '/imports/adminDashboard/mission/api/MissionAdmin.js';

class OurMissionDetails extends Component{
	render(){
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogWrapper">
				<div className="col-lg-12 completeBlogImg">
					<img src={this.props.post.missionPhoto} alt="eventImg"/>
				</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogSec-Wrap">
							<div className="row blog-row-L col-lg-12 ">
								<div className="col-lg-12 col-md-12">
									<label className="col-lg-12 completeBlogTit">{this.props.post.title} </label>
									<br/><br/>
									<div className="col-lg-12 completeblogBody">{this.props.post.missionDesc}</div>
								</div>
								
							</div>
						</div>
						
					</div>
			</div>
			);
	}
}

export default withTracker(props=>{
	 const postHandle   = Meteor.subscribe('allMissions');
    const post         = MissionData.findOne({"_id":FlowRouter.getParam('id')})||{};
    console.log(post);
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(OurMissionDetails);