import {configureStore} from '@reduxjs/toolkit'
import userSlice from './user'
import cartSlice from './cart'
import courSlice from './cour'
import categorySlice from './category'
import videoSlice from './video'

export const store = configureStore({
    reducer:{
        user:userSlice,
        cart:cartSlice,
        cour:courSlice,
        category:categorySlice,
        video:videoSlice,
      },
})