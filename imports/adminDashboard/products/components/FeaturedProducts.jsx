import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Products } from '../api/products.js';

export default class FeaturedProducts extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
			"subscription" : {
				"featuredProducts" : Meteor.subscribe("featuredProducts"),
			}

		  };	   	
	}

	allProducts(){
		return Products.find({"topProduct" : true}).fetch();
	}

	render() {

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">Featured Products</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


						<div className="table-responsive col-lg-12 categoryTable">
							<table className="table table-striped table-hover myTable table-bordered" id="example">
								<thead>
									<tr className="tableHeader">
										<th> Sr. </th>
										<th> Product<br/> Name </th>
										<th> Brand </th>
										<th> Short<br/> Description </th>
										<th> Material <br/>& Care </th>
										<th> Description </th>
										<th> Price </th>
										<th> Discount </th>
										<th> Category </th>
									</tr>
								</thead>
								<tbody>
									{ this.allProducts().map( (productInfo,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{productInfo.productName}</td>
													<td>{productInfo.brand}</td>
													<td>{productInfo.shortDescription}</td>
													<td>{productInfo.materialCare}</td>
													<td>{productInfo.description}</td>
													<td>{productInfo.price}</td>
													<td>{productInfo.discount}</td>
													<td>{productInfo.category}</td>
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


