import React      from 'react';
import { mount }  from 'react-mounter';
// import SlideShowBlock from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';
// import ContactUs from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';
import Home from '/imports/homepage/common/components/Home.jsx';

FlowRouter.route('/',{
	action(){
		mount(Home);
	}
});



