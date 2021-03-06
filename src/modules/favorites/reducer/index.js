import * as actions from '../actions';
import { _ } from 'underscore'

const favoritesReducer = (state = { disabled: false }, action) => {
  if (action.payload) {
    const {
      recordUid,
      datastoreUid,
      tag
    } = action.payload

    switch (action.type) {
      case actions.FAVORITE:
        return {
          ...state,
          [datastoreUid]: {
            ...state[datastoreUid],
            [recordUid]: {
              favorited: true,
              tags: undefined,
              untags: undefined
            }
          }
        }
      case actions.UNFAVORITE:
        return {
          ...state,
          [datastoreUid]: {
            ...state[datastoreUid],
            [recordUid]: {
              favorited: false,
              tags: undefined,
              untags: undefined
            }
          }
        }
      case actions.TAG_FAVORITE:
        if (true) {
          let tags = 
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].tags ?
            [...state[datastoreUid][recordUid].tags, tag] : [tag]
          
          let untags =
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].untags ? 
            state[datastoreUid][recordUid].untags : undefined
            
          return {
            ...state,
            [datastoreUid]: {
              ...state[datastoreUid],
              [recordUid]: {
                tags: tags ? _.flatten(tags) : undefined,
                untags,
                favorited: true
              }
            }
          }
        }
        break
      case actions.UNTAG_FAVORITE:
        if (true) { // adding a scope to the vars
          let tags = 
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].tags ?
            [state[datastoreUid][recordUid].tags.filter(t =>
              t.toLowerCase() !== tag.toLowerCase()
            )] : undefined

          let untags = 
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].untags ?
            [...state[datastoreUid][recordUid].untags, tag] : [tag]
            
          let favorited =
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].favorited ? 
            state[datastoreUid][recordUid].favorited : undefined

          return {
            ...state,
            [datastoreUid]: {
              ...state[datastoreUid],
              [recordUid]: {
                tags: tags ? _.flatten(tags) : undefined,
                untags: untags ? untags : undefined,
                favorited
              }
            }
          }
        }
        break
      default:
        return state
    }
  }

  return state
}

export default favoritesReducer
