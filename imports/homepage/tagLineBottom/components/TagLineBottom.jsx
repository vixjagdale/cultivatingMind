import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { BottomTagLineBlockData } from '/imports/adminDashboard/bottomTagLineBlock/api/BottomTagLineBlock.js';

class TagLineBottom extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	addVolunteerDetails=(e)=>{
		e.preventDefault();
		var formValues={
			volunteersName          : this.refs.volunteersName.value,
			volunteersMobile        : this.refs.mobileNumber.value,
			volunteersEmailId       : this.refs.emailId.value,
			volunteersProfession    : this.refs.Profession.value,
			aboutYourSelf           : this.refs.aboutYourSelf.value,
		}
		Meteor.call("addUpdateVolunteers",formValues,(err,res)=>{
			if(err){
				swal("somthing went wrong","Please try Again","error");
			}else{
				swal("Your Details added successfully","Thank you"+formValues.volunteersName+" now you are the part of cultivating minds","success");
			}
		})
	}

	uploadVolunteerImage=(event)=>{
		let self = this;
	    if (event.currentTarget.files && event.currentTarget.files[0]) {
		    var file = event.currentTarget.files[0];
		      	if (file) {
		      	   var fileName  = file.name; 
		      	 
		      	     var ext       = fileName.split('.').pop();  
	                  	if(ext=="jpg" || ext=="png" || ext=="jpeg"){    
	                        if (file) {   
	                        	self.setState({
	                        		self : self,
	                        		file : file,
	                        	})
		        				addEventImages(file,self);
			     			}else{           
			             			 swal("File not uploaded","Something went wrong","error");  
			                     }     
	                   	}else{ 
	                       swal("Please upload file","Only Upload  images format (jpg,png,jpeg)","error");   
	                    } 
		    	}

	    }
	}
	

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tagBottomMain">
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 tagLineBottom">
						{this.props.post.headLine}
					</div>
					<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
						<input type="button" className="btn btnTagLine" value="Become a volunteer" data-toggle="modal" data-target="#myModalVol"/>

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div id="myModalVol" className="modal fade" role="dialog">
						  <div className="modal-dialog modal-md">
						    <div className="modal-content">
						      <div className="modal-header">
						        <button type="button" className="close" data-dismiss="modal">&times;</button>
						        <h4 className="modal-title">Wants to be Volunteer</h4>
						      </div>
						      <form onSubmit={this.addVolunteerDetails}>
							      <div className="modal-body volunteerBody">
								        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								        	<label className="col-lg-12 form-Label vol-form-control">Full Name <span>*</span></label>
								        	<input type="text" name="volunteersName" ref="volunteersName" className="form-control" required/>
								        </div>

								        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								        	<label className="col-lg-12 form-Label vol-form-control">Mobile Number <span>*</span></label>
								        	<input type="text" name="mobileNumber" ref="mobileNumber" className="form-control" required/>
								        </div>
								        
								        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
								        	<label className="col-lg-12 form-Label vol-form-control">Email Id</label>
								        	<input type="text" name="emailId" ref="emailId" className="form-control"/>
								        </div>
								        
								        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								        	<label className="col-lg-12 form-Label vol-form-control">Profession <span>*</span></label>
								        	<input type="text" name="Profession" ref="Profession" className="form-control" required/>
								        </div>

								        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								        	<label className="col-lg-12 form-Label vol-form-control">About Your Self <span>*</span></label>
								        	<textarea  name="aboutYourSelf" ref="aboutYourSelf" className="form-control" rows="4" required placeholder="300 characters limit..."/>
								        </div>

								        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								        	<label className="col-lg-12 form-Label vol-form-control">Your profesional Photo <span>*</span></label>
								        	<input type="file" onChange={this.uploadVolunteerImage} />
								        </div>
								  </div>
							      <div className="modal-footer">
							        <button type="submit" className="btn btn-primary">Submit</button>
							      </div>
						      </form>
						    </div>

						  </div>
						</div>
					</div>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('bottomTagLineBlock');
    const post         = BottomTagLineBlockData.findOne({"id":101})||{};
    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(TagLineBottom);