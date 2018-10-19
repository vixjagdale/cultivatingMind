import React from 'react';
import AdminHeader from './AdminHeader.jsx';
import DashboardSidebar from './DashboardSidebar.jsx';
import Adminfooter from './Adminfooter.jsx';
import Fraud from './Fraud.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Login from '/imports/login/components/Login.jsx';

const DashboardLayout = ({loggingIn, isAdmin, main})=>(

	<div>
    	{ loggingIn === true ? 
            <div className="adminDashboard hold-transition skin-blue fixed sidebar-mini">
                { isAdmin === true ? 
        			<div className="wrapper">	
        				<AdminHeader />
        				<DashboardSidebar />
        				<div className="content-wrapper">
        					{main}
        				</div>
        				<Adminfooter />
        			</div>	
                :   <Fraud /> 
                }
            </div>
        : 
            <div><Login /></div> 
        }
	</div>	


); 

DashboardLayout.propTypes = {
  loggingIn : PropTypes.bool,
  isAdmin   : PropTypes.bool
};

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    const login    = Meteor.userId();
    // console.log('login id',login);
    // console.log('roles: ',Roles.userIsInRole(login, ['admin', 'superAdmin']));
    if(login && Roles.userIsInRole(login, ['admin', 'superAdmin']) ){
    	var loggingIn = true;
        var isAdmin   = true;
    	console.log('login and admin');
    }else if(login && !Roles.userIsInRole(login, ['admin','superAdmin'])){
    	var loggingIn = true;
        var isAdmin   = false;
        // FlowRouter.go('/unauthorizedAccess');
    	console.log('login and no admin');
    }else{
    	console.log('no login');
    	var loggingIn = false;
        var isAdmin   = false;
    }

    // console.log('loggingIn: ',loggingIn);
	    return {
	        loggingIn,
            isAdmin
	    };  
})(DashboardLayout);



