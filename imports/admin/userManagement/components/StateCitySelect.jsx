
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {SpaceDetails} from '../../../addressVerification/api/verificationAddress.js';

export default class StateCitySelect extends TrackerReact(Component) {

	constructor(){
		super();
		this.state = {
			subscription : {
				"spaceOwnerUserData" : Meteor.subscribe('spaceOwnerUserData'),
				"spaceDetailsData" : Meteor.subscribe('spaceDetailsData'),
			}
		}
	}

	componentDidMount(){
	   renderFunction();
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
		// var state = Session.get('state');
		var citydata = SpaceDetails.find({}).fetch();
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

	changeStateVal( event ) {
	    var value = event.target.value;
	    if(value == ''){
	    	Session.set('state','');
	    }else{
	    	Session.set('state',value);
	    }
	    
	}

	changeCityVal( event ) {
	    var cityvalue = event.target.value;
	    if(cityvalue == ''){
	    	Session.set('city','');
	    }else{
	    	Session.set('city',cityvalue);
	    }
	    
	}

	render(){
		renderFunction();

       return(

   			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 stateCityWrapper">
				<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
					<select className="parkPaySelect col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12 col-md-12 filterSelect" onChange={this.changeStateVal}>
					  <option value="">State</option>
					  {this.getStates()}
					</select>
				</div>
				<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
					<select className="parkPaySelect col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12 col-md-12 filterSelect" onChange={this.changeCityVal}>
					  <option value="">City</option>
					  {this.getCity()}
					</select>
				</div>
			</div>
       		
	    );

	} 

}