import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class ProfilePage extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/recipe">
            <img src="images/logo.png" width="270" height="59" alt="logo" />
          </NavLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

         <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav col-lg-6">
              <input className="form-control mr-sm-2" type="text" placeholder="Search recipe" aria-label="Search" />
            </ul>
          </div>

          <a className="navbar-brand" href="#"><img src="images/bell.png" width="32" height="33" alt="bell" /></a>
          <NavLink className="navbar-brand" to="/profilepage"><img src="images/picture.png" width="45" height="45" alt="picture" /></NavLink>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</button>
            <div className="dropdown-menu">
              <NavLink className="dropdown-item" to="/profilepage">View profile</NavLink>
              <NavLink className="dropdown-item" to="/addrecipe">My Recipes</NavLink>
              <NavLink className="dropdown-item" to="/favoriterecipe">Favorite Recipes</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" to="/">Log out</NavLink>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-4 order-lg-1 text-center">
              <img src="//placehold.it/300" className="mx-auto img-fluid img-circle d-block" alt="avatar" />
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


