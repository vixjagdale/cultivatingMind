import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class TopRowSmallBox extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      subscription : {

      }
    }
  }


	render(){
    return(
		<div className="row">

      </div>
    );

	}
}