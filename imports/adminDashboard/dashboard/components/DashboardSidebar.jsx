import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class DashboardSidebar extends TrackerReact(Component) {

	dashboardLogout(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/userlogin');
	}

	render() {

		return(
				<div>
					<aside className="main-sidebar">
						<section className="sidebar">
					      <div className="user-panel">
					        <div className="pull-left image">
					          <img src="../images/logo.png" className="img-circle" alt="User Image" />
					        </div>
					        <div className="pull-left info">
					          <p className="adminName">Admin</p>
					        </div>
					      </div>
					      <br/>
					      
					      <ul className="sidebar-menu">

					        <li className="treeview">
					          <a href="/">
					            <i className="fa fa-home"></i> <span>Home</span>
					          </a>
					        </li>

					        <li className="treeview">
					          <a href="/cultivatingMindAdmin">
					            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
					          </a>
					        </li>

					        <li className="treeview">
					          <a href="#">
					            <i className="fa fa-pie-chart" aria-hidden="true"></i>
					            <span>Form Entry</span>
					            <span className="pull-right-container">
					              <i className="fa fa-angle-left pull-right"></i>
					            </span>
					          </a>
					          <ul className="treeview-menu">
					            <li><a href="/counters"><i className="fa fa-circle-o"></i>Counters</a></li>  
					            <li><a href="/photogallery"><i className="fa fa-circle-o"></i>Photo Gallery</a></li>  
					            <li><a href="/testimonials"><i className="fa fa-circle-o"></i>Testimonials</a></li>  
					            <li><a href="/news"><i className="fa fa-circle-o"></i>Latest News</a></li>  
					            <li><a href="/volunteersForm"><i className="fa fa-circle-o"></i>Volunteers</a></li>  
					            <li><a href="/wantToBeVolunteerForm"><i className="fa fa-circle-o"></i>Want To Be Volunteer</a></li>  
					            <li><a href="/topTagLineBlockForm"><i className="fa fa-circle-o"></i>Top Tag-line Block</a></li>  
					            <li><a href="/bottomTagLineBlockForm"><i className="fa fa-circle-o"></i>Bottom Tag-line Block</a></li>  
					            <li><a href="/slideShow"><i className="fa fa-circle-o"></i>Slide Show</a></li>  
					          </ul>
					        </li>

					        <li className="treeview">
					          <a href="/resetPassword">
					            <i className="fa fa-unlock-alt"></i> <span>Reset Password</span>
					          </a>
					        </li>

					        <li className="treeview">
					          <a href="/enquiries">
					            <i className="fa fa-comment"></i> <span>Enquiries</span>
					          </a>
					        </li>

					        <li className="treeview">
					          <a href="/addfaq">
					            <i className="fa fa-question-circle"></i>FAQ</a>
					        </li>


					        <li className="treeview">
					          <a href="">
					            <i className="fa fa-sign-out"></i> <span onClick={this.dashboardLogout.bind(this)}>Logout</span></a>
					        </li>					        
					      </ul>
					      <br/>
					      <br/>
					      <br/>
					    </section>
					</aside>
				</div>
			);
	}

}