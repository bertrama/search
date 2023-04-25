import React from 'react';
import PropTypes from 'prop-types';

const Leader = ({ marc }) => {
  if (marc.leader) {
    return (
      <tr>
        <td className='marc__field-name' colSpan='3'><abbr title='LEADER'>LDR</abbr></td>
        <td>{marc.leader}</td>
      </tr>
    );
  }

  return null;
};

Leader.propTypes = {
  marc: PropTypes.object
};

const FieldName = ({ field }) => {
  const name = Object.keys(field)[0];

  return (
    <td className='marc__field-name'>
      {name}
    </td>
  );
};

FieldName.propTypes = {
  field: PropTypes.object
};

const FieldIndicator = ({ field, ind }) => {
  const name = Object.keys(field)[0];
  const value = field[name];
  const indicator = value[ind];

  return (
    <td>{indicator}</td>
  );
};

FieldIndicator.propTypes = {
  field: PropTypes.object,
  ind: PropTypes.string
};

const FieldValue = ({ field }) => {
  const name = Object.keys(field)[0];
  const value = field[name];

  if (typeof value === 'string') {
    return (
      <td>
        {field[name]}
      </td>
    );
  }

  if (typeof value === 'object') {
    if (value.subfields) {
      return (
        <td>
          {value.subfields.map((subfield, index) => {
            const subfieldName = Object.keys(subfield)[0];

            return (
              <span className='marc__subfield' key={index}><b>|{subfieldName}</b> {subfield[subfieldName]}</span>
            );
          })}
        </td>
      );
    }
  }

  return (
    <td>
      temp
    </td>
  );
};

FieldValue.propTypes = {
  field: PropTypes.object
};

class MARCTable extends React.Component {
  render () {
    const { marc } = this.props;

    return (
      <div className='marc__container'>
        <h2 className='marc__heading'>MARC Data</h2>
        <table className='table marc__table'>
          <tbody>
            <Leader marc={marc} />
            {marc.fields.map((field, index) => {
              return (
                <tr key={index}>
                  <FieldName field={field} />
                  <FieldIndicator field={field} ind='ind1' />
                  <FieldIndicator field={field} ind='ind2' />
                  <FieldValue field={field} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

MARCTable.propTypes = {
  marc: PropTypes.object
};

export default MARCTable;
