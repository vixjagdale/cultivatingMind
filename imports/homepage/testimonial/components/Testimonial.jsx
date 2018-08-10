import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class Testimonial extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialWrap noPadLR">
					<div id="myCarousel" className="carousel slide" data-ride="carousel">

					  <div className="carousel-inner">
					    <div className="item active">
					      <div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
					      	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
					      </div>
					      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
					      	<img src="../images/User.png" className="img-responsive testimonialImg"/>
					      </div>
					      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialPersonName">
					      	Catherine Grace
					      </div>
					    </div>

					    <div className="item">
					      <div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
					      	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
					      </div>
					      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
					      	<img src="../images/User.png" className="img-responsive testimonialImg"/>
					      </div>
					      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialPersonName">
					      	Catherine Grace
					      </div>
					    </div>

					    <div className="item">
					      <div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
					      	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
					      </div>
					      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
					      	<img src="../images/User.png" className="img-responsive testimonialImg"/>
					      </div>
					      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialPersonName">
					      	Catherine Grace
					      </div>
					    </div>
					  </div>

{/*					  <a className="left carousel-control" href="#myCarousel" data-slide="prev">
					    <span className="glyphicon glyphicon-chevron-left"></span>
					    <span className="sr-only">Previous</span>
					  </a>
					  <a className="right carousel-control" href="#myCarousel" data-slide="next">
					    <span className="glyphicon glyphicon-chevron-right"></span>
					    <span className="sr-only">Next</span>
					  </a>*/}

{/*					  <ol className="carousel-indicators">
					    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
					    <li data-target="#myCarousel" data-slide-to="1"></li>
					    <li data-target="#myCarousel" data-slide-to="2"></li>
					  </ol>*/}

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
})(Testimonial);