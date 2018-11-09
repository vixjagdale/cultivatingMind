import React,{Component} from 'react';
import { render } from 'react-dom';
import TrackeReact from 'meteor/ultimatejs:tracker-react';
import HeaderContainer from '/imports/homepage/slideShowBlock/components/Header.jsx';
import CountersBlock from '/imports/homepage/countersBlock/components/Counters.jsx';
import WanttobeVolunteers from '/imports/homepage/ourVolunteers/components/WanttobeVolunteers.jsx';
import OurVolunteers from '/imports/homepage/ourVolunteers/components/OurVolunteers.jsx';
// import OurMission from '/imports/homepage/ourMission/components/OurMission.jsx';
import PhotoGallery from '/imports/homepage/photoGallery/components/PhotoGallery.jsx';
import Testimonial from '/imports/homepage/testimonial/components/Testimonial.jsx';
import ContactUs from '/imports/homepage/contactUs/components/ContactUs.jsx';
import TagLineBottom from '/imports/homepage/tagLineBottom/components/TagLineBottom.jsx';
import Copyright from '/imports/homepage/copyright/components/Copyright.jsx';
import LatestNews from '/imports/homepage/latestNews/components/LatestNews.jsx';
import DonateTopBlock from '/imports/homepage/donateTopBlock/components/DonateTopBlock.jsx';
import OurCases from '/imports/homepage/ourCases/components/OurCases.jsx';
import MakeDonation from '/imports/homepage/makeDonation/components/MakeDonation.jsx';
import OurMission from '/imports/homepage/ourMission/components/OurMission.jsx';
import Events from '/imports/homepage/events/components/Events.jsx';

import Footer from '/imports/homepage/footer/components/Footer.jsx';


export default class Home extends TrackeReact(Component){

	render(){
			return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
					<HeaderContainer/>
					<DonateTopBlock/>
					<OurCases/>
					<MakeDonation/>
					<OurMission/>
					<Events/>
					<WanttobeVolunteers/>
					<OurVolunteers/>
					<CountersBlock/>
					<PhotoGallery/>
					<Testimonial/>
					<LatestNews/>
					<ContactUs/>
					<TagLineBottom/>
					<Footer/>
					<Copyright/>
				</div>
			);
	}
}
