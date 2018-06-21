import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';

const styles = ({spacing, palette}) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderColor: palette.grey['300'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomStyle: 'none',
    '&:last-child': {
      borderBottomStyle: 'solid',
    }
  },
  messageBody: {
    padding: spacing.unit * 1,
    flexGrow: 1,
  },
  tagContainer: {
    padding: spacing.unit * 1,
  },
  tag: {
    marginLeft: spacing.unit,
    backgroundColor: palette.primary.light,
    '&:first-child': {
      marginLeft: 0,
    }
  },
  tagLabel: {
    color: palette.primary.contrastText,
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 0,
    '& li': {
      display: 'inline',
    }
  },
  deleteContainer: {
    padding: spacing.unit * 1,
    marginLeft: spacing.unit,
    paddingLeft: spacing.unit,
    borderColor: palette.grey['300'],
    borderWidth: '1px',
    borderLeftStyle: 'solid',
    display: 'flex',
  },
  deleteButton: {
    padding: spacing.unit * 1,
    marginLeft: spacing.unit,
    paddingLeft: spacing.unit,
    borderColor: palette.grey['300'],
    borderWidth: '1px',
    borderLeftStyle: 'solid',
    display: 'flex',
  }
});

const Message = ({classes, message, isSelected, messageTags, toggleMessageSelected, deleteMessage}) => (
  <div className={classes.root}>
    <Checkbox
      checked={isSelected}
      onChange={() => toggleMessageSelected(message)}
    />
    <div className={classes.messageBody}>
      <Typography variant="body1">
        {message.body}
      </Typography>
    </div>
    <div className={classes.tagContainer}>
      {messageTags && messageTags.map(t => <Chip label={t.label} classes={{root: classes.tag, label: classes.tagLabel}} />)}
    </div>
    <div className={classes.deleteContainer}>
      <IconButton variant="outlined" onClick={() => deleteMessage(message.id)}>
        <Cancel />
      </IconButton>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
)(Message);