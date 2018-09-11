import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import { OurCases } from '../api/ourCases.js';

class OurCasesForm extends Component{

	constructor(props) {
	  super(props);

		  this.state = {
		  	"casesShortDesc"  : '',
		  	"casestitle"      : '',
		  	"shortDescription"  : '',
		  	'raised'            : '',
		  	'goal'              : '',				
			}
		  };	   	
		    this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps){
			if(nextProps.post){

		            this.setState({
          				  	"casesShortDesc"  : nextProps.post.casesShortDesc,
						  	"casestitle"      : nextProps.post.missiontitle,
						  	"shortDescription"  : nextProps.post.shortDescription,
						  	"raised"  : nextProps.post.raised,
						  	"goal"  : nextProps.post.goal,
		            })

		            
	    	}
    	}
    	this.handleInputChange = this.handleInputChange.bind(this);
    }


	  handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });

	  }

	addOurMissionDetails(event){
		event.preventDefault();
		var casesId      = FlowRouter.getParam("casesId");
		var missionImg = Session.get('missionImg');
		var formValues = {
				'casesShortDesc' : this.refs.casesShortDesc.value,
				'casestitle'     : this.refs.casestitle.value,
				'shortDescription' : this.refs.shortDescription.value,
				'raised'           : this.refs.raised.value,
				'goal'             : this.refs.goal.value,
				'_id'              : casesId,
			}
		    Meteor.call('addMission', formValues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
					this.refs.casesShortDesc.value = '';
					this.refs.casestitle.value = '';
					this.refs.shortDescription.value = '';
					this.refs.raised.value = '';
					this.refs.goal.value = '';
					if(casesId){
		    			swal('Updated successfully!');
		    		}else{
		    			swal('Added successfully!');
		    		}
		    	}
		    });	

	}

	allCategories(){
		return Categories.find({}).fetch()
	}

	//get image from user
	
	productImgBrowse(event){
	    event.preventDefault();

	    /*--------------Code form Logo Image-----------*/

	    var file = event.target.files[0];  //assuming you have only one file
	    var render = new FileReader(); //this works only in html5
	      render.onload =function(event){
	         var fileData = render.result;
	         var fileName = file.name;
	         Session.set("missionImg",fileData);
	         // Meteor.call('tempLogoImageUpload', fileName, fileData,function(err,result){
	         //  if(err){
	         //    console.log(err);
	         //  }else{
	         //    console.log('Image Uploaded!');
	         //  }
	         // });
	      };

	      render.readAsDataURL(file);
  }

  //image upload


uploadProductImage(event){
    event.preventDefault();
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
    var file = event.currentTarget.files[0];

      if (file) {
        addProductImgsToS3Function(file,self);
      }
    }
  }



	render() {

		if(!this.props.loading){
		if(this.props.post){

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">ADD NEW Mission</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR meetingOuterWrap">

								<form onSubmit={this.addOurMissionDetails.bind(this)}>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-12 col-sm-12 col-xs-12 col-md-12 allTimeLabel">Our Cases Short Description</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.casesShortDesc} ref="casesShortDesc" name="casesShortDesc" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Cases Title</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.casestitle} ref="casestitle" name="casestitle" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Short Description</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<textarea className="effectAddress UMname form-control" type="text" rows="5" onChange={this.handleInputChange.bind(this)} value={this.state.shortDescription} ref="shortDescription" name="shortDescription" required></textarea>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Raised</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.raised} ref="raised" name="raised" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Goal</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.goal} ref="goal" name="goal" required/>
						                      <span className="input-group-addon addons"><i className="fa fa-envelope"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Cases Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" accept="file/*" onChange={this.uploadProductImage.bind(this)} type="file" ref="missionImg" name="slideImg"/>
						                      <span className="input-group-addon addons"><i className="fa fa-picture-o"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<input type="submit" className="btn btn-primary col-lg-4 col-lg-offset-4 col-md-3 col-sm-12 col-xs-12 btn-Btn1" value="UPDATE"/>
								</div>
							</form>
							</div>
						</div>
						</div>
					</div>	
				</div>
				</div>
			</section>
		    );

	   		}else{
	    		return (
	    			<div className="col-sm-12 col-xs-12 loadingImg"><img src="images/loading.gif" alt="loading"/></div>
	    		);
	    	}
	    }else{
	    	return (
            <div className="col-sm-12 col-xs-12 loadingImg"><img src="images/loading.gif" alt="loading"/></div>
	    	);
	    }


	} 

}

export default OurCasesFormContainer  = withTracker(props => {

    var casesId      = FlowRouter.getParam("casesId");
    const postHandle   = Meteor.subscribe('singleMission',casesId);
    const post         = OurMission.findOne({'_id':casesId})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(OurCasesForm);


