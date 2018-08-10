import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class TagLineBottom extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tagBottomMain">
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 tagLineBottom">
						Lets Change the world we all together, join us now as a volunteer
					</div>
					<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
						<input type="button" className="btn btnTagLine" value="Become a volunteer"/>
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
})(TagLineBottom);