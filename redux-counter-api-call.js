import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    status: null,
    isLoading: true,
    message: "",
    data: [],
}

export const userAsyncFn = createAsyncThunk(
    "user/fetchUser",

    async (args) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const res1 = await res.json()
            return res1
        }
        catch (err) {
            alert("some thing wend wrong")
        }
    }

)

export const mySlice = createSlice({

    name: 'count',
    initialState,
    reducers: {

        // we can write like this also
        //   add : (state)=>{
        //     state.count += 1
        //   }

        add(state) {
            state.count += 1
        },
        rem(state) {
            state.count -= 1
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(userAsyncFn.pending, (state) => {
                state.data = null;
                state.isLoading = true;
                state.status = null;
            })
            .addCase(userAsyncFn.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.status = "SUCCESS";
            })
            .addCase(userAsyncFn.rejected, (state, action) => {
                state.message = action.error.message;
                state.data = null;
                state.isLoading = false;
                state.status = "REJECTED";
            })
    }


})

export const { add, rem } = mySlice.actions;
export default mySlice.reducer
