import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Message from './Message';

const styles = ({spacing}) => ({
  root: {
    padding: spacing.unit * 2,
    minWidth: spacing.unit * 70,
  },
  addMessageWrapper: {
    display: 'flex',
    marginTop: spacing.unit * 2,
    padding: spacing.unit * 1,
  },
  messageHeading: {
    marginBottom: spacing.unit * 2,
  }
});

const Messages = ({
  classes,
  messages,
  tags,
  toggleMessageSelected,
  addMessage,
  updateNewMessageBody,
  newMessageBody,
  deleteMessage,
}) => (
  <Paper className={classes.root}>
    <Typography variant="display1" className={classes.messageHeading}>Message</Typography>
    <div>
      {messages.map((message) =>
        <Message
          key={message.id}
          messageTags={tags.filter(t => message.tags.includes(t.id))}
          toggleMessageSelected={toggleMessageSelected}
          message={message}
          deleteMessage={deleteMessage}
        />)}
    </div>
    <div className={classes.addMessageWrapper}>
      <TextField
        label="Add a Message"
        value={newMessageBody}
        onChange={(e) => updateNewMessageBody(e.target.value)}
      />
      <IconButton
        onClick={() => addMessage(newMessageBody)}
        size="small"
        disabled={!newMessageBody}>
        <AddBox/>
      </IconButton>
    </div>
  </Paper>
);

export default compose(
  withStyles(styles),
)(Messages);