import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
  componentDidMount(){
    document.body.style.backgroundImage = "url(/images/designed.png)"
    document.body.className="body-component-b"
}
  render() {
    return (
      <div>
        <div className = "header-signup">
          <h4>Signup</h4>
        </div>
        <form className="form">
        <div className="form-group">
            <input type="text" className="form-control" id="exampleInputText1" placeholder="Username" />
        </div>
        <div className="form-group">
            <input type="text" className="form-control" id="exampleInputText1" placeholder="Full Name" />
        </div>
        <div className="form-group">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-group">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
        </div>
        <select className="custom-select d-block my-3" required>
            <option value="">Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
        </select>

        <label className="custom-file">
            <input type="file" id="file2" className="custom-file-input" />
            <span className="custom-file-control">Upload Picture</span>
        </label>
        <div className="input-group">
            <Link to="login" className="btn btn-outline-danger btn-lg btn-block">Finish</Link>
        </div>
    </form>
      </div>);
  }
}


