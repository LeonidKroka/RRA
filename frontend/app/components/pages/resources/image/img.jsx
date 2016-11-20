import React, { PropTypes } from 'react';
import './img.scss'

export default class Img extends React.Component {
  render() {
    return (
      <figure className="icon" >
        <p><img src={this.propa.src} className="with" id={(new Date()).getTime()} .></p>
      </figure>
    );
  }
};
