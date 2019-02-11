import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { PhotoAlbum } from '/imports/adminDashboard/photoGallery/api/PhotoAlbum.js';

class PhotoGallery extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 photoGalleryMain" id="Gallery11">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 photoGalleryTitle">
						PHOTO GALLERY
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 photoGalleryDesc">
						{this.props.post.description}
					</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
					{this.props.allImages.map((images,index)=>{
						return  <div key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							 	   <img  className="img-responsive photoGallerySiteImg col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src={images.image}/>
							 	</div>
							})
					}
						{/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md2.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md3.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md4.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md5.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md6.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md7.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md8.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md9.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md10.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md11.jpg"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							<img className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src="../images/gallery-md12.jpg"/>
						</div>*/}
					</div>
				</div>
			);			

	}
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const postHandle    = Meteor.subscribe('GalleryPhotos');
    const postHandle1   = Meteor.subscribe('GalleryPhotosAll');
    const loading1      = postHandle1.ready();
    const post          = PhotoAlbum.findOne({"id":101})||{};
    const allImages     = PhotoAlbum.find({"id":{$not:101}}).fetch();
    const loading       = !postHandle.ready();

    return {
        loading,
        post,
        allImages,
    };
})(PhotoGallery);