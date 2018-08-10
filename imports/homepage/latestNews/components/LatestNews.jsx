import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

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
								What we can do?
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 latestNewsTitle">
								<b>LATEST <span className="newsWord">NEWS .</span></b>
							</div>
						</div>
						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 newsDesc">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
								<img src="../images/news1.jpg" className="noPadLR img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
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
})(LatestNews);