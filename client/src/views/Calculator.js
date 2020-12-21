import React from 'react'
import { Button, TextField, Typography, Grid, makeStyles } from '@material-ui/core'

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

function Calculator() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid container justify="center">
                    <Typography variant="h4" gutterBottom>Calculator</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                        Calculate the position size
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Some text" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Button
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Calculator
