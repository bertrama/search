import React, {
  createContext,
  useContext,
  useReducer,
  useEffect
} from 'react';

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
    status: 'initializing',
    results: null,
    run: false,
    query: ''
  };
  
  function reducer(state, action) {
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
          run: action.run,
          status: 'searching'
        }
      case 'setQuery':
        return {
          ...state,
          query: action.query
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

function Search() {
  const [{ status, run, query }, dispatch] = useSearch()

  useEffect(() => {
    if (searcher && run) {
      searcher.set({
        field_tree: Pride.FieldTree.parseField('all_fields', query),
        page: 1,
        count: 10
      }).run()

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

    if (typeof window !== `undefined` && status === 'initializing') {
      Pride = require('pride').Pride
      Pride.Settings.datastores_url = 'https://search.lib.umich.edu/spectrum'

      Pride.init({
        success: () => {
          dispatch({
            type: 'setStatus',
            status: 'success'
          })

          setup()
        },
        failure: () => {
          dispatch({
            type: 'setStatus',
            status: 'error'
          })
        }
      })
    }
  }, [])

  return null
}


//  The API endpoint that Pride will talk to.
/*
Pride.Settings.datastores_url = 'https://search.lib.umich.edu/spectrum'

function PrideComponent() {
  const [{}, dispatch] = useSearch();

  useEffect(() => {
    Pride.init({
      success: () => {
        dispatch({
          type: 'setStatus',
          status: 'initialized'
        })
      },
      failure: () => {
        dispatch({
          type: 'setStatus',
          status: 'error'
        })
      }
    })
  }, [])

  return null
}
*/

export default SearchState