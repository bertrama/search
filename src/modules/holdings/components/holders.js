/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
  AccordionItemState
} from 'react-accessible-accordion';
import {
  Icon
} from '@umich-lib/core'

import Holder from './holder'
import {
  COLORS,
  SPACING
} from '../umich-lib-core-temp/index'

const contentPadding = {
  padding: `${SPACING['S']} ${SPACING['M']}`,
  paddingLeft: '3rem',
}

/*
  Holders
    Holder
      Holdings
        Holding
*/
export function Holders ({ record }) {
  return (
    <Accordion
      allowMultipleExpanded
      allowZeroExpanded
      css={{
        '[aria-expanded="true"][data-accordion-component]': {
          background: COLORS.blue['100']
        }
      }}
    >
      {record.resourceAccess.map(({ caption, rows, ...rest }) => (
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton css={{
              ...contentPadding,
              borderTop: `solid 1px ${COLORS.neutral['100']}`,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              ':hover [data-holdings-holder-name]': {
                borderBottom: `solid 1px`
              },
              color: COLORS.neutral['300']
            }}>
              <span>
                <span
                  data-holdings-holder-name
                  css={{
                    fontWeight: '600',
                    color: COLORS.neutral['400']
                  }}
                >{caption}</span>
                <span css={{
                  padding: `0 ${SPACING['XS']}`
                }}>·</span>
                <span css={{
                }}>{rows.length} item{rows.length > 1 ? 's' : null}</span>
              </span>

              <AccordionItemState>
                {({ expanded }) => (
                  <React.Fragment>
                    {expanded ? (
                      <Icon
                        size="24"
                        d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                      />
                    ) : (
                      <Icon
                        size="24"
                        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                      />
                    )}
                  </React.Fragment>
                )}
              </AccordionItemState>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <AccordionItemState>
              {({ expanded }) => (
                <React.Fragment>
                  {expanded ? (
                    <Holder
                      record={record}
                      rows={rows}
                      css={{
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        paddingLeft: '3rem',
                        paddingRight: SPACING['M']
                      }}
                      {...rest}
                   />
                  ) : null}
                </React.Fragment>
              )}
            </AccordionItemState>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
  </Accordion>
  )
}