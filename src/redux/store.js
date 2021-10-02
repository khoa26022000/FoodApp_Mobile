import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import categoryReducer from './reducers/category';
import rootReducer from './reducers';

// const rootReducer = combineReducers({categoryReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
