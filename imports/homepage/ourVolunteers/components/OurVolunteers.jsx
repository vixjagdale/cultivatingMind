import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { OurVolunteersData } from '/imports/adminDashboard/ourVolunteers/api/OurVolunteersAdmin.js';

class OurVolunteers extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	componentDidMount(){
	
	}
	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 newTopHeader">
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mytextwithicon">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 newsLine1">
								{this.props.post.tagLine}
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 latestNewsTitle">
								<b>{this.props.post.title1} <span className="newsWord">{this.props.post.title2}</span></b>
							</div>
						</div>
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 newsDesc">
							{this.props.post.description}
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
						{ this.props.posts.map( (data,index)=>{
						return(<div key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-12 imgVolunteers">
								<img src={data.volunteersPhoto} className="noPadLR img-responsive volunteerSiteImg col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 volunteerDetails">
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{data.volunteersName}</span>
									<span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{data.volunteersProfession}</span>
								</div>
							    </div>)
							})
						}
						</div>
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allVolunteers');
    const post         = OurVolunteersData.findOne({"id":101})||{};
    const posts        = OurVolunteersData.find({"id": { $ne : 101 } }).fetch() || [];
    const loading      = !postHandle.ready();

    // console.log('post: ',post);
    // console.log('posts: ',posts);

    return {
        posts,
        post,
    };
})(OurVolunteers);