import { _ } from 'underscore'

import {
  ADD_FILTERS,
  CLEAR_FILTERS,
  SET_ACTIVE_FILTERS,
  CLEAR_ACTIVE_FILTERS,
  ADD_DEFAULT_FILTER
} from '../actions';

const initialState = {
  active: {},
  groups: {},
  defaults: {} // are active on the server by default
};

const filtersReducer = function filterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FILTERS:
      return {
        ...state,
          groups: {
            ...state.groups,
            [action.payload.uid]: action.payload
          }
        }
    case CLEAR_FILTERS:
      return Object.assign({}, state, {
        groups: {}
      })
    case SET_ACTIVE_FILTERS:
      /*
        payload:
        - datastoreUid
        - filters
      */
      const { datastoreUid, filters } = action.payload
      const filterObjKeys = Object.keys(filters)

      return {
        ...state,
        active: {
          ...state.active,
          [datastoreUid]: filterObjKeys.reduce((acc, filterUid) => {
            return {
              ...acc,
              [filterUid]: [].concat(filters[filterUid])
            }
          }, {})
        }
      }
    case CLEAR_ACTIVE_FILTERS:
      return {
        ...state,
        active: _.omit(state.active, action.payload.datastoreUid)
      }
    case ADD_DEFAULT_FILTER:
      return {
        ...state,
        defaults: {
          ...state.defaults,
          [action.payload.datastoreUid]: {
              ...state.defaults.datastoreUid,
              [action.payload.filter.uid]: action.payload.filter
          }
        }
      }
    default:
      return state;
  }
};

export default filtersReducer;
