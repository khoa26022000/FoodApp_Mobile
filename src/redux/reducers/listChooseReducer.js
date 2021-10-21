import {LISTCHOOSE_LOADED_SUCCESS} from '../actions/types';
const intialState = {
  listChoose: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case LISTCHOOSE_LOADED_SUCCESS:
      return {...state, listChoose: action.payload};
    default:
      return state;
  }
};
