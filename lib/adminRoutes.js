import React      from 'react';
import { mount }  from 'react-mounter';

import CountersAdmin from '/imports/adminDashboard/countersBlock/components/CountersAdmin.jsx';
import LatestNewsAdmin from '/imports/adminDashboard/latestNews/components/LatestNewsAdmin.jsx';
import TestimonialAdmin from '/imports/adminDashboard/testimonial/components/TestimonialAdmin.jsx';
import PhotoGalleryAdmin from '/imports/adminDashboard/photoGallery/components/PhotoGalleryAdmin.jsx';
import OurVolunteersAdmin from '/imports/adminDashboard/ourVolunteers/components/OurVolunteersAdmin.jsx';
import WantToBeVolunteer from '/imports/adminDashboard/wantToBeVolunteer/components/WantToBeVolunteer.jsx';
import TopTagLineBlock from '/imports/adminDashboard/topTagLineBlock/components/TopTagLineBlock.jsx';
import BottomTagLineBlock from '/imports/adminDashboard/bottomTagLineBlock/components/BottomTagLineBlock.jsx';
import DashboardLayout from '/imports/adminDashboard/dashboard/components/DashboardLayout.jsx';
import TopCarousal from '/imports/adminDashboard/topCarousal/components/TopCarousal.jsx';
import Enquiries from '/imports/adminDashboard/enquiries/components/Enquiries.jsx';
import MissionAdmin from '/imports/adminDashboard/mission/components/MissionAdmin.jsx';
import AdminContent from '/imports/adminDashboard/dashboard/components/AdminContent.jsx';
import UpcomingEventsAdmin from '/imports/adminDashboard/upcomingEvents/components/UpcomingEventsAdmin.jsx';
import OurCasesAdmin from '/imports/adminDashboard/ourCasesAdmin/components/OurCasesAdmin.jsx';
import Blog from '/imports/adminDashboard/blog/components/Blog.jsx';
import AboutUs from '/imports/adminDashboard/aboutUs/components/AboutUs.jsx';



FlowRouter.route('/cultivatingMindAdmin', {
    name: 'Admin Dashboard',
    action: function() {
        mount(DashboardLayout,{
         main:(<AdminContent />),
        });
    }
});

FlowRouter.route('/ourCases', {
    name: 'Our Cases',
    action: function() {
        mount(DashboardLayout,{
         main:(<OurCasesAdmin />),
        });
    }
});

FlowRouter.route('/ourCases/:caseId', {
    name: 'Our Cases',
    action: function() {
        mount(DashboardLayout,{
         main:(<OurCasesAdmin />),
        });
    }
});

FlowRouter.route('/upcomingEvents', {
    name: 'Upcoming Events',
    action: function() {
        mount(DashboardLayout,{
         main:(<UpcomingEventsAdmin />),
        });
    }
});

FlowRouter.route('/upcomingEvents/:eventId', {
    name: 'Upcoming Events',
    action: function() {
        mount(DashboardLayout,{
         main:(<UpcomingEventsAdmin />),
        });
    }
});

FlowRouter.route('/mission', {
    name: 'mission',
    action: function() {
        mount(DashboardLayout,{
         main:(<MissionAdmin />),
        });
    }
});
FlowRouter.route('/mission/:missionId', {
    name: 'mission',
    action: function() {
        mount(DashboardLayout,{
         main:(<MissionAdmin />),
        });
    }
});

FlowRouter.route('/slideShow', {
    name: 'Top Carousal',
    action: function() {
        mount(DashboardLayout,{
         main:(<TopCarousal />),
        });
    }
});
FlowRouter.route('/slideShow/:slideId', {
    name: 'Top Carousal',
    action: function() {
        mount(DashboardLayout,{
         main:(<TopCarousal />),
        });
    }
});

FlowRouter.route('/enquiries', {
    name: 'enquiries',
    action: function() {
        mount(DashboardLayout,{
         main:(<Enquiries />),
        });
    }
});

FlowRouter.route('/topTagLineBlockForm', {
    name: 'top Tag Line Block Form',
    action: function() {
        mount(DashboardLayout,{
            main:(<TopTagLineBlock />),
        })
    }
});

FlowRouter.route('/bottomTagLineBlockForm', {
    name: 'bottom Tag Line Block Form',
    action: function() {
        mount(DashboardLayout,{
            main:(<BottomTagLineBlock />),
        })
    }
});

FlowRouter.route('/wantToBeVolunteerForm', {
    name: 'counters',
    action: function() {
        mount(DashboardLayout,{
            main:(<WantToBeVolunteer />),
        })
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

FlowRouter.route('/addBlog',{
    name: "Blog",
    action: function() {
        mount(DashboardLayout,{
            main:(<Blog />),
        })
    }
})

FlowRouter.route('/editBlog/:id',{
    name : 'Edit Blog',
    action: function() {
        mount(DashboardLayout,{
            main:(<Blog />),
        })
    }
})

FlowRouter.route('/addAboutUs',{
    name : 'Add aboutUs',
    action: function() {
        mount(DashboardLayout,{
            main:(<AboutUs />),
        })
    }
})

FlowRouter.route('/editAboutUs/:id',{
    name : 'Add aboutUs',
    action: function() {
        mount(DashboardLayout,{
            main:(<AboutUs />),
        })
    }
})



// FlowRouter.route('/searchAssignment', {
//     name: 'AppComponent',
//     action: function() {
//         mount(AppComponent)
//     }
// });

