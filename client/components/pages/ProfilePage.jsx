import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getUserProfileAction } from '../../actions/authActions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProfilePageInclude from '../include/ProfilePageInclude';

/**
 * @class ProfilePage
 *
 * @classdesc get user Profile and allow user to edit profile
 *
 */
export class ProfilePage extends Component {
  /**
   * @description - gets user profile
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() {
    this.props.actions.getUserProfileAction();
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
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-4 order-lg-1 text-center">
              <div className="profile-img">
                { !this.props.user.picture ?
                  <img src="/images/picture.png"
                    style={{ width: '300px', height: '300px' }}/> :
                  <img
                    src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_300,w_300/${this.props.user.picture}`}/>
                }
              </div>
            </div>
            <div
              className="col-lg-8 order-lg-2">
              <ul
                className="nav nav-tabs">
                <li
                  className="nav-item">
                  <a
                    data-target="#profile"
                    data-toggle="tab"
                    id="profile-button"
                    className="nav-link active icon">Profile
                  </a>
                </li>
                <li
                  className="nav-item">
                  <a
                    data-target="#edit"
                    data-toggle="tab"
                    id="edit-profile"
                    className="nav-link icon">Edit
                  </a>
                </li>
              </ul>
              <div
                className="tab-content py-4">
                <div
                  className="tab-pane active"
                  id="profile">
                  <div
                    className="row">
                    <div
                      className="col-md-6">
                      <h6><strong>Username</strong></h6>
                      <p
                        id="username">
                        {this.props.user.username}
                      </p>
                      <h6><strong>Full Name</strong></h6>
                      <p
                        id="fullName">
                        {this.props.user.fullName}
                      </p>
                      <h6><strong>Email</strong></h6>
                      <p
                        id="email">
                        {this.props.user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <ProfilePageInclude
                />
              </div>
            </div>
          </div>
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
    user: state.auth.userProfile
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
      getUserProfileAction
    }, dispatch)
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
