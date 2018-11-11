import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class Cases extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={}
	}

	componentDidMount(){
		$(function () { 
		  $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
		});  
	}
	render(){
			return(<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
				<img src="../images/cases1.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
				<div className="noPadLR progress col-lg-12 col-md-12 col-sm-12 col-xs-12">
				  <div className="progress-bar" role="progressbar" aria-valuenow={parseInt((this.props.data.moneyRaised/this.props.data.goal)*100)} aria-valuemin="10" aria-valuemax="100">
				     <span  className="popOver" data-toggle="tooltip" data-placement="top" title={parseInt((this.props.data.moneyRaised/this.props.data.goal)*100)+'%'}></span>  
				  </div>
				</div>							
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 casesBottom noPadLR">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<b>{this.props.data.caseDescription}</b>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  newsSection">
						{this.props.data.title}
					</div>
					<div className="casesRaised col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<b>Raised: ${this.props.data.moneyRaised} </b>
							<span className="casesGoal">Goal: ${this.props.data.goal}</span>
						</div>
					</div>
				</div>
			</div>);			
	}
}

export default withTracker(props => {
    return {
        x : '1',
    };
})(Cases);