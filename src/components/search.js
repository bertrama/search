import React, {
  createContext,
  useContext,
  useReducer,
  useEffect
} from 'react';
import SearchDriver from './search-driver'

/*
  https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
*/

const StateContext = createContext();

const StateProvider = ({
  reducer,
  initialState,
  children
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useSearch = () => useContext(StateContext);

function SearchState ({ children }) {
  const initialState = {
    /*
      Status can be one of:
      - awaiting-initialization
      - pride-failed
      - ready-to-search
      - searching
    */
    status: 'awaiting-initialization',
    results: null,
    searchRequested: false,
    run: false,
    search: {
      query: ''
    },
    lastSearch: null
  };
  
  function reducer(state, action) {
    console.log('state', state)

    switch (action.type) {
      case 'setStatus':
        return {
          ...state,
          status: action.status
        };
      case 'setResults':
        return {
          ...state,
          results: {
            ...state.results,
            ...action.results
          }
        }
      case 'addDatastore':
        return {
          ...state,
          datastores: {
            ...state.datastores,
            ...action.datastore
          }
        }
      case 'setRun':
        return {
          ...state,
          run: action.run
        }
      case 'setSearchRequested':
        return {
          ...state,
          searchRequested: action.searchRequested
        }
      case 'setQuery':
        return {
          ...state,
          search: {
            ...state.search,
            query: action.query
          }
        }
      case 'addRecords':
        return {
          ...state,
          records: {
            ...state.records,
            ...action.records
          }
        }
      case 'addResults':
        return {
          ...state,
          results: {
            ...state.results,
            ...action.results
          }
        }
      case 'clearResults':
        return {
          ...state,
          results: null
        }
      case 'setLastSearch':
        return {
          ...state,
          lastSearch: state.search
        }
      default:
        return state;
    }
  };
  
  return (
    <StateProvider
      initialState={initialState}
      reducer={reducer}
    >
      <Search />
      {children}
    </StateProvider>
  );
}

let searcher
let Pride

function Search({ children }) {
  const [{ status, run, query }, dispatch] = useSearch()

  useEffect(() => {
    if (searcher && run) {
      
      searcher.set({
        field_tree: Pride.FieldTree.parseField('all_fields', query),
        page: 1,
        count: 10
      }).run()
      

      console.log('run search', true)

      dispatch({
        type: 'clearResults'
      })

      dispatch({
        type: 'setRun',
        run: false
      })
    }
  })

  useEffect(() => {
    function handleResults(datastore, data) {
      if (!data.includes(undefined)) {
        let result_uids = []

        const records = data.reduce((acc, d) => {
          d.renderFull(metadata => {
            const record_uid = metadata.datastore + '-' + metadata.uid

            acc = {
              ...acc,
              [record_uid]: metadata
            }

            result_uids = result_uids.concat(record_uid)
          })

          return acc
        }, {})

        dispatch({
          type: 'addRecords',
          records: records
        })

        if (result_uids.length > 0) {
          dispatch({
            type: 'addResults',
            results: {
              [datastore.get('uid')]: result_uids
            }
          })
        }
      }
    }

    function setup() {
      /*
        Grab all the datastores from Pride.
        Add them to state.
        
        TODO
        - [ ] What is a datastore? Explain it here.
      */
      const datastores = Pride.AllDatastores.array

      datastores.map(datastore => {
        dispatch({
          type: 'addDatastore',
          datastore: {
            [datastore.get('uid')]: { ...datastore.get('metadata') }
          }
        })
      })

      /*
      For every datastore setup a Search object.
      These will be used to run Searches on and
      add event listeners to catch records being
      returned by a search.
      */
      const searches = datastores.map(datastore => {
        /*
          Create a search object from each
          Pride datastore.
        */
        const search = datastore.baseSearch()
        /*
          Setup results observers. These will be triggered
          when a search is run and results are available.
          We render out the full record and save the record
          data (not the Pride record) to be saved to state.
        */
        search.resultsObservers.add((results) => {
          handleResults(datastore, results)
        })

        return search
      })

      searcher = new Pride.Util.SearchSwitcher(searches[0], searches.slice(1, searches.length))
    }

    if (typeof window !== `undefined` && status === 'awaiting-initialization') {
      Pride = require('pride').Pride
      Pride.Settings.datastores_url = 'https://search.lib.umich.edu/spectrum'

      Pride.init({
        success: () => {
          dispatch({
            type: 'setStatus',
            status: 'ready-to-search'
          })

          setup()
        },
        failure: () => {
          dispatch({
            type: 'setStatus',
            status: 'pride-failed'
          })
        }
      })
    }
  }, [])

  return (
    <React.Fragment>
      <SearchDriver />
      {children}
    </React.Fragment>
  )
}

export default SearchState