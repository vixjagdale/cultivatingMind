import React      from 'react';
import { mount }  from 'react-mounter';

import CountersAdmin from '/imports/adminDashboard/countersBlock/components/CountersAdmin.jsx';
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
		// mount(Layout,{
		// 	main:(<ServiceInformation />),
		// })
		mount(CountersAdmin);
    }
});

FlowRouter.route('/counters/:counterId', {
    name: 'counters',
    action: function() {
		mount(CountersAdmin);
    }
});