import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import HeaderForBlog from '../../slideShowBlock/components/HeaderForBlog.jsx';
import Branding from '/imports/homepage/common/components/Branding.jsx';
import Footer from '/imports/homepage/footer/components/Footer.jsx';
import Copyright from '/imports/homepage/copyright/components/Copyright.jsx';

export default BlogLayout = ({blog})=>(

	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
		<Branding/>
		<HeaderForBlog />
			{blog}
		<Footer/>
		<Copyright/>
	</div>	


); 
