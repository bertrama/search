/** @jsxImportSource @emotion/react */
import React from 'react';
import Icon from '../../../reusable/components/Icon';
import { SPACING } from '../../../reusable/umich-lib-core-temp';
import PropTypes from 'prop-types';

export default function RecordFullFormats ({ formats }) {
  return (
    <div className='full-record-header'>

      {(formats || []).map((format, index) => {
        return (
          <span className='full-record-format' key={index}>
            <RecordFormatIcon icon={format.icon} />
            {format.text}
          </span>
        );
      })}
    </div>
  );
}

RecordFullFormats.propTypes = {
  formats: PropTypes.array
};

function RecordFormatIcon ({ icon }) {
  if (icon) {
    return (
      <Icon
        icon={icon}
        css={{
          marginRight: SPACING['2XS']
        }}
      />
    );
  }

  return null;
}

RecordFormatIcon.propTypes = {
  icon: PropTypes.string
};
