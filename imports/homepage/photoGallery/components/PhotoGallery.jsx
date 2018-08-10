import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';

class PhotoGallery extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 photoGalleryMain">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 photoGalleryTitle">
						PHOTO GALLERY
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 photoGalleryDesc">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery1.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery2.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery3.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery4.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery5.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery6.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery7.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery8.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery9.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery10.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery11.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery12.jpg"/>
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
})(PhotoGallery);