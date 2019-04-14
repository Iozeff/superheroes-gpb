import * as allActions from './actionTypes';

// Функция поиска
export function search(universe, query) {
  if (!query) {
    let result = ''
    return {
      type: allActions.SEARCH,
      result
    }
  }
  let result = universe.filter(item => item.name.indexOf(query) !== -1);  

  return function (dispatch) {   
    // Возвращает массив с результатами поиска     
    return fetchSearch(result)
      .then(
        result => dispatch(setSearch(result)),
      )
  };
};

function fetchSearch(result) {
  return new Promise((resolve, reject) => {
    resolve(result)
  })
};

function setSearch(result) {
  return {
    type: allActions.SEARCH,
    result
  }
}

// Функция выбора
export function receiveSelect(hero) {
  return function (dispatch) {
    return fetchSelect(hero)
      .then(
        hero => dispatch(setSelect(hero)),
      )
  };
};

function fetchSelect(hero) {
  return new Promise((resolve, reject) => {
    resolve(hero)
  })
};

function setSelect(hero) {
  return {
    type: allActions.SELECT,
    selected: hero
  }
}

// Функция удаления
export function receiveRemove(hero) {
  return function (dispatch) {
    return fetchRemove(hero)
      .then(
        hero => dispatch(setRemove(hero)),
      )
  };
};

function fetchRemove(hero) {
  return new Promise((resolve, reject) => {
    resolve(hero)
  })
};

function setRemove(hero) {
  return {
    type: allActions.REMOVE,
    removed: hero
  }
}
