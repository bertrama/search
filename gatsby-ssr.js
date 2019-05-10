import React from 'react'
import { UniversalHeader, GlobalStyleSheet } from "@umich-lib/core"

export const wrapPageElement = ({ element }) => {
  return (
    <React.Fragment>
      <GlobalStyleSheet />
      <UniversalHeader />
        {element}
    </React.Fragment>
  )
}