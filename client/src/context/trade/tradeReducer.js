import {
  GET_TRADES,
  ADD_TRADE,
  DELETE_TRADE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TRADE,
  FILTER_TRADES,
  CLEAR_FILTER,
  TRADE_ERROR,
  CLEAR_TRADES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TRADES:
      return {
        ...state,
        trade: action.payload,
        loading: false
      };
    case ADD_TRADE:
      return {
        ...state,
        trade: [action.payload, ...state.trade],
        loading: false
      };
    case UPDATE_TRADE:
      return {
        ...state,
        trade: state.trade.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case DELETE_TRADE:
      return {
        ...state,
        trade: state.trade.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_TRADES:
      return {
        ...state,
        trade: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_TRADES:
      return {
        ...state,
        filtered: state.trade.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case TRADE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};