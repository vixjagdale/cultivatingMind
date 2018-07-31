import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class BreadCrumb extends TrackerReact(Component) {

	render(){
    	return(
    		<section className="content-header">
		      <h1>
		        Dashboard
		      </h1>
		      <ol className="breadcrumb">
		        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
		        <li className="active">Dashboard</li>
		      </ol>
		    </section>
    		);
	}
}