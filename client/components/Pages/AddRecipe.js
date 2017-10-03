import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecipeAction, getUserRecipeAction } from '../../actions/pages_action';
import Header from '../Common/Header';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    const { userId } = this.props.user;
    this.state = {
      recipeName: '',
      userId,
      ingredient: '',
      details: '',
      picture: 'http://localhost:8000/images/dessert%20salad.png'
      // returnRecipeName: '',
      // returnIngredient: '',
      // returnDetails: '',
      // returnPicture: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit(e) {
    // console.log(this.state)
    e.preventDefault();
    this.props.actions.addRecipeAction(this.state)    
     .then((recipe) => {
        toastr.options = {
          "debug": false,
          "positionClass": "toast-top-full-width",
          "timeOut": "2000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        toastr.options.onHidden = function() { 
            // window.location.href = '/addrecipe'
         }
        toastr.success('Recipe added successfully'); 
      //   this.setState({
      //     returnRecipeName: recipe.data.recipeName,
      //     returnIngredient: recipe.data.ingredient,
      //     returnDetails: recipe.data.details,
      //     returnPicture: recipe.data.picture
      // })         
    })
  }

  // componentDidMount() {
  //  this.props.action.getUserRecipeAction()
  // }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <form name="add_recipe" onSubmit={this.onSubmit}>
              <div className="post-form">
                <h4 >Recipe Name</h4>
                <input name="recipeName" onChange={this.onChange}  className="form-control is-valid" required/> <br />
                <h4>Ingredients</h4>
                <textarea name="ingredient" onChange={this.onChange} required></textarea>
                <h4>Details</h4>
                <textarea  name="details" onChange={this.onChange} required></textarea>
              </div>
              <label className="custom-file">
                <input name="picture" type="file" id="file2" className="custom-file-input"
                  onChange={this.onChange} />
                <span className="custom-file-control">Upload Picture</span>
              </label>
              <div className="input-group">
                <button type="submit" className="btn btn-outline-danger btn-lg">Post</button>
              </div>
              </form>
            </div>
            <div className="col">
              <div className="card">
                <img className="card-img-top" src="images/dessert salad.png" alt="dessert salad" />
                <div className="card-body">
                  <h4 className="card-title">{this.state.returnRecipeName}</h4>
                  <p className="card-text">{this.state.returnDetails}</p>
                  <Link to="/viewrecipe" className="btn btn-success">Read more</Link> <hr />
                  <a href="#" className="btn btn-outline-primary">Edit</a>
                  <a href="#" className="btn btn-outline-danger">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

function mapStateToProps(state){
  return {
    user: state.auth.user.currentUser,
    userRecipe: state.userRecipe
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
