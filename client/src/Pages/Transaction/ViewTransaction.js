import React, {useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchAllTransactionAction } from '../../redux/slices/transaction/transactionSlices'
import dateFormatter from '../.../../../utils/dateFormatter'
// import {dayFormatter,monthFormatter, yearFormatter} from '../.../../../utils/dateFormatter'
// import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
// import DeleteIcon from '@mui/icons-material/Delete';

const ViewTransaction = () => {

    // dispatch
    const dispatch = useDispatch()

    const [frequency,setFrequency]= useState('');

    // category Dispatch
    useEffect(() => {
        dispatch(fetchAllTransactionAction())
    }, [dispatch,frequency])

    // get all categories from stores
    const getAlltransactions = useSelector(state=> state?.transactions);
    const { loading,transactionList,appErr, serverErr} = getAlltransactions


    return (
        <>
            <div className="title-filter">
                                        <h6>Select Frequency</h6>
                                        <select value={frequency} onChange= {(event) => {setFrequency(event.target.value)}}>
                                            <option value="7" >Last 1 week</option>
                                            <option value="30" >Last 1 month</option>
                                            <option value="365" >Last 1 year</option>
                                        </select>
                                    </div>
            <table  id= 'viewTran'>
                <thead>
                    <tr>
                        {/* <th>Withdrawed By</th> */}
                        <th>Title</th>
                        <th>Description</th>
                        <th>Income</th>
                        <th>Expense</th>
                        <th>Date</th>
                        {/* <th>Month</th>
                        <th>Year</th> */}
                        {/* <th>Action</th> */}
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        loading ?<h1>Loading</h1> :
                        appErr || serverErr ? <div>Err</div> :
                        transactionList?.docs?.length <= 0 ? <h1>No Transaction Found</h1>:
                        transactionList?.docs?.map(transaction =>
                        <tr>
                            {/* <td>{transaction?.user?.name}</td> */}
                            <td>{transaction?.title?.categoriesName}</td>
                            <td>{transaction?.description}</td>
                            <td>{transaction?.amount}</td>
                            <td>{transaction?.type}</td>
                            <td>{dateFormatter(transaction?.date)}</td>
                            {/* <td>{monthFormatter(transaction?.date)}</td>
                            <td>{yearFormatter(transaction?.date)}</td> */}
                            {/* <td>
                                <BorderColorTwoToneIcon/>&nbsp; &nbsp;
                                <DeleteIcon/>
                            </td> */}
                            
                        </tr>)
                    }

                </tbody>
            </table>
        </>
    )
}

export default ViewTransaction