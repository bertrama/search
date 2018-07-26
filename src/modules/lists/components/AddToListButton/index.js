import React, { Component } from 'react';
import { connect } from 'react-redux'
import { _ } from 'underscore';
import { Button } from '../../../reusable'
import { Icon } from '../../../core'
import {
  isInList
} from '../../../lists'
import {
  setA11yMessage
} from '../../../a11y'

import prejudice from '../../prejudice'

class AddToListButton extends Component {
  state = {
    waitingToBeAddedToList: false
  }

  componentDidUpdate() {
    const { list, item } = this.props
    const inList = isInList(list, item.uid)

    if (inList && this.state.waitingToBeAddedToList) {
      this.setState({ waitingToBeAddedToList: false })
    }
  }

  handleClick = (inList, item) => {
    if (!this.state.waitingToBeAddedToList) {
      if (inList) {
        prejudice.removeRecord(item)
      } else {
        this.setState({ waitingToBeAddedToList: true })
        prejudice.addRecord(item)
      }

      this.props.setA11yMessage(`My ${this.props.datastore.name} List updated.`)
    }
  }

  renderButtonContent = (inList) => {
    if (inList) {
      return (
        <React.Fragment>
          <Icon name="window-close" /><span>Remove from list</span>
        </React.Fragment>
      )
    } else if (this.state.waitingToBeAddedToList) {
      return (
        <React.Fragment>
          <Icon name="plus" /><span>Adding ...</span>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Icon name="plus" /><span>Add to list</span>
        </React.Fragment>
      )
    }
  }

  render() {
    const { list, item } = this.props
    const inList = isInList(list, item.uid)

    return (
      <Button
        kind="tertiary"
        small
        onClick={() => this.handleClick(inList, item)}
      >{this.renderButtonContent(inList)}</Button>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    list: state.lists[state.datastores.active],
  };
}

export default connect(mapStateToProps, { setA11yMessage })(AddToListButton)
