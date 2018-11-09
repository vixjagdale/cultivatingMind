import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { BottomTagLineBlockData } from '/imports/adminDashboard/bottomTagLineBlock/api/BottomTagLineBlock.js';

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
						{this.props.post.headLine}
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

    const postHandle   = Meteor.subscribe('bottomTagLineBlock');
    const post         = BottomTagLineBlockData.findOne({"id":101})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(TagLineBottom);