import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import { render } from 'react-dom';
import {Link} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class UMUsers extends TrackerReact(Component) {

  'deleteUserConfirm'(event){
    event.preventDefault();
    var uid = event.target.id;
		swal({
			  title              : 'Are you sure?',
			  text               : 'You will not be able to recover this Record!',
			  type               : 'warning',
			  showCancelButton   : true,
			  confirmButtonColor : '#dd6b55',
			  cancelButtonColor  : '#d44',
			  confirmButtonText  : 'Yes, Delete it!',
			  cancelButtonText   : 'No, Keep it',
			  closeOnConfirm     : false
			}, function() {
				Meteor.call("deleteUser",uid,(error,result)=>{
					if(error){

					}else{
						swal(
					    'Deleted Successfully',
					    '',
					    'success'
					  );
				}
			});
  			
  		});
  			
  }
  updateStudentExamStatus(event){
    var uid = event.target.id;
    Meteor.call("updateStudExamStatusfromAdmin",uid,(err,res)=>{
    	if(err){
    		console.log(err);
    	}else{
    		swal('status updated successfully','','success');
    	}
    });

  }

	lastLogin(){
		
		if(this.props.usersDataValues.status){
			// console.log(this.props.usersDataValues.status);
	  	if(this.props.usersDataValues.status.lastLogin){
	  		// console.log(this.props.usersDataValues.status.lastLogin.date);
	  		if(this.props.usersDataValues.status.lastLogin.date){
	  			return (<TimeAgo date={this.props.usersDataValues.status.lastLogin.date} />);
	  		}else{
	  			return(<span>-</span>);
	  		}
	  	}else{
	  		return(<span>-</span>);
	  	}
		}else{
			return(<span>-</span>);
		}
	}

	onlineStatus(){
		if(this.props.usersDataValues.profile.status == 'Active'){
			return(<div className="activeStat"></div>);
		}else{
			return(<div className="inactiveStat"></div>);
		}
	}

	render(){
       return(
				<tr className="">
{/*					<td className="col-lg-1 col-md-1 col-sm-1 col-xs-1"> 
					<input type="checkbox" ref="userCheckbox" name="userCheckbox" className="userCheckbox" value={this.props.usersDataValues._id} /> 
					</td>*/}		
					<td>{parseInt(Session.get('pageUMNumber')- 1) * (20) + (parseInt(this.props.serialNum) + 1)}</td>	
					<td>
					<input type="checkbox" ref="userCheckbox" name="userCheckbox" className="userCheckbox col-lg-1 col-md-1 col-sm-1 col-xs-1" value={this.props.usersDataValues._id} /> 
						<div className="um-username"> 
							<div className="activeStatusIcon">{this.onlineStatus()}</div>
							<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 userEmailIds noLRPad">
							{Roles.userIsInRole(this.props.usersDataValues._id, ['Student']) ?  
							<Link to={'/studentInformation/'+this.props.usersDataValues._id} title="Click to view student profile">
								{this.props.usersDataValues.profile.firstname} {this.props.usersDataValues.profile.lastname}
							</Link>
							:
								this.props.usersDataValues.profile.firstname+' '+this.props.usersDataValues.profile.lastname
							}
							
							</div>	
						</div>
					</td>	
					<td className="col-lg-4 col-md-4 col-sm-6 col-xs-6"> 
						
							{this.props.usersDataValues.username}					
						
					</td>		
					<td className="col-lg-1 col-md-1 hidden-xs hidden-sm"> {this.props.usersDataValues.profile.status} </td>		
					<td className="col-lg-1 col-md-1 col-sm-1 col-xs-2"> 
						
						{ this.props.usersDataValues.roles.map( (rolesData,index)=>{
							if(rolesData == 'Admin'){rolesData = 'admin';}
							if(rolesData == 'user'){rolesData = 'User';}
							return (<span key={index}>{rolesData}<br/></span>)
						  }) 
						}	
					</td>	
					{/* <td> {this.props.usersDataValues.createdAt.toString()} </td>*/}
					<td className="col-lg-2 col-md-2 hidden-xs hidden-sm"> <TimeAgo date={this.props.usersDataValues.createdAt} /> </td>	
					<td className="col-lg-2 col-md-2 hidden-xs hidden-sm"> {this.lastLogin()} </td>	
							
					<td className="col-lg-2 col-md-2 col-sm-1 col-xs-1 tab-Table"> 
						{/*{Roles.userIsInRole(this.props.usersDataValues._id, ['Admin','admin']) ?*/}
							<div>
								<Link to={"/admin/resetPassword/"+this.props.usersDataValues._id}> <i className="fa fa-key" aria-hidden="true" title="Change Password "></i></Link>
								<i className="fa fa-star-o startupdatestatus" onClick={this.updateStudentExamStatus.bind(this)} id={this.props.usersDataValues._id} title="Change main exam status"/>
							</div>
						{/*:<span></span>
						}*/}
						<Link to={`/editProfile/${this.props.usersDataValues._id}`}><i className="fa fa-edit editIcon" title="Edit User"></i> </Link> 



						<i className="fa fa-trash deleteIcon" onClick={this.deleteUserConfirm.bind(this)} id={this.props.usersDataValues._id} title="Delete User"/>
						 

					</td>		
				</tr>	    
	);

	} 

}
