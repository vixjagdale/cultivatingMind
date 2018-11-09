import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Counters } from '/imports/adminDashboard/countersBlock/api/CountersAdmin.js';

class CountersBlock extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 countersMain noPadLR">
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noPadLR">
						{ this.props.post.map( (data,index)=>{
							return (<div key={index} className="col-lg-3 col-md-12 col-sm-12 col-xs-12 counterInner">
										<i className={data.icon} aria-hidden="true"></i> <br/>
										<span className="counterNo">{data.count}</span> <br/>
										<b>{data.title}</b>
									</div>);
						  }) 
						}
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allCounters');
    const post         = Counters.find({}).fetch()||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(CountersBlock);