// App.js

/**
 * Main point of Application
 * Author: Arif
 */
import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


let persistor = persistStore(store);

function App() {

 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;




// AppRoutes.js
/**
 * App Routes for all pages
 * Author: Arif
 */

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar from '../comonents/navigation/NavBar';
import SpinLoader from './../comonents/spin-loader/SpinLoader';
import { useDispatch } from 'react-redux';
import { fetchData, setLog } from '../app/extra-reducer/mydatSlice';

// First Page

const MainPage = React.lazy(() => import('./../features/counter/Counter'));
const About = React.lazy(() => import('./../features/about/About'));
const Delete = React.lazy(() => import('./../features/delete/DeleteFn'));
const Redux = React.lazy(() => import('./../features/redux/Redux'));
const Popup = React.lazy(() => import('./../features/close-popup/ClosePopup'));
const Crud = React.lazy(() => import('./../features/crud/Crud'));
const Weather = React.lazy(() => import('./../features/weather/Weather'));




function AppRoutes(props) {

    const dispatch = useDispatch()

    React.useEffect(()=>{
       (async ()=>{
          const res = await fetch("https://jsonplaceholder.typicode.com/users")
          const res1 = await res.json()
          dispatch(fetchData(res1))
          dispatch(setLog(true))
       })()
    },[dispatch])
  
   
    return (
        <BrowserRouter>
            <NavBar />
            <React.Suspense fallback={<SpinLoader />}>
                <Switch>
                    <Route exact path="/" name="main-page" component={MainPage} />
                    <Route exact path="/about" name="about-page" component={About} />
                    <Route exact path="/delete" name="del-page" component={Delete} />
                    <Route exact path="/redux" name="redux-page" component={Redux} />

                </Switch>
            </React.Suspense>

        </BrowserRouter>
    );
}

export default AppRoutes;


// mydataSlice.js

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    loggedIn: false
}


export const mydataSlice = createSlice({
    name: "check",
    initialState,
    reducers: {
        fetchData(state, action) {
            state.data = action.payload
        },
        setLog(state,action){
        state.loggedIn = action.payload
        }
    }
})

export const {fetchData , setLog} = mydataSlice.actions;
export default mydataSlice.reducer
