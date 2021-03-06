	import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { UpcomingEventsData } from '/imports/adminDashboard/upcomingEvents/api/UpcomingEvents.js';

class Events extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			'subscription':{
			}
		}
	}


	render(){
		return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 eventsWrap">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mkDonationHeader noPadLR">
						<i className="fa fa-calendar" aria-hidden="true"></i> {this.props.post.tagLine}
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<hr className="customHr"/>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsDesc">
						{this.props.post.description}
					</div>
					{ this.props.posts.map( (data,index)=>{
						return(<div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsBlocks eventsDesc">
								<img src={data.eventPhoto} className="img-responsive col-lg-2 col-md-2 col-sm-2 col-xs-2 noPadLR eventsImgs"/>
								<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPadLR">
									<span className="eventsBlockTitle">{data.eventTitle}</span><br/>
									<span className="eventsBlockDates">
										<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
										{data.eventDate} |&nbsp;
										<i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
										{data.eventVenue}
									</span><br/>
									{data.eventDescription.split('').length>25 ? 
										<span className="eventMissionDesc">
											{data.eventDescription}
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsReadMore">
												<a href={`/eventDetails/${data._id}`}> Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
											</div>
										</span>
										: 
										<span className="eventMissionDesc">
											{data.eventDescription}
										</span>
									}	
								</div>	
							</div>);
						   	}) 
					}
				</div>
		);
	}
}

export default withTracker(props => {
    const postHandle   = Meteor.subscribe('allUpcomingEvents');
    const post         = UpcomingEventsData.findOne({"id":101})||{};
    const posts        = UpcomingEventsData.find({ id: { $ne : 101 } }).fetch() ||[];
    console.log(posts);
    const loading      = !postHandle.ready();

    // console.log('post: ',post);
    // console.log('posts: ',posts);

    return {
        loading,
        post,
        posts,
    };
})(Events);