import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Tag from './Tag';

const styles = ({spacing}) => ({
  root: {
    padding: spacing.unit * 2,
    marginRight: spacing.unit * 4,
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 0,
  },
  addTagWrapper: {
    display: 'flex',
  }
});

const Tags = ({
  classes,
  tags,
  newTagLabel,
  addTag,
  updateNewTagLabel,
  selectedTags,
  applyTagsToMessages,
  toggleTagSelected,
  deleteTag
}) => (
  <Paper className={classes.root}>
    <Typography variant="display1">Tags</Typography>
    <ul className={classes.ul}>
      {tags.map((tag) => <li key={tag.id}>
        <Tag
          checkedStatus={selectedTags[tag.id]}
          tag={tag}
          toggleTagSelected={toggleTagSelected}
          deleteTag={deleteTag}/>
      </li>)}
    </ul>
    <div className={classes.addTagWrapper}>
      <Button
        onClick={() => addTag(newTagLabel)}
        size="small"
        disabled={!newTagLabel}>
        <Add/>
      </Button>
      <TextField
        label="Add a tag"
        value={newTagLabel}
        onChange={(e) => updateNewTagLabel(e.target.value)}
        margin="normal"
      />
    </div>
    <Button
      onClick={() => applyTagsToMessages()}>
      Apply
    </Button>
  </Paper>
);

export default compose(
  withStyles(styles),
)(Tags);