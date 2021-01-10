import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TradeContext } from '../../context/trade/TradeState';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';


const Trade = ({ trade }) => {
  const tradeContext = useContext(TradeContext);
  const { deleteTrade, setCurrent, clearCurrent } = tradeContext;

  const { 
    _id, 
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

  const onDelete = () => {
    deleteTrade(_id);
    clearCurrent();
  };

  return (
    <div>
      <TableRow
        hover
        onClick={() => setCurrent(trade)}
        role="checkbox"
        /* aria-checked={}
        order={}
        orderBy={}
        onSelectAllClick={}
        onRequestSort={}
        rowCount={} */
      >
        <TableCell padding="checkbox">
          <Checkbox
            /* checked={}
            inputProps={} */
          />
        </TableCell>
        <TableCell component="th" id="enhanced-table-checkbox" scope="row" padding="none">
          {entryDate}
        </TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{positionType}</TableCell>
        <TableCell align="right">{quantityBght}</TableCell>
        <TableCell align="right">{entry}</TableCell>
        <TableCell align="right">{exit}</TableCell>
        <TableCell align="right">{profitLoss}</TableCell>
        <TableCell align="right">{profitLossPct}</TableCell>
        <TableCell align="right">{stopLoss}</TableCell>
        <TableCell align="right">{takeProfit}</TableCell>
        <TableCell align="right">{riskReward}</TableCell>
        <TableCell align="right">{notes}</TableCell>
      </TableRow>
    </div>
  );
};

Trade.propTypes = {
  trade: PropTypes.object.isRequired
};

export default Trade;