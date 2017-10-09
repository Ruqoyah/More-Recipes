import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favoriteAction } from '../../actions/recipes_action';


class AllRecipes extends Component {
  constructor(props){
    super(props);
    const { userId } = this.props.user;
    var recipe  = this.props.recipes
    for (var i = 0; i < recipe.length; i++) {
      var { id } = recipe[i]
      console.log(id)
      this.state = {
        userId,
        recipeId: id
      }
    }
    // this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  // // onChange(event) {
  // //   const name = event.target.name;
  // //   const value = event.target.value;
  // //   this.setState({
  // //     [name]: value
  // //   })
  // // }

  onClick(e){
  e.preventDefault()
  this.props.actions.favoriteAction(this.state)
  .then((favorite) => {
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
      window.location.href = '/recipe'
    }
    toastr.success('Favorite Recipe added successfully');
  })
  }

  // componentWillMount(){
  //   var recipe  = this.props.recipes
  //   for (var i = 0; i < recipe.length; i++) {
  //     var { id } = recipe[i]
  //     console.log('id', id)
  //     this.props.actions.favoriteAction(id)
  //   }
  // }
  // componentWillReceiveProps(props) {
  //   this.setState({
  //     fullName : props.fullName,
  //     username: props.username,
  //     email: props.email,
  //   });
  // }

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
          <a href="" onClick={this.onClick} ><i className="fa fa-heart-o" aria-hidden="true" 
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
  console.log(state.recipe.recipes)
  // console.log(state.recipe.recipes[0])
  return {
    user: state.auth.user.currentUser,
    recipes: state.recipe.recipes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      favoriteAction
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);

