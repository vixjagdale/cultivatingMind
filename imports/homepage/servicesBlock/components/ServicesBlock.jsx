import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { Services } from '/imports/adminDashboard/services/api/services.js';

export default class ServicesBlock extends TrackeReact(Component){

	constructor(){
		super();
		this.state={
			'subscription':{
				featuredServices : Meteor.subscribe('featuredServices'),
			}
		}
	}

	showTopServices(){
		return Services.find({"topService" : true});
	}

	allServices(event){
		event.preventDefault();
		FlowRouter.go('/services');
	}

	buildRegExpSer(searchText) {
   // console.log('buildRegExp business');
	   var words = searchText.trim().split(/[ \-\:]+/);

	   var exps = _.map(words, function(word) {
	      return "(?=.*" + word + ")";
	   });

	   var fullExp = exps.join('') + ".+";
	   return new RegExp(fullExp, "i");
	}

	getService(event){
		var serviceValue= $('#seviceValue').val();
		if(serviceValue.length==0){
			 $('.showHideSearchList').addClass('hideSearchList1');
			 $('.showHideSearchList').removeClass('showSearchList1');
		}
		if(serviceValue.length>0){
			$('.showHideSearchList').addClass('showSearchList1').removeClass('hideSearchList1');
		}
		var RegExpBuildValue = this.buildRegExpSer(serviceValue);
		var businessData = Services.find({$or:[{'serviceName': RegExpBuildValue},
											   {'shortDescription': RegExpBuildValue}]}).fetch();
		if(businessData){
			var myServiceArray = [];
			for(var i=0; i<businessData.length; i++){
				var _id     = businessData[i]._id;
				var serviceName = businessData[i].serviceName;
				myServiceArray.push({_id, serviceName});
			}
			var serviceArray  = _.pluck(myServiceArray,"serviceName");
			var uniqServiceNM = _.uniq(serviceArray);
			var uniqServicesArray = [];
			for(var j=0; j<uniqServiceNM.length;j++){
				var serviceNM = uniqServiceNM[j];
				uniqServicesArray.push(serviceNM);
			}
			Session.set('myServiceArray',uniqServicesArray);
			return uniqServicesArray;
		}else{
			Bert.alert("Please Enter Product, brand or category","danger","growl-top-right");
		}
	}

	componentDidMount(){
         $('.showHideSearchList').addClass('hideSearchList1');
         $('.showHideSearchList').removeClass('showSearchList1');
    }


	render(){
		var ServiceNameArray = [];
		var ServiceArray = Session.get('myServiceArray');
		if(ServiceArray){
			var ServiceArrayLen = ServiceArray.length;
			for(var i=0; i<ServiceArrayLen; i++){
				var serviceName = ServiceArray[i];
				// console.log(bizId);
				ServiceNameArray.push(
					
							<a href={`/service/${serviceName}`} key={i}>
								<li className="SearchproductList">
				            		{ServiceArray[i]}
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
					<h4> TOP SERVICES </h4>
					<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12  search">
					  <input type="text" placeholder="Search Services.." name="search2" id="seviceValue" onInput={this.getService.bind(this)}/>
					  <button type="submit"><i className="fa fa-search"></i></button>
					   <div className="searcBizLi">
						  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 searchBizList" key={i}>
					        <div className="showHideSearchList">
						        <ul className="searchBizUl">
							  		{ServiceNameArray}
							  	</ul>
					        </div>
				          </div>
						</div>
					</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">

						{ this.showTopServices().map( (services,index)=>{
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
										<div className="col-lg-12 col-md-3 col-sm-12 col-xs-12 tupProdOutWrap">
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
												<div className="productPrize"> <i className="fa fa-inr" aria-hidden="true"></i> {services.price}</div>
											</div>
										</div>
									</div>
								);
						  }) 
						}	

					</div>
					<div className="topProdShowMore col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="btn btn-primary showMoreProd .productBtnReadMore" onClick={this.allServices.bind(this)}>SHOW MORE</button>
					</div>
				</div>
			</div>
		);
	}
}
