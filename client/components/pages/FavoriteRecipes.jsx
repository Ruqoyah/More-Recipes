import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavoriteAction } from '../../actions/recipesActions';
import RecipeCard from '../common/RecipeCard';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Loader from '../common/Loader';

/**
 * @class FavoriteRecipe
 *
 * @classdesc favorite recipe component
 *
 */
export class FavoriteRecipes extends Component {
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
      loader: false
    };
    this.renderPagination = this.renderPagination.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @description - gets favorite recipes
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() {
    this.setState({
      loader: true
    });
    this.props.actions.getFavoriteAction(1)
      .then(() => {
        this.setState({
          loader: false
        });
      });
  }

  /**
   * @description - get user favorite recipes
   *
   * @param  {object} page the event for the content field
   *
   * @return {void} no return or void
   *
   */
  handlePageChange(page) {
    this.props.actions.getFavoriteAction(page.selected + 1);
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
   * @description render - renders favorite recipe details
   *
   * @return {object} returns an object
   *
   */
  renderRecipe() {
    const allRecipes = this.props.favoriteRecipes;
    if (allRecipes.length < 1) {
      return (
        <div className="not-found">
          <h1>You have no favorite recipe</h1>
        </div>
      );
    }
    return (<div className="row recipes">
      {
        allRecipes.map((recipe) => (
          <RecipeCard
            picture={recipe.Recipe.picture}
            recipeName={recipe.Recipe.recipeName}
            ingredient={recipe.Recipe.ingredient}
            details={recipe.Recipe.details}
            upvotes={recipe.Recipe.upvotes}
            downvotes={recipe.Recipe.downvotes}
            views={recipe.Recipe.views}
            userId={recipe.Recipe.userId}
            username={recipe.Recipe.User.username}
            id={recipe.recipeId}
            createdAt={recipe.Recipe.createdAt}
            key={recipe.recipeId}
            currentLocation={this.props.currentLocation}
          />
        ))
      }
    </div>);
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      <div>
        <Header />
        { this.state.loader ?
          <div style={{ marginTop: '200px', textAlign: 'center' }}>
            <Loader size={'70px'} />
          </div> :
          <div>
            <h3 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>Favorite Recipes</h3>
            {this.renderRecipe()}
            {this.renderPagination(0)}
          </div>
        }
        <Footer />
      </div>);
  }
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 *  @param  {object} ownProps the store state
 *
 * @return {Object} returns state object
 *
 */
export function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user.currentUser,
    favoriteRecipes: state.recipe.favoriteRecipes,
    count: state.recipe.count,
    currentLocation: ownProps.match.path
  };
}

/**
 * @description mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getFavoriteAction
    }, dispatch)
  };
}

FavoriteRecipes.propTypes = {
  favoriteRecipes: PropTypes.array,
  actions: PropTypes.object,
  count: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
