import React, { Component } from 'react';
import Layout from './Layout/Layout';
import {connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Chectout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { Route, Switch,withRouter,Redirect } from 'react-router-dom';
import * as actions from './store/actions/index';
class App extends Component {
  componentDidMount(){
      this.props.onAuthCheck();
  }
  render() {
    let routes=(
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    )
      if(this.props.isAuthenticated){
        routes=(
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/auth' component={Auth} />
            <Route path='/checkout' component={Chectout} />
            <Route path='/orders' component={Orders} />
            <Route path='/logout' component={Logout} />
            <Redirect to='/'/>
          </Switch>
        )
      }
    return (

      <div>
        <Layout>
        {routes};
        </Layout>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return{
      isAuthenticated: state.auth.idToken!==null
  };
}
const mapDispatchToProps = dispatch =>{
  return{
    onAuthCheck : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
