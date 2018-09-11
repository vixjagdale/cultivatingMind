import React,{Component} from 'react';
import render from 'react-dom';
import FlowRouter from 'meteor/ostrio:flow-router-extra';
import { withTracker } from 'meteor/react-meteor-data';
import QuikWalletSettings from './QuikWalletSettings.jsx';
export default  class Configuration extends Component{
	render(){
		// for (var counter = 0; counter <= 10; counter++) {

		//     var notPrime = false;
		//     for (var i = 2; i <= counter; i++) {
		//         if (counter%i===0 && i!==counter) {
		//             notPrime = true;
		//         }
		//     }
		//     if (notPrime === false) {
		//                 console.log(counter);
		//     }
		// }
		
		return(
			<div>
	        {/* Content Wrapper. Contains page content */}
	        <div className="content-wrapper">
	          {/* Content Header (Page header) */}
	          <section className="content-header">
	            <h1>Add Configurations</h1>
	          </section>
	          {/* Main content */}
	          <section className="content viewContent">
	            <div className="row">
	              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
	                <div className="box">
	                  <div className="box-header with-border boxMinHeight">
			        	<div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
			        		 <div  class="col-sm-6">
						        {/*<h3>System Configurations</h3>*/}
						        <hr/>
						        <div className="col-xs-3">
						          
						          <ul className="nav nav-tabs tabs-left sideways nav-tabConf">
						            <li className="active"><a href="#home-v" data-toggle="tab">Payment Gateway</a></li>
						           {/* <li><a href="#profile-v" data-toggle="tab">S3 Details</a></li>*/}
						          </ul>
						        </div>

						        <div className="col-xs-9">
						          
						          <div className="tab-content">
						            <div className="tab-pane active" id="home-v"><QuikWalletSettings/></div>
						            <div className="tab-pane" id="profile-v"></div>
						          </div>
						        </div>

						        <div className="clearfix"></div>

						      </div>
			        	</div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </section>
			</div>
		  </div>

			);
	}
}