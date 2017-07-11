import { _ } from 'underscore';

import config from '../../../config';

const getField = function getField(fields, key) {
  return _.findWhere(fields, { uid: key });
};

const getFieldValue = (field) => {
  let value;

  if (field !== undefined && typeof field === 'object') {
    if ('value' in field) {
      value = field.value;
    }
  }

  if (value) {
    return [].concat(value);
  }

  return [];
};

const filterDisplayFields = ({ fields, type, datastore }) => {
  // Find config for this datastore view type.
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  // No display field(s) config for this datastore view type.
  if (!fieldsConfig) {
    return []
  }

  // Look up and order fields as configured.
  // Will return an array of fields
  return _.reduce(fieldsConfig[type], (previous, fieldUid) => {
    const field = _.findWhere(fields, { uid: fieldUid })

    if (field) { // does field exist from Spectrum (back end, solr)
      return previous.concat(field)
    } else if (fieldsConfig.defaultFields) { // check if field exists as default
      const defaultField = _.findWhere(fieldsConfig.defaultFields, { uid: fieldUid })

      if (defaultField) {
        return previous.concat(defaultField)
      }
    }

    return previous
  }, [])
}

const getFullRecordDisplayFields = ({ fields, datastore }) => {
  // Find config for this datastore view type.
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  if (fieldsConfig['full']) {
    return ['standard', 'additional'].reduce((previous, type) => {
      let fieldListOfType = []

      if (fieldsConfig['full'][type]) {
        fieldListOfType = fieldsConfig['full'][type].reduce((fieldList, fieldUid) => {
          const field = _.findWhere(fields, { uid: fieldUid })

          if (field) { // does field exist from Spectrum (back end, solr)
            return fieldList.concat(field)
          } else if (fieldsConfig.defaultFields) { // check if field exists as default
            const defaultField = _.findWhere(fieldsConfig.defaultFields, { uid: fieldUid })

            if (defaultField) {
              return fieldList.concat(defaultField)
            }
          }

          return fieldList
        }, [])
      }

      return {
        ...previous,
        [type]: fieldListOfType
      }
    }, {
      standard: [],
      additional: []
    })
  }

  return {
    standard: [],
    additional: []
  }
}

const filterAccessFields = ({ fields, type, datastore, holdings }) => {

  // Lookup to see if access fields have a configuration that access
  // is from the metadata (Solr), not a secondary request from holdings.
  const accessConfig = _.findWhere(config.fields, { datastore: datastore })
  if (!accessConfig || !accessConfig.access || accessConfig.access.fromHoldings) {
    return [];
  };

  // TODO: this is temporay to handle current structure
  // and root link property means a simple single access
  if (accessConfig.access.link) {
    const linkField = _.findWhere(fields, { uid: accessConfig.access.link })

    if (!linkField) {
      return []
    }

    return [
      [
        {
          isLink: true,
          value: linkField.value,
          label: accessConfig.access.defaultAccessText
        }
      ]
    ]
  }

  // Lookup the field on the record that has the access metadata
  const accessField = _.findWhere(fields, { uid: accessConfig.access.uid })

  // If it exists, proceed, otherwise return empty array (no access options).
  if (accessField && accessField.value) {

    // Iterate over each access metadata object found in the field's value
    return _.reduce(accessField.value, (previous, accessItems) => {

      // Each access item will be an array of objects with the following shape.
      /*
        // For example:
        [
          {
            name: 'Go To Database',
            value: 'http...',
            isLink: true,
          },
          {
            name: 'Coverage',
            value: '2010- ...',
          }
        ]
      */

      // Matchup the fields raw values to the configuration
      const forDisplayAccessItem = _.reduce(accessConfig.access.fields, (memo, configField) => {
        const accessItem = _.findWhere(accessItems, { uid: configField.uid });

        if (accessItem) {
          const label = configField.label || accessItem.name
          const value = accessItem.value
          const isLink = configField.isLink || false

          // Probably unnecessary, but just to make sure check to see if
          // these required fields exists on the metadata
          if (label && value) {
            memo = memo.concat({
              label: label,
              value: value,
              isLink: isLink,
            })
          }
        }

        // Return display access item
        return memo
      }, [])

      previous.push(forDisplayAccessItem)

      return previous
    }, [])
  }

  return []
}

const displayLoadingFeedback = (datastoreUid) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  if (!accessConfig.access || !accessConfig.access.displayLoadingFeedback) {
    return false;
  }

  return accessConfig.access.displayLoadingFeedback;
}

const isFullRecordType = ({ datastoreUid }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  return accessConfig.hasOwnProperty('full')
}

const getHoldings = ({ holdings, datastoreUid }) => {
  if (!holdings) {
    return []
  }

  const datastoreConfig = _.findWhere(config.fields, { datastore: datastoreUid })
  if (!datastoreConfig) {
    return []
  }

  const holdingsConfig = datastoreConfig.holdings;
  if (!holdingsConfig) {
    return []
  }

  return holdingsConfig.reduce((previous, holdingConfig) => {
    if (!holdings[holdingConfig.uid]) {
      return previous
    }

    const holdingsType = {
      uid: holdingConfig.uid,
      name: holdingConfig.heading,
      holdings: _.reduce(holdings[holdingConfig.uid], (acc, holding) => {
        let holdingObj = {
          label: holdingConfig.label,
          link: holding[holdingConfig.link],
          linkText: holdingConfig.defaultAccessText,
          status: holding[holdingConfig.status],
          location: holding[holdingConfig.location],
          source: holding[holdingConfig.source],
          callnumber: holding[holdingConfig.callnumber],
          map: holding[holdingConfig.map],
          coverage: holding[holdingConfig.coverage],
          description: holding[holdingConfig.description],
        }

        //rewrite config check
        _.each(config.holdingRewrites, rule => {
          if (holding[rule.match.uid] && holding[rule.match.uid] === rule.match.value) {
            _.each(rule.replace, replace => {
              holdingObj[replace.uid] = replace.value
            })
          }
        })

        // Hack
        // A very special hack to remove Search Only HathiTrust holdings
        // from Mirlyn records when search only filter is active.
        /*
        if (
          (holding[holdingConfig.status] === 'Search only (no full text)') &&
          isFilterItemChecked({
            datastoreUid: 'mirlyn',
            filterUid: 'search_only'
          })
        ) {
          return acc
        }
        */
        // OK, carry on.

        return acc.concat(holdingObj)
      }, [])
    }

    if (holdingsType.holdings.length > 0) {
      return previous.concat(holdingsType)
    } else {
      return previous
    }
  }, [])

  /*
  Returns an object with this example shape.

  [
    {
      uid: 'hathitrust',
      name: 'HathiTrust',
      holdings: [
        {
          link: '',
          linkText: '',
          status: '',
        }
      ]
    }
  ]
  */
}

const getShowAllText = ({ holdingUid, datastoreUid }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  if (accessConfig.holdings) {
    const holdingsConfig = _.findWhere(accessConfig.holdings, { uid: holdingUid })
    return holdingsConfig.showAllName || holdingsConfig.heading
  }

  return undefined
}

const getRecordFormats = ({ fields, datastoreUid }) => {
  const format = getField(fields, 'format')

  if (format) {
    return getFieldValue(format)
  } else {
    const fieldsConfig = _.findWhere(config.fields, { datastore: datastoreUid })

    if (fieldsConfig.defaultFields) {
      const defaultFormat = getField(fieldsConfig.defaultFields, 'format')

      if (defaultFormat) {
        return getFieldValue(defaultFormat)
      }
    }
  }

  return []
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
  filterAccessFields,
  displayLoadingFeedback,
  isFullRecordType,
  getHoldings,
  getShowAllText,
  getFullRecordDisplayFields,
  getRecordFormats
}
