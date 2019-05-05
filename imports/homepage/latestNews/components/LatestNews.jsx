import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { LatestNewsData } from '/imports/adminDashboard/latestNews/api/LatestNewsAdmin.js';

class LatestNews extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
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
						return(<div key={index} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
								<img src={data.lcImg} className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 newsBottom">
									<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">{moment(data.postDate, 'YYYY-MM-DD').format('DD')} </div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">{moment(data.postDate, 'YYYY-MM-DD').format('MMM')} </div>
									</div>
									<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
										<b>{data.postTitle}</b><br/>
										<i className="fa fa-commenting-o themeColor" aria-hidden="true"></i> 214 Comments &nbsp;
										<i className="fa fa-heart-o themeColor" aria-hidden="true"></i> 895 Likes

									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR newsSection">
									{data.postDescription}
									<br/><br/>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
									</div>
								</div>
							</div>);
					   	}) 
						}
{/*							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
								<img src="../images/news2.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 newsBottom">
									<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">28 </div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">FEB</div>
									</div>
									<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
										<b>POST TITLE HERE</b><br/>
										<i className="fa fa-commenting-o themeColor" aria-hidden="true"></i> 214 Comments &nbsp;
										<i className="fa fa-heart-o themeColor" aria-hidden="true"></i> 895 Likes

									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR newsSection">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									<br/><br/>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
								<img src="../images/news3.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 newsBottom">
									<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 newsDate noPadLR">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">28 </div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">FEB</div>
									</div>
									<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
										<b>POST TITLE HERE</b><br/>
										<i className="fa fa-commenting-o themeColor" aria-hidden="true"></i> 214 Comments &nbsp;
										<i className="fa fa-heart-o themeColor" aria-hidden="true"></i> 895 Likes

									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR newsSection">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									<br/><br/>
									Read more <b><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b>
									</div>
								</div>
							</div>*/}
						</div>

					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle   = Meteor.subscribe('allNews');
    const post         = LatestNewsData.findOne({"id":101})||{};
    const posts        = LatestNewsData.find({ id: { $ne : 101 } }).fetch() ||[];
    const loading      = !postHandle.ready();

    // console.log('post: ',post);
    // console.log('posts: ',posts);

    return {
        loading,
        post,
        posts,
    };
})(LatestNews);