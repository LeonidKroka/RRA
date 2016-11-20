import React, { PropTypes } from 'react';
import './ico_list.scss'

export default class AvatarIco extends React.Component {
  render() {
    return (
      <a href={"/users/"+String(this.props.user.id)} data-remote="true">
        <figure className="pfofile-friend">
          <p><img src={this.props.img} /></p>
          <figcaption>{this.props.user.name}</figcaption>
        </figure>
      </a>
    );
  }
};
