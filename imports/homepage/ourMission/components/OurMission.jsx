import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';

export default class OurMission extends TrackeReact(Component){

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
						Our Mission
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<hr className="customHr"/>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionDesc">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionBlocks ourMissionDesc">
						<img src="../images/ourMission1.jpg" className="img-responsive col-lg-3 col-md-2 col-sm-2 col-xs-2 noPadLR ourMissionImgs"/>
						<span className="ourMissionBlockTitle">Shelter for Poor</span><br/>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionReadMore">
							Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
						</div>	
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadLR ourMissionBlocks ourMissionDesc">
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
					</div>
				</div>
		);
	}
}
