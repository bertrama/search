import React from 'react'
import { connect } from 'react-redux'

import { Loading } from '../../../core';
import FieldList from '../RecordFieldList';
import AccessList from '../AccessList';
import {
  filterAccessFields,
} from '../../utilities';

/*
import {
  getField,
  filterDisplayFields
} from '../../utilities';
*/

class FullRecord extends React.Component {
  render() {
    const { record, activeDatastore } = this.props;

    if (!record) {
      return (
        <div className="container container-narrow">
          <Loading />
        </div>
      )
    }

    const access = filterAccessFields({
      fields: record.fields,
      type: 'access',
      datastore: activeDatastore,
    });

    return (
      <div className="container container-narrow">
        <div className="full-record-container">
          <div className="record-container">
            <h1 className="full-record-title">{record.names[0]}</h1>
            <FieldList fields={record.fields} />
          </div>

          <AccessList access={access} holdings={record.holdings} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    activeDatastore: state.datastores.active,
  }
}

export default connect(mapStateToProps)(FullRecord)
