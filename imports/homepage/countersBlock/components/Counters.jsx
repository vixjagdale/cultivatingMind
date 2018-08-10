import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class Counters extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 countersMain noPadLR">
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 counterInner">
							<i className="fa fa-smile-o" aria-hidden="true"></i> <br/>
							<span className="counterNo">756</span> <br/>
							<b>HAPPY DONORS</b>
						</div>
						<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 counterInner">
							<i className="fa fa-rocket" aria-hidden="true"></i> <br/>
							<span className="counterNo">675</span> <br/>
							<b>SUCCESS MISSION</b>
						</div>
						<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 counterInner">
							<i className="fa fa-user-plus" aria-hidden="true"></i> <br/>
							<span className="counterNo">1,248</span> <br/>
							<b>VOLUNTEERS REACHED</b>
						</div>
						<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 counterInner">
							<i className="fa fa-globe" aria-hidden="true"></i> <br/>
							<span className="counterNo">24</span> <br/>
							<b>GLOBALIZATION WORK</b>
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
})(Counters);