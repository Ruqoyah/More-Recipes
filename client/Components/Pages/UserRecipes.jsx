import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserRecipeAction } from '../../Actions/RecipesActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import UserRecipesInclude from '../Include/UserRecipesInclude';

/**
 * @class MyRecipe
 *
 * @classdesc get user recipes and allow user to edit or delete recipes
 *
 */
class UserRecipes extends Component {
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
    this.props.actions.getUserRecipeAction(1);
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
    const allUserRecipe = this.props.userRecipe;
    if (allUserRecipe.length < 1) {
      return (
        <div style={{ textAlign: 'center' }}>
          <i
            className="fa fa-circle-o-notch fa-spin"
            style={{ marginTop: '80px', fontSize: '70px', color: '#FFA500' }} />
        </div>
      );
    }
    return (<div className="row">
      {
        allUserRecipe.map((recipe) => (
          <UserRecipesInclude
            picture={recipe.picture}
            recipeName={recipe.recipeName}
            ingredient={recipe.ingredient}
            upvotes={recipe.upvotes}
            downvotes={recipe.downvotes}
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
        {this.renderRecipe()}
        {this.renderPagination(0)}
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
    user: state.auth.user.currentUser,
    userRecipe: state.recipe.userRecipe,
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
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserRecipeAction
    }, dispatch)
  };
}

UserRecipes.propTypes = {
  actions: PropTypes.object,
  userRecipe: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
