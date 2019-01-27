import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { OurVolunteersData } from '../api/OurVolunteersAdmin.js';

import {TempImage} from '/imports/s3/api/ClientImageCall.js';

class OurVolunteersAdminTable extends TrackerReact(Component) {

	 constructor(props){
		super(props);
		this.state ={
			"subscription" : {
			}
		}
	}

	handleChange(event) {
	    const target = event.target;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });		
	}

  'deletePostConfirm'(event){
    event.preventDefault();
    var uid = event.target.id;
    Meteor.call('deleteVolunteer', uid,
                (err, res) => {
                if (err) {
                    swal('Some error occured while deleting this record. Please contact System Admin!');
                } else {
                	swal('Volunteer deleted successfully.'); 
                    $('.modal-backdrop').hide();  
                            
                }
        });

  }

  editPost(event){
  	event.preventDefault();
  	FlowRouter.go('/volunteersForm/'+event.target.id);
  	$("html,body").scrollTop(0);
  	
  }

	tableDataBody(){
		var postData =  this.props.post;
		var postArray = [];
		if(postData){
			for(let i=0;i<postData.length;i++){
				postArray.push(
					<tr key={postData[i]._id}>
						<td>{i+1}</td>
						<td>{postData[i].volunteersName}</td>
						<td><img src={postData[i].volunteersPhoto} className="img-circle volunteerTablImg"/></td>
						<td>{postData[i].volunteersProfession}</td>
						<td>{postData[i].volunteersMobile}</td>
						<td>{postData[i].volunteersEmailId}</td>
						<td>
							<button type="button" id={postData[i]._id} onClick={this.editPost.bind(this)} className="fa fa-pencil-square-o editUser" />
							&nbsp;
							<a href="#" data-toggle="modal" data-target={`#${postData[i]._id}-del`}> <button className= "fa fa-trash userDel"/></a>
							 <div className="modal fade" id={`${postData[i]._id}-del`} role="dialog">
							    <div className="modal-dialog modal-sm">
							      <div className="modal-content">
							        <div className="modal-header">
							          <button type="button" className="close" data-dismiss="modal">&times;</button>
							          <h4 className="modal-title">Delete Volunteer</h4>
							        </div>
							        <div className="modal-body">
							          <p><b>The item will be deleted. Are you sure you want to continue?</b></p>
							        </div>
							        <div className="modal-footer">
							          <button onClick={this.deletePostConfirm.bind(this)} id={postData[i]._id} type="button" data-dismiss="modal" className="btn btn-danger deleteUserConfirm" >Delete</button>
					    			  <button type="button" data-dismiss="modal" className="btn btn-primary ">Cancel</button>
							        </div>
							      </div>
							    </div>
							  </div>

						</td>
					</tr>
				);
			}//i
		}//postArray
		return postArray;
	}

	render() {

       return (

       	<section className="Content">
			<div className="row">
			{ this.tableDataBody().length != 0 ?
				<div className="col-lg-12 col-md-12">
					<h4 className="tableTitle"> <u>List of News</u></h4>
					<div className="break col-lg-12 col-md-12"></div>
						<div className="">
							<div className="break col-lg-12 col-md-12"></div>
								<div className="table-responsive col-lg-12">
								<table className="table table-striped table-hover table-bordered" id="dailyMeetEarnings">
									<thead>
										<tr className="tableHeader">
											<th className="borderBottom"> Sr. </th>
											<th className="borderBottom"> Volunteer's Name </th>
											<th className="borderBottom"> Volunteer's Photo </th>
											<th className="borderBottom"> Volunteer's Profession </th>
											<th className="borderBottom"> Volunteer's Mobile </th>
											<th className="borderBottom"> Volunteer's EmailId </th>
											<th className="borderBottom"> Action </th>
										</tr>
									</thead>
									<tbody>
										{this.tableDataBody()}
									</tbody>
								</table>
								</div>

							</div>
				</div>
			:
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noEarning"></div>
			}	
			</div>
		</section>	
	    );

	} 

}

export default withTracker(props => {

    const post = props.postData;
    // console.log(post);

    return {
        post,
    };   	

})(OurVolunteersAdminTable);