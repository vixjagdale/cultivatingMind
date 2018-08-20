import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';

export default class Events extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={
			'subscription':{
			}
		}
	}


	render(){
		return(
				<div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 eventsWrap">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mkDonationHeader noPadLR">
						<i className="fa fa-calendar" aria-hidden="true"></i> UPCOMING EVENTS
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<hr className="customHr"/>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsDesc">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsBlocks eventsDesc">
						<img src="../images/events1.jpg" className="img-responsive col-lg-2 col-md-2 col-sm-2 col-xs-2 noPadLR eventsImgs"/>
						<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<span className="eventsBlockTitle">Upcoming Event Title</span><br/>
							<span className="eventsBlockDates">
								<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
								June 26, 2016 |&nbsp;
								<i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
								New York
							</span><br/>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsReadMore">
								Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
							</div>	
						</div>	
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsBlocks eventsDesc">
						<img src="../images/events2.jpg" className="img-responsive col-lg-2 col-md-2 col-sm-2 col-xs-2 noPadLR eventsImgs"/>
						<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<span className="eventsBlockTitle">Upcoming Event Title</span><br/>
							<span className="eventsBlockDates">
								<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
								June 26, 2016 |&nbsp;
								<i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
								New York
							</span><br/>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsReadMore">
								Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
							</div>	
						</div>	
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsBlocks eventsDesc">
						<img src="../images/events3.jpg" className="img-responsive col-lg-2 col-md-2 col-sm-2 col-xs-2 noPadLR eventsImgs"/>
						<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<span className="eventsBlockTitle">Upcoming Event Title</span><br/>
							<span className="eventsBlockDates">
								<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
								June 26, 2016 |&nbsp;
								<i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
								New York
							</span><br/>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR eventsReadMore">
								Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
							</div>	
						</div>	
					</div>
				</div>
		);
	}
}
