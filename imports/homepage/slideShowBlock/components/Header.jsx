import React, {Component} from 'react';
import {render} from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {PropTypes} from 'prop-types';
import { Settings } from '/imports/adminDashboard/companySettings/api/companySettings.js';

class Header extends TrackerReact(Component){

	activeClass(event){
		var selector = '.navUl li';
  		$(selector).on('click', function(){
	    	$(selector).removeClass('active');
		    $(this).addClass('active');
		});
	}

	render(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 homeMenuWrap">
				<nav className="navbar navbar-inverse ECSNavbar">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <button type="button" className="navbar-toggle ecSystemBtn" data-toggle="collapse" data-target="#myNavbar">
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span> 
				      </button>
				      {/*<a className="navbar-brand companyName" href="/">{this.props.post.companyName}</a>*/}
				      <a className="navbar-brand companyName" href="/">cultivating Mind	</a>
				    </div>
				    <div className="collapse navbar-collapse" id="myNavbar">
				      <ul className="nav navbar-nav EC-navbar-nav col-lg-10 col-md-10 col-sm-12 col-xs-12 navUl" onClick={this.activeClass.bind(this)}>
				        <li className="active1 active"><a href="/">HOME</a></li>
				        <li><a href="/features">Features</a></li>
				        <li><a href="/pages">Pages</a></li> 
				        <li><a href="/gallery">Gallery</a></li> 
				        <li><a href="/events">Events</a></li> 
				        <li><a href="/blogs">Blog</a></li> 
				        <li className="activePer"><a href="/donateNow">Donate Now</a></li> 
				        <li className="activePer"><a href="/joinUs">Join Us</a></li> 
				        { Roles.userIsInRole(Meteor.userId(), ['admin']) ? <li><a href="/ecsystemAdminDashboard">DASHBOARD</a></li> : '' }
				      </ul>
				      <ul className="nav navbar-nav navbar-right">
				       {/*} <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
				        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>*/}
				      </ul>
				    </div>
				  </div>
				</nav>
			</div>
			);
	}
}

export default HeaderContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('findSettings');
    const post         = Settings.findOne({"companyId":101})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(Header);