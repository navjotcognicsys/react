import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../slices/category/categorySlices';
import transactionReducer from '../slices/transaction/transactionSlices'
import UserReducer from '../slices/users/userSlices'

const Store = configureStore({
    reducer: {
        users: UserReducer,
        categories : categoryReducer,
        transactions : transactionReducer
    }
})

export default Store;