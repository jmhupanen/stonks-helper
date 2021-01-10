import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Trade from './Trade';
import Spinner from '../layout/Spinner';
import { TradeContext } from '../../context/trade/TradeState';
import { Typography, Grid} from '@material-ui/core'

const TradeList = () => {
  const tradeContext = useContext(TradeContext);

  const { trades, filtered, getTrades, loading } = tradeContext;

  useEffect(() => {
    getTrades();
    // eslint-disable-next-line
  }, []);

  if (trades !== null && trades.length === 0 && !loading) {
    return (
    <Grid container justify="center">
      <Typography variant="body1" gutterBottom>
        Please select 'Add trade' to start adding trades
      </Typography>
    </Grid>
    );
  }
  
  return (
    <Fragment>
      {trades !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(trade => (
                <CSSTransition
                  key={trade._id}
                  timeout={500}
                  classNames='item'
                >
                  <Trade trade={trade} />
                </CSSTransition>
              ))
            : trades.map(trade => (
                <CSSTransition
                  key={trade._id}
                  timeout={500}
                  classNames='item'
                >
                  <Trade trade={trade} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default TradeList;