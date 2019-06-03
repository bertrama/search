import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import qs from 'qs'
import equal from 'fast-deep-equal'
import { useSearch } from './search'

/*
  Responsible for deciding if a search should be run.
*/
function SearchDriver() {
  const [{ searchRequested, search, lastSearch }, dispatch ] = useSearch()
  
  function StringifySearch(search) {
    return qs.stringify(
      search,
      {
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
        allowDots: true,
        format : 'RFC1738'
      }
    )
  }

  useEffect(() => {
    /*
      The application has requested a new search
      and it is different than the last.
    */
    if (searchRequested) {
      dispatch({
        type: 'setSearchRequested',
        searchRequested: false
      })

      if (!equal(lastSearch, search)) {
        navigate(document.location.pathname + '?' + StringifySearch(search))

        dispatch({
          type: 'setRun',
          run: true
        })
        dispatch({
          type: 'setStatus',
          status: 'searching'
        })
        dispatch({
          type: 'setLastSearch'
        })
      }
    }
  })

  return null
}

export default SearchDriver

/*
  TODO

  Conisder `onClientEntry` Gatsby thing to set this up.
  This would probably be stored elsewhere.
function ParseURLSearchToObject() {
  return qs.parse(window.location.search.substring(1))
}
*/