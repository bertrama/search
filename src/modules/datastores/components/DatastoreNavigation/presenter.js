/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'

import {
  Margins
} from '@umich-lib/core'

import {
  Icon
} from '../../../core'
import {
  stringifySearchQueryForURL
} from '../../../pride'

const isActive = ({
  uid,
  activeUid,
}) => {
  return uid === activeUid
}

const DatastoreNavigationPresenter = ({
  datastores,
  search,
  activeFilters,
  institution,
  history
}) => {
  return (
    <Margins>
      <nav aria-label="Search groupings">
        <ul css={{
          textAlign: 'center'
        }}>
          {datastores.datastores.map(ds => (
            <DatastoreNavigationItem
              key={ds.uid}
              datastore={ds}
              datastores={datastores}
              search={search}
              activeFilters={activeFilters}
              institution={institution}
              history={history}
            />
          ))}
        </ul>
      </nav>
    </Margins>
  );
};

const DatastoreNavigationItem = ({
  datastore,
  datastores,
  search,
  activeFilters,
  institution,
  history
}) => {
  const page = search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid]
  // We only want to use library if it is Mirlyn aka the catalog
  const library = datastore.uid === 'mirlyn' ? institution.active : undefined
  const queryString = stringifySearchQueryForURL({
    query: search.query,
    filter: activeFilters[datastore.uid],
    page,
    sort: search.sort[datastore.uid],
    library,
  })

  let url = ''

  if (queryString.length > 0) {
    url = `/${datastore.slug}?${queryString}`
  } else {
    url = `/${datastore.slug}`
  }

  const active = isActive({
    uid: datastore.uid,
    activeUid: datastores.active
  })
  const activeClassName = active ? 'datastore-button--active' : ''
  const classNames = `datastore-button ${activeClassName}`
  return (
    <li className="datastore-item" key={datastore.uid}>
      <button
        onClick={() => history.push(url)}
        aria-pressed={active}
        className={classNames}
        data-ga-action="Click"
        data-ga-category="Datastore Navigation"
        data-ga-label={datastore.name}
      >
          <React.Fragment>
            {datastore.isMultisearch && <Icon name="multi-result" />}
            {datastore.name}
          </React.Fragment>
      </button>
    </li>
  )
}

export default DatastoreNavigationPresenter
