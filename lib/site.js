import React      from 'react';
import { mount }  from 'react-mounter';
// import SlideShowBlock from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';
// import ContactUs from '/imports/homepage/slideShowBlock/components/SlideShowBlock.jsx';
import Home from '/imports/homepage/common/components/Home.jsx';
import BlogLayout from '/imports/homepage/common/components/BlogLayout.jsx';
import BlogPage from '/imports/adminDashboard/blog/components/BlogPage.jsx';
import AboutUsPage from '/imports/adminDashboard/aboutUs/components/AboutUsPage.jsx';
import CompleteBlogPage from '/imports/adminDashboard/blog/components/CompleteBlogPage.jsx';
import AllImages from '/imports/homepage/photoGallery/components/AllImages.jsx';

FlowRouter.route('/',{
	action(){
		mount(Home);
	}
});

FlowRouter.route('/blog',{
    name : 'Blog Page',
   action : function(){
        mount(BlogLayout,{
            blog:(<BlogPage />),
        })
    }
})

FlowRouter.route('/completeBlogPage/:id',{
    name : 'Blog Page',
    action : function(){
        mount(BlogLayout,{
            blog:(<CompleteBlogPage />),
        })
    }
})

FlowRouter.route('/aboutus',{
    name : 'aboutus Page',
   action : function(){
        mount(BlogLayout,{
            blog:(<AboutUsPage />),
        })
    }
})

FlowRouter.route('/allImages',{
    name : 'all images ',
   action : function(){
        mount(BlogLayout,{
            blog:(<AllImages />),
        })
    }
})