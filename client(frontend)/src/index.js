import React from 'react';
import ReactDOM from 'react-dom';


import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Routes from './Components/Routes';
import reducer from './store/reducer';


function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);

    } catch(e){
        console.log(e);
    }
}

function loadToLocalStorage(){
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState ===null) return undefined;
        return JSON.parse(serializedState);

    } catch(e){
        return undefined;
    }
}

const persistedState = loadToLocalStorage();

const store = createStore(reducer, persistedState, applyMiddleware(thunk));

store.subscribe(()=> saveToLocalStorage(store.getState()));


const app = (
    <Provider store={store}>
        <BrowserRouter>
               <Routes />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));
