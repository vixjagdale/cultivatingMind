import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
// import CategoryListPage from './CategoryListPage.jsx';
import { Services } from '/imports/adminDashboard/services/api/services.js';
import { Session } from 'meteor/session';
export default class SearchServicePage extends TrackeReact(Component){

	constructor(){
		super();
		this.state={
			'subscription':{
				allServices : Meteor.subscribe('allServices'),
			}
		}
	}

	showAllServices(){
		var serviceNM     = FlowRouter.getParam('serviceName');
		Session.set('serviceNM',serviceNM);
		var a = Services.find({"serviceName":serviceNM}).fetch();
		return a;
	}

	render(){
		return(
			<div>
				<div className="col-lg-12
							col-md-12
							col-sm-12
							col-xs-12 homeTopProdWrap ">
					<h4> {Session.get("serviceNM")} PRODUCTS </h4>

					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">

						{ this.showAllServices().map( (services,index)=>{
							var serviceName      = services.serviceName;
							var shortDescription = services.shortDescription;
							var serNM            = serviceName.lenght;
							var SDNM             = shortDescription.length;
							if(serNM>20){
								var serviceName = jQuery.trim(serviceName).substring(0, 19) + "...";
							}
							if(SDNM>80){
								shortDescription = jQuery.trim(shortDescription).substring(0, 75) + "...";
							}
							return (
									<div key = {index} className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
										<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tupProdOutWrap">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topProductWrap view view-first">
												<div className="productNM"> {serviceName} </div>
												<img src={services.serviceImg} />
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mask">
							                        <h2>{services.brand}</h2>
							                        <p>{shortDescription}</p>
							                        <h3>Call - 7030743237</h3>
							                        <a href={`/serviceInfo/${services._id}`} className="info">
							                        	<button className="btn btn-danger productBtnReadMore"> Service Details </button>
							                        </a>
							                   	</div>
												{/*<div className="productPrize"> <i className="fa fa-inr" aria-hidden="true"></i> {Services.price}</div>*/}
											</div>
										</div>
									</div>
								);
						  }) 
						}	
					</div>
				</div>
			</div>
		);
	}
}
