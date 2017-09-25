import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {

// componentDidMount(){
//     document.body.style.backgroundColor = "#f2f2f2"
//     document.body.className="body-component-a"
// }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <a className="navbar-brand" href="#">More Recipes</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="#">About Us <span className="sr-only">(current)</span></a>
                </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
        <div className="container-fluid">
        <div className="jumbotron logo">
            <img src="images/logo.png" width="60%" height="30%" alt="bell" />
            <h5>More-Recipes is a platform for users to share the awesome and exciting recipe ideas they have invented or learnt</h5>
            <p className="show-off">Show off your latest recipe and get feedback.</p>
            <Link to="signup" className="btn btn-outline-danger btn-lg"> Create a profile</Link>
            <Link to="login" className="btn btn-outline-success btn-lg"> Login</Link>
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

      </div>);
  }
}


