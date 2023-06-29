import React from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { useDispatch,useSelector } from 'react-redux';
// import {updatepassword} from '../redux/login'
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecoveryContext } from "../App";
import { makeStyles } from '@material-ui/core';
import {login,passwordrecovery,updatepassword} from '../redux/user'



const useStyles = makeStyles((theme) => ({
    root: {
      // input label when focused
      "& label.Mui-focused": {
        color: "white"
      },
      // focused color for input with variant='standard'
      "& .MuiInput-underline:after": {
        borderBottomColor: "white"
      },
      // focused color for input with variant='filled'
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: "white"
      },
      // focused color for input with variant='outlined'
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "white"
        }
      }
    }
  }));
const Reset=()=>{
    const classes = useStyles();
    const { email, otp, setPage } = useContext(RecoveryContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(email)
  function changePassword(values) {
    dispatch(updatepassword({email:email,password:values.password,passwordconfirm:values.passwordconfirme})).then(secc=>{
        if(secc.type==="user/updatepassword/fulfilled")
        {
            navigate("/login")
        }
    })
  }
  const restSchema = yup.object().shape({

    password:yup.string().min(8,'Le mots de passe minimum 8 charactére').required("Required"),
    passwordconfirme:yup.string().min(8,'Le mots de passe minimum 8 charactére').required("Required") .oneOf([yup.ref('password'), null], 'Les mots de passe doivent correspondre'),
  });
const initialValues={
    password:"",
    passwordconfirme:""
}
  return (
    <div >
      <section >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0" style={{height: "89vh"}}>
          <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md sm:p-8" style={{backgroundColor:"#144272",color:"white"}}>
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Modifier le mot de passe
            </h2>
            
    <Formik  onSubmit={changePassword} initialValues={initialValues} validationSchema={restSchema}>
      {({ values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit,}) =>{
        return(
            <form className="mt-8 space-y-5 lg:mt-5 md:space-y-5" onSubmit={handleSubmit} > 
              <div > 
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  "
                >
                  Nouveau mot de passe
                </label>
                <TextField 
                style={{width:"350px"}}
                 className={classes.root}
                 sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                   color: "white"
               },shrink:{color: "white"}}} 
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  placeholder="••••••••"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password} 
                 
                ></TextField>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium  "
                >
                  Confirmer le mot de passe
                </label>
                <TextField 
                style={{width:"350px"}}
                 className={classes.root}
                 sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                   color: "white"
               },shrink:{color: "white"}}} 
                  type="password"
                  name="passwordconfirme"
                  id="confirm-password"
                  value={values.passwordconfirme}
                  placeholder="••••••••"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.passwordconfirme && !!errors.passwordconfirme }
                  helperText={touched.passwordconfirme && errors.passwordconfirme } 
                ></TextField>
              </div>
              <button
              type="submit"
              className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 border-none text-white text-sm shadow-sm" style={{marginTop:"20px",height:"30px",backgroundColor:"#2C74B3",color:"white"}}
            >
              Réinitialiser le mot de passe
            </button>
            </form>
                  )}}
                  </Formik>
      
          </div>
        </div>
      </section>
    </div>
  );
}
export default Reset;