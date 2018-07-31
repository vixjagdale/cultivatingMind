import React, {Component} from 'react';
import {render} from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {PropTypes} from 'prop-types';
import HeaderContainer from '/imports/homepage/slideShowBlock/components/Header.jsx';
import CategoryPage from '/imports/homepage/categoryBlock/components/CategoryPage.jsx';
import TopProductsBlock from '/imports/homepage/topProductsBlock/components/TopProductsBlock.jsx';
import BrandsBlock from '/imports/homepage/brandsBlock/components/BrandsBlock.jsx';
import ServicesBlock from '/imports/homepage/servicesBlock/components/ServicesBlock.jsx';
import ContactUsBlockContainer from '/imports/homepage/contactUsBlock/components/ContactUsBlock.jsx';
import { SlideShow } from '/imports/adminDashboard/slideshow/api/slideshow.js';

export default class SlideShowBlock extends TrackerReact(Component){

	constructor(){
		super();
		this.state={
			'subscription':{
				allSlideShow : Meteor.subscribe('allSlideShow'),
			}
		}
	}

	showallSlides(){
		return SlideShow.find({});
	}

	render(){
		return(
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ecEleHomeWrap">
					<HeaderContainer/>
					<div id="mySlideShow" className="carousel slide ECSlideShow" data-ride="carousel" data-interval="3000">
					  
					<ol className="carousel-indicators">
						{ this.showallSlides().map( (slides,index)=>{
							if(index == 0){
								var activeStatus = 'active';
							}else{
								var activeStatus = '';
								var hideSlideDetail = "hideSlidDetails";
							}
								
							return (
									<li data-target="#mySlideShow" key={index} data-slide-to={index} className={activeStatus}></li>
								);
						  }) 
						}
					</ol>

					  <div className="carousel-inner">
						{ this.showallSlides().map( (slides,index)=>{
							if(index == 0){
								var activeStatus = 'active';
							}else{
								var activeStatus = '';
								var hideSlideDetail = "hideSlidDetails";
							}
								
							return (
								    <div className={"item "+ activeStatus} key={index}>
								      <img src={slides.slideImg} className="col-lg-12 col-sm-12 col-md-12 col-xs-12 bannerimg"/>
								      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sliderTitles">
									      <div><h2> {slides.tagLine1}</h2></div>
									      <div><h3> {slides.tagLine2}</h3></div>
									      <div><h4> <b>{slides.tagLine3} </b></h4></div>
									      <div className={"hideotherDetails "+ hideSlideDetail} ><h5> <b>Cash On Delivery </b></h5></div>
									      <div className={"hideotherDetails "+ hideSlideDetail}><h5> <b>Timing 10 AM TO 7 PM </b></h5></div>
									      <button className={"btn btn-primary freeDelBtn "+ hideSlideDetail}>Free Delivery </button>

								      </div>
								    </div>
								);
						  }) 
						}

					  </div>

					  <a className="left carousel-control" href="#mySlideShow" data-slide="prev">
					    <span className="glyphicon glyphicon-chevron-left"></span>
					    <span className="sr-only">Previous</span>
					  </a>
					  <a className="right carousel-control" href="#mySlideShow" data-slide="next">
					    <span className="glyphicon glyphicon-chevron-right"></span>
					    <span className="sr-only">Next</span>
					  </a>
					</div>
					{/*<CategoryPage/>
					<TopProductsBlock/>
					<ServicesBlock/>
					<BrandsBlock/>
					<ContactUsBlockContainer/>*/}
				</div>
			);
	}
}