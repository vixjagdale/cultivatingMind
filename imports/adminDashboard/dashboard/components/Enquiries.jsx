import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ContactUs } from '/imports/contactUs/api/contactUs.js';

export default class Enquiries extends TrackerReact(Component){

	constructor(props) {
	  super(props);

		  this.state = {
			"subscription" : {
				"allContactMsgs" : Meteor.subscribe("allContactMsgs"),
			}
		  };	   	
	}

	allContactMsgs(){
		return ContactUs.find({},{ sort: { "createdAt": -1 }}).fetch();
	}

	render() {

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">Enquiries</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						{ this.allContactMsgs().map( (data,index)=>{
							return (
									<div key = {index} className="msgWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<b>{data.email}</b> ({data.name})<br/>
										<span className="dateMsg">{moment(data.createdAt).format('LLL')}</span><br/><br/>
										<b>{data.subject}</b><br/>
										{data.message}<br/>
									</div>
								);
						  }) 
						}
						</div>
						</div>
					</div>	
				</div>
				</div>
			</section>
		    );
	} 

}



