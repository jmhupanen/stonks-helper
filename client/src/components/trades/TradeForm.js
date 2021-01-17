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
        leverage: 1,
        underlSecEntr: 0,
        underlSecExt: 0,
        strikePrice: 0,
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
    leverage: 1,
    underlSecEntr: 0,
    underlSecExt: 0,
    strikePrice: 0,
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
    strikePrice,
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

  // Parameters from settings
  const currency = "€";
  const accountSize = 1000000;
  const riskLevel = 0.02;

  const onChange = e => {
    if (e.target.getAttribute("name") !== 'strikePrice' && e.target.getAttribute("name") !== 'underlSecEntr') {
      setTrade({ ...trade, [e.target.name]: e.target.value });
    } else if (levType === 'dynamic') {
      const entry = Math.abs((document.getElementById('underlSecEntr').value - document.getElementById('strikePrice').value));
      const leverage = Math.round((document.getElementById('underlSecEntr').value / entry)*10)/10;
      setTrade({ ...trade, [e.target.name]: e.target.value, entry: entry, leverage: leverage });
    } else {
      setTrade({ ...trade, [e.target.name]: e.target.value });
    }
  }

  const handleSwitch = e => {
    setLevState({ ...levState, [e.target.name]: e.target.checked });
    if (levState.checkedLev) {
      setLevType('');
      setTrade({ ...trade, leverage: 1 , strikePrice: 0, underlSecEntr: 0, underlSecExt: 0 });
    }
  };

  const handleSelect = e => {
    setLevType(e.target.value);
    if (levType === 'dynamic') {
      setTrade({ ...trade, strikePrice: 0, leverage: 1 });
    } else if (levType === 'constant') {
      setTrade({ ...trade, leverage: 1 });
    }
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
          <Grid container justify="center">
            <Grid container spacing={2} justify="center">
              <Grid item xs style={{textAlign: "center"}}>
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
              <Grid item xs style={{textAlign: "center"}}>
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
              <Grid item xs style={{textAlign: "center"}}>
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
              <Grid item xs style={{textAlign: "center"}}>
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
            </Grid>
            <Grid container spacing={5} justify="center">
              <Grid item xs style={{textAlign: "center"}}>
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
              <Grid item xs style={{textAlign: "center"}}>
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
              <Grid item xs style={{textAlign: "center"}}> 
                <TextField 
                  disabled={!levState.checkedLev || levType !== 'constant'} 
                  type="number"
                  name="leverage" 
                  label="Leverage" 
                  variant="outlined" 
                  InputProps={{ inputProps: { min: 1 } }}
                  value={leverage} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  disabled={levType !== 'dynamic'} 
                  type="number" 
                  id="strikePrice" 
                  name="strikePrice" 
                  label="Strike Price" 
                  variant="outlined" 
                  InputProps={{
                    inputProps: { min: 0 },
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                  }}
                  value={strikePrice} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  disabled={!levState.checkedLev}
                  type="number"
                  id="underlSecEntr"
                  name="underlSecEntr" 
                  label="Underlying Security Entry" 
                  variant="outlined" 
                  InputProps={{
                    inputProps: { min: 0.0001 },
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                  }}
                  value={underlSecEntr} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  disabled={!levState.checkedLev}
                  type="number"
                  name="underlSecExt" 
                  label="Underlying Security Exit" 
                  variant="outlined" 
                  InputProps={{
                    inputProps: { min: 0.0001 },
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                  }}
                  value={underlSecExt} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}> 
                <TextField 
                  required
                  type="number"
                  name="quantityBght" 
                  label="Quantity Bought" 
                  variant="outlined" 
                  InputProps={{ inputProps: { min: 1 } }}
                  value={quantityBght} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  required
                  type="number"
                  id="entry"
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
              <Grid item xs style={{textAlign: "center"}}> 
                <TextField 
                  type="number"
                  name="quantitySld" 
                  label="Quantity Sold" 
                  variant="outlined" 
                  InputProps={{ inputProps: { min: 0, max: quantityBght } }}
                  value={quantitySld} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  type="number"
                  name="exit" 
                  label="Exit Price" 
                  variant="outlined" 
                  InputProps={{
                    inputProps: { min: 0 },
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                  }}
                  value={exit} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justify="center">
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  type="number"
                  name="stopLoss" 
                  label="Stop Loss" 
                  variant="outlined" 
                  InputProps={{
                    inputProps: { max: 0.9999 * entry },
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                  }}
                  value={stopLoss} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <TextField 
                  type="number"
                  name="takeProfit" 
                  label="Take Profit" 
                  variant="outlined" 
                  InputProps={{
                    inputProps: { min: 1.0001 * entry },
                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                  }}
                  value={takeProfit} 
                  onChange={onChange} 
                  margin="normal" 
                  size="small" 
                />
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <Typography variant="body1" gutterBottom>
                  Risk/Reward Ratio: 1:{(takeProfit-entry)/(entry-stopLoss)}
                </Typography>
              </Grid>
              <Grid item xs style={{textAlign: "center"}}>
                <Typography variant="body1" gutterBottom>
                  Position Size: {entry*quantityBght} {currency}
                </Typography>
              </Grid>
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