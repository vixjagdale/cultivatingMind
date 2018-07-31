import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Categories } from '../api/category.js';


class AddNewCategory extends TrackerReact(Component){

	constructor(props) {
	  super(props);
		  this.state = {
		    "categoryName" : '',
			"subscription" : {
				"allCategories" : Meteor.subscribe("allCategories"),
			}

		  };	   	
		    this.handleInputChange = this.handleInputChange.bind(this);
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps){
			if(Object.keys(nextProps.post).length != 0){

		            this.setState({
		          		categoryName : nextProps.post.categoryName,
		            })

		            
	    	}
    	}
    	this.handleInputChange = this.handleInputChange.bind(this);
    }



	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });

	}

	allCategories(){
		return Categories.find({}).fetch()
	}

	updateCategoryInfo(event){
		event.preventDefault();
		var categoryId      = FlowRouter.getParam("categoryId");
		var formvalues = {
							'categoryName' : this.refs.categoryName.value,
							// 'categoryImg'  : this.refs.categoryImg.value,
							'categoryImg'  : "../images/mouse.jpeg",
							'categoryId'   : categoryId,
						}

		if(categoryId){
		    Meteor.call('updateCategory', formvalues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
		    		this.refs.categoryName.value = '';
		    		FlowRouter.go('/addNewProductCategory');
		    		swal('Category updated successfully!');
		    	}
		    });
		}else{
		    Meteor.call('addNewCategory', formvalues, (error,result)=>{
		    	if(error){
		    		console.log("client error"+error);
		    		swal(error);
		    	}else{
		    		this.refs.categoryName.value = '';
		    		swal('Category added successfully!');
		    	}
		    });			
		}


	}

	deleteCategory(event){
		event.preventDefault();
		var dltId = event.target.id;
	    Meteor.call('deleteCategory', dltId, (error,result)=>{
	    	if(error){
	    		console.log("client error"+error);
	    		swal(error);
	    	}else{
	    		swal('Category deleted successfully!');
	    	}
	    });		
	}


	render() {

		if(!this.props.loading){
		if(this.props.post){

	  	  var categoryId = FlowRouter.getParam("categoryId");
	  	  if(categoryId){
	  	  	var categoryId = 'UPDATE';
	  	  }else{
	  	  	var categoryId = 'SAVE';
	  	  }

	       return (
	       <section className="Content">
				<div className="row">
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm">

					<div className="box box-primary">
			            <div className="box-header with-border">
			            <h4 className="contentTitle">Add NEW CATEGORY</h4>
			            </div>
					
						<div className="box-body">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadLR">

								<form onSubmit={this.updateCategoryInfo.bind(this)}>


									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Category Name</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" value={this.state.categoryName} onChange={this.handleInputChange.bind(this)} type="text" ref="categoryName" name="categoryName"/>
						                      <span className="input-group-addon addons"><i className="fa fa-object-group"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>

									<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
										<label className="col-lg-6 col-sm-6 col-xs-3 col-md-6 allTimeLabel">Category Image</label>
										<div className="form-group col-lg-12 col-sm-12 col-xs-12 col-md-12">
									    <div className="inputEffect col-xs-12 input-group">
								        	<input className="effectAddress UMname form-control" type="text" ref="categoryImg" name="categoryImg"/>
						                      <span className="input-group-addon addons"><i className="fa fa-picture-o"></i></span>
								              <span className="focusBorder">
								            	<i></i>
								              </span>
									    </div>
										</div>
									</div>


								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<input type="submit" className="btn btn-primary col-lg-4 col-lg-offset-4 col-md-3 col-sm-12 col-xs-12 btn-Btn1" value={categoryId}/>
								</div>
							</form>
							</div>


						<div className="table-responsive col-lg-12 categoryTable">
							<table className="table table-striped table-hover myTable table-bordered" id="example">
								<thead>
									<tr className="tableHeader">
										<th> Sr. </th>
										<th> Category Name </th>
										<th> Category Image </th>
										<th> Action </th>
									</tr>
								</thead>
								<tbody>
									{ this.allCategories().map( (categoryInfo,index)=>{
										return <tr key={index}>
													<td>{index+1}</td>
													<td>{categoryInfo.categoryName}</td>
													<td><img src={categoryInfo.categoryImg} className="img-responsive"/></td>
													<td>
														<i className="fa fa-trash col-lg-1 dltCategory" aria-hidden="true" data-toggle="modal" data-target={'#addCategory-'+index}></i>
														<a href={"/addNewProductCategory/"+categoryInfo._id}><i className="fa fa-pencil-square-o col-lg-1" aria-hidden="true"></i></a>

														<div id={'addCategory-'+index} className="modal fade" role="dialog">
														  <div className="modal-dialog">
														    <div className="modal-content">
														      <div className="modal-header">
														        <button type="button" className="close" data-dismiss="modal">&times;</button>
														        <h4 className="modal-title">Delete Category</h4>
														      </div>
														      <div className="modal-body">
														        <p>Do you want to delete category '{categoryInfo.categoryName}'?</p>
														      </div>
														      <div className="modal-footer">
														        <button type="button" id={categoryInfo._id} onClick={this.deleteCategory.bind(this)} className="btn btn-danger pull-left" data-dismiss="modal">Delete</button>
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
							</table>
						</div>

						</div>
						</div>
					</div>	
				</div>
				</div>
			</section>
		    );

	   		}else{
	    		return (
	    			<div className="col-sm-12 col-xs-12 loadingImg"><img src="images/loading.gif" alt="loading"/></div>
	    		);
	    	}
	    }else{
	    	return (
            <div className="col-sm-12 col-xs-12 loadingImg"><img src="images/loading.gif" alt="loading"/></div>
	    	);
	    }


	} 

}

export default AddNewCategoryContainer  = withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

    var categoryId      = FlowRouter.getParam("categoryId");
    // console.log('categoryId: '+categoryId);

    const postHandle    = Meteor.subscribe('findCategory',categoryId);
    const post          = Categories.findOne({'_id':categoryId})||{};
          loading       = !postHandle.ready();   	
     // console.log('post: ',post);
    return {
        loading,
        post,
    };
})(AddNewCategory);


