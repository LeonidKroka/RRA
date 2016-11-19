import React, { PropTypes } from 'react';
import './style.scss'

export default class Nav extends React.Component {
  render() {
    return (
      <div className="main-menu">
        <ul>
          <a href={"/users/"+this.props.id} data-remote="true">
            <li>Profile</li>
          </a>
          <a href={"/users/"+this.props.id+"/messages"} data-remote="true">
            <li>Messages</li>
          </a>
          <a href={"/users/"+this.props.id+"/posts"} data-remote="true">
            <li>News</li>
          </a>
          <a href={"/users/"+this.props.id+"/friends"} data-remote="true">
            <li>Friends</li>
          </a>
          <a href={"/users/"+this.props.id+"/images"} data-remote="true">
            <li>Gallery</li>
          </a>
        </ul>
      </div>
    );
  }
};
