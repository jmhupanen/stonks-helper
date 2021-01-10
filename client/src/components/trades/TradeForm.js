import React, { useState, useContext, useEffect } from 'react';
import { TradeContext } from '../../context/trade/TradeState';
import { 
  Button, 
  Switch, 
  FormControl, 
  FormControlLabel, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Typography, 
  Grid, 
  InputAdornment 
} from '@material-ui/core';

function TradeForm() {
  const tradeContext = useContext(TradeContext);

  const { addTrade, updateTrade, clearCurrent, current } = tradeContext;

  useEffect(() => {
    if (current !== null) {
      setTrade(current);
    } else {
      setTrade({
        entry: 0,
        exit: 0,
        quantityBght: 0,
        quantitySld: 0,
        profitLoss: 0,
        profitLossPct: 0,
        positionType: '',
        leverage: 0,
        underlSecEntr: 0,
        underlSecExt: 0,
        stopLoss: 0,
        takeProfit: 0,
        riskReward: 0,
        name: '',
        entryDate: '',
        exitDate: '',
        notes: ''
      });
    }
  }, [tradeContext, current]);

  const [trade, setTrade] = useState({
    entry: 0,
    exit: 0,
    quantityBght: 0,
    quantitySld: 0,
    profitLoss: 0,
    profitLossPct: 0,
    positionType: '',
    leverage: 0,
    underlSecEntr: 0,
    underlSecExt: 0,
    stopLoss: 0,
    takeProfit: 0,
    riskReward: 0,
    name: '',
    entryDate: '',
    exitDate: '',
    notes: ''
  });

  const { 
    entry,
    exit,
    quantityBght,
    quantitySld,
    profitLoss,
    profitLossPct,
    positionType,
    leverage,
    underlSecEntr,
    underlSecExt,
    stopLoss,
    takeProfit,
    riskReward,
    name,
    entryDate,
    exitDate,
    notes 
  } = trade;

  const [levState, setLevState] = useState({
    checkedLev: true
  });

  const [levType, setLevType] = useState('');

  const currency = "€";

  const onChange = e =>
    setTrade({ ...trade, [e.target.name]: e.target.value });

  const handleSwitch = e => {
    setLevState({ ...levState, [e.target.name]: e.target.checked });
  };

  const handleSelect = e => {
    setLevType(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addTrade(trade);
    } else {
      updateTrade(trade);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid container justify="center">
          <Typography variant="body1" gutterBottom>
            {current ? 'Edit trade details' : 'Insert trade details and calculate position size'}
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs>
              <TextField 
                required
                name="name" 
                label="Name" 
                variant="outlined" 
                value={name} 
                onChange={onChange} 
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs>
              <TextField 
                name="notes" 
                label="Notes" 
                variant="outlined" 
                multiline 
                rows={2} 
                rowsMax={Infinity}
                value={notes} 
                onChange={onChange} 
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs>
              <TextField 
                required
                variant="standard" 
                type="date" 
                name="entryDate" 
                label="Entry Date" 
                variant="outlined" 
                InputLabelProps={{
                  shrink: true,
                }}
                value={entryDate} 
                onChange={onChange} 
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs>
              <TextField 
                type="date"  
                name="exitDate" 
                label="Exit Date" 
                variant="outlined" 
                InputLabelProps={{
                  shrink: true,
                }}
                value={exitDate} 
                onChange={onChange} 
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs>
              <FormControlLabel 
                control={<Switch 
                  checked={levState.checkedLev}
                  onChange={handleSwitch}
                  name="checkedLev"
                />}
                label="Toggle Leverage"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid item xs>
              <FormControl 
                disabled={!levState.checkedLev} 
                variant="outlined" 
                display="flex" 
                fullWidth={true}
                margin="normal" 
                size="small">
                <InputLabel>Leverage Type</InputLabel>
                <Select
                  value={levType}
                  onChange={handleSelect}
                  label="Leverage Type"
                >
                  <MenuItem value="constant">Constant</MenuItem>
                  <MenuItem value="dynamic">Dynamic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs> 
              <TextField 
                required
                type="number"
                name="quantityBght" 
                label="Quantity Bought" 
                variant="outlined" 
                InputProps={{ inputProps: { min: 1} }}
                value={quantityBght} 
                onChange={onChange} 
                margin="normal" 
                size="small" 
              />
            </Grid>
            <Grid item xs>
              <TextField 
                required
                type="number"
                name="entry" 
                label="Entry Price" 
                variant="outlined" 
                InputProps={{
                  inputProps: { min: 0.0001 },
                  startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                }}
                value={entry} 
                onChange={onChange} 
                margin="normal" 
                size="small" 
              />
            </Grid>
            <Grid container justify="center">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default TradeForm;