import React, { Component } from 'react';
import { render } from 'react-dom'


export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer">
        <div className="row">
            <div className="col">
                <h6>Support</h6>
                <a href="#">Contact Us</a>
            </div>
            <div className="col">
                <h6>About Us</h6>
                <a href="#">Newsroom</a>
                <p>© 2017 Morerecipes.com </p>
                <p>All Rights Reserved</p>
            </div>
            <div className="col">
                <h6>Advertising</h6>
                <a href="#">Advertise with Us</a>
            </div>
        </div>
    </div>

      </div>);
  }
}
