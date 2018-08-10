import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import HeaderContainer from '/imports/homepage/slideShowBlock/components/Header.jsx';
import Counters from '/imports/homepage/countersBlock/components/Counters.jsx';
import PhotoGallery from '/imports/homepage/photoGallery/components/PhotoGallery.jsx';
import Testimonial from '/imports/homepage/testimonial/components/Testimonial.jsx';
import ContactUs from '/imports/homepage/contactUs/components/ContactUs.jsx';
import TagLineBottom from '/imports/homepage/tagLineBottom/components/TagLineBottom.jsx';
import Copyright from '/imports/homepage/copyright/components/Copyright.jsx';
import LatestNews from '/imports/homepage/latestNews/components/LatestNews.jsx';

export default class Home extends TrackeReact(Component){

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
					<HeaderContainer/>
					<Counters/>
					<PhotoGallery/>
					<Testimonial/>
					<LatestNews/>
					<ContactUs/>
					<TagLineBottom/>
					<Copyright/>
				</div>
			);			

	}
}
