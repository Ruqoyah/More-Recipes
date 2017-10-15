import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { deleteRecipeAction, editRecipeAction } from '../../actions/recipes_action';
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
      displayRecipe: true
    }
    this.onClick = this.onClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    this.setState({[eventName]: eventValue});
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
          deleteRecipeAction(this.props.id, this.props.user.userId)
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
              <button type="submit" className="btn btn-outline-danger btn-lg">Save</button>
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
              <Link to="/viewrecipe" className="btn btn-success">Read more</Link>
              <a href=""><i className="fa fa-thumbs-up" aria-hidden="true" style={{ fontSize: '30px', color: 'orange' }}></i></a>
              <a href=""><i className="fa fa-thumbs-down" aria-hidden="true" style={{ fontSize: '30px', color: 'grey' }}></i></a>
              <a href="" onClick={this.props.handleClick}><i className="fa fa-heart-o" aria-hidden="true" style={{ fontSize: '30px', color: 'red' }}></i></a> <hr />
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
      editRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes)
