import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { GetInTouch } from  '/imports/homepage/contactUs/api/GetInTouch.js';

class TopTagLineBlock extends TrackeReact(Component){

	constructor(props){
		super(props);

	}

    componentWillReceiveProps(nextProps) {

    }

	submit(event){
		event.preventDefault();

	}


	render(){
			return(
					<section className="content">
				        <div className="row">
				          <div className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				            <div className="box box-primary">
				              <div className="box-header with-border">
				              <h2 className="formTitle">Enquiries</h2>
				              </div>
				           
					            <div className="box-body marginTop">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
									{ this.props.post.map( (data,index)=>{
									return(<div key={index} className="col-lg-12 col-md-12 col-sm-3 col-xs-12 enquiryWrapper">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 enquiryName"> <div className="col-lg-1 col-md-12 col-sm-12 col-xs-12"><b>From</b></div> {data.name} ( <i className="fa fa-envelope enquiryEmail" aria-hidden="true"></i> {data.email} | <i className="fa fa-phone enquiryContact" aria-hidden="true"></i> {data.phone} )</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 enquirySubject"> <div className="col-lg-1 col-md-12 col-sm-12 col-xs-12"><b>Subject</b></div> {data.subject}</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 enquiryMsg"> <div className="col-lg-1 col-md-12 col-sm-12 col-xs-12"><b>Message</b></div> {data.message}</div>
										    </div>)
										})
									}
							 	 	</div>	
							 	</div>
						 	</div>
						 </div>
						 </div>
					 </section>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
    const postHandle = Meteor.subscribe('GetInTouch');
    const post       = GetInTouch.find({},{sort:{createdAt:-1}}).fetch() || [];
    console.log('post : ',post);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
    };
})(TopTagLineBlock);