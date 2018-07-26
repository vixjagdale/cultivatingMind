/*  
	PROGRAMMER: VIKAS JAGDALE 
	. 

*/

import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {render} from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';
export default class FormStructure extends Component  {
	
	componentDidMount() {

      if ( !$('body').hasClass('adminLte')) {
          console.log("adminLte.js appended!");
          var adminLte = document.createElement("script");
          adminLte.type = "text/javascript";
          adminLte.src = "/js/adminLte.js";
          adminLte.setAttribute('id','adminLte');
          $("body").append(adminLte);
        }
  }

  componentWillUnmount(){
    	$("script[src='/js/adminLte.js']").remove();
    	$("link[href='/css/dashboard.css']").remove();
  	}

  constructor(props){
		super(props);
		this.state={
				
		}
		this.handleChange = this.handleChange.bind(this);
	}

  	studentRegistration(event){
  		
  	}

  	componentWillReceiveProps(nextProps){
  		if(nextProps){
  			this.setState({
  				
  			});
		this.handleChange = this.handleChange.bind(this);

  		}
  	}

  	handleChange(event){
		const target = event.target;
		const name   = target.name;
		this.setState({
		  [name]: event.target.value,
		});
  	}
 	
	render(){
		return(
			<div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper">
		          {/* Content Header (Page header) */}
		          <section className="content-header">
		            <h1>Registration Form</h1>
		          </section>
		          {/* Main content */}
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<form onSubmit={this.studentRegistration.bind(this)}>
			
				
								<div className="col-lg-12 col-md-12 col-sm-12">
									<div className="col-lg-12 col-md-12 col-sm-12 studPerInfoWrap studHeadingWrap">Personal Information :</div>
									<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
										<span className="blocking-span"> 
											<input type="text" name="studentFirstName" ref="studentFirstName" value={this.state.studentFirstName} onChange={this.handleChange} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" pattern="[a-zA-Z][a-zA-Z ]+" title="Only Alphabets Are Allowed!" autoComplete="off" required/>
											<span className="col-lg-12 col-md-12 col-sm-12 floating-label">First Name</span>					   			
										</span>
										<input type="hidden" name="_id" ref="_id"/>
									</div>
									
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
										<span className="blocking-span"> 
											<select type="text" name="studentState" ref="studentState" value={this.state.studentState} onChange={this.handleChange} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" title="Select State" autoComplete="off" required>
												<option value=''>--Select State--</option>
												<option>Andhra Pradesh</option>
												<option>Arunachal Pradesh</option>
												<option>Assam</option>
												<option>Bihar</option>
												<option>Chhattisgarh</option>
												<option>Delhi</option>
												<option>Goa</option>
												<option>Gujarat</option>
												<option>Haryana</option>
												<option>Himachal Pradesh</option>
												<option>Jammu and Kashmir</option>
												<option>Jharkhand</option>
												<option>Karnataka</option>
												<option>Kerala</option>
												<option>Madhya Pradesh</option>
												<option>Maharashtra</option>
												<option>Manipur</option>
												<option>Meghalaya</option>
												<option>Mizoram</option>
												<option>Nagaland</option>
												<option>Odisha</option>
												<option>Punjab</option>
												<option>Rajasthan</option>
												<option>Sikkim</option>
												<option>Tamil Nadu</option>
												<option>Telangana</option>
												<option>Tripura</option>
												<option>Uttar Pradesh</option>
												<option>Uttarakhand</option>
												<option>West Bengal</option>
											</select>
											<span className="col-lg-12 col-md-12 col-sm-12 floating-label floating-label-Date">Select State</span>					   			
										</span>
									</div>
									
									<div className="col-lg-2 col-md-2 col-sm-2 examTypeBtn examTypeBtn1 ">
											<label className="examTypecontainer">
											<input type="radio" checked="checked" name="genderType" ref="genderType" value="Male" checked='' onChange={this.handleChange} checked/>
											  <span className="checkmark"></span>
											  <span>Male</span>
											</label>
									</div>
									<div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 examTypeBtn">
										<label className="examTypecontainer">
										  <input type="radio" name="genderType" ref="genderType" value="Female" checked='' onChange={this.handleChange} />
										  <span className="checkmark"></span>
										  <span>Female</span>
										</label>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
										<button className="btn btn-primary studRegister pull-right">Confirm & Register</button>
									</div>
									
								</div>
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </section>
				</div>
			</div>
			);
	}
}
