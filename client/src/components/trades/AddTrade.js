import React, { useState } from 'react'
import { Button, TextField, Typography, Grid } from '@material-ui/core'

function AddTrade() {
  const [text, setText] = useState('')

  return (
    <div>
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
    </div>
  )
}

export default AddTrade