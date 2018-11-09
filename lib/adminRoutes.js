import React      from 'react';
import { mount }  from 'react-mounter';

import CountersAdmin from '/imports/adminDashboard/countersBlock/components/CountersAdmin.jsx';
import LatestNewsAdmin from '/imports/adminDashboard/latestNews/components/LatestNewsAdmin.jsx';
import TestimonialAdmin from '/imports/adminDashboard/testimonial/components/TestimonialAdmin.jsx';
import PhotoGalleryAdmin from '/imports/adminDashboard/photoGallery/components/PhotoGalleryAdmin.jsx';
import OurVolunteersAdmin from '/imports/adminDashboard/ourVolunteers/components/OurVolunteersAdmin.jsx';
import DashboardLayout from '/imports/adminDashboard/dashboard/components/DashboardLayout.jsx';
import AdminContent from '/imports/adminDashboard/dashboard/components/AdminContent.jsx';


FlowRouter.route('/cultivatingMindAdmin', {
    name: 'Admin Dashboard',
    action: function() {
        mount(DashboardLayout,{
         main:(<AdminContent />),
        });
    }
});

FlowRouter.route('/counters', {
    name: 'counters',
    action: function() {
		mount(DashboardLayout,{
			main:(<CountersAdmin />),
		})
    }
});

FlowRouter.route('/counters/:counterId', {
    name: 'counters',
    action: function() {
        mount(DashboardLayout,{
            main:(<CountersAdmin />),
        })
    }
});

FlowRouter.route('/photogallery', {
    name: 'photo gallery',
    action: function() {
        mount(DashboardLayout,{
            main:(<PhotoGalleryAdmin />),
        })
    }
});


FlowRouter.route('/testimonials', {
    name: 'testimonials',
    action: function() {
        mount(DashboardLayout,{
            main:(<TestimonialAdmin />),
        })
    }
});

FlowRouter.route('/testimonials/:testimonialId', {
    name: 'testimonials',
    action: function() {
        mount(DashboardLayout,{
            main:(<TestimonialAdmin />),
        })
    }
});

FlowRouter.route('/news', {
    name: 'news',
    action: function() {
        mount(DashboardLayout,{
            main:(<LatestNewsAdmin />),
        })
    }
});

FlowRouter.route('/news/:newsId', {
    name: 'news',
    action: function() {
        mount(DashboardLayout,{
            main:(<LatestNewsAdmin />),
        })
    }
});

FlowRouter.route('/volunteersForm', {
    name: 'Our Volunteers',
    action: function() {
        mount(DashboardLayout,{
            main:(<OurVolunteersAdmin />),
        })
    }
});

FlowRouter.route('/volunteersForm/:volunteerId', {
    name: 'Our Volunteers',
    action: function() {
        mount(DashboardLayout,{
            main:(<OurVolunteersAdmin />),
        })
    }
});