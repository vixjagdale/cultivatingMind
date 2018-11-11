import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';

export default class Branding extends TrackeReact(Component){

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brandingWrapper">
					<div className="col-lg-6 col-lg-offset-1 col-md-6 col-sm-12 col-xs-12">
						<img src="../images/cultivating_mind.jpg" className="img-responsive cultivatingLogo"/>
					</div>
				</div>
			);
	}
}
