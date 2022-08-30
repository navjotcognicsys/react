import React from 'react'
import { useEffect } from 'react'
import { NavLink,  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from 'yup'
import {loginUserAction} from '../../redux/slices/users/userSlices'
import DisabledButton from '../../components/DisabledButton'

function Login(){
    // History and navigate
    const navigate =  useNavigate();

    // dispatch
    const dispatch = useDispatch()

    // get data from stores
    const user = useSelector(state=> state?.users)
    const {userAppError, userServerError,userLoading,auth} = user

    // Formik Form
    const defaultValue ={
        email: '',
        password: ''
    }

    const validationSchema = yup.object().shape({
        email: yup.string().required("Please enter a valid email address"),
        password: yup.string().required("Please enter a valid password")
    })

    const handleSubmit = (values) => {
        dispatch(loginUserAction(values));
    }

    useEffect(()=>{
        if(auth){
                
            navigate("/profile",{replace:true}) 
        }
    },[auth])


    return(
        <>
            <section className="signup">
            <h1>Keep Track of your income and expenses flow</h1>
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className='form-title'>Login</h2>
                            <Formik initialValues={defaultValue}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                <Form className="register-form" id='register-form'>
                                        <div className="form-group">
                                            <label htmlFor='email'><i className='zmdi zmdi-email material-icons-name'></i></label>
                                            <Field 
                                                type="email"
                                                name='email'
                                                placeholder='Enter Email'
                                                autoComplete='off'
                                                
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <span id="errormessage"><ErrorMessage name='email' /></span>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor='password'><i className='zmdi zmdi-lock material-icons-name'></i></label>
                                            <Field 
                                                type="password"
                                                name='password'
                                                placeholder='Enter Password'
                                                autoComplete='off'
                                                
                                            />
                                        </div>

                                        <div className="form-group">
                                            <span id="errormessage"><ErrorMessage name='password' /></span>
                                        </div>
                                        
                                        <div className="form-group">
                                            {/* Display ErrorMessage */}
                                            {userAppError || userServerError ?(<div className='alert alert-danger' role='alert'>
                                                {userAppError} {userServerError}
                                            </div>) : null}

                                        </div>
                                        
                                        <div className="form-group form-button">
                                            {userLoading ?(
                                                <DisabledButton/>
                                            ):(
                                                <button type="submit"  id="signup" className='form-submit'>Login</button>
                                            )}
                                        </div>
                                </Form>
                            </Formik>
                        </div>
                        <NavLink to='/register' className="link">Signup</NavLink>
                    </div>

                </div>
            </section> 
        </>
    )
}

export default Login