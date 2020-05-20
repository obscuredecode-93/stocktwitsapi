import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const updateTweetsMiddleware = ({ dispatch }) => next => {

    
  
    return action => next(action);
  };
function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    return store;
}

const store = configureStore();

ReactDOM.render(
    (<Provider store={store}><App/></Provider>),
    document.querySelector("#root")
);

