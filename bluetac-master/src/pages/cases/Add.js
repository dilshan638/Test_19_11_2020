import React, { useState, useReducer } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { blueGrey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postCase } from '../../data/casesApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '120ch',
  },
  active: {
    background: '#efefef',
    color: '#888',
  }
}));
function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}
function Add() {
  const { path } = useRouteMatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const initialState = {
    'status': 'active',
    'title': 'test title',
    'description': 'Nam iaculis maximus ligula non ullamcorper. Mauris nec dignissim ex. Phasellus vel neque velit. Nam vitae augue at felis posuere posuere a id velit. Vestibulum vel varius mi, et ultricies ipsum. Cras vitae tincidunt est. Maecenas diam velit, mattis porta purus sed, vulputate hendrerit felis. In enim dolor, consectetur non mi eget, dictum laoreet massa. Fusce nisi tellus, auctor sit amet elementum quis, consequat ac ligula. Praesent porttitor orci enim, eget faucibus sapien interdum nec.',
    'type': 'sheduled',
    'sheduledFromTime': 'Nov 15, 2020',
    'sheduledToTime': 'Nov 17, 2020',
    'createdTime': 'Nov 14, 2020',
    'assignedTime': 'Nov 14, 2020',
    'closedTime': '',
    'lastUpdatedTime': 'Nov 15, 2020',
    'hoursWorked': '3',
    'parallelCases': '',
    'specifications': ''
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    postCase(state).then(
      (data) => {
        setLoading(false);
      }
    ).catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });
  };
  return (
    <>
      <Paper elevation={3}>
        <Box p={2} className='title-container' display='flex'>
          <Box mr={2}>
            <Paper elevation={2} style={{ padding: 16 }}>
              <BusinessCenterIcon style={{ color: blueGrey[200], fontSize: 40 }} />
            </Paper>
          </Box>
          <Box>
            <Typography variant='h2'>Add New Case</Typography>
            <Typography variant='caption'>Manage your cases</Typography>
          </Box>
          <Box flex='1' />
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Link to={`${path}/add`}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
              >
                New case
            </Button>
            </Link>

          </Box>
        </Box>
      </Paper>
      <div className='title-container'>
        <Box mt={2}>
          <form noValidate onSubmit={handleSubmit}>

            {Object.keys(initialState).map((field) => (<Box display='flex' m={2}>
              <label style={{ width: 200 }}>{field}</label>
              <input type='text' name={field} onChange={handleChange} value={state[field]} />
            </Box>))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Add
              {loading && (
                <CircularProgress size={30} />
              )}

            </Button>
          </form>
        </Box>
      </div>
    </>
  );
}

Add.propTypes = {
};

export default Add;
