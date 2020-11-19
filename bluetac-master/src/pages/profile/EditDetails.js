import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../data/userApi';
import { useAppContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
/**
 * Reducer
 * @param {JSON} state State
 * @returns {Promise}.
 */
function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}
function EditDetails(props) {
  const { user } = useAppContext();

  const classes = useStyles();
  let initialState = {
    ...user.credentials,
    open: false
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleDialog = () => {
    dispatch({ field: 'open', value: !state.open });
  };

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location
    };
    editUserDetails(userDetails).then(() => {
      //Todo fetch user data and set the state globally ( using appContext)
    })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleDialog();
      })

  };
  return (
    <>
      <MyButton
        tip="Edit Details"
        onClick={toggleDialog}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={state.open}
        onClose={toggleDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short description about the company"
              className={classes.textField}
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
            </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default EditDetails;
