import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class UpcomingEventsAdminTable extends TrackerReact(Component) {

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

  'deleteEventConfirm'(event){
    event.preventDefault();
    var uid = event.target.id;
    Meteor.call('deleteUpcomingEvents', uid,
                (err, res) => {
                if (err) {
                    swal('Some error occured while deleting this record. Please contact System Admin!');
                } else {
                	swal('Event deleted successfully.'); 
                    $('.modal-backdrop').hide();  
                            
                }
        });

  }

  editEvent(event){
  	event.preventDefault();
  	FlowRouter.go('/upcomingEvents/'+event.target.id);
  	$("html,body").scrollTop(0);
  	
  }

	tableDataBody(){
		var eventData =  this.props.post;
		var eventArray = [];
		if(eventData){
			for(let i=0;i<eventData.length;i++){
				eventArray.push(
					<tr key={eventData[i]._id}>
						<td>{i+1}</td>
						<td>{eventData[i].eventTitle}</td>
						<td>{eventData[i].eventDate}</td>
						<td>{eventData[i].eventVenue}</td>
						<td>{eventData[i].eventDescription}</td>
						<td>
							<button type="button" id={eventData[i]._id} onClick={this.editEvent.bind(this)} className="fa fa-pencil-square-o editUser" />
							&nbsp;
							<a href="#" data-toggle="modal" data-target={`#${eventData[i]._id}-del`}> <button className= "fa fa-trash userDel"/></a>
							 <div className="modal fade" id={`${eventData[i]._id}-del`} role="dialog">
							    <div className="modal-dialog modal-sm">
							      <div className="modal-content">
							        <div className="modal-header">
							          <button type="button" className="close" data-dismiss="modal">&times;</button>
							          <h4 className="modal-title">Delete Event</h4>
							        </div>
							        <div className="modal-body">
							          <p><b>The item will be deleted. Are you sure you want to continue?</b></p>
							        </div>
							        <div className="modal-footer">
							          <button onClick={this.deleteEventConfirm.bind(this)} id={eventData[i]._id} type="button" data-dismiss="modal" className="btn btn-danger deleteUserConfirm" >Delete</button>
					    			  <button type="button" data-dismiss="modal" className="btn btn-primary ">Cancel</button>
							        </div>
							      </div>
							    </div>
							  </div>

						</td>
					</tr>
				);
			}//i
		}//eventArray
		return eventArray;
	}

	render() {

       return (

       	<section className="Content">
			<div className="row">
			{ this.tableDataBody().length != 0 ?
				<div className="col-lg-12 col-md-12">
					<h4 className="tableTitle"> <u>List of Events</u></h4>
					<div className="break col-lg-12 col-md-12"></div>
						<div className="">
							<div className="break col-lg-12 col-md-12"></div>
								<div className="table-responsive col-lg-12">
								<table className="table table-striped table-hover table-bordered" id="dailyMeetEarnings">
									<thead>
										<tr className="tableHeader">
											<th className="borderBottom"> Sr. </th>
											<th className="borderBottom"> Title </th>
											<th className="borderBottom"> Date </th>
											<th className="borderBottom"> Venue </th>
											<th className="borderBottom"> Description </th>
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

})(UpcomingEventsAdminTable);