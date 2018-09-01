import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class Footer extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerOuterWrap noPadLR">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerInnerWrap noPadLR">
						<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 footerInnerWrap noPadLR">
							<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerAddr noPadLR">
									203, Envato Labs, behind Alis street, Melbourne, Australia.
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerAddrDet noPadLR">
									<i className="fa fa-phone themeIcon" aria-hidden="true"></i> &nbsp; 123-456-789
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerAddrDet noPadLR">
									<i className="fa fa-envelope-o themeIcon" aria-hidden="true"></i> &nbsp; contact@yourdomain.com
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerAddrDet noPadLR">
									<i className="fa fa-globe themeIcon" aria-hidden="true"></i> &nbsp; www.yourdomain.com
								</div>
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsTitle noPadLR">
									Latest News
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsBlocks noPadLR">
									<img src="../images/dummy.png" className="img-responsive col-lg-3 noPadLR"/>
									<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
										<span className="footerNewsBlockDesc">Sustainable Construction</span> <br/>
										<span className="footerNewsBlockDates">Mar 08, 2018</span>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsBlocks noPadLR">
									<img src="../images/dummy.png" className="img-responsive col-lg-3 noPadLR"/>
									<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
										<span className="footerNewsBlockDesc">Industrial Coating</span> <br/>
										<span className="footerNewsBlockDates">Mar 08, 2018</span>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsBlocks noPadLR">
									<img src="../images/dummy.png" className="img-responsive col-lg-3 noPadLR"/>
									<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
										<span className="footerNewsBlockDesc">Storefront Installation</span> <br/>
										<span className="footerNewsBlockDates">Mar 08, 2018</span>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsBlock2 footerNewsTitle noPadLR">
									Useful Links
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc noPadLR">
									Body Building
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc noPadLR">
									Fitness Classes
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc noPadLR">
									Weight Lifting
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc noPadLR">
									Yoga Classes
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc noPadLR">
									Training
								</div>
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsBlock3 footerNewsTitle noPadLR">
									Opening Hours
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc1 noPadLR">
									Mon - Tues : 6.00 am - 10.00 pm
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc1 noPadLR">
									Wednes - Thurs : 6.00 am - 10.00 pm
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc1 noPadLR">
									Fri : 6.00 am - 10.00 pm
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerNewsDesc1 noPadLR">
									Sun : Closed
								</div>
							</div>
							<div className="footerBottom col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">

								<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 footerSubscribe noPadLR">
										Subscribe Us
									</div>
									 <div className="form-group col-lg-10 col-md-12 col-sm-12 col-xs-12 noPadLR">
										<div className="input-group">
										  <input type="text" className="form-control" placeholder="Your Email" />
										  <div className="input-group-addon addons subscribeBtnFooter">Subscribe
										  </div>
										</div>
									 </div>
								</div>

								<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerCallUs noPadLR">
										Call Us Now
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
										+61 3 1234 5678
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
										+61 3 1234 5678
									</div>
								</div>

								<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerConnect noPadLR">
										Connect With Us
									</div>
									<i className="fa fa-facebook faIcons" aria-hidden="true"></i>
									<i className="fa fa-twitter faIcons" aria-hidden="true"></i>
									<i className="fa fa-skype faIcons" aria-hidden="true"></i>
									<i className="fa fa-instagram faIcons" aria-hidden="true"></i>
									<i className="fa fa-pinterest faIcons" aria-hidden="true"></i>
								</div>

							</div>
						</div>
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
})(Footer);