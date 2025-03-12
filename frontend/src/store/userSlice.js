import {createSlice} from '@reduxjs/toolkit'

const initialState= {
    user:null
  }
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails:(state,action )=>{
        state.user = action.payload
      },
       updateCart: (state, action) => {
        if (state.user) {
          const updatedCart = action.payload; 
          state.user.cart = updatedCart;
        }
      },
    },
  })

export const { setUserDetails,updateCart } = userSlice.actions

export default userSlice.reducer