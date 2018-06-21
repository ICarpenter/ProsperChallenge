import React from 'react';
import Tags from '../Tags';
import Messages from '../Messages';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { find, keys, reject, omit, get, without, union } from 'lodash';
import {messages, tags} from '../../data';

export const SELECTED_ACTIVE = 'active';
export const SELECTED_INDETERMINATE = 'indeterminate';
export const SELECTED_OVERRIDE = 'override';

const styles = () => ({
  root: {
    display: 'flex',
    width: '100%',
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [...messages],
      tags: [...tags],
      selectedTags: {},
      selectedMessages: {},
      newMessageBody: '',
      newTagLabel: '',
    }
  }

  updateNewTagLabel = (value) => {
    this.setState({newTagLabel: value});
  }

  updateNewMessageBody = (value) => {
    this.setState({newMessageBody: value});
  }

  addTag = (label) => {
    const added = {id: this.state.messages.length + 1, label};
    this.setState({
      tags: [...this.state.tags, added]
    });
  }

  deleteTag = (tagId) => {
    this.setState({
      tags: reject(this.state.tags, {id: tagId})
    });
  }

  deleteMessage = (messageId) => {
    this.setState({
      messages: reject(this.state.messages, {id: messageId})
    });
  }

  addMessage = (body) => {
    const added = {id: this.state.messages.length + 1, tags: [], created: new Date(), body};
    this.setState({
      newMessageBody: '',
      messages: [...this.state.messages, added]
    })
  }

  applyTagsToMessages = () => {
    const messages = [...this.state.messages];
    const selected = this.state.selectedTags;
    const updated = {isSelected: false};
    const filteredSelected = keys(selected).filter(s => [SELECTED_ACTIVE, SELECTED_OVERRIDE].includes(selected[s]));
    if (filteredSelected.length) {
      updated.tags = filteredSelected.map((t) => parseInt(t))
    }

    const idsToUpdate = this._getSelectedMessage().map(m => m.id);
    const updatedMessages = messages.map((m) => idsToUpdate.includes(m.id) ? {...m, ...updated} : m);
    this.setState({
      messages: updatedMessages,
      selectedTags: [],
    });
  }

  toggleMessageSelected = ({id}) => {
    const messageSelected = get(this.state.selectedMessages, `${id}`);
    this.setState({
      selectedMessages: {...this.state.selectedMessages, ...{[id]: !messageSelected}},
    }, () => this.updateSelectedTags());
  }

  toggleTagSelected = (toggledTag) => {
    const current = this.state.selectedTags[toggledTag.id];
    let newState;
    if ([SELECTED_ACTIVE, SELECTED_OVERRIDE].includes(current)) {
      newState = omit(this.state.selectedTags, [toggledTag.id])
    } else {
      newState = {...this.state.selectedTags, ...{[toggledTag.id]: SELECTED_OVERRIDE}}
    }
    this.setState({
      selectedTags: newState,
    });
  }

  _getSelectedMessage = () => {
    const messagesIds = keys(this.state.selectedMessages).filter((id) => this.state.selectedMessages[id]).map(id => parseInt(id));
    return this.state.messages.filter(m => messagesIds.includes(m.id));
  }

  updateSelectedTags = () => {
    const selectedMs = this._getSelectedMessage();
    const results = {};
    const tracker = {};
    selectedMs.forEach((m) =>{
      m.tags.forEach((t) => {
        tracker[t] = tracker[t] ? tracker[t] + 1 : 1;
      });
    });

    keys(tracker).forEach((t) => {
      if (tracker[t] !== selectedMs.length) {
        results[t] = SELECTED_INDETERMINATE;
      } else {
        results[t] = SELECTED_ACTIVE;
      }
    });
    this.setState({
      selectedTags: results,
    })
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Tags
          tags={this.state.tags}
          selectedTags={this.state.selectedTags}
          newTagLabel={this.state.newTagLabel}
          addTag={this.addTag}
          updateNewTagLabel={this.updateNewTagLabel}
          applyTagsToMessages={this.applyTagsToMessages}
          toggleTagSelected={this.toggleTagSelected}
          deleteTag={this.deleteTag}
        />
        <Messages
          tags={this.state.tags}
          addMessage={this.addMessage}
          selectedMessages={this.state.selectedMessages}
          updateNewMessageBody={this.updateNewMessageBody}
          newMessageBody={this.state.newMessageBody}
          messages={this.state.messages}
          toggleMessageSelected={this.toggleMessageSelected}
          deleteMessage={this.deleteMessage}
        />
      </div>
    )
  }
};

export default compose(

  withStyles(styles),
)(App);