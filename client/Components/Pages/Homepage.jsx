import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Footer from '../Common/Footer';

export default class Homepage extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="#">More Recipes</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">About Us <span className="sr-only">
                  (current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
        <div className="btn-toolbar">
          <div className="jumbotron logo">
            <img src="images/logo.png" width="60%" alt="bell" />
            <h5>More-Recipes is a platform for users to share the awesome and exciting recipe
              ideas they have invented or learnt</h5>
            <Link to="/signup" className="btn btn-outline-danger btn-lg"> Create a profile</Link> 
            <Link to="/login" className="btn btn-outline-success btn-lg"> Login</Link>
            </div>
          </div>
        </div>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="images/slide1.png" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/slide2.png" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/slide3.png" alt="Third slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <Footer />
      </div>);
  }
}


