import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as makeActions from './actions/makeActions';
import Header from './header/index'
import MainContent from './main-content/index'


class App extends Component {
  render() {
    return (
        <div className="App">
          {
            (this.props.selectedHeroes && this.props.selectedHeroes.length) ? 
            (<Header showHeroes={this.props.selectedHeroes}/>) : ''
          }
          <MainContent/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedHeroes: state.select
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeActions: bindActionCreators(makeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
