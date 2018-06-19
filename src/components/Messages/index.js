import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Message from './Message';

const styles = ({spacing}) => ({
  root: {
    padding: spacing.unit * 2,
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 0,
  },
  addMessageWrapper: {
    display: 'flex',
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
    <Typography variant="display1">Messages</Typography>
    <ul className={classes.ul}>
      {messages.map((message) =>
        <li key={message.id}>
          <Message
            messageTags={tags.filter(t => message.tags.includes(t.id))}
            toggleMessageSelected={toggleMessageSelected}
            message={message}
            deleteMessage={deleteMessage}
          />
      </li>)}
    </ul>
    <div className={classes.addMessageWrapper}>
      <Button
        onClick={() => addMessage(newMessageBody)}
        size="small"
        disabled={!newMessageBody}>
        <Add/>
      </Button>
      <TextField
        label="Add a Message"
        value={newMessageBody}
        onChange={(e) => updateNewMessageBody(e.target.value)}
      />
    </div>
  </Paper>
);

export default compose(
  withStyles(styles),
)(Messages);