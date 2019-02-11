import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import HeaderContainer from '../../slideShowBlock/components/Header.jsx';
import Branding from '/imports/homepage/common/components/Branding.jsx';
import Footer from '/imports/homepage/footer/components/Footer.jsx';
import Copyright from '/imports/homepage/copyright/components/Copyright.jsx';

export default Layout = ({mainn})=>(

	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
		<Branding/>
		<HeaderContainer />
			{mainn}
		<Footer/>
		<Copyright/>
	</div>	


); 
