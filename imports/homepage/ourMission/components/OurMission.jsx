import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { MissionData } from '/imports/adminDashboard/mission/api/MissionAdmin.js';
import Events from '/imports/homepage/events/components/Events.jsx';

class OurMission extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			'subscription':{
			}
		}
	}


	render(){
		return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourMissionEventWrap">
					<div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 ourMissionWrap">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mkDonationHeader noPadLR">
							{this.props.post.tagLine}
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<hr className="customHr"/>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionDesc">
							{this.props.post.description}
						</div>
						{ this.props.posts.map( (data,index)=>{
						return(<div key={index} className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionBlocks ourMissionDesc">
								<img src={data.missionPhoto} className="img-responsive col-lg-3 col-md-2 col-sm-2 col-xs-2 noPadLR ourMissionImgs"/>
								<span className="ourMissionBlockTitle">{data.title}</span><br/>
								{data.missionDesc.split('').length <30 ? 
									<span className="eventMissionDesc">{data.missionDesc}</span>
								:
									<span className="eventMissionDesc"> {data.missionDesc}
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionReadMore">
										<a href={`/ourMissionDetails/${data._id}`}>Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i> </a>
									</div></span>
								}	
							</div>);
						})
						}
					</div>
					<div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 eventsWrap" id="Events11">
						<Events/>
					</div>
				</div>
		);
	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allMissions');
    const post         = MissionData.findOne({"id":101})||{};
    const posts        = MissionData.find({ id: { $ne : 101 } }).fetch() ||[];
    const loading      = !postHandle.ready();

    // console.log('post:',post);
    // console.log('posts:',posts);

    return {
        loading,
        post,
        posts,
    };
})(OurMission);