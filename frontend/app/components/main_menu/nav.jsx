import React, { PropTypes } from 'react';
import './style.scss'

export default class Nav extends React.Component {
  navChange = (url, location, event) => {
    $.ajax({
      type: "GET",
      url: url,
      success: (response) => {
        if (response.status) { this.props.addContactPage(location),
                               this.props.addContactData(response.data)}
      },
    })
  }

  render() {
    return (
      <div className="main-menu">
        <ul>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id, 'profile')}>
            <li>Profile</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/messages", 'message')}>
            <li>Messages</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/posts", 'news')}>
            <li>News</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/friends", 'friends')}>
            <li>Friends</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/images", 'image')}>
            <li>Gallery</li>
          </a>
        </ul>
      </div>
    );
  }
};
