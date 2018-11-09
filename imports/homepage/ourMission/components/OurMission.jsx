import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { MissionData } from '/imports/adminDashboard/mission/api/MissionAdmin.js';

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
							<img src="../images/ourMission1.jpg" className="img-responsive col-lg-3 col-md-2 col-sm-2 col-xs-2 noPadLR ourMissionImgs"/>
							<span className="ourMissionBlockTitle">{data.title}</span><br/>
							{data.missionDesc}
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionReadMore">
								Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
							</div>	
						</div>);
					})
					}
{/*					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionBlocks ourMissionDesc">
						<img src="../images/ourMission2.jpg" className="img-responsive col-lg-3 col-md-2 col-sm-2 col-xs-2 noPadLR ourMissionImgs"/>
						<span className="ourMissionBlockTitle">Help Poor Children </span><br/>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionReadMore">
							Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
						</div>	
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionBlocks ourMissionDesc">
						<img src="../images/ourMission3.jpg" className="img-responsive col-lg-3 col-md-2 col-sm-2 col-xs-2 noPadLR ourMissionImgs"/>
						<span className="ourMissionBlockTitle">Funding for Poor</span><br/>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionReadMore">
							Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
						</div>	
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionBlocks ourMissionDesc">
						<img src="../images/ourMission4.jpg" className="img-responsive col-lg-3 col-md-2 col-sm-2 col-xs-2 noPadLR ourMissionImgs"/>
						<span className="ourMissionBlockTitle">Reduce Poverty</span><br/>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionReadMore">
							Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
						</div>	
					</div>*/}
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