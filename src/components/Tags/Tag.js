import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { SELECTED_ACTIVE, SELECTED_INDETERMINATE, SELECTED_OVERRIDE  } from '../App';

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
  tagLabel: {
    padding: spacing.unit,
    flexGrow: 1,
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

const Tag = ({classes, tag, checkedStatus, toggleTagSelected, deleteTag}) => (
  <div className={classes.root}>
    <Checkbox
      checked={[SELECTED_ACTIVE, SELECTED_OVERRIDE].includes(checkedStatus)}
      indeterminate={checkedStatus === SELECTED_INDETERMINATE}
      onChange={() => toggleTagSelected(tag)}
    />
    <div className={classes.tagLabel}>
      <Typography variant="body1">
        {tag.label}
      </Typography>
    </div>
    <div className={classes.deleteContainer}>
      <IconButton variant="outlined" onClick={() => deleteTag(tag.id)}>
        <Cancel />
      </IconButton>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
)(Tag);