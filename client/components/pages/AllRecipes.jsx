import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/Header';
import { getAllRecipeAction, searchRecipesAction } from '../../actions/recipesActions';
import RecipesCard from '../common/RecipesCard';
import Footer from '../common/Footer';
import Loader from '../common/Loader';

/**
 * @class RecipePage
 *
 * @classdesc Recipes page component
 *
 */
class AllRecipes extends Component {
  /**
   * @description constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      searchRecipes: ''
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @description - gets all recipes
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.setState({
      loader: true
    });
    this.props.actions.getAllRecipeAction(1)
      .then(() => {
        this.setState({
          loader: false
        });
      });
  }

  /**
   * @description - handles search recipes event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  searchHandler(event) {
    this.setState({
      loader: true
    });
    if (event.target.value.trim() !== '') {
      this.setState({
        searchRecipes: event.target.value
      });
      this.props.actions.searchRecipesAction(event.target.value)
        .then(() => {
          this.setState({
            loader: false
          });
        });
    } else {
      this.setState({
        loader: true
      });
      this.props.actions.getAllRecipeAction(1)
        .then(() => {
          this.setState({
            loader: false
          });
        });
    }
  }

  /**
   * @description render - renders recipe details
   *
   * @return {object} returns an object
   *
   */
  renderRecipe() {
    const allRecipes = this.props.recipes;
    if (allRecipes.length < 1) {
      return (
        <div className="not-found">
          <h1>No recipe found </h1>
        </div>
      );
    }
    return (<div className="row recipes">
      {
        allRecipes.map((recipe) => (
          <RecipesCard
            picture={recipe.picture}
            recipeName={recipe.recipeName}
            ingredients={recipe.ingredients}
            details={recipe.details}
            views={recipe.views}
            upvotes={recipe.upvotes}
            downvotes={recipe.downvotes}
            username={recipe.User.username}
            createdAt={recipe.createdAt}
            id={recipe.id}
            userId={recipe.userId}
            key={recipe.id}
          />
        ))
      }
    </div>);
  }

  /**
   * @description - get all recipe
   *
   * @param  {object} page the event for the content field
   *
   * @return {void} no return or void
   *
   */
  handlePageChange(page) {
    this.props.actions.getAllRecipeAction(page.selected + 1);
  }

  /**
   * @description - handle pagination
   *
   * @param  {object} count the event for the content field
   *
   * @return {void} no return or void
   *
   */
  renderPagination(count) {
    if (this.props.count > 12) {
      return (
        <ReactPaginate
          previousLabel={
            <i className="page-link">Previous</i>
          }
          nextLabel={
            <i className="page-link">Next</i>
          }
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.props.count / 12}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          initialPage={count}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination justify-content-center'}
          activeClassName={'active'}
        />
      );
    }
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   */
  render() {
    return (
      <div>
        <Header
          searchHandler = {this.searchHandler}/>
        <div style={{ textAlign: 'center', alignItems: 'center', margin: 20 }}>
          <Link to="/add-recipe" className="btn btn-outline-danger btn-lg">
            Add new Recipe
            <i className="fa fa-plus"
              aria-hidden="true" />
          </Link>
        </div>
        <div>
          { this.state.loader ?
            <div style={{ marginTop: '80px', textAlign: 'center' }}>
              <Loader size={'70px'} />
            </div> :
            <div>
              {(this.props.error) ?
                <div className="not-found">
                  <h1>No match recipe found</h1>
                </div> :
                <div>
                  {this.renderRecipe()}
                  {this.renderPagination(0)}
                </div>
              }
            </div>
          }
        </div>
        <Footer />
      </div>);
  }
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 *
 */
function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes,
    user: state.auth.user.currentUser,
    count: state.recipe.count,
    error: state.recipe.error
  };
}

/**
 * mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      searchRecipesAction,
      getAllRecipeAction
    }, dispatch)
  };
}

AllRecipes.propTypes = {
  count: PropTypes.number,
  actions: PropTypes.object,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
