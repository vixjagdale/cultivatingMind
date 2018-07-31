import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
// import CategoryListPage from './CategoryListPage.jsx';
import { Products } from '/imports/adminDashboard/products/api/products.js';

export default class TopProductsBlock extends TrackeReact(Component){

	constructor(){
		super();
		this.state={
			'subscription':{
				featuredProducts : Meteor.subscribe('featuredProducts'),
				allProducts : Meteor.subscribe('allProducts'),
			}
		}
	}

	showTopProducts(){
		return Products.find({"topProduct" : true});
	}

	allProducts(event){
		event.preventDefault();
		FlowRouter.go('/products');
	}

	buildRegExp(searchText) {
   // console.log('buildRegExp business');
	   var words = searchText.trim().split(/[ \-\:]+/);

	   var exps = _.map(words, function(word) {
	      return "(?=.*" + word + ")";
	   });

	   var fullExp = exps.join('') + ".+";
	   return new RegExp(fullExp, "i");
	}

	getTextValue(event){
		var bizValue= $('#product').val();
		if(bizValue.length==0){
			 $('.showHideSearchList').addClass('hideSearchList').removeClass('showSearchList');
		}
		if(bizValue.length>0){
			$('.showHideSearchList').addClass('showSearchList').removeClass('hideSearchList');
		}
		var RegExpBuildValue = this.buildRegExp(bizValue);
		var businessData = Products.find({$or:[{'productName': RegExpBuildValue},
											   {'brand': RegExpBuildValue},
											   {'category':RegExpBuildValue}]}).fetch();
		if(businessData){
			var myBizArray = [];
			for(var i=0; i<businessData.length; i++){
				var _id     = businessData[i]._id;
				var bizName = businessData[i].category;
				myBizArray.push({_id, bizName});
			}
			var productCategory = _.pluck(myBizArray,"bizName");
			var prodCatArray    = _.uniq(productCategory);
			// console.log(prodCatArray);
			var topProdCatArray = [];
			for(var j=0; j<prodCatArray.length;j++){
				var categoryNM = prodCatArray[j];
				topProdCatArray.push(
					categoryNM
				);
			} 
			// console.log("my top araay",topProdCatArray);
			Session.set('myBizArray',topProdCatArray);
			return topProdCatArray;
		}else{
			Bert.alert("Please Enter Product, brand or category","danger","growl-top-right");
		}
	}
	componentDidMount(){
         $('.showHideSearchList').addClass('hideSearchList').removeClass('showSearchList');
    }

	render(){

		var bizNameArray = [];
		var bizArray = Session.get('myBizArray');
		// console.log("myArray",bizArray);
		if(bizArray){
			var bizArrayLen = bizArray.length;
			// console.log("length",bizArrayLen);
			for(var i=0; i<bizArrayLen; i++){
				var bizName = bizArray[i];
				// console.log("vikas",bizName);
				bizNameArray.push(
					
							<a href={`/product/${bizName}`} key={i}>
								<li className="SearchproductList">
				            		{bizArray[i]}
				           	 	</li>
				            </a>
				        
			        )
			}	
		}

		return(
			<div>
				<div className="col-lg-12
							col-md-12
							col-sm-12
							col-xs-12 homeTopProdWrap">
					<h4 > TOP PRODUCTS </h4>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 search">
					  <input type="text" placeholder="Search Products.." name="search2" id="product" onInput={this.getTextValue.bind(this)}/>
					  <button type="submit" ><i className="fa fa-search"></i></button>
					  <div className="searcBizLi">
						  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 searchBizList" key={i}>
					        <div className="showHideSearchList">
						        <ul className="searchBizUl">
							  		{bizNameArray}
							  	</ul>
					        </div>
				          </div>
						</div>
					</div>

					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">

						{ this.showTopProducts().map( (products,index)=>{
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
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topProductWrap view view-first">
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

					<div className="topProdShowMore col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="btn btn-primary showMoreProd" onClick={this.allProducts.bind(this)}>SHOW MORE</button>
					</div>
				</div>
			</div>
		);
	}
}
