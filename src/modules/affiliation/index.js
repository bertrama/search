import ChooseAffiliation from './components/choose-affiliation'
import affiliationReducer from './reducer'
import { setDefaultAffiliation } from './actions'

export function affiliationCookieSetter(affiliation) {
  if (affiliation) {
    document.cookie = `affiliation=${affiliation};path=/`;
  }
}

export {
  ChooseAffiliation,
  affiliationReducer,
  setDefaultAffiliation
}
