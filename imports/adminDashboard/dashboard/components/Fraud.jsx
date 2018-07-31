import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Fraud extends TrackerReact(Component) {

	render() {

		return(
			<div>
				<div className="col-lg-10 col-lg-offset-1 unauthorized">
					<div className="col-lg-3"></div>
					<div className="col-lg-6">
						<h1 className="col-lg-12 errorclass"><span className="errormsg"> 404 <i className="fa fa-frown-o" aria-hidden="true"></i></span> -  Page not found!</h1>
						<span className="col-lg-12 errorpage"> Looks like you are not authorized to view this page. Click <a href="/userlogin">here</a> to return home  </span>
						<div className="col-lg-1"></div>
						<img src="/images/error404.png" className="img-responsive" />
					</div>
					<div className="col-lg-3"></div>
				</div>
			</div>
			);

	}

}