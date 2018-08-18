import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class OurVolunteers extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	componentDidMount(){
	
	}
	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 newTopHeader">
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mytextwithicon">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 newsLine1">
								What we can do?
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 latestNewsTitle">
								<b>OUR <span className="newsWord">VOLUNTEERS.</span></b>
							</div>
						</div>
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 newsDesc">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 imgVolunteers">
								<img src="../images/volunteer3.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 volunteerDetails">
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">ALex lilee</span>
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Employee</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 imgVolunteers">
								<img src="../images/volunteer4.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 volunteerDetails">
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">stuart Broad</span>
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Businesman</span>

								</div>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 imgVolunteers">
								<img src="../images/volunteer1.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 volunteerDetails">
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Michal jackson</span>
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Businesman</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 imgVolunteers">
								<img src="../images/volunteer2.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 volunteerDetails">
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">loren hadly</span>
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Doctor</span>
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
})(OurVolunteers);