import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'
import {
  Route,
  Switch
} from 'react-router-dom'

import {
  SearchBox
} from '../../../search'
import {
  DatastoreNavigation,
  DatastoreInfo,
} from '../../../datastores'
import {
  Filters
} from '../../../filters'
import {
  RecordList,
  Pagination,
  BentoboxList,
  RecordFull
} from '../../../records'
import {
  switchPrideToDatastore
} from '../../../pride'


const ConnectedSwitch = connect(mapStateToProps)(Switch);

class DatastorePageContainer extends React.Component {
  componentWillMount() {
    // Switch Pride to the appropriate datastore
    const { datastoreSlug } = this.props.match.params
    switchPrideToDatastore(datastoreSlug)
  }

  render() {
    const { searching, datastores, match } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (activeDatastore === undefined) {
      return null // LOADING TODO: Fade IN?
    }

    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <ConnectedSwitch>
          <Route path={match.url + `/record/:recordUid`} render={(props) => {
            return (
              <RecordFull />
            )
          }}/>
          <Route match={match.url} render={(props) => {
            return (
              <div>
                <DatastoreInfo activeDatastore={activeDatastore} />
                <Results searching={searching} activeDatastore={activeDatastore} />
              </div>
            )
          }}/>
        </ConnectedSwitch>
      </div>
    )
  }
}

const Results = ({ searching, activeDatastore }) => {
  if (activeDatastore.isMultisearch && searching) {
    return <MultisearchSearching activeDatastore={activeDatastore}/>
  }

  if (searching) {
    return <SingleResultSearching activeDatastore={activeDatastore}/>
  }

  return <NotSearching activeDatastore={activeDatastore}/>
}

const MultisearchSearching = () => (
  <div className="container container-large flex-container">
    <div className="main-container">
      <BentoboxList />
    </div>
  </div>
)

const SingleResultSearching = (activeDatastore) => (
  <div className="container container-medium flex-container">
    <div className="side-container">
      <Filters />
    </div>
    <div className="main-container">
      <RecordList />
      <Pagination />
    </div>
  </div>
)

const NotSearching = ({ activeDatastore }) => {
  // TODO: empty state/not searching page content

  return null
}

function mapStateToProps(state) {
  return {
    searching: state.search.searching,
    datastores: state.datastores,
    location: state.router.location
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
