import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const styles = ({spacing}) => ({
  root: {
    padding: spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
  },
  messageBody: {
    padding: spacing.unit,
  },
  tagContainer: {
    padding: spacing.unit,
  },
  tag: {
    marginLeft: spacing.unit,
    '&:first-child': {
      marginLeft: 0,
    }
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 0,
    '& li': {
      display: 'inline',
    }
  },
  deleteButton: {

  }
});

const Message = ({classes, message, messageTags, toggleMessageSelected, deleteMessage}) => (
  <div className={classes.root}>
    <Checkbox
      checked={message.isSelected}
      onChange={() => toggleMessageSelected(message)}
    />
    <div className={classes.messageBody}>
      <span>{message.body}</span>
    </div>
    <div className={classes.tagContainer}>
      {messageTags && messageTags.map(t => <Chip label={t.label} className={classes.tag} />)}
    </div>
    <Button className={classes.deleteButton} size="small" onClick={() => deleteMessage(message.id)}>
      <Delete />
    </Button>
  </div>
);

export default compose(
  withStyles(styles),
)(Message);