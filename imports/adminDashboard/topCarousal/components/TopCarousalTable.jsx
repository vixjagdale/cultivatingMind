import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { TopCarousalData } from '../api/TopCarousal.js'; 

class TopCarousalTable extends TrackerReact(Component) {

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

  'deleteSlideConfirm'(event){
    event.preventDefault();
    var uid = event.target.id;
    Meteor.call('deleteCarousalSlide', uid,
                (err, res) => {
                if (err) {
                    swal('Some error occured while deleting this record. Please contact System Admin!');
                } else {
                	swal('Slide deleted successfully.'); 
                    $('.modal-backdrop').hide();  
                            
                }
        });

  }

  editSlide(event){
  	event.preventDefault();
  	FlowRouter.go('/slideShow/'+event.target.id);
  	$("html,body").scrollTop(0);
  	
  }

	tableDataBody(){
		var slidesData =  this.props.post;
		var slideArray = [];
		if(slidesData){
			for(let i=0;i<slidesData.length;i++){
				slideArray.push(
					<tr key={slidesData[i]._id}>
						<td>{i+1}</td>
						<td>{slidesData[i].header1}</td>
						<td>{slidesData[i].header2}</td>
						<td>{slidesData[i].header3}</td>
						<td>
							<button type="button" id={slidesData[i]._id} onClick={this.editSlide.bind(this)} className="fa fa-pencil-square-o editUser" />
							&nbsp;
							<a href="#" data-toggle="modal" data-target={`#${slidesData[i]._id}-del`}> <button className= "fa fa-trash userDel"/></a>
							 <div className="modal fade" id={`${slidesData[i]._id}-del`} role="dialog">
							    <div className="modal-dialog modal-sm">
							      <div className="modal-content">
							        <div className="modal-header">
							          <button type="button" className="close" data-dismiss="modal">&times;</button>
							          <h4 className="modal-title">Delete Slide</h4>
							        </div>
							        <div className="modal-body">
							          <p><b>The item will be deleted. Are you sure you want to continue?</b></p>
							        </div>
							        <div className="modal-footer">
							          <button onClick={this.deleteSlideConfirm.bind(this)} id={slidesData[i]._id} type="button" data-dismiss="modal" className="btn btn-danger deleteUserConfirm" >Delete</button>
					    			  <button type="button" data-dismiss="modal" className="btn btn-primary ">Cancel</button>
							        </div>
							      </div>
							    </div>
							  </div>

						</td>
					</tr>
				);
			}//i
		}//countArray
		return slideArray;
	}

	render() {

       return (

       	<section className="Content">
			<div className="row">
			{ this.tableDataBody().length != 0 ?
				<div className="col-lg-12 col-md-12">
					<h4 className="tableTitle"> <u>List of Slides</u></h4>
					<div className="break col-lg-12 col-md-12"></div>
						<div className="">
							<div className="break col-lg-12 col-md-12"></div>
								<div className="table-responsive col-lg-12">
								<table className="table table-striped table-hover table-bordered" id="dailyMeetEarnings">
									<thead>
										<tr className="tableHeader">
											<th className="borderBottom"> Sr. </th>
											<th className="borderBottom"> Header-1 </th>
											<th className="borderBottom"> Header-2 </th>
											<th className="borderBottom"> Header-3 </th>
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

    const postHandle = Meteor.subscribe('allCarousalSlides');

    const post       = TopCarousalData.find({},{sort:{createdAt:-1}}).fetch() ||[];
    // console.log(post);
    const loading    = !postHandle.ready();

    return {
        loading,
        post,
    };   	

})(TopCarousalTable);