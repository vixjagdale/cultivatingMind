import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdminHeader extends TrackerReact(Component) {

	handleClick(e) {
        e.preventDefault();
        Meteor.logout();
	}	

	render() {

		       return (
					    <div>
					    	<header className="main-header">
					    		<a href="" className="logo">
							      <span className="logo-mini"><img src="/images/carIcon1.png" className="img-responsive"/></span>
							      <span className="logo-lg"><b>EC Systems</b></span>
							    </a>

							    <nav className="navbar navbar-static-top">
							      <a href="" className="sidebar-toggle" data-toggle="offcanvas" role="button">
							        <span className="sr-only">Toggle navigation</span>
							      </a>
							      <div className="navbar-custom-menu">
							        <ul className="nav navbar-nav">
						
							          
							          <li className="dropdown user user-menu">
							            <a href="" className="dropdown-toggle" data-toggle="dropdown" title="You're Account Settings">
							              <span className="hidden-xs">Hello Admin! <i className="fa fa-caret-down" aria-hidden="true"></i></span>
							            </a>
							            <ul className="dropdown-menu signOutBody">
							            	 <li><a href="" className="logout" onClick={this.handleClick.bind(this)}><i className="fa fa-sign-out"></i> Logout</a></li>
							            </ul>
							          </li>
							        </ul>
							      </div>
							    </nav>
					    	</header>
					    </div>
			    );

	} 

}