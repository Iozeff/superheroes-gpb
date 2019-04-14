import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as makeActions from '../actions/makeActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.removeHero = this.removeHero.bind(this);
  };
  state = {
    closeButton: false
  }
  makeHeroArr () {
    let heroArr = this.props.showHeroes
    let counter = heroArr.reduce(function (o, i) {
      if (!o.hasOwnProperty(i.image)) {
        o[i.image] = 0;
      }
//Добавляет в список новые ссылки на картинки
      o[i.image]++;
      return o;
    }, {});
    let result = Object.keys(counter).map(function (image) {
      
//Список картинок      
      return {
        image: image,
        count: counter[image]
      };
    });
    return result
  };
  removeHero (e, hero) {
    this.props.makeActions.receiveRemove(hero);
  };
  toogleClose(e, i) {
    let target = document.querySelectorAll('.close-button')[i]
    target.classList.toggle('hidden')
  }
  renderSVG () {
    return (
      <svg
        width = "10"
        height = "10"
        viewBox = "0 0 10 10"
        fill = "none"
        xmlns = "http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5 5M9 9L5 5M5 5L9 1M5 5L1 9" stroke="white" strokeWidth="2"/>
      </svg>
    )
  }
  render() {
    return (
      <div className="header">
        {this.makeHeroArr().map(
          (hero, i) =>
            <div key={i} onClick={(e) => this.toogleClose(e, i)} className="selected-hero">
              <div
                className="close-button hidden"
                onClick={(e) => this.removeHero(e, hero)}
              >
                {this.renderSVG()}
              </div>
              <img alt={hero.name} src={hero.image}></img>
              {hero.count ? (
                <div className="hero-count">{hero.count}</div>
              ) : (''
              )}
            </div>
        )}
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
)(Header);
