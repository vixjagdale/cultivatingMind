import React,{Component} from 'react';

export default class Volunteer extends Component{

	addVolunteerDetails=(e)=>{
		e.preventDefault();
		var formValues={
			firstName     : this.refs.firstName.value,
			lastName      : this.refs.lastName.value,
			mobileNumber  : this.refs.mobileNumber.value,
			emailId       : this.refs.emailId.value,
			aboutYourSelf : this.refs.aboutYourSelf.value,
		}
		Meteor.call("addVolunteer",formValues,(err,res)=>{
			if(err){
				swal("Volenteer already exist","Please try Again","error");
			}else{
				swal("Your Details added successfully","Thank you "+'"'+formValues.firstName+" "+formValues.lastName+'"'+" now you are the part of cultivating minds","success");
				$(".closeModal").click();
			}
		})
	}

	uploadVolunteerImage = ()=>{
		.volunteerBody{
  min-height: 400px;
}
.form-Label{
  padding: 0px;
}
.form-Label span{
  color: #f00;
  font-size: 16px;
}
	}

	render(){
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
				<div id="myModal" className="modal fade" role="dialog">
				  <div className="modal-dialog modal-md">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close closeModal" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Wants to be Volunteer</h4>
				      </div>
				      <form onSubmit={this.addVolunteerDetails}>
					      <div className="modal-body volunteerBody">
						        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
						        	<label className="col-lg-12 form-Label">First Name <span>*</span></label>
						        	<input type="text" name="firstName" ref="firstName" className="form-control" required/>
						        </div>

						        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
						        	<label className="col-lg-12 form-Label">Last Name <span>*</span></label>
						        	<input type="text" name="lastName" ref="lastName" className="form-control" required/>
						        </div>

						        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						        	<label className="col-lg-12 form-Label">Mobile Number <span>*</span></label>
						        	<input type="text" name="mobileNumber" ref="mobileNumber" className="form-control" required/>
						        </div>
						        
						        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						        	<label className="col-lg-12 form-Label">Email Id</label>
						        	<input type="text" name="emailId" ref="emailId" className="form-control"/>
						        </div>
						        
						        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						        	<label className="col-lg-12 form-Label">About Your Self <span>*</span></label>
						        	<textarea  name="aboutYourSelf" ref="aboutYourSelf" className="form-control" rows="4" required placeholder="300 characters limit..."/>
						        </div>

						        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						        	<label className="col-lg-12 form-Label">Your profesional Photo <span>*</span></label>
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
			)
	}
}