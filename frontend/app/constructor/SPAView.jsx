import React, { PropTypes } from 'react';

import Login from '../components/session/login';
import Header from '../components/frame/header';
import Footer from '../components/frame/footer';
import GoUp from '../components/up/go_up';
import Nav from '../components/main_menu/nav';
import Home from '../components/pages/index/new';
import Profile from '../components/pages/profile/profile';
import News from '../components/pages/news/posts';
import Friends from '../components/pages/friends/friends';
import EditUser from '../components/pages/resources/forms/edit_user';

import './style.scss'

export default class SPAView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: this.props.data,
                  newsData: {},
                  friendsData: {},
                  id: this.props.id,
                  nav: (this.props.id=='0'? 'login' : 'profile')};
  }
  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  addContactGetData=(contact) =>{
    this.setState({data: contact});
  }
  addContactGetNewsData=(contact) =>{
    this.setState({newsData: contact});
  }
  addContactGetFriendsData=(contact) =>{
    this.setState({friendsData: contact});
  }
  addContactGetId=(contact) =>{
    this.setState({id: contact});
  }
  addContactGetPage=(contact) => {
    this.setState({nav: contact});
  }

  render() {
    return (
      <div>
        < Header id={this.state.id}
                 current_user={this.props.data.user}
                 addContactId={ this.addContactGetId}
                 addContactPage={this.addContactGetPage} />
        <div className="main-content">
          < GoUp />
          <div className="content">
            <div className="menu">

              {this.state.id=='0'? < Login addContactData={ this.addContactGetData }
                                           addContactId={ this.addContactGetId }
                                           addContactPage={this.addContactGetPage} /> : < Nav id={this.state.id}
                                                                                            addContactPage={this.addContactGetPage}
                                                                                            addContactData={this.addContactGetData}
                                                                                            addContactNewsData={this.addContactGetNewsData}
                                                                                            addContactFriendsData={this.addContactGetFriendsData}/>}
            </div>

            <div className="yield_pages">
              {(() => {
                        switch (this.state.nav) {
                          case 'login':
                            return < Home />
                          case 'profile':
                            return < Profile id={this.props.id}
                                             data={this.state.data}
                                             addContactPage={this.addContactGetPage}
                                             addContactData={this.addContactGetData} />

                          case 'news':
                            return < News    id={this.state.id}
                                             data={this.state.newsData} />

                          case 'friends':
                            return < Friends friends={this.state.friendsData.friends}
                                             addContactPage={this.addContactGetPage}
                                             addContactData={this.addContactGetData} />

                          case 'edit':
                            return < EditUser    user={this.props.data.user}
                                             id={this.props.id}
                                             addContactPage={this.addContactGetPage}
                                             addContactData={this.addContactGetData} />

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
