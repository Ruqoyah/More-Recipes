import React, { Component } from 'react';
import jsonwebtoken from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/authActions';

/**
 * @class AuthenticateUser
 *
 * @param  {object} ComposedComponent the store state
 *
 * @classdesc authenticate user component
 *
 */
export default function AuthenticateUser(ComposedComponent) {
/**
 * @class AuthenticateUser
 *
 * @classdesc authenticate user component
 *
 */
  class Authenticate extends Component {
  /**
     * @method componentWillMount
     *
     * @return {*} set user authentication status
     *
     */
    componentWillMount() {
      const key = process.env.SUPER_SECRET;
      const token = localStorage.getItem('token');
      if (!token) {
        this.props.actions.logoutAction();
      } else if (token) {
        jsonwebtoken.verify(token, key, (error) => {
          if (error) {
            this.props.actions.logoutAction();
          }
        });
      }
    }

    /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
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
        logoutAction
      }, dispatch)
    };
  }

  Authenticate.propTypes = {
    actions: PropTypes.object
  };

  return connect(null, mapDispatchToProps)(Authenticate);
}
