import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from './reducers/category';

const rootReducer = combineReducers({categoryReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
