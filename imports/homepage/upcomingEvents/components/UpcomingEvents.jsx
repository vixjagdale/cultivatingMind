import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { UpcomingEventsData } from '/imports/adminDashboard/upcomingEvents/api/UpcomingEvents.js';

class UpcomingEvents extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourMissionTit">
						<span><i className="fa fa-user" aria-hidden="true"></i>Up</span>coming Events
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 OMFSec">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OMSecIn">
								<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMIcons">
										<i className="fa fa-home" aria-hidden="true"></i>
									</div>
								</div>
								<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 OMSecTit">
									<b>Sheltor for Poor</b><br/>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMnewsSection">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
								<br/>
								<span>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
								</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 OMFSec">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OMSecIn">
								<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMIcons">
										<i className="fa fa-users" aria-hidden="true"></i>
									</div>
								</div>
								<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 OMSecTit">
									<b>Help Poor Children</b><br/>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMnewsSection">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
								<br/>
								<span>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
								</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 OMFSec">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OMSecIn">
								<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMIcons">
										<i className="fa fa-home" aria-hidden="true"></i>
									</div>
								</div>
								<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 OMSecTit">
									<b>Founding for Poor</b><br/>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMnewsSection">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
								<br/>
								<span>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
								</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 OMFSec">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OMSecIn">
								<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMIcons">
										<i className="fa fa-users" aria-hidden="true"></i>
									</div>
								</div>
								<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 OMSecTit">
									<b>Reduce World Poverty</b><br/>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR OMnewsSection">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
								<br/>
								<span>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
								</span>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
    const postHandle   = Meteor.subscribe('allUpcomingEvents');
    const post         = UpcomingEventsData.findOne({"id":101})||{};
    const posts        = UpcomingEventsData.find({ id: { $ne : 101 } }).fetch() ||[];
    const loading      = !postHandle.ready();

    console.log('post: ',post);
    console.log('posts: ',posts);

    return {
        loading,
        post,
        posts,
    };
})(UpcomingEvents);