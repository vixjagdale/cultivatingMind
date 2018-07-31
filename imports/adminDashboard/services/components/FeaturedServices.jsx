import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Services } from '../api/services.js';

export default class FeaturedServices extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
			"subscription" : {
				"featuredServices" : Meteor.subscribe("featuredServices"),
			}

		  };	   	
	}

	allServices(){
		return Services.find({"topService" : true}).fetch();
	}

	render() {

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">FEATURED SERVICES</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


						<div className="table-responsive col-lg-12 categoryTable">
							<table className="table table-striped table-hover myTable table-bordered" id="example">
								<thead>
									<tr className="tableHeader">
										<th> Sr. </th>
										<th> Service<br/> Name </th>
										<th> Short<br/> Description </th>
										<th> Description </th>
										<th> Price </th>
										<th> Discount </th>
									</tr>
								</thead>
								<tbody>
									{ this.allServices().map( (serviceInfo,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{serviceInfo.serviceName}</td>
													<td>{serviceInfo.shortDescription}</td>
													<td>{serviceInfo.description}</td>
													<td>{serviceInfo.price}</td>
													<td>{serviceInfo.discount}</td>
											   </tr>
									  }) 
									}									
								</tbody>
							</table>
						</div>

						</div>
						</div>
					</div>	
				</div>
				</div>
			</section>
		    );


	} 

}


