// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import myCount from './extra-reducer/mySlice'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  myCount:myCount
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer:  persistedReducer,
  
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;


// mySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0
}


const countSlice = createSlice({

    name : "counter",
    initialState,
    reducers : {
        addItem(state) {
            state.count += 1
        },

        remItem(state) {
            state.count -= 1
        }

    }

})

export const {addItem , remItem} = countSlice.actions;
export default countSlice.reducer;



// App.js
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addItem , remItem} from './../../app/extra-reducer/mySlice'

const testA = useSelector(state=> state.myCount.count)
 <div>
        <h1>Local Redux Test {testA}</h1>
        <button onClick={() => dispatch(addItem())}> Add</button> <br/>
        <button onClick={() => dispatch(remItem())}> Sub</button>
      </div>
