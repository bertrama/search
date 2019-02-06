import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga'
import ActionStatusMessage from '../ActionStatusMessage'
import Button from '@umich-lib/button'
import Heading from '@umich-lib/heading'
import { Tabs, TabList, Tab, TabPanel } from '@umich-lib/tabs'

const CitationText = ({ children }) => (
  <textarea
    style={{
      marginTop: '0.5rem',
      marginBottom: '0',
      width: '100%',
      padding: '0.5rem 0.75rem'
    }}
    readonly
  >
    {children}
  </textarea>
)

class CitationAction extends Component {
  render() {
    return (
      <section className="lists-action y-spacing">
        <Tabs>
          <TabList>
            <Tab>MLA</Tab>
            <Tab>APA</Tab>
            <Tab>Chicago</Tab>
            <Tab>IEEE</Tab>
            <Tab>NLM</Tab>
            <Tab>BibTex</Tab>
          </TabList>

          <TabPanel>
            <CitationText>
              Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing.
            </CitationText>
          </TabPanel>
          <TabPanel>
            <CitationText>
              Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing.
            </CitationText>
          </TabPanel>
          <TabPanel>
            <CitationText>
              Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing.
            </CitationText>
          </TabPanel>
          <TabPanel>
            <CitationText>
              Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing.
            </CitationText>
          </TabPanel>
          <TabPanel>
            <CitationText>
              Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing.
            </CitationText>
          </TabPanel>
          <TabPanel>
            <CitationText>
              Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing.
            </CitationText>
          </TabPanel>
        </Tabs>
      </section>
    )
  }
}

export default CitationAction;
