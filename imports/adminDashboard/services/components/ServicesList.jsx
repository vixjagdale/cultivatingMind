import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Services } from '../api/services.js';

export default class ServicesList extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
			"subscription" : {
				"allServices" : Meteor.subscribe("allServices"),
			}

		  };	   	
	}

	allServices(){
		return Services.find({}).fetch();
	}


	deleteService(event){
		event.preventDefault();
		var dltId = event.target.id;
		console.log('dltId: ',dltId);
	    Meteor.call('deleteService', dltId, (error,result)=>{
	    	if(error){
	    		console.log("client error"+error);
	    		swal(error);
	    	}else{
	    		swal('Service deleted successfully!');
	    	}
	    });		
	}

	  handleInputChange(event) {
	    const serviceId = event.target.value;
	    // console.log(serviceId);
	    // console.log(event.target.checked);
	    var value = event.target.checked;
	    Meteor.call('featuredService', serviceId, value, (error,result)=>{
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
			            <h4 className="contentTitle">SERVICE LIST</h4>
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
										<th> Featured <br/>Service </th>
										<th> Action </th>
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
													<td><input type="checkbox" name="featured" value={serviceInfo._id} onChange={this.handleInputChange.bind(this)} checked={serviceInfo.topService}/></td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addService-'+index}></i>
														<a href={"/addNewService/"+serviceInfo._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addService-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete Service</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete service '{serviceInfo.productName}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={serviceInfo._id} onClick={this.deleteService.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
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


