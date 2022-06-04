/**
 * This is redux Slice(State) management for User Profile. Please write all the reducers and external
 * Action here.
 * Export Actions and Reducers separately
 *
 * Author : Devendra
 */
 import {  createSlice } from "@reduxjs/toolkit";

 
 const initialState = {
   customerId: null, // customer id
   userField: "", // "email" - which type of id is used to login
   firstName: "",
   lastName: "",
   fullName: "", // first name, middle name and last name
   email: "",
   loggedIn: false, // no necessary
 };
 

 export const DashboardSlice = createSlice({
   name: "dashboard",
   initialState: initialState,
   reducers: {
    //  updateUser: (state, action) => {
    //    state.userId = action.payload.userId;
    //    state.firstName = action.payload.firstName;
    //    state.lastName = action.payload.lastName ;
    //    state.fullName = action.payload.fullName ;
    //    state.userField = action.payload.userField;
    //    state.email = action.payload.email ;
    //  },
     setLoggedIn: (state, action) => {
       state.loggedIn = action.payload.loggedIn;
     },
   },

 });
 
 export const getLoginStatus = (state) => state.user.loggedIn;
 export const { setLoggedIn } = DashboardSlice.actions;
 export default DashboardSlice.reducer;
 
