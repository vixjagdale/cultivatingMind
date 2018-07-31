import React,{Component} from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
// import CategoryListPage from './CategoryListPage.jsx';
import { Services } from '/imports/adminDashboard/services/api/services.js';
import { Session } from 'meteor/session';
class ServiceInformation extends TrackeReact(Component){

	constructor(){
		super();
	}
    

	render(){

		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productInformationPageWrap">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 productWrapInwrapTit">
                    Service Details
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 productWrapInwrap">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <img src={this.props.ServiceData.serviceImg} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleProductImg"/>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrapprize">
                           <i className="fa fa-inr indRupee"></i> {this.props.ServiceData.price} /-
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrapmob">
                           <span className="callusWrap"> Call Us - </span> +91 7030743237
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 detailWrapProd">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrap">
                            {this.props.ServiceData.serviceName} <br/>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProddetailsWrapshort">
                            {this.props.ServiceData.shortDescription}<br/><br/>
                            {this.props.ServiceData.description}

                        </div>
                        
                        
                    </div>
                </div>
				
			</div>
		);
	}
}
export default ShowServiceInfoContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var serviceId      = FlowRouter.getParam("serviceId");
    const postHandle   = Meteor.subscribe('findService',serviceId);
    const ServiceData  = Services.findOne({'_id':serviceId})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        ServiceData,
    };
})(ServiceInformation);

