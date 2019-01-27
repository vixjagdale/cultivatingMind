import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Testimonials } from '/imports/adminDashboard/testimonial/api/TestimonialAdmin.js';

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
						{ this.props.post.map( (data,index)=>{
							var activeClass = ( index == 0 ) ? ' active ' : '';
							return  (<div key={index} className={"item "+activeClass}>
								      <div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
								      	{data.description}
								      </div>
								      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialDesc">
								      	<img src="../images/User.png" className="img-responsive testimonialImg"/>
								      </div>
								      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 testimonialPersonName">
								      	{data.personName}
								      </div>
								    </div>);
						  }) 
						}
					  </div>
					   <a className="left carousel-control" href="#myCarousel" data-slide="prev">
						    <span className="glyphicon glyphicon-chevron-left"></span>
						    <span className="sr-only">Previous</span>
						  </a>
						  <a className="right carousel-control" href="#myCarousel" data-slide="next">
						    <span className="glyphicon glyphicon-chevron-right"></span>
						    <span className="sr-only">Next</span>
						  </a>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allTestimonials');
    const post         = Testimonials.find({}).fetch()||[];
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(Testimonial);