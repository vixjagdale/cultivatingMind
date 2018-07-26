import React,{Component} from 'react';
import { render } from 'react-dom';

export default class Sidebar extends Component{
  constructor() {
   super();
    this.state = {
      subscription :{
        "userData" : Meteor.subscribe("userData",Meteor.userId()), 
      }
    }
  }

  removePersistantSessions(){
      UserSession.delete("progressbarSession", Meteor.userId());
      UserSession.delete("allProgressbarSession", Meteor.userId());
  }

  render(){
    return(

        <aside className="main-sidebar" onClick={this.removePersistantSessions.bind(this)}>
          {/* sidebar: style can be found in sidebar.less */}
          <section className="sidebar">
            {/* Sidebar user panel */}
            <div className="user-panel">
              <div className="pull-left image">
                {/*<img src={this.currentUser()} className="img-circle" />*/}
                <p></p>
              </div>
              <div className="pull-left info">
                {/*<p> {this.currentUser()}</p>*/}
                <p></p>
                {/*<a href="javascript:void(0)"><i className="fa fa-circle text-success" /> Cultivating</a>*/}
              </div>
            </div>
            <ul className="sidebar-menu" data-widget="tree">
              <li className="">
                <a href="/admin/dashboard" activeClassName="active">
                  <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                </a>
              </li>
              <li className="treeview">
                <a href="JavaScript:void(0);">
                  <i className="fa fa-user" />
                  <span>Master Data</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="/addCategory">
                      <i className="fa fa-circle-o" /> Add Contents
                    </a>
                  </li>
                  
                </ul>
              </li>    
            </ul>
          </section>
          {/* /.sidebar */}
        </aside>
    );
  }
}
