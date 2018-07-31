import React      from 'react';
import { mount }  from 'react-mounter';
import SlideShowBlock from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';


FlowRouter.route('/',{
	action(){
		mount(SlideShowBlock);
	}
});
