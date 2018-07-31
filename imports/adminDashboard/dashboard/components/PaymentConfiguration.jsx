import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { PaymentSetting } from '../api/paymentSetting.js';

class PaymentConfiguration extends TrackerReact(Component) {

	 componentDidMount() {
	 	renderFunction();
	 	$("html,body").scrollTop(0);
	 }

	 paymentConfig(event){
	 	event.preventDefault();
	 	var commission = this.refs.commission.value;

	    Meteor.call('insertPaymentConfig',commission, (error,result)=>{
	    	if(error){
	    		console.log("error"+error);
	    	}else{
	    		swal("SpotYL Commission Added Successfully!");
	    			this.setState({
					  	commission : commission,
				    }); 		
	    	}
	    });
	 }

	 constructor(props) {
	  super(props);
	  if( Object.keys(this.props.post).length != 0 ){
		  this.state = {
		    commission     : this.props.post.commission,
		  };

	  }else{
		  this.state = {
		    commission     : '',
		  };	  	
	  }
	    this.handleChange = this.handleChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
	
        this.setState({
            commission  : nextProps.post.commission,
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
	    const target = event.target;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });

	  }



	render() {

       return (

       	<section className="NotificationContent">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <div className="box box-primary">
              <div className="box-header with-border">
              <h2 className="contentTitle">PAYMENT CONFIGURATION</h2>
              </div>
           
	            <div className="box-body">
					<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					  <form id="paymentConfig" onSubmit={this.paymentConfig.bind(this)}>
						  <div className="signup col-lg-12 col-md-8 col-sm-12 col-xs-12">

					   		<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
					   			
						    

						    <div className="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3">
						    	<span className="checkoutTitle">SpotYL Commission &nbsp;&nbsp;:</span>
						    </div>
    						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group input-group">
    					   	  <input type="number" className="form-control" ref="commission" name="commission" onChange={this.handleChange.bind(this)} value={this.state.commission}/>
    					   	  <span className="input-group-addon">%</span>
    					   	</div>

    					   	</div>

							<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
						    	<input className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" type="submit" value="SUBMIT"/>
						   </div>	

						  </div> 
					  </form>
			 	 	</div>	
			 	</div>
		 	</div>
		 </div>
		 </div>
		 </section>
	    );

	} 

}

PaymentConfigurationContainer = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
    const postHandle = Meteor.subscribe('paymentConfiguration');
    const post       = PaymentSetting.findOne({})||{};
    // console.log(post);
    const loading    = !postHandle.ready();
	    return {
	        loading,
	        post,
	    };  
})(PaymentConfiguration);

export default PaymentConfigurationContainer;