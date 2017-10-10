import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favoriteAction } from '../../actions/recipes_action';


class AllRecipes extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    favoriteAction( this.props.id, this.props.user.userId)
    .then((status) => {
      if(status === true) {
      toastr.options = {
        "debug": false,
        "positionClass": "toast-top-full-width",
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.options.onHidden = function () {
        // window.location.href = '/recipe'
      }
      toastr.success('Favorite Recipe added successfully');
    } else {
      toastr.error('You already favorite recipe')
    }
    })
  }

  render() {
    return (
      <div className="col-sm-4">      
      <div style={{marginBottom: '15px'}} className="card">
        <img className="card-img-top" src={this.props.picture}/>
        <div className="card-body">
          <h4 className="card-title">{this.props.recipeName}</h4>
          <p className="card-text">{this.props.details}</p>
          <p className="card-text text-right"><small className="text-muted">Recipe by James</small></p>
          <Link to="/viewrecipe" className="btn btn-success">Read more</Link>
          <a href="" ><i className="fa fa-thumbs-up" aria-hidden="true" style={{ fontSize:'30px', color: 'orange'}}></i></a>
          <a href="" ><i className="fa fa-thumbs-down" aria-hidden="true" style={{ fontSize:'30px', color: 'grey' }}></i></a>
          <a href="" onClick={this.handleClick} ><i className="fa fa-heart-o" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'red' }}></i></a>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes,
    user: state.auth.user.currentUser
  }
}


export default connect(mapStateToProps)(AllRecipes);
