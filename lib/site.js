import React      from 'react';
import { mount }  from 'react-mounter';
// import SlideShowBlock from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';
// import ContactUs from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';
import Home from '/imports/homepage/common/components/Home.jsx';
import Layout from '/imports/homepage/common/components/Layout.jsx';
import BlogPage from '/imports/adminDashboard/blog/components/BlogPage.jsx';
import CompleteBlogPage from '/imports/adminDashboard/blog/components/CompleteBlogPage.jsx';

FlowRouter.route('/',{
	action(){
		mount(Home);
	}
});

FlowRouter.route('/blog',{
    name : 'Blog Page',
   action : function(){
        mount(Layout,{
            mainn:(<BlogPage />),
        })
    }
})

FlowRouter.route('/completeBlogPage/:id',{
    name : 'Blog Page',
    action : function(){
        mount(Layout,{
            mainn:(<CompleteBlogPage />),
        })
    }
})

