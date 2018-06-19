import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SELECTED_ACTIVE, SELECTED_INDETERMINATE, SELECTED_OVERRIDE  } from '../App';

const styles = ({spacing}) => ({
  root: {
    padding: spacing.unit * 2,
  }
});

const Tag = ({classes, tag, checkedStatus, toggleTagSelected, deleteTag}) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={[SELECTED_ACTIVE, SELECTED_OVERRIDE].includes(checkedStatus)}
          indeterminate={checkedStatus === SELECTED_INDETERMINATE}
          onChange={() => toggleTagSelected(tag)}
        />
      }
      label={tag.label}/>
    <Button size="small" onClick={() => deleteTag(tag.id)}>
      <Delete />
    </Button>
  </div>
);

export default compose(
  withStyles(styles),
)(Tag);