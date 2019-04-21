import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {AboutUs} from '../api/aboutUs.js';


class Aboutus extends Component{

	constructor(props){
		super(props);
		this.state={
			aboutUsTitle : '',
			aboutUsBody  : ''
		}
		var handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event){
		var target = event.target;
		var value  = target.value;
		var name   = target.name;
		this.setState({
			[name] : value
		})
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.editAboutUs){
			this.setState({
				aboutUsTitle : nextProps.editAboutUs.aboutUsTitle,
				aboutUsBody : nextProps.editAboutUs.aboutUsBody,				
			});
		}
	}

	updateAboutUsInfo(e){
		e.preventDefault();
		var aboutUsValues={
			aboutUsTitle : this.refs.aboutUsTitle.value,
			aboutUsBody  : this.refs.aboutUsBody.value,
			id           : FlowRouter.getParam('id'),
		}
		Meteor.call("aboutUsInfo",aboutUsValues,(err,res)=>{
			if(err){
				console.log(err);
			}else{
				if(FlowRouter.getParam('id')){
					this.setState({
					aboutUsTitle : '',
					aboutUsBody  : ''
				});
				swal('About us info  Updated successfully!','','success');
				FlowRouter.go('/aboutUs');
				}else{
					this.setState({
						aboutUsTitle : '',
						aboutUsBody  : ''
					});
					swal('About us info Added successfully!','','success');
				}
			}
		});
	}

	deleteAboutUs(e){
		var id = e.target.getAttribute('id');
		Meteor.call("deletAboutUs",id,(err,res)=>{
			if(err){
				console.log(err);
			}else{
				swal('AboutUs deleted successfully!','','success');
			}
		})
	}

	render(){
		if(FlowRouter.getParam('id')){
			var submitText = 'Update';
		}else{
			var submitText = 'Submit';
		}
		return(
			<section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">About Us</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR">

								<form onSubmit={this.updateAboutUsInfo.bind(this)}>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">AboutUS Title</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.aboutUsTitle} onChange={this.handleInputChange.bind(this)} type="text" ref="aboutUsTitle" name="aboutUsTitle"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">AboutUS Body</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<textArea className="effectAddress UMname form-control" value={this.state.aboutUsBody} onChange={this.handleInputChange.bind(this)} type="text" ref="aboutUsBody" name="aboutUsBody" row='6'>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
								              {this.state.aboutusBody}
								            </textArea>
									    </div>
										</div>
									</div>


								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<input type="submit" className="btn btn-primary col-lg-4 col-lg-offset-4 col-md-3 col-sm-12 col-xs-12 btn-Btn1" value={submitText}/>
								</div>
							</form>
							</div>


						<div className="table-responsive col-lg-12 categoryTable">
							<table className="table table-striped table-hover myTable table-bordered" id="example">
								<thead>
									<tr className="tableHeader">
										<th> Sr. </th>
										<th> AboutUs Title </th>
										<th> AbouUs Body </th>
										<th> Action </th>
									</tr>
								</thead>
								{ this.props.aboutUs.length > 0 ?
								<tbody>
									{ this.props.aboutUs.map( (aboutUs,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{aboutUs.aboutUsTitle}</td>
													<td>{aboutUs.aboutUsBody}</td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addSlide-'+index}></i>
														<a href={"/editAboutUs/"+aboutUs._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addSlide-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete About us</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete About us '{aboutUs.aboutUsTitle}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={aboutUs._id} onClick={this.deleteAboutUs.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
														        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
														      </div>
														    </div>
														  </div>
														</div>

													</td>
											   </tr>
									  }) 
									}									
								</tbody>
								:
								<tbody>
									<tr>
										<td colSpan="6"> Nothing to display... </td>
									</tr>
								</tbody>
							}
							</table>
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

export default withTracker(props=>{
	const postHandle = Meteor.subscribe("showAboutUs");
	const loading    = !postHandle.ready();
	const aboutUs = AboutUs.find({}).fetch();
	const editAboutUs = AboutUs.findOne({"_id":FlowRouter.getParam('id')})||{};
	return{
		aboutUs,
		editAboutUs,
	};
})(Aboutus);