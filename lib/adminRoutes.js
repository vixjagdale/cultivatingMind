import React      from 'react';
import { mount }  from 'react-mounter';

import CountersAdmin from '/imports/adminDashboard/countersBlock/components/CountersAdmin.jsx';

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