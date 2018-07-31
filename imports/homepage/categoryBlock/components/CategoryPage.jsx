import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import CategoryListPage from './CategoryListPage.jsx';

export default class CategoryPage extends TrackeReact(Component){

	constructor(){
		super();
		this.state={
			'subscription':{
				// productData : Meteor.subscribe('allProductData'),
			}
		}

	}

	getProductCatAndCount(){
		// var businessData = Business.find({}).fetch();
		// if(businessData){
		// 	var business=[];
		// 	var businessArray = [];
		// 	for(var i=0; i<businessData.length; i++){
		// 		var businessCategory = businessData[i].businessCategory;
		// 		business.push({
		// 			'businessCategory' : businessCategory,
		// 		});
		// 	}

		// 	// console.log(business);
		// 	var bizCategoryNM = _.pluck(business, "businessCategory");
		// 	var bizUniqueNM   = _.uniq(bizCategoryNM); //get unique bisiness Category	
		// 	for(var j=0; j<bizUniqueNM.length; j++){
		// 		var count = this.getProductCount(bizUniqueNM[j]);
		// 		businessArray.push({
		// 			'businessCategory': bizUniqueNM[j],
		// 			'count'           : count,
		// 			'index'           : j,
		// 		});
		// 	}
		// 	return businessArray;	
		// }
	} 

	// getProductCount(bizCategory){
	// 	return BusinessArray = Business.find({"businessCategory": bizCategory}).count();
	// }

	render(){
		return(
			<div>
				<div className="col-lg-12
							col-md-12
							col-sm-12
							col-xs-12 homePageTileWrap">
					{/*{this.getProductCatAndCount().map( (xyz)=>{
						return <CategoryListPage key="" getCompCatAndCount=""/> 
					})}*/}
				</div>
			</div>
		);
	}
}
