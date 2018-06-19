import React from 'react';
import Tags from '../Tags';
import Messages from '../Messages';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { find, keys, reject, omit } from 'lodash';
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
    const idsToUpdate = messages.filter((m) => m.isSelected).map(m => m.id);
    const updatedMessages = messages.map((m) => idsToUpdate.includes(m.id) ? {...m, ...updated} : m);
    this.setState({
      messages: updatedMessages,
      selectedTags: [],
    });
  }

  toggleMessageSelected = ({id}) => {
    const messages = [...this.state.messages];
    const messageToUpdate = find(messages, {id});
    const updated = {...messageToUpdate, ...{isSelected: !messageToUpdate.isSelected }};
    const updatedMessages = messages.map((m) => m.id === id ? updated : m);
    this.setState({
      messages: updatedMessages,
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

  updateSelectedTags = () => {
    const selected = this.state.selectedTags;

    // grab all of the currently selected messages' tags
    const selectedMTs = this.state.messages.filter(m => m.isSelected).map(m => m.tags);
    let results = {};

    // add the user overridden tags to the results array first
    const overrides = keys(selected).filter(id => selected[id] === SELECTED_OVERRIDE);
    overrides.forEach(id => results[id] = SELECTED_OVERRIDE);

    selectedMTs.forEach(sti => {
      sti.forEach((st) => {
        // if every selected message has the tag, set as ACTIVE
        if (selectedMTs.every(smt => smt.includes(st))) {
          results[st] = SELECTED_ACTIVE;
          // if only some have the tag, set as INDETERMINATE
        } else if (selectedMTs.some(smt => smt.includes(st))) {
          results[st] = SELECTED_INDETERMINATE;
        }
      })
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