import React from 'react';
import HeaderContainer from '../../slideShowBlock/components/Header.jsx';
import ContactUsBlockContainer from '../../contactUsBlock/components/ContactUsBlock.jsx';

export const Layout = ({main})=>(

	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLR">
		<HeaderContainer />
			{main}
		<ContactUsBlockContainer />
	</div>	


); 