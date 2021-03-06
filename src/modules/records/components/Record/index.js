/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import { Link } from 'react-router-dom'

import FieldList from '../RecordFieldList';
import {
  TrimString,
  Icon
} from '../../../core'
import {
  RecommendedResource,
}  from '../../../records'
import {
  getDatastoreSlugByUid
} from '../../../pride';
import {
  getField,
  getFieldValue,
  filterDisplayFields
} from '../../utilities';
import {
  AddToListButton,
  isInList
} from '../../../lists'
import ReactGA from 'react-ga'
import {
  FavoriteRecord,
  FavoriteTags
} from '../../../favorites'
import Zotero from '../Zotero'

import {
  COLORS,
  MEDIA_QUERIES,
  SPACING
} from '../../../reusable/umich-lib-core-temp'
import ResourceAccess from '../../../resource-acccess'

const Header = ({
  record,
  datastoreUid,
  searchQuery
}) => {
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0]
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const pictureField = getField(record.fields, 'picture')
  let recordTitleLink = `/${datastoreSlug}/record/${recordUid}${searchQuery}`
  let recordHeaderClassName = 'record-title'

  // Special Library Website case
  if (datastoreUid === 'website') {
    const accessUrlField = getField(record.fields, 'access_url')
    if (accessUrlField) {
      recordTitleLink = accessUrlField.value
    }

    if (pictureField) {
      recordHeaderClassName = 'record-title record-person__header-has-picture '
    }
  }

  return (
    <h3 className={recordHeaderClassName}>
      {pictureField && (
        <img src={pictureField.value[0]} alt="" className="record-person__profile-picture" />
      )}
      <span css={{
        marginRight: SPACING['2XS'],
        color: COLORS.neutral['300']
      }}>{record.position + 1}.</span>
      {datastoreUid !== 'website' ? (
        <Link
          to={recordTitleLink}
          className="record-title-link"
          onClick={() => {
            ReactGA.event({
              action: 'Click',
              category: 'Medium View',
              label: `Full view from medium ${datastoreUid}`
            })
          }}
        >
          {[].concat(record.names).map((title, index) => (
            <span key={index}>
              <TrimString string={title} />
            </span>
          ))}
        </Link>
      ) : (
        <span>
          <a
            href={recordTitleLink}
            className="record-title-link"
            onClick={() => {
              ReactGA.event({
                action: 'Click',
                category: 'Medium View',
                label: `Full view from medium ${datastoreUid}`
              })
            }}
          >
            {[].concat(record.names).map((title, index) => (
              <span key={index}>
                <TrimString string={title} />
              </span>
            ))}
          </a>
          <Icon name="launch" />
        </span>
      )}
      <RecommendedResource record={record} />
    </h3>
  )
}

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type, searchQuery, institution, list } = this.props
    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: type,
      datastore: datastoreUid
    });
    const recordUidField = getField(record.fields, 'id');
    const inList = isInList(list, record.uid)
    const recordClassName = inList ? 'record record--highlight' : 'record'

    if (recordUidField) {
      return (
        <article className={recordClassName}>
          <div className="record-container record-medium-container">
            <div className="record-title-and-actions-container ">
              <Header
                record={record}
                datastoreUid={datastoreUid}
                searchQuery={searchQuery}
              />
              <AddToListButton
                item={record}
              />
              <FavoriteRecord
                record={record}
                datastore={datastoreUid}
              />
            </div>
            <Zotero record={record} />
            <FavoriteTags
              record={record}
              datastore={datastoreUid}
            />
            <FieldList
              fields={displayFields}
              datastoreUid={datastoreUid}
              institution={institution}
            />
          </div>

          <div
            css={{
              '[data-accordion-component="AccordionItemPanel"]': {
                padding: `0 ${SPACING['M']}`
              },
              [MEDIA_QUERIES.LARGESCREEN]: {
                '[data-accordion-component="AccordionItemButton"]': {
                  paddingLeft: '3rem'
                },
                '[data-accordion-component="AccordionItemPanel"]': {
                  padding: `0 ${SPACING['M']}`,
                  paddingLeft: '3rem'
                },
                borderBottom: `solid 1px ${COLORS.neutral[100]}`
              }
            }}
            aria-label="Available at"
          >
            <ResourceAccess record={record} />
          </div>
        </article>
      )
    }

    return null
  }
}

export default Record;
