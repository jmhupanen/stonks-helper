import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import tradeReducer from './tradeReducer';
import {
  GET_TRADES,
  ADD_TRADE,
  DELETE_TRADE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TRADE,
  FILTER_TRADES,
  CLEAR_TRADES,
  CLEAR_FILTER,
  TRADE_ERROR
} from '../types';

export const TradeContext = createContext();

export const TradeProvider = props => {
  const initialState = {
    trades: null,
    current: null,
    filtered: null,
    error: null
  };
  
  const [state, dispatch] = useReducer(tradeReducer, initialState);

  // Get Current User's Trades
  const getTrades = async () => {
    try {
      const res = await axios.get('/api/trades/mytrades');

      dispatch({
        type: GET_TRADES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TRADE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Trade
  const addTrade = async trade => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/trades', trade, config);

      dispatch({
        type: ADD_TRADE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TRADE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Trade
  const deleteTrade = async id => {
    try {
      await axios.delete(`/api/trades/${id}`);

      dispatch({
        type: DELETE_TRADE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TRADE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Trade
  const updateTrade = async trade => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/trades/${trade._id}`,
        trade,
        config
      );

      dispatch({
        type: UPDATE_TRADE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TRADE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Trades
  const clearTrades = () => {
    dispatch({ type: CLEAR_TRADES });
  };

  // Set Current Trade
  const setCurrent = trade => {
    dispatch({ type: SET_CURRENT, payload: trade });
  };

  // Clear Current Trade
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Trades
  const filterTrades = text => {
    dispatch({ type: FILTER_TRADES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <TradeContext.Provider
      value={{
        trades: state.trades,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addTrade,
        deleteTrade,
        setCurrent,
        clearCurrent,
        updateTrade,
        filterTrades,
        clearFilter,
        getTrades,
        clearTrades
      }}
    >
      {props.children}
    </TradeContext.Provider>
  );
};