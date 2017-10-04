import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../Common/Header';

export default class ProfilePage extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-4 order-lg-1 text-center">
              <img src="//placehold.it/300" className="mx-auto img-fluid img-circle d-block"
                alt="avatar" />
              <h6 className="mt-2">Upload a different photo</h6>
              <label className="custom-file">
                <input type="file" id="file" className="custom-file-input" />
                <span className="custom-file-control">Choose file</span>
              </label>
            </div>
            <div className="col-lg-8 order-lg-2">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">Profile</a>
                </li>
                <li className="nav-item">
                  <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Edit</a>
                </li>
              </ul>
              <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                  <h4 className="mb-3">User Profile</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Username</h6>
                      <p>
                        Jane
                      </p>
                      <h6>Full Name</h6>
                      <p>
                        Jane Bishop
                      </p>
                      <h6>Email</h6>
                      <p>
                        janebishop@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="edit">
                  <form role="form">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Full Name</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" value="Jane Bishop" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Email</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="email" value="janbishop@gmail.com" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Username</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" value="janeuser" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Password</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="password" value="11111122333" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="password" value="11111122333" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"></label>
                      <div className="col-lg-9">
                        <input type="reset" className="btn btn-secondary" value="Cancel" />
                        <input type="button" className="btn btn-primary" value="Save Changes" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}


