import React,{Component} from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
// import CategoryListPage from './CategoryListPage.jsx';
import { Products } from '/imports/adminDashboard/products/api/products.js';
import { Session } from 'meteor/session';
class ProductInformation extends TrackeReact(Component){

	constructor(){
		super();
	}
    

	render(){

		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productInformationPageWrap">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 productWrapInwrapTit">
                    Product Details
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 productWrapInwrap">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <img src={this.props.post.productImg} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleProductImg"/>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrapprize">
                           <i className="fa fa-inr indRupee"></i> {this.props.post.price} /-
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrapmob">
                           <span className="callusWrap"> Call Us - </span> +91 7030743237
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 detailWrapProd">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrap">
                            {this.props.post.productName} ( {this.props.post.brand})<br/>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrapshort">
                            {this.props.post.shortDescription}<br/><br/>
                            {this.props.post.description}

                        </div>
                        
                        
                    </div>
                </div>
				
			</div>
		);
	}
}
export default ShowProdutInfoContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var productid      = FlowRouter.getParam("productId");
    console.log(productid);
    const postHandle   = Meteor.subscribe('findProducts',productid);
    const post         = Products.findOne({'_id':productid})||{};
    console.log(post);
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(ProductInformation);

