import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CategoryListPage extends TrackerReact (Component){
	render(){
		return(
			<div>
				<a href="/">
					<div className="col-lg-4
									col-md-4
									col-sm-4
									col-xs-4 tileView categoryImg">
							<span className="categoryCount">
								1
							</span>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 catNameWrap">
								<span>Category Name</span>
							</div>
					</div>
				</a>				
			</div>
			
		);
	}
}
	