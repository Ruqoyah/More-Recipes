import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserRecipeAction } from '../../actions/recipesActions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Loader from '../common/Loader';
import UserRecipesInclude from '../include/UserRecipesInclude';

/**
 * @class MyRecipe
 *
 * @classdesc get user recipes and allow user to edit or delete recipes
 *
 */
export class UserRecipes extends Component {
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
   * @description - gets user recipes
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() {
    this.setState({
      loader: true
    });
    this.props.actions.getUserRecipeAction(1)
      .then(() => {
        this.setState({
          loader: false
        });
      });
  }

  /**
   * @description - get user recipes
   *
   * @param  {object} page the event for the content field
   *
   * @return {void} no return or void
   *
   */
  handlePageChange(page) {
    this.props.actions.getUserRecipeAction(page.selected + 1);
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
   * @description render - renders user recipes
   *
   * @return {object} returns an object
   *
   */
  renderRecipe() {
    const allUserRecipe = this.props.userRecipes;
    if (allUserRecipe.length < 1) {
      return (
        <div className="not-found">
          <h1>You have no recipe</h1>
        </div>
      );
    }
    return (<div className="row recipes">
      {
        allUserRecipe.map((recipe) => (
          <UserRecipesInclude
            picture={recipe.picture}
            recipeName={recipe.recipeName}
            ingredient={recipe.ingredient}
            upvotes={recipe.upvotes}
            downvotes={recipe.downvotes}
            userId={recipe.userId}
            views={recipe.views}
            details={recipe.details}
            id={recipe.id}
            key={recipe.id}
          />
        ))
      }
    </div>
    );
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
            <h3 style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center' }}>My Recipes</h3>
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
 * @return {Object} returns state object
 *
 */
export function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    userRecipes: state.recipe.userRecipes,
    count: state.recipe.count
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
      getUserRecipeAction
    }, dispatch)
  };
}

UserRecipes.propTypes = {
  actions: PropTypes.object,
  userRecipes: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
