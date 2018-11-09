import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { TopCarousalData } from '/imports/adminDashboard/topCarousal/api/TopCarousal.js';
import { TopTagLineBlockData } from '/imports/adminDashboard/topTagLineBlock/api/TopTagLineBlock.js';

class DonateTopBlock extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">

					  <div id="slideShow" className="carousel slide col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" data-ride="carousel">

					    <ol className="carousel-indicators">
						{ this.props.post.map( (slides,index)=>{
							if(index == 0){
								var activeStatus = 'active';
							}else{
								var activeStatus = '';
							}
								
							return (
									<li data-target="#slideShow" key={index} data-slide-to={index} className={activeStatus}></li>
								);
						  }) 
						}
					    </ol>

					    <div className="carousel-inner">
						{ this.props.post.map( (slides,index)=>{
							if(index == 0){
								var activeStatus = 'active';
							}else{
								var activeStatus = '';
							}
      						return(<div key={index} className={"item "+activeStatus}>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 donateTopWrap">
									<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 topBlockDonate">
										DONATE
									</div>
									<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
										<span className="topBlockDonate1">FOR THE POOR CHILDREN</span>
									</div>
									<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 topBlockDonate2">
										<span className="col-lg-5 col-md-12 col-sm-12 col-xs-12 noPadLR"><b>Every day we bring hope to millions of children in the world's
										hardest places as a sign of God's unconditional love.</b></span>
									</div>
									<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
										<button className="btn donateNow">Donate Now</button>
									</div>
								</div>
							</div>);
						  }) 
						}
					    </div>


					    <a className="left carousel-control" href="#slideShow" data-slide="prev">
					      <span className="glyphicon glyphicon-chevron-left"></span>
					      <span className="sr-only">Previous</span>
					    </a>
					    <a className="right carousel-control" href="#slideShow" data-slide="next">
					      <span className="glyphicon glyphicon-chevron-right"></span>
					      <span className="sr-only">Next</span>
					    </a>
					  </div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 makeDonationTag">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR donationInnerTop1"><b>{this.props.postData.headLine}</b></div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR donationInnerTop2">{this.props.postData.description}</div>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allCarousalSlides');
    const postHandle1  = Meteor.subscribe('topTagLineBlock');
    const post         = TopCarousalData.find({}).fetch()||[];
    const postData     = TopTagLineBlockData.findOne({})||{};
    const loading      = !postHandle.ready();
    const loading1     = !postHandle1.ready();

    return {
        loading,
        post,
        postData,
    };
})(DonateTopBlock);