import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class OurCases extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	componentDidMount(){
		$(function () { 
		  $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
		});  

		$( window ).scroll(function() {   
		  // if($( window ).scrollTop() > 10){   scroll down abit and get the action   
		  $(".progress-bar").each(function(){
		    each_bar_width = $(this).attr('aria-valuenow');
		    $(this).width(each_bar_width + '%');
		  });
		       
		 //  }  
		});
	}
	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourCasesMain">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourCasesTitle">
						OUR CASES
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 ourCasesDesc">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<img src="../images/cases1.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
							<div className="noPadLR progress col-lg-12 col-md-12 col-sm-12 col-xs-12">
							  <div className="progress-bar" role="progressbar" aria-valuenow="84" aria-valuemin="10" aria-valuemax="100">
							     <span  className="popOver" data-toggle="tooltip" data-placement="top" title="84%"> </span>  
							  </div>
							</div>							
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 casesBottom noPadLR">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<b>Education for Children</b>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  newsSection">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</div>
								<div className="casesRaised col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<b>Raised: $1890 </b>
										<span className="casesGoal">Goal: $2500</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<img src="../images/cases2.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
							<div className="noPadLR progress col-lg-12 col-md-12 col-sm-12 col-xs-12">
							  <div className="progress-bar" role="progressbar" aria-valuenow="84" aria-valuemin="10" aria-valuemax="100">
							     <span  className="popOver" data-toggle="tooltip" data-placement="top" title="84%"> </span>  
							  </div>
							</div>							
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 casesBottom noPadLR">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<b>Education for Children</b>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  newsSection">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</div>
								<div className="casesRaised col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<b>Raised: $1890 </b>
										<span className="casesGoal">Goal: $2500</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<img src="../images/cases3.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
							<div className="noPadLR progress col-lg-12 col-md-12 col-sm-12 col-xs-12">
							  <div className="progress-bar" role="progressbar" aria-valuenow="84" aria-valuemin="10" aria-valuemax="100">
							     <span  className="popOver" data-toggle="tooltip" data-placement="top" title="84%"> </span>  
							  </div>
							</div>							
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 casesBottom noPadLR">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<b>Education for Children</b>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  newsSection">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</div>
								<div className="casesRaised col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<b>Raised: $1890 </b>
										<span className="casesGoal">Goal: $2500</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<img src="../images/cases4.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
							<div className="noPadLR progress col-lg-12 col-md-12 col-sm-12 col-xs-12">
							  <div className="progress-bar" role="progressbar" aria-valuenow="84" aria-valuemin="10" aria-valuemax="100">
							     <span  className="popOver" data-toggle="tooltip" data-placement="top" title="84%"> </span>  
							  </div>
							</div>							
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 casesBottom noPadLR">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<b>Education for Children</b>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  newsSection">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</div>
								<div className="casesRaised col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<b>Raised: $1890 </b>
										<span className="casesGoal">Goal: $2500</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    // const postHandle   = Meteor.subscribe('findSettings');
    // const post         = Settings.findOne({"companyId":101})||{};
    // const loading      = !postHandle.ready();

    return {
        // loading,
        // post,
        'x' : 1,
    };
})(OurCases);