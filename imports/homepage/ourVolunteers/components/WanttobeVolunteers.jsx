import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class WanttobeVolunteers extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	componentDidMount(){
	
	}
	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 WTBVolunteers">
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 newTopHeader">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 WTBVolTit">
							Want to be a Volunteer ?
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 BVolTit">
							BECOME A PROUD <span>VOLUNTEER</span>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 WTBVTxtPara">
							<span>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
							</span>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 WTBVolBtn">
							<button className="btn btn-primary">Join Now</button>
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
})(WanttobeVolunteers);