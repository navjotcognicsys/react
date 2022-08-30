import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from 'yup'
import { createTransactionAction} from '../../../redux/slices/transaction/transactionSlices'
import { fetchAllCategoryAction } from '../../../redux/slices/category/categorySlices'

const AddTransaction = () => {
    // dispatch
    const dispatch = useDispatch()

    // type ahead search for title
    // const [display,setDisplay] = useState(false)
  
    
    
    
    // category Dispatch
    useEffect(() => {
        dispatch(fetchAllCategoryAction())
    }, [dispatch])

    // get all categories from stores
    const getAllCategories = useSelector(state=> state?.categories);
    const { categoryList} = getAllCategories
    // const [categoryList, setCategoryList] = useState(getAllCategories)
    // const [search, setSearch] = useState("")


    // Formik Form
    const defaultValue ={
        title : "",
        description : "",
        type : "",
        amount : "",
        date : ""
    }

    const validationSchema = yup.object().shape({
        title : yup.string()
        .required("Please Select Title"),

        description: yup.string()
        .required("Please enter description"),

        amount: yup.number()
        .required("Please enter Amount"),
        
        type : yup.string()
        .required("Please select type"),
        
        date : yup.string()
        .required("Please select date"),
    });

    const handleSubmit = (values) => {
        dispatch(createTransactionAction(values));
        window.alert("Success")
    }

    return (
        <>
            <div className="signup-form">
                <h2 className='form-title'>Transactions</h2>
                <Formik initialValues={defaultValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    <Form className="register-form" id='register-form' >
                        <div className="user-details">
                            <div className="form-group">
                            {/* <Field type="text" 
                                    name = "title"
                                    placeholder="Enter Title" 
                            />
                            {categoryList?.map(category => <div value={category._id}> {category.categoriesName} </div>)} */}

                                <Field component="select"  name="title" >
                                    <option >Select a title</option>
                                    {categoryList?.map(category => <option value={category._id}> {category.categoriesName} </option>)}
                                    {/* <option value="add-new"><button>Add New Category</button></option> */}
                                </Field >
                            </div>
                            <div className="form-group">
                                <span id="errormessage"><ErrorMessage name='title' /></span>
                            </div>
                                                        
                            <div className="form-group">
                                <Field type="text" 
                                    name = "description"
                                    placeholder="Enter Description" 
                                />
                            </div>
                            <div className="form-group">
                                <span id="errormessage"><ErrorMessage name='description' /></span>
                            </div>
                                                        
                            <div className="form-group" >
                                <Field type="number" 
                                    name="amount"
                                    // id="name"
                                    // autoComplete='off'
                                    placeholder="Enter Amount" 
                                />
                            </div>
                            <div className="form-group">
                                <span id="errormessage"><ErrorMessage name='amount' /></span>
                            </div>

                            <div className="form-group">
                                <Field component='select' name="type" >
                                    <option >Select Transaction</option>
                                    <option value="income">Cr</option>
                                    <option value="expense">Dr</option>
                                </Field >         
                            </div>
                            <div className="form-group">
                                <span id="errormessage"><ErrorMessage name='type' /></span>
                            </div>

                            <div className="form-group">
                                <Field type="date" 
                                    name="date"
                                    // id="name"
                                    // autoComplete='off'
                                    placeholder="Enter Date" 
                                />
                            </div>
                            <div className="form-group">
                                <span id="errormessage"><ErrorMessage name='date' /></span>
                            </div>
                                                    
                            <div className="form-group form-button">
                            <button type="submit"  id="signup" className='form-submit'>Make Transaction</button>
                            </div>                            
                        </div>
                    </Form>
                </Formik>
                <div>
                
                </div>
            </div>
        </>
    )
}

export default AddTransaction