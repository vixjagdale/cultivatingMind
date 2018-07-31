import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
// import CategoryListPage from './CategoryListPage.jsx';
import { Products } from '/imports/adminDashboard/products/api/products.js';

export default class ShowAllProducts extends TrackeReact(Component){

	constructor(){
		super();
		this.state={
			'subscription':{
				allProducts : Meteor.subscribe('allProducts'),
			}
		}
	}

	showAllProducts(){
		return Products.find({});
	}

	render(){
		return(
			<div>
				<div className="col-lg-12
							col-md-12
							col-sm-12
							col-xs-12 homeTopProdWrap">
					<h4> ALL PRODUCTS </h4>

					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">

						{ this.showAllProducts().map( (products,index)=>{
							var productName      = products.productName;
							var shortDescription = products.shortDescription;
							var brand            = products.brand;
							var Productlen = productName.length;
							var SDlen      = shortDescription.length;
							var brandlen   = brand.length;
							if(Productlen >22){
								// var productName = jQuery.trim(productName).substring(0, 18)+ "...";
								var fontSizeText = 'myFontSize';
							}
							if(SDlen >80){
								shortDescription = jQuery.trim(shortDescription).substring(0, 75)+ "...";
							}
							if(brandlen>15){
								$('.brandnameTit').addClass('brandName'); 
							}
							return (
										<div key = {index} className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
											<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tupProdOutWrap">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topProductWrap allServicesImg view view-first">
													<div className={"productNM "+ fontSizeText}> {productName} </div>
													<img src={products.productImg}/>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mask">
								                        <h3 className="brandnameTit">{brand}</h3>
								                        <p>{shortDescription}</p>
								                        <h3>Call - 7030743237</h3>
								                        <a href={`/productInfo/${products._id}`} className="info">
								                        	<button className="btn btn-danger productBtnReadMore" data-target="modal"> Product Details </button>
								                        </a>
							                   		 </div>
													<div className="productPrize"> <i className="fa fa-inr" aria-hidden="true"></i> {products.price}</div>
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
