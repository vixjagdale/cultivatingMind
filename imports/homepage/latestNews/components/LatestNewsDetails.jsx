import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { LatestNewsData } from '/imports/adminDashboard/latestNews/api/LatestNewsAdmin.js';


class LatestNewsDetails extends Component{
	render(){
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogWrapper">
				<div className="col-lg-12 completeBlogImg">
					<img src={this.props.post.lcImg} alt="eventImg"/>
				</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogSec-Wrap">
							<div className="row blog-row-L col-lg-12 ">
								<div className="col-lg-12 col-md-12">
									<label className="col-lg-12 completeBlogTit">{this.props.post.postTitle} </label>
									<div className="col-lg-6 completeBlogDate"><i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;&nbsp;{moment(this.props.post.postDate, 'DD-MM-YYYY').format('DD-MM-YYYY')}</div>
									}
									<div className="col-lg-12 completeblogBody">{this.props.post.postDescription}</div>
								</div>
								
							</div>
						</div>
						
					</div>
			</div>
			);
	}
}

export default withTracker(props=>{
	 const postHandle   = Meteor.subscribe('allNews');
	 // console.log('nnl',FlowRouter.getParam('id'));
    const post         = LatestNewsData.findOne({"_id":FlowRouter.getParam('id')})||{};
    // console.log("news  post",post)
;    const loading      = !postHandle.ready();

    return {
        loading,
        post,
    };
})(LatestNewsDetails);