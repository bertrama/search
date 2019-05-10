import React from 'react'
import { Chat, UniversalHeader, GlobalStyleSheet } from "@umich-lib/core"
import Search from './src/components/search'

export const wrapPageElement = ({ element }) => {
  return (
    <React.Fragment>
      <GlobalStyleSheet />
      <UniversalHeader />
        <Search>
          {element}
        </Search>
      <Chat fixed />
    </React.Fragment>
  )
}