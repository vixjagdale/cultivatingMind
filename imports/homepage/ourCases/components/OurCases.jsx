import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { OurCasesAdminData } from '/imports/adminDashboard/ourCasesAdmin/api/OurCasesAdmin.js';
import Cases from './Cases.jsx';

class OurCases extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={}
	}

	componentDidMount(){
		$(function () { 
		  $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
		});  

		$( window ).scroll(function() {  
		  $(".progress-bar").each(function(){
		    var each_bar_width = $(this).attr('aria-valuenow');
		    $(this).width(each_bar_width + '%');
		  });
		       
		});
	}
	render(){
			$('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourCasesMain">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ourCasesTitle">
						{this.props.post.tagLine}
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 ourCasesDesc">
						{this.props.post.description}
					</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
					{/* this.props.posts.map( (data,index)=>{
						return(<div key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
									<img src="../images/cases1.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
									<div className="noPadLR progress col-lg-12 col-md-12 col-sm-12 col-xs-12">
									  <div className="progress-bar" role="progressbar" aria-valuenow={parseInt((data.moneyRaised/data.goal)*100)} aria-valuemin="10" aria-valuemax="100">
									     <span  className="popOver" data-toggle="tooltip" data-placement="top" title={parseInt((data.moneyRaised/data.goal)*100)+'%'}></span>  
									  </div>
									</div>							
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 casesBottom noPadLR">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
											<b>{data.caseDescription}</b>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  newsSection">
											{data.title}
										</div>
										<div className="casesRaised col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<b>Raised: ${data.moneyRaised} </b>
												<span className="casesGoal">Goal: ${data.goal}</span>
											</div>
										</div>
									</div>
								</div>);
								})
					*/}
					{ this.props.posts.map( (data,index)=>{
						return(<Cases data={data} key={index}/>);
					})}
{/*						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
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
						</div>*/}
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allCases');
    const post         = OurCasesAdminData.findOne({"id":101})||{};
    const posts        = OurCasesAdminData.find({ id: { $ne : 101 } }).fetch() ||[];
    const loading      = !postHandle.ready();

    console.log('post: ',post);
    console.log('posts: ',posts);

    return {
        loading,
        post,
        posts,
    };
})(OurCases);