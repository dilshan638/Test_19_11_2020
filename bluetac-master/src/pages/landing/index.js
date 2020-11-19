import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <Paper elevation={8}>
      <Box position='relative'>

        <Box p={2} position='absolute' color='#efefef' width='100%'>
          <Grid container>
            <Grid item lg={8} xs={0} />
            <Grid item lg={3} xs={12}>
              <Typography variant='h1'>Method:</Typography>
              <Typography variant='caption'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              In pretium gravida ultricies. Nam fringilla sed lorem ut blandit. 
              Donec nec maximus risus. Vestibulum ante ipsum primis in faucibus orci luctus et 
              ultrices posuere cubilia curae; Pellentesque in dui vehicula, eleifend eros quis, mattis nibh.
          </Typography>
            </Grid>
          </Grid>


        </Box>
        <img src='https://picsum.photos/id/180/2400/800' style={{ width: '100%', height: 'auto' }} />
      </Box>


    </Paper>

  );
}
