import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Tag from './Tag';

const styles = ({spacing}) => ({
  root: {
    padding: spacing.unit * 2,
    marginRight: spacing.unit * 4,
    minWidth: spacing.unit * 20,
  },
  tagWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  applyButton: {
    marginTop: spacing.unit * 2,
    width: '100%',
  },
  addTagWrapper: {
    display: 'flex',
    marginTop: spacing.unit * 2,
    padding: spacing.unit * 1,
  },
  tagHeading: {
    marginBottom: spacing.unit * 2,
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
    <Typography variant="display1" className={classes.tagHeading}>Tags</Typography>
    <div className={classes.tagWrapper}>
      {tags.map((tag) => <Tag
        checkedStatus={selectedTags[tag.id]}
        tag={tag}
        toggleTagSelected={toggleTagSelected}
        deleteTag={deleteTag}/>)}
    </div>
    <Button
      className={classes.applyButton}
      color="primary"
      variant="raised"
      onClick={() => applyTagsToMessages()}>
      Apply
    </Button>
    <div className={classes.addTagWrapper}>
      <TextField
        label="Add a tag"
        value={newTagLabel}
        onChange={(e) => updateNewTagLabel(e.target.value)}
        margin="none"
      />
      <IconButton
        onClick={() => addTag(newTagLabel)}
        size="small"
        disabled={!newTagLabel}>
        <AddBox/>
      </IconButton>
    </div>
  </Paper>
);

export default compose(
  withStyles(styles),
)(Tags);