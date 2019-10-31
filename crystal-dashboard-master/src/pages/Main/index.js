import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import FormLogin from './FormLogin'

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import ThemeOptions from '../../components/ThemeOptions';
import MobileMenu from '../../components/MobileMenu';
/**
 * Pages
 */
import Account from '../Account';
import Components from '../Components';
import UserProfile from '../UserProfile';
import MapsPage from '../MapsPage';
import Forms from '../Forms';
import Destination from '../Destination';
import Place from '../Place';
import Tables from '../Tables';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      visible: true
    }
  }

  addModalClose = () => {
    this.setState({ visible: false, render: true })
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.state.visible ? true : false}
          title="Đăng nhẫp"
          centered
          onCancel={this.handleCancel}
          footer={[

          ]}
        >
          <FormLogin ref={c => this.formLogin = c} onCloseModal={this.addModalClose} />
        </Modal>
        {this.state.render ?
          <div className={cx({
            'nav-open': true
          })}>
            <div className="wrapper">
              {/* <div className="close-layer" onClick={hideMobileMenu}></div> */}
              <SideBar />

              <div className="main-panel">
                <Header />
                <Route exact path="/" component={Account} />
                {/* <Route path="/components" component={Components} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/forms" component={Forms} />
          <Route path="/tables" component={Tables} />
          <Route path="/maps" component={MapsPage} /> */}
                <Route path="/destination" component={Destination} />
                <Route path="/place" component={Place} />
                <Footer />
              </div>
            </div>
          </div> : ''
        }
      </div>
    )
  }
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));