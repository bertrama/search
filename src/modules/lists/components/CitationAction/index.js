import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@umich-lib/tabs'
import {
  cite
} from '../../../citations'
import { Modal } from '../../../reusable'
import { colors } from '@umich-lib/styles'
import Heading from '@umich-lib/heading'
import Button from '@umich-lib/button'

class CitationText extends React.Component {
  render() {
    return (
      <textarea
        style={{
          marginTop: '0.5rem',
          marginBottom: '0',
          width: '100%',
          padding: '0.5rem 0.75rem'
        }}
        value={this.props.value}
        onFocus={(e) => e.target.select()}
        readOnly
      />
    )
  }
}

const citation_options = [
  {
    name: 'MLA'
  },
  {
    name: 'APA'
  },
  {
    name: 'Chicago'
  },
  {
    name: 'IEEE'
  },
  {
    name: 'NLM'
  },
  {
    name: 'BibTex'
  }
]

class CitationAction extends Component {
  state = {
    modalIsOpen: false
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false })

    // Unselects the citation button from the actions lists.
    this.props.setActive(undefined)
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true })
  }

  componentDidMount() {
    let citation = cite({}, 'chicago-annotated-bibliography')

    this.handleOpenModal();
  }

  handleCopyToClipboard() {
    
  }

  render() {
    const value="Citation not available yet. This text is a placeholder."

    return (
      <div style={{
        background: colors.grey[100]
      }}>
        <StyledModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
          className={this.props.className}
        >
          <Heading
            size="medium"
            level={2}
            style={{ marginTop: '0' }}
          >Select a citation format</Heading>

          <Tabs>
            <TabList>
              {citation_options.map(co => (
                <Tab key={co.name}>{co.name}</Tab>
              ))}
            </TabList>

            <TabPanel>
              <CitationText value={value} />
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
          </Tabs>

          <div className="x-spacing" style={{
            marginTop: '0.5rem'
          }}>
            <Button
              onSubmit={this.handleCopyToClipboard}
            >Copy to clipboard</Button>
            <Button
              kind="secondary"
              onClick={this.handleCloseModal}
            >Close</Button>
          </div>
        </StyledModal>
      </div>
    )
  }
}

export default CitationAction;
