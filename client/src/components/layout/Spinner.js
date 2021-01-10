import React, { Fragment } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

export default () => (
  <Fragment>
    <Grid container justify="center">
      <CircularProgress />
    </Grid>
  </Fragment>
);