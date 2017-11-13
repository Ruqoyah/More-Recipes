import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { deleteRecipeAction, editRecipeAction, saveImageToCloud } from '../../Actions/RecipesActions';
import { Link, Redirect } from 'react-router-dom';


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
      imageHeight: 0,
      imageWidth: 0,
      image: '',
      imageError: '',
      imageErrorStatus: false,
      loading: false,
      redirectOnClick: false
    }
    this.editClick = this.editClick.bind(this);
    this.backClick = this.backClick.bind(this); 
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  onChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    this.setState({[eventName]: eventValue});
  }

  handleViewClick(event){
    event.preventDefault();
    this.setState({ redirectOnClick: true });
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

  uploadImage(event) {
    event.preventDefault();
    let name = event.target.files[0];
    let file_reader = new FileReader();
    if (name) {
      file_reader.onload = () => {
        const newImage = new Image();
        newImage.src = file_reader.result;
        newImage.onload = () => {
          this.setState({
            imageHeight: newImage.height,
            imageWidth: newImage.width,
            image: name
          });
        }
      }
    }
    file_reader.readAsDataURL(name);
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.state.recipeName.trim() === '' 
    || this.state.details.trim() === '' 
    || this.state.ingredient.trim() === '') {
      toastr.options = {
        "debug": false,
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.error('All field are required')
    }
    else if(!this.state.image) {
    this.props.actions.editRecipeAction(this.props.id, this.state)
    .then(()=> {
      this.setState({
        loading: false,
        imageErrorStatus: false
      })
      toastr.options = {
        "debug": false,
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.success('Recipe edited successfully');
    })
    setTimeout(() => {
      this.setState({ 
        displayRecipe: true,
        editRecipe: false
      });
    }, 3000)
    } 
    else if(this.state.image) {
    this.setState({ picture: this.props.imageUrl })
    //Check File size
    if (this.state.imageHeight < 200 || this.state.imageWidth < 200) {
        this.setState({
          loading: false,
          imageError: 'Image is too small.',
          imageErrorStatus: true
        });
    } else {
      this.setState({
        loading: true
      })
      this.props.actions.saveImageToCloud(this.state.image)
      .then(() => {
        this.setState({ 
          loading: false,  
          picture: this.props.imageUrl 
        });
        this.props.actions.editRecipeAction(this.props.id, this.state)
          .then(() => {
            this.setState({
              loading: false,
              imageErrorStatus: false
            });
            toastr.options = {
              "debug": false,
              "timeOut": "2000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            };
            toastr.success('Recipe edited successfully');
          })
          setTimeout(() => {
            this.setState({ 
              displayRecipe: true,
              editRecipe: false
            });
          }, 3000)
      })
      .catch((error) => error)
    }
  }
}

  render() {
    return (
      this.state.redirectOnClick 
      ? 
        <Redirect to = {`/user/viewrecipe?id=${this.props.id}&page=myrecipe`}/>
      : 
      <div className="col-sm-3">
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
            <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"
              defaultValue={this.state.picture}
              onChange={this.uploadImage} />
          </label>
          {
            this.state.loading
            ?
            <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '36px', color: '#FFA500' }}></i>
            :
            null
          }
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
        <div>
        <Image cloudName="ruqoyah" className="card-img-top" publicId={this.props.picture}>
        <Transformation width="302" height="200" crop="fill" />
        </Image>
        </div>
        <div className="card-body">
          <h4 className="card-title ellipses">{this.props.recipeName}</h4>
          <p className="card-text ellipses">{this.props.details}</p>
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
    imageUrl: state.recipe.imageDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editRecipeAction,
      deleteRecipeAction,
      saveImageToCloud
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes)
