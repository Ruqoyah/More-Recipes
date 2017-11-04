import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { deleteRecipeAction, editRecipeAction } from '../../Actions/RecipesActions';
import { Link } from 'react-router-dom';


class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.recipeName,
      ingredient: this.props.ingredient,
      details: this.props.details,
      picture: this.props.picture,
      editRecipe: false,
      displayRecipe: true,
    }
    this.editClick = this.editClick.bind(this);
    this.backClick = this.backClick.bind(this); 
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);

  }

  onChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    this.setState({[eventName]: eventValue});
  }
  handleViewClick(){
    window.location.href = `/viewrecipe?id=${this.props.id}&page=myrecipe`
  }
  onClick() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this recipe!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.actions.deleteRecipeAction(this.props.id, this.props.user.userId)
            .then(() => {
              swal("Poof! Your recipe has been deleted!", {
                icon: "success",
              });
            })
        } else {
          swal("Your recipe is safe!");
        }
      });
  }

  editClick() {
    this.setState({
      displayRecipe: false,
      editRecipe: true
    })
  }

  backClick() {
    this.setState({
      displayRecipe: true,
      editRecipe: false
    })
  }

  onSubmit() {
    this.props.actions.editRecipeAction(this.props.id, this.state)
  }

  render() {
    return (<div className="col-sm-3">
      {
        this.state.editRecipe &&
        <form name="add_recipe" onSubmit={this.onSubmit}>
          <div className="post-form">
            <h4>Food Name</h4>
            <input name="recipeName" className="form-control is-valid"
              defaultValue={this.state.recipeName}
              onChange={this.onChange}
              required /> <br />
            <h4>Ingredients</h4>
            <textarea name="ingredient"
              defaultValue={this.state.ingredient}
              onChange={this.onChange}
              required></textarea>
            <h4>Cooking direction</h4>
            <textarea name="details"
              defaultValue={this.state.details}
              onChange={this.onChange}
              required></textarea>
          </div>
          <label className="custom-file">
            <input name="picture" type="file" id="file2" className="custom-file-input"
              defaultValue={this.state.picture}
              onChange={this.onChange} />
            <span className="custom-file-control">Upload Picture</span>
          </label>
          <div className="input-group">
            <div className="btn-toolbar">
              <button onClick={this.backClick} className="btn btn-outline-danger">Cancel</button>
              <button type="submit" className="btn btn-outline-success">Save</button>
            </div>
          </div>
        </form>
      }
      {
        this.state.displayRecipe &&
        <div className="card">
        <img className="card-img-top" src={this.props.picture}/>
        <div className="card-body">
          <h4 className="card-title">{this.props.recipeName}</h4>
          <p className="card-text">{this.props.details}</p>
          <button onClick={this.handleViewClick} className="btn btn-success">Read more</button> <hr/>
          <div className="btn-toolbar">
            <a href="#" onClick={this.editClick} className="btn btn-outline-primary">Edit</a>
            <a href="#" onClick={this.onClick} className="btn btn-outline-danger">Delete</a>
          </div>
        </div>
      </div>
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editRecipeAction,
      deleteRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes)
