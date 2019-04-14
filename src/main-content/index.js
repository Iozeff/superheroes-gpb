import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as makeActions from '../actions/makeActions';
import HeroesList from './heroes-list/index'
import HeroesJson from '../superheroes.json'

class MainContent extends Component {
  state = {
    dcActive: true,
    search: '',
    marvelHeroes: HeroesJson.marvel,
    dcHeroes: HeroesJson.dc
  };
  selectComics (e, value) {
    //Выбор вселенной комиксов
    
    this.props.makeActions.search([], '');
    
    if ((this.state.dcActive && value.isDC) || (!this.state.dcActive && !value.isDC)) return
    this.setState(state => ({
      dcActive: !this.state.dcActive,
      search: ''
    }));
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(e) {
    
    let value = e.target.value;
    let universe = this.state.dcActive ? this.state.dcHeroes : this.state.marvelHeroes
    this.setState(state => ({
      search: value
    }));
    this.props.makeActions.search(universe, this.state.search);
  };
  showHero () {
    if (this.props.searchResult && this.props.searchResult.length && this.state.search) {
      
      return this.props.searchResult
    }
    if (this.state.search && !this.props.searchResult) {
      return
    }
    return this.state.dcActive ? this.state.dcHeroes : this.state.marvelHeroes
  };
  generateURL (universe) {
    return window.location.pathname.indexOf('/superheroes/') !== -1 ?
      `/superheroes/${universe}` : `/${universe}`
  }
  render() {
    return (
      <Router>
        <div className="main-content">
          <div className="search">
            <input
              placeholder="Имя героя"
              type="search"
              value={this.state.search}
              onChange={this.handleChange}
            >
            </input>
            <div className="icon-loupe">
              <img alt="loupe" src="./icon-loupe.png"></img>
            </div>
          </div>
          {window.innerWidth < 767 ? (
            <HeroesList showHeroes={this.showHero()}/>
          ) : ('')
          }
          <div className="select">
            <Link to={this.generateURL('dc')}>
              <div id="dc" onClick={(e) => this.selectComics(e, {isDC: true})} className="select-icon">
                <img alt='dc' className={this.state.dcActive ? '' : 'opacity-logo'} src="./dc-logo.png"></img>
              </div>
            </Link>
            <Link to={this.generateURL('marvel')}>
              <div id="marvel" onClick={(e) => this.selectComics(e, {isDC: false})} className="select-icon">
                <img alt='marvel' className={this.state.dcActive ? 'opacity-logo' : ''} src="./marvel-logo.png"></img>
              </div>
            </Link>
          </div>
          {window.innerWidth >= 767 ? (
            <HeroesList showHeroes={this.showHero()}/>
          ) : ('')
          }
        </div>
      </Router>
    );
  }
}

MainContent.propTypes = {
  makeActions: PropTypes.object,
  searchResult: PropTypes.array
};

function mapStateToProps(state) {
  return {
    searchResult: state.search
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
)(MainContent);