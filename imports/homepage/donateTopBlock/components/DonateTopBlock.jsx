import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class DonateTopBlock extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
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
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 makeDonationTag">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR donationInnerTop1"><b>JOIN WITH US TO CHANGE THE WORLD</b></div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR donationInnerTop2">Just call at (01)234 5678 to make a donation</div>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    // const postHandle   = Meteor.subscribe('findSettings');
    // const post         = Settings.findOne({"companyId":101})||{};
    // const loading      = !postHandle.ready();

    return {
        // loading,
        // post,
        'x' : 1,
    };
})(DonateTopBlock);