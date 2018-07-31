import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Products } from '../api/products.js';

export default class ProductsList extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
			"subscription" : {
				"allProducts" : Meteor.subscribe("allProducts"),
			}

		  };	   	
	}

	allProducts(){
		return Products.find({}).fetch();
	}


	deleteProduct(event){
		event.preventDefault();
		var dltId = event.target.id;
		console.log('dltId: ',dltId);
	    Meteor.call('deleteProducts', dltId, (error,result)=>{
	    	if(error){
	    		console.log("client error"+error);
	    		swal(error);
	    	}else{
	    		swal('Product deleted successfully!');
	    	}
	    });		
	}

	  handleInputChange(event) {
	    const productId = event.target.value;
	    // console.log(productId);
	    // console.log(event.target.checked);
	    var value = event.target.checked;
	    Meteor.call('featuredProduct', productId, value, (error,result)=>{
	    	if(error){
	    		console.log("client error"+error);
	    		swal(error);
	    	}else{
	    	}
	    });	
	  }

	render() {

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">Product List</h4>
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
										<th> Featured <br/>Products </th>
										<th> Action </th>
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
													<td><input type="checkbox" name="featured" value={productInfo._id} onChange={this.handleInputChange.bind(this)} checked={productInfo.topProduct}/></td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addProduct-'+index}></i>
														<a href={"/addNewProducts/"+productInfo._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addProduct-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete Product</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete product '{productInfo.productName}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={productInfo._id} onClick={this.deleteProduct.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
														        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
														      </div>
														    </div>
														  </div>
														</div>

													</td>
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


