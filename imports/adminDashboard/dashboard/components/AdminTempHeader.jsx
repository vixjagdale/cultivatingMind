import React, {Component} from 'react';

export default class AdminTempHeader extends Component{

	logout(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/userlogin');
	}
	
	render(){
		return(

			<div className="">
			    <nav className="navbar navbar-default mainHeader">
			      <div className="container-fluid">
			        <div className="navbar-header navHeader">
			          <button type="button" className="navbar-toggle collapsed navBtn pull-left" data-toggle="collapse" data-target="#navbar-collapse-1">
			            <span className="sr-only">Toggle navigation</span>
			            <span className="icon-bar iconColor"></span>
			            <span className="icon-bar iconColor"></span>
			            <span className="icon-bar iconColor"></span>
			            <span className="icon-bar iconColor"></span>
			          </button>
			         
			          <a className="col-lg-3 col-md-3 col-xs-7 col-sm-7 navbar-brand spotylBrand" href="/map">SPOTYL</a>
			           <div className="col-xs-3 col-sm-3 pull-right"><img src="/images/carIcon1.png" className="img-responsive menuImg"/></div>
			          
			        </div>
			    
			        <div className="collapse navbar-collapse col-xs-11 insideNav" id="navbar-collapse-1">
			          <ul className="nav navbar-nav">
		            	<li className="myProfilePicDataBkgrd noLRPad hidden-lg hidden-md col-sm-12 col-xs-12">
				        	<div className="hidden-lg hidden-md col-sm-12 col-xs-12">
				        		<div className="hidden-lg hidden-md col-sm-3 col-xs-3 myPic noLRPad">
				        			<img src="/images/userIcon.png" className="profilePic img-responsive"/>
				        		</div>
				        	</div>
				        </li>
					  </ul>
			          <ul className="nav navbar-nav navbar-right menuUL">
			           <li><a href="/adminDashboard">Dashboard</a></li>
			            <li className="dropdown">
        					<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Notification <span className="caret"></span></a>
				            <ul className="dropdown-menu ulstyle" role="menu">
				            	<li><a href="/createTemplate">Create Template</a></li>
				            	<li><a href="/viewAllTemplates">View Templates</a></li>
				            </ul>
				        </li>
			            <li><a href="/companyInformation">Company Settings</a></li>
			            <li className="dropdown">
        					<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">User Management <span className="caret"></span></a>
				            <ul className="dropdown-menu" role="menu">
				            	<li><a href="/ListOfAllUsers">Users List</a></li>
				            	<li><a href="/ListOfAllRoles">Roles List</a></li>
				            	<li><a href="/ListOfSpaceProviderUsers">Space Provider List</a></li>
			            		<li><a href="/UsersList">Client List</a></li>
				            </ul>
				        </li>
			            
			            <li><a className="logout" onClick={this.logout.bind(this)}>Logout</a>
					    </li>
			          </ul>
			        </div>
			      </div>
			    </nav>
			</div>	
				
									
			);
	}
}