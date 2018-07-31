import React      from 'react';
import { mount }  from 'react-mounter';

import DashboardLayout from '/imports/adminDashboard/dashboard/components/DashboardLayout.jsx';
import AdminContent from '/imports/adminDashboard/dashboard/components/AdminContent.jsx';
import AddNewProdutsContainer from '/imports/adminDashboard/products/components/AddNewProduts.jsx';
import AddNewServiceContainer from '/imports/adminDashboard/services/components/AddNewService.jsx';
import ServicesList from '/imports/adminDashboard/services/components/ServicesList.jsx';
import FeaturedServices from '/imports/adminDashboard/services/components/FeaturedServices.jsx';
import BulkServiceUpload from '/imports/adminDashboard/services/components/BulkServiceUpload.jsx';
import ProductsList from '/imports/adminDashboard/products/components/ProductsList.jsx';
import FeaturedProducts from '/imports/adminDashboard/products/components/FeaturedProducts.jsx';
import Enquiries from '/imports/adminDashboard/dashboard/components/Enquiries.jsx';
import BulkUploadProducts from '/imports/adminDashboard/products/components/BulkUploadProducts.jsx';
import AddNewCategoryContainer from '/imports/adminDashboard/category/components/AddNewCategory.jsx';
import CompanySettingsContainer from '/imports/adminDashboard/companySettings/components/CompanySettings.jsx';
import AddNewBrandsContainer from '/imports/adminDashboard/brands/components/AddNewBrands.jsx';
import AddNewSlideshowContainer from '/imports/adminDashboard/slideshow/components/AddNewSlideshow.jsx';
import { Layout } from '/imports/homepage/common/components/Layout.jsx';
import AllServicesBlock from '/imports/homepage/servicesBlock/components/AllServicesBlock.jsx';
import ShowAllProducts from '/imports/homepage/topProductsBlock/components/ShowAllProducts.jsx';
import SearchProductPage from '/imports/homepage/topProductsBlock/components/SearchProductPage.jsx';
import SearchServicePage from '/imports/homepage/servicesBlock/components/SearchServicePage.jsx';
import ProductInformation from '/imports/homepage/topProductsBlock/components/ProductInformation.jsx';
import ServiceInformation from '/imports/homepage/servicesBlock/components/ServiceInformation.jsx';
import ContactUs from '/imports/contactUs/components/ContactUs.jsx';

FlowRouter.route('/enquiries', {
    name: 'enquiries',
    action: function() {
		mount(DashboardLayout,{
			main:(<Enquiries />),
		})
    }
});

FlowRouter.route('/products', {
    name: 'All services',
    action: function() {
		mount(Layout,{
			main:(<ShowAllProducts />),
		})
    }
});

FlowRouter.route('/contact', {
    name: 'contact',
    action: function() {
		mount(Layout,{
			main:(<ContactUs />),
		})
    }
});


FlowRouter.route('/services', {
    name: 'All services',
    action: function() {
		mount(Layout,{
			main:(<AllServicesBlock />),
		})
    }
});

FlowRouter.route('/ecsystemAdminDashboard', {
    name: 'adminDashboard',
    action: function() {
		mount(DashboardLayout,{
			main:(<AdminContent />),
		})
    }
});

FlowRouter.route('/addNewProducts', {
    name: 'add new products',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewProdutsContainer />),
		})
    }
});

FlowRouter.route('/addNewProducts/:productId', {
    name: 'update product',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewProdutsContainer />),
		})
    }
});

FlowRouter.route('/addNewService', {
    name: 'add new Service',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewServiceContainer />),
		})
    }
});

FlowRouter.route('/addNewService/:serviceId', {
    name: 'update Service',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewServiceContainer />),
		})
    }
});

FlowRouter.route('/addNewProductCategory', {
    name: 'add new category',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewCategoryContainer />),
		})
    }
});

FlowRouter.route('/addNewProductCategory/:categoryId', {
    name: 'update category',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewCategoryContainer />),
		})
    }
});

FlowRouter.route('/addNewBrand', {
    name: 'add new Brand',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewBrandsContainer />),
		})
    }
});

FlowRouter.route('/addNewBrand/:brandId', {
    name: 'update Brand',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewBrandsContainer />),
		})
    }
});

FlowRouter.route('/viewAllProducts', {
    name: 'view All Products',
    action: function() {
		mount(DashboardLayout,{
			main:(<ProductsList />),
		})
    }
});

FlowRouter.route('/viewAllServices', {
    name: 'view All Services',
    action: function() {
		mount(DashboardLayout,{
			main:(<ServicesList />),
		})
    }
});

FlowRouter.route('/featuredProducts', {
    name: 'Featured Products',
    action: function() {
		mount(DashboardLayout,{
			main:(<FeaturedProducts />),
		})
    }
});

FlowRouter.route('/featuredServices', {
    name: 'Featured Services',
    action: function() {
		mount(DashboardLayout,{
			main:(<FeaturedServices />),
		})
    }
});

FlowRouter.route('/BulkUploadProducts', {
    name: 'Bulk Upload Products',
    action: function() {
		mount(DashboardLayout,{
			main:(<BulkUploadProducts />),
		})
    }
});

FlowRouter.route('/BulkUploadServices', {
    name: 'Bulk Upload Services',
    action: function() {
		mount(DashboardLayout,{
			main:(<BulkServiceUpload />),
		})
    }
});

FlowRouter.route('/companySettings', {
    name: 'CompanySettings',
    action: function() {
		mount(DashboardLayout,{
			main:(<CompanySettingsContainer />),
		})
    }
});

FlowRouter.route('/addNewSlide', {
    name: 'add New Slide',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewSlideshowContainer />),
		})
    }
});

FlowRouter.route('/addNewSlide/:slideId', {
    name: 'update Slide',
    action: function() {
		mount(DashboardLayout,{
			main:(<AddNewSlideshowContainer />),
		})
    }
});
FlowRouter.route('/product/:category', {
    name: 'Search Products',
    action: function() {
		mount(Layout,{
			main:(<SearchProductPage />),
		})
    }
});
FlowRouter.route('/service/:serviceName', {
    name: 'Search Products',
    action: function() {
		mount(Layout,{
			main:(<SearchServicePage />),
		})
    }
});
FlowRouter.route('/productInfo/:productId', {
    name: 'Info Products',
    action: function() {
		mount(Layout,{
			main:(<ProductInformation />),
		})
    }
});
FlowRouter.route('/serviceInfo/:serviceId', {
    name: 'Info Products',
    action: function() {
		mount(Layout,{
			main:(<ServiceInformation />),
		})
    }
});