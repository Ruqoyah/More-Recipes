import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { viewRecipeAction } from '../../actions/recipesActions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ViewRecipeInclude from '../include/ViewRecipeInclude';

/** @class ViewRecipe
 *
 * @classdesc view recipe component
 *
 */
export class ViewRecipe extends Component {
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
      redirectUser: false
    };
  }

  /**
   * @description - gets view recipe details
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() {
    this.props.actions.viewRecipeAction(this.props.match.params.id)
      .catch((error) => {
        if (error) {
          this.setState({
            redirectUser: true
          });
        }
      });
  }

  /**
   * @description render - renders view recipe details
   *
   * @return {object} returns an object
   *
   */
  renderRecipe() {
    let {
      picture, userId, recipeName, ingredient, details, upvotes, downvotes,
      views, Reviews } = this.props.viewRecipe;

    return (<div>
      <ViewRecipeInclude
        picture={picture}
        userId={userId}
        recipeName={recipeName}
        ingredient={ingredient}
        details={details}
        upvotes={upvotes}
        downvotes={downvotes}
        views={views}
        review={Reviews}
        id={this.props.match.params.id}
        key={Math.random() * 10}
      />
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
      this.state.redirectUser ?
        <Redirect to ="/*"/> :
        <div>
          <Header />
          {this.renderRecipe()}
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
    viewRecipe: state.recipe.viewRecipe,
    user: state.auth.user.currentUser
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
      viewRecipeAction
    }, dispatch)
  };
}

ViewRecipe.propTypes = {
  actions: PropTypes.object,
  viewRecipe: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipe);
