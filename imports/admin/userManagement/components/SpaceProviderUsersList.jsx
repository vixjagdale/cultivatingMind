import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { SpaceDetails } from '../../../addressVerification/api/verificationAddress.js';
import StateCitySelect from './StateCitySelect.jsx';

export default class SpaceProviderUsersList extends TrackerReact(Component) {

	constructor(){
		super();
		this.state = {
			subscription : {
				"spaceOwnerUserData" : Meteor.subscribe('spaceOwnerUserData'),
				"spaceDetailsData"   : Meteor.subscribe('spaceDetailsData'),
			}
		}
	}

	componentDidMount(){
	   renderFunction();
	   $("html,body").scrollTop(0);
	}

	dltUser(event){
		event.preventDefault();
		var dltId = event.target.id;
		console.log('dltId: ',dltId);
	    Meteor.call('dltUser',dltId, function(error,result){
	    	if(error){
	    		console.log("error"+error);
	    	}else{
	    		$('.modal-backdrop').hide();
	    		swal('User deleted Successfully!');
	    	}
	    });
	}

	editUserByAdmin(event){
		event.preventDefault();
		var editId = event.target.id;
		FlowRouter.go('/editProfile/'+editId);
	}

	spaceProvidersListData(){
		var getStateVal = Session.get('state');
		var getCityVal  = Session.get('city');
		if(getStateVal && getCityVal){
			var spaceProviderData = SpaceDetails.find({"city" : getCityVal , "state" : getStateVal}).fetch();
		}else if(getStateVal){
			spaceProviderData = SpaceDetails.find({"state" : getStateVal}).fetch();
		}else if(getCityVal){
			spaceProviderData = SpaceDetails.find({"city" : getCityVal}).fetch();
		}else{
			spaceProviderData = SpaceDetails.find({}).fetch();
		}
		var spaceProviderArray = [];
		if(spaceProviderData){
			
			if(spaceProviderData.length > 0){
				for(j=0;j<spaceProviderData.length;j++){
					var spaceProviderID = spaceProviderData[j].owner;
					spaceProviderArray.push({"spaceProviderID":spaceProviderID});
				}//j

				var spaceProvider       = _.pluck(spaceProviderArray,"spaceProviderID");
				var uniqueSpaceProvider = _.uniq(spaceProvider)
				var userArray           = [];
				
					for(k=0;k<uniqueSpaceProvider.length;k++){
						var userID = uniqueSpaceProvider[k];
						var spacesArray  = [];
						var usersList  = Meteor.users.findOne({"_id": userID , "roles": "spaceOwner"});
						var spaces     = SpaceDetails.find({"owner" : userID}).fetch();
						if(usersList){
							if(spaces){
								for(var x=0; x<spaces.length;x++){
									spacesArray.push(
														<div key={x} className="spListAddr col-lg-6 col-sm-6 col-xs-6 col-md-6">
															{x+1}. {spaces[x].street1}, {spaces[x].city}, {spaces[x].state} - {spaces[x].zip}
														</div>
										          );
								}
							}
							userArray.push(
								<div key={k} className="col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12 col-md-12 parkingListWrap">
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<i className="fa fa-times pull-right btn deleteList" aria-hidden="true" data-toggle="modal" data-target={`#${usersList._id}-modal`}></i>
										<i onClick={this.editUserByAdmin.bind(this)} id={usersList._id} className="fa fa-pencil pull-right btn editList" aria-hidden="true"></i>	


										<div id={`${usersList._id}-modal`} className="modal fade" role="dialog">
										  <div className="modal-dialog">

										   
										    <div className="modal-content modalCustm col-lg-12 col-sm-12 col-xs-12 col-md-12">
										      <div className="modal-header">
										        <button type="button" className="close" data-dismiss="modal">&times;</button>
										        <h4 className="modal-title">Delete User</h4>
										      </div>
										      <div className="modal-body">
										      	<div className="deleteDataConfirm col-lg-10 col-lg-offset-1 col-md-10 col-sm-10 col-xs-10 col-xs-offset-1">Are you sure, you want to delete this user?</div>
										        <button key={usersList._id} id={usersList._id} className="btn btn-danger pull-right" onClick={this.dltUser.bind(this)}>DELETE</button>
										      </div>		        
										    </div>

										  </div>
										</div>	


									</div>
									<br/>
									<hr/>
									<br/>
									<div className="col-lg-2 col-sm-2 col-xs-2 col-md-2 noLRPad">
										<img src={usersList.profile.userProfile} className="img-responsive spaceProviderImage"/>
									</div>
									<div className="col-lg-10 col-sm-10 col-xs-10 col-md-10">
										<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 spListAddr">
											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4 noLRPad">
												Name<span className="pull-right">:</span>
											</div>
											<div className="col-lg-8 col-sm-8 col-xs-8 col-md-8 ">
												{usersList.profile.firstname} {usersList.profile.lastname}
											</div>
										</div>
										<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 spListAddr">
											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4 noLRPad">
												Contact No<span className="pull-right">:</span>
											</div>
											<div className="col-lg-8 col-sm-8 col-xs-8 col-md-8 ">
												{usersList.profile.mobNumber}
											</div>
										</div>
										<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 spListAddr">
											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4 noLRPad">
												Email ID<span className="pull-right">:</span>
											</div>
											<div className="col-lg-8 col-sm-8 col-xs-8 col-md-8 userEmailTrim">
												{usersList.emails[0].address}
											</div>
										</div>


										{/*<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 noLRPad">
											<div className="col-lg-4 col-sm-4 col-xs-4 col-md-4 noLRPad">
												Address<span className="pull-right">:</span>
											</div>
											<div className="col-lg-8 col-sm-8 col-xs-8 col-md-8 userEmailTrim">
												{spaceProviderData[j].street1} {spaceProviderData[j].city} {spaceProviderData[j].state} {spaceProviderData[j].zip}
											</div>
										</div>*/}
										
									</div>

									<div className="break col-lg-12 col-sm-12 col-xs-12 col-md-12"></div>
									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 noLRPad">
										Address List :
									</div>
									{spacesArray}
								</div>

							);
						}//i
					}//k
				
			}//if length
			return userArray;
		}
	}

	getStates(){
		var spaceDetails = SpaceDetails.find({}).fetch();
		if(spaceDetails){
			var stateArray = [];
			for(i=0;i<spaceDetails.length;i++){
				var state = spaceDetails[i].state;
				stateArray.push({'state':state});
			}//i
			var stateName        = _.pluck(stateArray,"state");
			var uniqueStateName  = _.uniq(stateName);
			if(uniqueStateName.length>0){
				var listArray = [];
					for(j=0 ;j<uniqueStateName.length;j++){
						listArray.push(
							<option key={j} value={uniqueStateName[j]}>{uniqueStateName[j]} </option>
						);
					}//j
			}//uniqueStateName
		}//spaceDetails
		return listArray;
	}

	getCity(){
		var state = Session.get('state');
		var citydata = SpaceDetails.find({'state':state}).fetch();
		if(citydata){
			var cityArray = [];
			for(i=0;i<citydata.length;i++){
				var city = citydata[i].city;
				cityArray.push({'city':city});
			}//i
			var cityName        = _.pluck(cityArray,"city");
			var uniqueCityName  = _.uniq(cityName);
			if(uniqueCityName.length>0){
				var citylistArray = [];
					for(j=0 ;j<uniqueCityName.length;j++){
						citylistArray.push(
							<option key={j} value={uniqueCityName[j]}>{uniqueCityName[j]} </option>
						);
					}//j
			}//uniqueCityName
		}//citydata
		return citylistArray;
	}

	

	render(){
		renderFunction();

       return(

       			<section className="Content">
		        <div className="row">
		          <div className="col-lg-12 col-md-10 col-sm-12 col-xs-12 ">
		            <div className="box box-primary">
		            <div className="box-header with-border">
		            <h4 className="contentTitle">LIST OF SPACE PROVIDERS</h4>
		            </div>
				
					<div className="box-body">
						<StateCitySelect />

					{this.spaceProvidersListData()}
					</div>
					</div>
				  </div>
				</div>
				</section>
       		
	    );

	} 

}