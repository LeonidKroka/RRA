import React, { PropTypes } from 'react';

import Login from '../components/session/login';
import Header from '../components/frame/header';
import Footer from '../components/frame/footer';
import GoUp from '../components/up/go_up';
import Nav from '../components/main_menu/nav';
import Home from '../components/pages/index/new';
import Profile from '../components/pages/profile/profile';

import './style.scss'

export default class SPAView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: this.props.data,
                  id: this.props.id,
                  nav: (this.props.id=='0'? 'login' : 'profile')};
  }

  addContactGetData=(contact) =>{
    this.setState({data: contact});
  }
  addContactGetId=(contact) =>{
    this.setState({id: contact});
  }
  addContactGetPage=(contact) => {
    this.setState({nav: contact})
  }

  render() {
    return (
      <div>
        < Header id={this.state.id} current_user={this.state.data.user} addContactId={ this.addContactGetId } />
        <div className="main-content">
          < GoUp />
          <div className="content">
            <div className="menu">
              {this.state.id=='0'? < Login addContactData={ this.addContactGetData }
                                           addContactId={ this.addContactGetId } /> : < Nav id={this.state.id} />}
            </div>
            <div className="yield_pages">
              {(() => {
                        switch (this.state.nav) {
                          case 'login':
                            return < Login />
                          case 'profile':
                            return < Profile id={this.state.id} data={this.state.data} />
                          default :
                            null
                      }
              })()}
            </div>
          </div>
        </div>
        < Footer id={this.state.id} />
      </div>
    );
  }
};
