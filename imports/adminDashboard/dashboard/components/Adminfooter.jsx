import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdminHeader extends TrackerReact(Component) {

	render() {

		return(
				<footer className="main-footer">
				    <div className="pull-right hidden-xs">
				      <b>Version</b> 1.0.0
				    </div>
				    <strong>Copyright &copy; 2018 <a href="#" target="_blank">avaComp</a>.</strong> All rights
				    reserved.
				</footer>
			);

	}

}