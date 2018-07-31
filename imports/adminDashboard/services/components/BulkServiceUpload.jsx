import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

export default class BulkServiceUpload extends TrackerReact (Component){
    
    componentDidMount() {
        renderFunction();
	 	$("html,body").scrollTop(0); 
    }


    showProgressBar() {
        var getPercernt = UserSession.get("progressbarSession",Meteor.userId());
        var allPercernt = UserSession.get("allProgressbarSession",Meteor.userId());
        console.log("getPercernt: ",getPercernt);
        console.log("allPercernt: ",allPercernt);

        if(getPercernt && allPercernt){
            var total = getPercernt/allPercernt*100;
            total = parseInt(total);
            var styleC = {
                width:total + "%",
                display:"block",
            }
            var styleCBar = {
                display:"block",
            }
        }
        if(!getPercernt){
            var total = 0;

            var styleC = {
                width:0 + "%",
                display:"none",
            }
            var styleCBar = {
                display:"none",
            }
        }

        return (
            <div>
                <div className="progress"  style= {styleCBar}>
                    <div className="progress-bar progress-bar-striped active" role="progressbar"
                  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
                    {total} %
                    </div>
                </div>
            </div>

        );

    }

    uploadBulkServicesData(event){
        event.preventDefault();

        Papa.parse( event.target.files[0], {
		    header: true,
		    complete( results, file ) {
		    	// console.log(JSON.stringify(results));
		    	Meteor.call( 'BulkServicesCSVUpload', results.data, ( error, result ) => {
                	if ( error ) {

         			} else {
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Services Data Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });

         			}
      			});

		    }
        });


    }

    render(){
    	return (
    	<section className="NotificationContent">
	        <div className="row">
	          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
	            <div className="box box-primary">
	              <div className="box-header with-border">
	              <h2 className="contentTitle">UPLOAD SERVICES DATA</h2>
	              </div>
	           
		            <div className="box-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="adminBlkUploadBtnDiv">
                                    <div className="input-group">
                                        <span className="adminBlkUpldIcon input-group-addon" id="basic-addon1"><i className="fa fa-cloud-upload" aria-hidden="true"></i></span>
                                        <input onChange={this.uploadBulkServicesData.bind(this)} className="adminBlkUpldBkg form-control adminBlkUploadBtn" type="file" name="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                {this.showProgressBar(this)}
                            </div>
                        </div>
                    </div>
			 	</div>
			  </div>
			</div>
		</section>

        );
    }
}
