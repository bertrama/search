import React from 'react'
import { connect } from 'react-redux';
import _ from 'underscore'

import {
  TrimString
} from '../../../core'
import {
  RecordFullFormats,
  RecordResourceAccess,
  FullRecordPlaceholder
} from '../../../records'
import styled from 'react-emotion'

/*
  Hide the first column on the Get This page. No need for users to
  use "Get this" link when they're already at the Get This page.
*/
const StyledGetThisResourceAccessContainer = styled('div')({
  'td:first-of-type': {
    display: 'none'
  },
  'th:first-of-type': {
    display: 'none'
  }
})

function GetThisHolding({ record, barcode }) {
  let holding

  if (record.resourceAccess) {
    record.resourceAccess.forEach(ra => {
      ra.rows.forEach(row => {
        row.forEach(cell => {
          if (cell.to && cell.to.action === 'get-this' && cell.to.barcode === barcode) {
            holding = [].concat(ra)
          }
        })
      })
    })

    if (holding) {
      const recordData = {
        resourceAccess: holding
      }

      return (
        <StyledGetThisResourceAccessContainer>
          <RecordResourceAccess record={recordData} />
        </StyledGetThisResourceAccessContainer>
      )
    }
  }

  return null
}

class GetThisRecord extends React.Component {
  render() {
    const {
      record,
      datastoreUid,
      barcode
    } = this.props;

    if (!record) {
      return <FullRecordPlaceholder />
    }

    return (
      <div className="full-record-container u-margin-bottom-1">
        <RecordFullFormats
          fields={record.fields}
          datastoreUid={datastoreUid}
        />
        <div className="record-container">
          <h1 className="full-record-title u-margin-bottom-none">
            {[].concat(record.names).map((title, index) => (
              <div key={index}>
                <TrimString string={title} />
              </div>
            ))}
          </h1>
        </div>

        <GetThisHolding
          record={record}
          barcode={barcode}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
    searchQuery: state.router.location.search,
    institution: state.institution,
  };
}

export default connect(mapStateToProps)(GetThisRecord);
