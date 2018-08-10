import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class Copyright extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 copyrightMain">
					<div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 copyright">
						Copyright 2018 Cultivating Mind. All Rights Reserved.
					</div>
					<div className="copyrightLinks col-lg-4 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
						FAQ | Help | Support
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
})(Copyright);