import React from 'react'
import AddTrade from './TradeForm'
import TradeList from './TradeList'
import { Typography, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
/*     textField: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }, */
}));

function TradeLog() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid container justify="center">
          <Typography variant="h4" gutterBottom>Trade Log</Typography>
        </Grid>

        <AddTrade />

        <TradeList />

      </Grid>
    </div>
  )
}

export default TradeLog
