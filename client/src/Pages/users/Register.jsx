import React from 'react'
import { useEffect } from 'react'
import { NavLink,  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from 'yup'
import {registerUserAction} from '../../redux/slices/users/userSlices'
import DisabledButton from '../../components/DisabledButton'

function Register(){
    // History and navigate
    const navigate =  useNavigate();
    
    // dispatch
    const dispatch = useDispatch()

    // get data from stores
    const user = useSelector(state=> state?.users)
    const {userAppError, userServerError,userLoading,auth} = user

    // Formik Form
    const defaultValue ={
        name : "",
        email : "",
        contact : "",
        password : "",
        confirmPassword : ""
    }

    const nameRules = /^[A-Z a-z]{3,30}$/
    const contactRules = /^[0-9]{10}$/
    const passwordRules = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/

    const validationSchema = yup.object().shape({
        name : yup.string()
        .min(3)
        .matches(nameRules,{message: "Name should be minimum 3 characters and not include digits"})
        .required("Please enter a valid name"),

        email: yup.string()
        .required("Please enter a valid email address"),

        contact: yup.string()
        .min(10)
        .matches(contactRules,{message: "Please enter a valid mobile number"})
        .required("Please enter a valid contact number"),
        
        password: yup.string()
        .min(8)
        .matches(passwordRules,{message: "Password should be 8-20 characters and include atleast 1 letter,1 number and 1 special character"})
        .required("Please enter a strong password"),
        
        confirmPassword: yup.string()
        .oneOf([yup.ref('password'),null],"Password must match")
        .required("Please enter a confirm password"),
    });

    const handleSubmit = (values) => {
        dispatch(registerUserAction(values));
        navigate("/login") 
    }

    // useEffect(()=>{
    //     if(auth){
    //         navigate("/login") 
    //     }
    // },[auth])

    return(
        <>
            <section className="signup">
            <h1>Keep Track of your income and expenses flow</h1>
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className='form-title'>Register</h2>
                            <Formik initialValues={defaultValue}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                <Form className="register-form" id='register-form'>
                                        <div className="form-group">
                                            <label htmlFor='email'><i className='zmdi zmdi-account material-icons-name'></i></label>
                                            <Field 
                                                type="text"
                                                name='name'
                                                placeholder='Enter Name'
                                                autoComplete='off'
                                                
                                            />
                                        </div>

                                        <div className="form-group">
                                            <span id="errormessage"><ErrorMessage name='name' /></span>
                                        </div>
                                    
                                        
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
                                            <label htmlFor='email'><i className='zmdi zmdi-phone-in-talk material-icons-name'></i></label>
                                            <Field 
                                                type="number"
                                                name='contact'
                                                placeholder='Enter Contact No.'
                                                autoComplete='off'
                                                
                                            />
                                        </div>

                                        <div className="form-group">
                                            <span id="errormessage"><ErrorMessage name='contact' /></span>
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
                                            <label htmlFor='password'><i className='zmdi zmdi-lock material-icons-name'></i></label>
                                            <Field 
                                                type="password"
                                                name='confirmPassword'
                                                placeholder='Enter confirm Password'
                                                autoComplete='off'
                                                
                                            />
                                        </div>

                                        <div className="form-group">
                                            <span id="errormessage"><ErrorMessage name='confirmPassword' /></span>
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
                                                <button type="submit"  id="signup" className='form-submit'>Register</button>
                                            )}
                                        </div>
                                </Form>
                            </Formik>
                        </div>
                        <NavLink to='/login' className="link">SignIn</NavLink>
                    </div>

                </div>
            </section> 
        </>
    )
}

export default Register