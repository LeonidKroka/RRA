import React, { PropTypes } from 'react';

import Login from '../components/session/login';
import Header from '../components/frame/header';
import Footer from '../components/frame/footer';
import GoUp from '../components/up/go_up';
import Nav from '../components/main_menu/nav';
import Home from '../components/pages/index/new';

import './style.scss'

export default class SPAView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {recentContacts: [],
                  user: this.props.current_user,
                  id: this.props.id};
  }

  addContactGetUser=(contact) =>{
    this.setState({user: contact});
  }
  addContactGetId=(contact) =>{
    this.setState({id: contact});
  }

  render() {
    return (
    <div>
      < Header id={this.state.id} current_user={this.state.user} addContactId={ this.addContactGetId } />
      <div className="main-content">
        < GoUp />
        <div className="content">
          <div className="menu">
            {this.state.id=='0'? < Login addContactUser={ this.addContactGetUser }
                                         addContactId={ this.addContactGetId } /> : < Nav id={this.state.id} />}
          </div>
          <div className="yield_pages">
            < Home />
          </div>
        </div>
      </div>
      < Footer id={this.state.id} />
    </div>
    );
  }
};
