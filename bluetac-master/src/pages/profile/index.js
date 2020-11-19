import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Person from '@material-ui/icons/Person';
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Profile from './Profile';

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

function profile() {

  const classes = useStyles();
  return (
    <>

      <Paper elevation={3}>
        <Box p={2} className='title-container' display='flex'>
          <Box mr={2}>
            <Paper elevation={2} style={{ padding: 16 }}>
              <Person style={{ color: blueGrey[200], fontSize: 40 }} />
            </Paper>
          </Box>
          <Box>
            <Typography variant='h2'>Profile</Typography>
            <Typography variant='caption'>Manage your profilex</Typography>
          </Box>
          <Box flex='1' />
        </Box>
      </Paper>


      <Profile />

    </>
  );
}


export default profile;
