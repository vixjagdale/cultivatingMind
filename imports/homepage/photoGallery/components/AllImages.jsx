import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { PhotoAlbum } from '/imports/adminDashboard/photoGallery/api/PhotoAlbum.js';

class AllImages extends TrackeReact(Component){

	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 photoGalleryMain" id="Gallery111">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 photoGalleryTitle">
						PHOTO GALLERY
					</div>
					<div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12 photoGalleryDesc">
						{this.props.post.description}
					</div>
					<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
					
					{this.props.allImages.map((images,index)=>{
						return  <div key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-4 noPadLR photoGalleryWrap">
							 	   <img  className="img-responsive photoGallerySiteImg col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" src={images.image} data-toggle="modal" data-target={`#myModal${index}`}/>
							 	   <div id={`myModal${index}`} className="modal fade" role="dialog">
									  <div className="modal-dialog modal-lg">

									    <div className="modal-content">
									      <div className="modal-header">
									        <button type="button" className="close" data-dismiss="modal">&times;</button>
									        <h4 className="modal-title">Photos</h4>
									      </div>
									      <div className="modal-body">
							 	   				<img  className="img-responsive photoGallerySiteImg col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR" style={{'height':'400px'}} src={images.image}/>
									        <p></p>
									      </div>
									      <div className="modal-footer">
									         <button type="button" className="btn btn-default" data-dismiss="modal" style={{'marginTop':'10px'}}>Close</button>
									      </div>
									    </div>

									  </div>
									</div>
							 	</div>
							})				
					}
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
    const allImages     = PhotoAlbum.find({"id":{$not:101}},{$sort:{limit:1}}).fetch();
    const loading       = !postHandle.ready();

    return {
        loading,
        post,
        allImages,
    };
})(AllImages);