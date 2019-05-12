import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { UpcomingEventsData } from '/imports/adminDashboard/upcomingEvents/api/UpcomingEvents.js';

class EventDetails extends Component{
	render(){
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogWrapper">
				<div className="col-lg-12 completeBlogImg">
					<img src={this.props.post.eventPhoto} alt="eventImg"/>
				</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogSec-Wrap">
							<div className="row blog-row-L col-lg-12 ">
								<div className="col-lg-12 col-md-12">
									<label className="col-lg-12 completeBlogTit">{this.props.post.eventTitle} </label>
									<div className="col-lg-6 completeBlogDate">{this.props.post.eventVenue} &nbsp;&nbsp;&nbsp;<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.post.eventDate}</div>
									}
									<div className="col-lg-12 completeblogBody">{this.props.post.eventDescription}</div>
								</div>
								
							</div>
						</div>
						
					</div>
			</div>
			);
	}
}

export default withTracker(props=>{
	 const postHandle   = Meteor.subscribe('allUpcomingEvents');
    const post         = UpcomingEventsData.findOne({"_id":FlowRouter.getParam('id')})||{};
    console.log(post);
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(EventDetails);